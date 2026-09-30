"""Pruebas del flujo con doble capa de integridad."""

from __future__ import annotations

import pytest

from kronos360.crypto.canonicalization import canonicalize
from kronos360.crypto.hashing import sha3_512_hex
from kronos360.crypto.signatures import Ed25519Signer, MLDSA65Signer
from kronos360.models.evidence import EvidenceRecord
from kronos360.services.evidence import (
    GENESIS_HASH,
    issue_record,
    migrate_record,
    verify_record,
)


@pytest.fixture
def signers():
    return [Ed25519Signer("alice-ed25519"), MLDSA65Signer("alice-mldsa65")]


def test_canonicalization_is_deterministic():
    assert canonicalize({"b": 2, "a": 1}) == canonicalize({"a": 1, "b": 2})


def test_sha3_512_is_stable():
    assert sha3_512_hex(b"abc") == sha3_512_hex(b"abc")
    assert sha3_512_hex(b"abc") != sha3_512_hex(b"abd")


def test_issue_creates_two_hashes(signers):
    record = issue_record({"hello": "world"}, signers)
    assert record.payload_hash
    assert record.hash_registro
    assert record.payload_hash != record.hash_registro
    assert len(record.payload_hash) == 128  # SHA3-512
    assert len(record.hash_registro) == 128
    assert record.prev_hash == GENESIS_HASH


def test_verify_hybrid_record(signers):
    record = issue_record({"hello": "world"}, signers)
    result = verify_record(record)
    assert result["overall_valid"] is True
    assert result["capa_1_payload"]["valido"] is True
    assert result["capa_2_registro"]["valido"] is True
    assert len(result["firmas"]) == 2
    assert all(f["valid"] for f in result["firmas"])
    assert {f["algorithm"] for f in result["firmas"]} == {"Ed25519", "ML-DSA-65"}


def test_tampering_content_breaks_both_caps(signers):
    record = issue_record({"amount": 100}, signers)
    tampered = EvidenceRecord(
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
    result = verify_record(tampered)
    assert result["capa_1_payload"]["valido"] is False
    assert result["capa_2_registro"]["valido"] is False
    assert result["overall_valid"] is False


def test_tampering_metadata_breaks_only_layer_2(signers):
    """Cambiar el timestamp altera hash_registro pero no payload_hash."""
    record = issue_record({"x": 1}, signers)
    tampered = EvidenceRecord(
        record_id=record.record_id,
        tipo=record.tipo,
        content=record.content,
        payload_hash=record.payload_hash,
        payload_hash_algo=record.payload_hash_algo,
        created_at="1999-01-01T00:00:00+00:00",  # timestamp alterado
        responsable=record.responsable,
        prev_hash=record.prev_hash,
        hash_registro=record.hash_registro,
        hash_algo=record.hash_algo,
        signatures=record.signatures,
        migration_of=record.migration_of,
    )
    result = verify_record(tampered)
    assert result["capa_1_payload"]["valido"] is True  # contenido intacto
    assert result["capa_2_registro"]["valido"] is False  # metadato alterado
    assert result["overall_valid"] is False


def test_migration_chains_prev_hash(signers):
    original = issue_record({"doc": "v1"}, signers)
    migrated = migrate_record(original, signers)
    assert migrated.record_id != original.record_id
    assert migrated.migration_of == original.record_id
    assert migrated.prev_hash == original.hash_registro
    assert verify_record(migrated)["overall_valid"] is True


def test_hybrid_fails_if_one_signature_tampered(signers):
    record = issue_record({"x": 1}, signers)
    broken_sigs = list(record.signatures)
    for i, sig in enumerate(broken_sigs):
        if sig.algorithm == "ML-DSA-65":
            broken_sigs[i] = type(sig)(
                signer_id=sig.signer_id,
                algorithm=sig.algorithm,
                public_key_hex=sig.public_key_hex,
                signature_hex="00" * 64,
            )
    broken = EvidenceRecord(
        record_id=record.record_id,
        tipo=record.tipo,
        content=record.content,
        payload_hash=record.payload_hash,
        payload_hash_algo=record.payload_hash_algo,
        created_at=record.created_at,
        responsable=record.responsable,
        prev_hash=record.prev_hash,
        hash_registro=record.hash_registro,
        hash_algo=record.hash_algo,
        signatures=tuple(broken_sigs),
        migration_of=record.migration_of,
    )
    result = verify_record(broken)
    assert result["capa_1_payload"]["valido"] is True
    assert result["capa_2_registro"]["valido"] is True
    assert result["overall_valid"] is False  # politica AND en firmas
