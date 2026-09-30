
**CONTENIDO:**
```python
"""Pruebas con domain separation y verificacion de expiracion."""
from __future__ import annotations

import pytest

from kronos360.crypto.canonicalization import canonicalize
from kronos360.crypto.hashing import sha3_512_hex
from kronos360.crypto.signatures import (
    DOMAIN_SEPARATOR,
    Ed25519Signer,
    MLDSA65Signer,
    build_signed_message,
)
from kronos360.services.evidence import (
    GENESIS_HASH,
    issue_record,
    migrate_record,
    verify_record,
)


@pytest.fixture
def signers():
    return [Ed25519Signer("alice-ed25519"), MLDSA65Signer("alice-mldsa65")]


def test_domain_separator_is_stable():
    msg = build_signed_message("abc123", "Ed25519")
    assert msg.startswith(DOMAIN_SEPARATOR)
    assert b"Ed25519" in msg
    assert b"abc123" in msg


def test_domain_separator_distinguishes_algorithms():
    a = build_signed_message("h", "Ed25519")
    b = build_signed_message("h", "ML-DSA-65")
    assert a != b


def test_issue_creates_two_hashes(signers):
    record = issue_record({"hello": "world"}, signers)
    assert record.payload_hash
    assert record.hash_registro
    assert record.payload_hash != record.hash_registro
    assert record.prev_hash == GENESIS_HASH


def test_verify_hybrid_record(signers):
    record = issue_record({"hello": "world"}, signers)
    result = verify_record(record)
    assert result["overall_valid"] is True
    assert result["capa_1_payload"]["valido"] is True
    assert result["capa_2_registro"]["valido"] is True
    assert len(result["firmas"]) == 2
    assert all(f["valid"] for f in result["firmas"])


def test_tampering_content_breaks_both_caps(signers):
    record = issue_record({"amount": 100}, signers)
    broken = type(record)(
        record_id=record.record_id,
        tipo=record.tipo,
        content={"amount": 999},
        payload_hash=record.payload_hash,
        payload_hash_algo=record.payload_hash_algo,
        created_at=record.created_at,
        responsable=record.responsable,
        prev_hash=record.prev_hash,
        hash_registro=record.hash_registro,
        hash_algo=record.hash_algo,
        signatures=record.signatures,
        migration_of=record.migration_of,
    )
    result = verify_record(broken)
    assert result["capa_1_payload"]["valido"] is False
    assert result["overall_valid"] is False


def test_expired_attestation_fails(signers):
    record = issue_record({"x": 1}, signers)
    # Simulamos atestacion que expiro antes del registro
    atestaciones = {
        "alice-ed25519": "2020-01-01T00:00:00+00:00",
        "alice-mldsa65": "2020-01-01T00:00:00+00:00",
    }
    result = verify_record(record, atestaciones=atestaciones)
    assert result["overall_valid"] is False
    assert all(not f["vigente"] for f in result["firmas"])


def test_valid_attestation_passes(signers):
    record = issue_record({"x": 1}, signers)
    atestaciones = {
        "alice-ed25519": "2030-01-01T00:00:00+00:00",
        "alice-mldsa65": "2030-01-01T00:00:00+00:00",
    }
    result = verify_record(record, atestaciones=atestaciones)
    assert result["overall_valid"] is True


def test_migration_chains_prev_hash(signers):
    original = issue_record({"doc": "v1"}, signers)
    migrated = migrate_record(original, signers)
    assert migrated.prev_hash == original.hash_registro
    assert migrated.migration_of == original.record_id
    assert verify_record(migrated)["overall_valid"] is True