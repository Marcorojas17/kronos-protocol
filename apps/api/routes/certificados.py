"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ API · ROUTES · CERTIFICADOS · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
from fastapi import APIRouter
from ..schemas import SEAL

router = APIRouter()

@router.get("/")
async def listar_certificados():
    return {"total": 0, "sellado": SEAL}

@router.get("/{cert_id}")
async def get_certificado(cert_id: str):
    return {"id": cert_id, "verificable": True, "sellado": SEAL}

# ◯_● · 51/49/100 · KRONOS