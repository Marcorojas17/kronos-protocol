"""Servicios de emision, verificacion y migracion."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Iterable
from uuid import uuid4

from ..crypto.canonicalization import canonicalize
from ..crypto.hashing import sha3_512_hex
from ..crypto.signatures import Signer, verify_signature
from ..models.evidence import EvidenceRecord, SignatureRecord


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _build_record(
    content: dict,
    signers: Iterable[Signer],
    migration_of: str | None = None,
) -> EvidenceRecord:
    payload = canonicalize(content)
    content_hash = sha3_512_hex(payload)

    signatures = tuple(
        SignatureRecord(
            signer_id=signer.signer_id,
            algorithm=signer.algorithm,
            public_key_hex=signer.public_key_hex(),
            signature_hex=signer.sign(payload).hex(),
        )
        for signer in signers
    )

    return EvidenceRecord(
        record_id=f"EVD-{uuid4().hex}",
        content=content,
        content_hash=content_hash,
        created_at=_now_iso(),
        signatures=signatures,
        migration_of=migration_of,
    )


def issue_record(content: dict, signers: Iterable[Signer]) -> EvidenceRecord:
    return _build_record(content, signers)


def verify_record(record: EvidenceRecord) -> dict:
    payload = canonicalize(record.content)
    recomputed = sha3_512_hex(payload)
    content_valid = recomputed == record.content_hash

    sig_results = [
        {
            "signer_id": sig.signer_id,
            "algorithm": sig.algorithm,
            "valid": verify_signature(
                sig.algorithm,
                sig.public_key_hex,
                sig.signature_hex,
                payload,
            ),
        }
        for sig in record.signatures
    ]

    overall = (
        content_valid
        and len(sig_results) > 0
        and all(s["valid"] for s in sig_results)
    )

    return {
        "overall_valid": overall,
        "content_hash_valid": content_valid,
        "signatures": sig_results,
    }


def migrate_record(record: EvidenceRecord, signers: Iterable[Signer]) -> EvidenceRecord:
    return _build_record(record.content, signers, migration_of=record.record_id)