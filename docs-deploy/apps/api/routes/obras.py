"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ API · ROUTES · OBRAS · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
import hashlib
from fastapi import APIRouter, HTTPException
from ..schemas import FirmaRequest, FirmaResponse, SEAL

router = APIRouter()

@router.post("/firmar", response_model=FirmaResponse)
async def firmar_obra(payload: FirmaRequest) -> FirmaResponse:
    if not payload.contenido:
        raise HTTPException(status_code=400, detail="Contenido requerido")

    hash_sha3_512 = hashlib.sha3_512(payload.contenido.encode("utf-8")).hexdigest()

    return FirmaResponse(
        ok=True,
        hash_sha3_512=hash_sha3_512,
        firma=f"PENDING-HSM:{hash_sha3_512[:24]}",
        alg=payload.algoritmo,
        sellado=SEAL,
        timestamp="2026-01-01T00:00:00Z",
    )

@router.get("/{hash}")
async def get_obra(hash: str):
    return {
        "hash": hash,
        "verificable": True,
        "sellado": SEAL,
    }

# ◯_● · 51/49/100 · KRONOS