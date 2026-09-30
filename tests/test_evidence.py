"""Pruebas del flujo de evidencia con criptografia real."""
from __future__ import annotations

import pytest

from kronos360.crypto.canonicalization import canonicalize
from kronos360.crypto.hashing import sha3_512_hex
from kronos360.crypto.signatures import Ed25519Signer, MLDSA65Signer
from kronos360.models.evidence import EvidenceRecord
from kronos360.services.evidence import issue_record, migrate_record, verify_record


@pytest.fixture
def signers():
    return [Ed25519Signer("alice-ed25519"), MLDSA65Signer("alice-mldsa65")]


def test_canonicalization_is_deterministic():
    assert canonicalize({"b": 2, "a": 1}) == canonicalize({"a": 1, "b": 2})


def test_sha3_512_is_stable():
    assert sha3_512_hex(b"abc") == sha3_512_hex(b"abc")
    assert sha3_512_hex(b"abc") != sha3_512_hex(b"abd")


def test_issue_and_verify_hybrid_record(signers):
    record = issue_record({"hello": "world"}, signers)
    result = verify_record(record)
    assert result["overall_valid"] is True
    assert result["content_hash_valid"] is True
    assert len(result["signatures"]) == 2
    assert all(s["valid"] for s in result["signatures"])
    assert {s["algorithm"] for s in result["signatures"]} == {"Ed25519", "ML-DSA-65"}


def test_tampering_fails_verification(signers):
    record = issue_record({"amount": 100}, signers)
    tampered = EvidenceRecord(
        record_id=record.record_id,
        content={"amount": 999},
        content_hash=record.content_hash,
        created_at=record.created_at,
        signatures=record.signatures,
    )
    result = verify_record(tampered)
    assert result["content_hash_valid"] is False
    assert result["overall_valid"] is False


def test_migration_does_not_overwrite_historical_record(signers):
    original = issue_record({"doc": "v1"}, signers)
    migrated = migrate_record(original, signers)
    assert migrated.record_id != original.record_id
    assert migrated.migration_of == original.record_id
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
        content=record.content,
        content_hash=record.content_hash,
        created_at=record.created_at,
        signatures=tuple(broken_sigs),
    )
    result = verify_record(broken)
    assert result["content_hash_valid"] is True
    assert result["overall_valid"] is False