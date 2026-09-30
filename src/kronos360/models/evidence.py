"""Modelos de datos para registros de evidencia."""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Optional


@dataclass(frozen=True)
class SignatureRecord:
    signer_id: str
    algorithm: str
    public_key_hex: str
    signature_hex: str


@dataclass(frozen=True)
class EvidenceRecord:
    record_id: str
    content: dict
    content_hash: str
    created_at: str
    signatures: tuple[SignatureRecord, ...] = field(default_factory=tuple)
    migration_of: Optional[str] = None