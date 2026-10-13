"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ SDK · PYTHON · PQC · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
import hashlib

SEAL = "◯_● · 51/49/100"
FIPS = ["FIPS 203", "FIPS 204", "FIPS 205", "FIPS 202"]


def sha3_512(texto: str) -> str:
    """Hash SHA3-512 (FIPS 202)."""
    return hashlib.sha3_512(texto.encode("utf-8")).hexdigest()


def sha256(texto: str) -> str:
    """Hash SHA-256 (compatibilidad Índice Cero)."""
    return hashlib.sha256(texto.encode("utf-8")).hexdigest()


def suite_canonica() -> dict:
    """Devuelve la suite criptográfica canónica."""
    return {
        "kem": "ML-KEM-1024",
        "sig": "ML-DSA-87",
        "longterm": "SLH-DSA-SHAKE-256s",
        "hash": "SHA3-512",
        "fips": FIPS,
        "sellado": SEAL,
    }


def auditar_suite(algoritmos: list[str]) -> dict:
    """Auditoría anti-downgrade."""
    prohibidos = ["md5", "sha1", "sha-1", "rsa-1024", "des", "3des", "rc4", "ecdsa-p192"]
    encontrados = [a.lower() for a in algoritmos if a.lower() in prohibidos]

    return {
        "ok": len(encontrados) == 0,
        "prohibidos": encontrados,
        "veredicto": "SUITE CANÓNICA" if not encontrados else f"🚨 DOWNGRADE: {encontrados}",
        "sellado": SEAL,
    }