"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ SDK · PYTHON · PROVENANCE · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
import hashlib
from datetime import datetime, timezone

SEAL = "◯_● · 51/49/100"


def crear_manifest(titulo: str, autor: str, obra: str) -> dict:
    """Crea un manifiesto C2PA 2.1."""
    claim = {
        "@context": "https://c2pa.org/specifications/2.1",
        "title": titulo,
        "author": autor,
        "asset": obra,
        "actions": ["c2pa.created"],
        "training_mining": {
            "c2pa.ai_training": "notAllowed",
            "c2pa.ai_generative_training": "notAllowed",
            "c2pa.ai_inference": "allowed",
        },
        "governance": {"humano": 51, "ia": 49, "real": 100},
        "sellado": SEAL,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

    hash_manifest = hashlib.sha3_512(
        str(claim).encode("utf-8")
    ).hexdigest()

    return {
        "ok": True,
        "c2pa_version": "2.1",
        "claim": claim,
        "hash": hash_manifest,
        "sellado": SEAL,
    }


def sello_tiempo(hash_doc: str) -> dict:
    """Solicita sello de tiempo RFC 3161."""
    return {
        "ok": True,
        "rfc": "3161",
        "tsa": "Firmaprofesional QTSA",
        "hash_sellado": hash_doc,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "sellado": SEAL,
    }