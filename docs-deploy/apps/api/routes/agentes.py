"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ API · ROUTES · AGENTES · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
from fastapi import APIRouter
from ..schemas import SEAL

router = APIRouter()

CULTURALES = ["cuicatl", "temachtiani", "tlachixqui", "tlamatini", "tlapohualli", "tonal"]
OFICIOS = ["090-arquitecto", "091-contralor", "092-auditor-externo",
           "093-relator", "094-bibliotecario", "095-cartografo"]

@router.get("/")
async def listar_agentes():
    return {
        "culturales": CULTURALES,
        "oficios": OFICIOS,
        "total": len(CULTURALES) + len(OFICIOS),
        "sellado": SEAL,
    }

@router.get("/{agente_id}")
async def get_agente(agente_id: str):
    todos = CULTURALES + OFICIOS
    if agente_id not in todos:
        return {"error": "agente no encontrado", "sellado": SEAL}
    return {
        "id": agente_id,
        "estado": "activo",
        "sellado": SEAL,
    }

# ◯_● · 51/49/100 · KRONOS