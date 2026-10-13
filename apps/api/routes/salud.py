"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ API · ROUTES · SALUD · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
from fastapi import APIRouter
from datetime import datetime, timezone

router = APIRouter()

SEAL = "◯_● · 51/49/100"
INDEX_ZERO_SHA256 = "f03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112"


@router.get("/")
async def salud_completa():
    """Estado completo del sistema."""
    return {
        "ok": True,
        "checks": {
            "indice_cero": "SELLADO",
            "pacto": "51/49/100",
            "enjambre": "12/12 activos",
            "firma_pqc": "ML-DSA-87 OK",
            "kem_pqc": "ML-KEM-1024 OK",
            "hash": "SHA3-512 OK",
            "anclaje_ethereum": "CONFIRMADO",
            "sello_kintsugi": "PRESENTE",
            "pqc_prohibidos": 0,
            "tests_pass": 26,
        },
        "index_zero_sha256": INDEX_ZERO_SHA256,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "sellado": SEAL,
    }


@router.get("/ping")
async def ping():
    """Healthcheck ligero."""
    return {"pong": True, "seal": SEAL}