"""Emision, verificacion y migracion con doble capa y domain separation."""

from __future__ import annotations

from collections.abc import Iterable
from datetime import UTC, datetime
from uuid import uuid4

from ..crypto.canonicalization import canonicalize
from ..crypto.hashing import sha3_512_hex
from ..crypto.signatures import (
    Signer,
    build_signed_message,
    verify_signature,
)
from ..models.evidence import EvidenceRecord, SignatureRecord

PAYLOAD_ALGO = "SHA3-512"
HASH_ALGO = "SHA3-512"
GENESIS_HASH = "0" * 128


def _now_iso() -> str:
    return datetime.now(UTC).isoformat()


def _hash_hex(payload: bytes, algo: str) -> str:
    if algo == "SHA3-512":
        return sha3_512_hex(payload)
    raise ValueError(f"Algoritmo de hash no soportado: {algo}")


def _build_record(
    content: dict,
    signers: Iterable[Signer],
    tipo: str = "evidencia-kronos360",
    responsable: dict | None = None,
    prev_hash: str = GENESIS_HASH,
    migration_of: str | None = None,
) -> EvidenceRecord:
    if responsable is None:
        responsable = {"id": "DESCONOCIDO", "tipo": "operador-kronos360"}

    payload_bytes = canonicalize(content)
    payload_hash = _hash_hex(payload_bytes, PAYLOAD_ALGO)

    record_id = f"EVD-{uuid4().hex}"
    created_at = _now_iso()

    pre_registro = {
        "record_id": record_id,
        "tipo": tipo,
        "content": content,
        "payload_hash": payload_hash,
        "payload_hash_algo": PAYLOAD_ALGO,
        "created_at": created_at,
        "responsable": responsable,
        "prev_hash": prev_hash,
        "migration_of": migration_of,
    }

    registro_bytes = canonicalize(pre_registro)
    hash_registro = _hash_hex(registro_bytes, HASH_ALGO)

    # Domain separation: cada firma va sobre mensaje prefijado
    signatures = tuple(
        SignatureRecord(
            signer_id=signer.signer_id,
            algorithm=signer.algorithm,
            public_key_hex=signer.public_key_hex(),
            signature_hex=signer.sign(build_signed_message(hash_registro, signer.algorithm)).hex(),
        )
        for signer in signers
    )

    return EvidenceRecord(
        record_id=record_id,
        tipo=tipo,
        content=content,
        payload_hash=payload_hash,
        payload_hash_algo=PAYLOAD_ALGO,
        created_at=created_at,
        responsable=responsable,
        prev_hash=prev_hash,
        hash_registro=hash_registro,
        hash_algo=HASH_ALGO,
        signatures=signatures,
        migration_of=migration_of,
    )


def issue_record(
    content: dict,
    signers: Iterable[Signer],
    tipo: str = "evidencia-kronos360",
    responsable: dict | None = None,
    prev_hash: str = GENESIS_HASH,
) -> EvidenceRecord:
    return _build_record(content, signers, tipo, responsable, prev_hash)


def verify_record(
    record: EvidenceRecord,
    atestaciones: dict | None = None,
) -> dict:
    """Verificacion forense con diagnostico por capa y expiracion.

    Args:
        record: el registro a verificar.
        atestaciones: dict opcional {signer_id: valido_hasta_iso}.
            Si se pasa, verifica que el registro fue emitido dentro de
            la ventana de validez de cada agente.
    """
    # Capa 1
    payload_bytes = canonicalize(record.content)
    payload_recalculado = _hash_hex(payload_bytes, record.payload_hash_algo)
    payload_ok = payload_recalculado == record.payload_hash

    # Capa 2
    pre_registro = {
        "record_id": record.record_id,
        "tipo": record.tipo,
        "content": record.content,
        "payload_hash": record.payload_hash,
        "payload_hash_algo": record.payload_hash_algo,
        "created_at": record.created_at,
        "responsable": record.responsable,
        "prev_hash": record.prev_hash,
        "migration_of": record.migration_of,
    }
    registro_bytes = canonicalize(pre_registro)
    hash_recalculado = _hash_hex(registro_bytes, record.hash_algo)
    hash_ok = hash_recalculado == record.hash_registro

    # Firmas con domain separation
    sig_results = []
    for sig in record.signatures:
        message = build_signed_message(record.hash_registro, sig.algorithm)
        valida = verify_signature(
            sig.algorithm,
            sig.public_key_hex,
            sig.signature_hex,
            message,
        )
        vigente = True
        if atestaciones and sig.signer_id in atestaciones:
            valido_hasta = atestaciones[sig.signer_id]
            vigente = record.created_at <= valido_hasta

        sig_results.append(
            {
                "signer_id": sig.signer_id,
                "algorithm": sig.algorithm,
                "valid": valida,
                "vigente": vigente,
            }
        )

    firmas_ok = (
        len(sig_results) > 0
        and all(s["valid"] for s in sig_results)
        and all(s["vigente"] for s in sig_results)
    )

    return {
        "overall_valid": payload_ok and hash_ok and firmas_ok,
        "capa_1_payload": {
            "valido": payload_ok,
            "esperado": record.payload_hash,
            "calculado": payload_recalculado,
        },
        "capa_2_registro": {
            "valido": hash_ok,
            "esperado": record.hash_registro,
            "calculado": hash_recalculado,
        },
        "firmas": sig_results,
    }


def migrate_record(record: EvidenceRecord, signers: Iterable[Signer]) -> EvidenceRecord:
    return _build_record(
        record.content,
        signers,
        tipo=record.tipo,
        responsable=record.responsable,
        prev_hash=record.hash_registro,
        migration_of=record.record_id,
    )
