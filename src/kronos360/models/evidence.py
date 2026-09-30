"""Modelos de datos para registros de evidencia con doble capa de hash.

Capa 1: payload_hash   -> huella del contenido unicamente.
Capa 2: hash_registro  -> huella del registro completo (incluye payload_hash
                          + metadatos). Es la que se firma.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class SignatureRecord:
    """Firma individual asociada a un registro de evidencia."""

    signer_id: str
    algorithm: str  # "Ed25519" | "ML-DSA-65"
    public_key_hex: str
    signature_hex: str


@dataclass(frozen=True)
class EvidenceRecord:
    """Registro con doble capa de integridad."""

    record_id: str
    tipo: str
    content: dict
    payload_hash: str  # Capa 1
    payload_hash_algo: str  # "SHA3-512" | "SHA-256"
    created_at: str
    responsable: dict
    prev_hash: str
    hash_registro: str  # Capa 2
    hash_algo: str  # algoritmo de hash_registro
    signatures: tuple[SignatureRecord, ...] = field(default_factory=tuple)
    migration_of: str | None = None
