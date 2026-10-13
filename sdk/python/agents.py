"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ SDK · PYTHON · AGENTS · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations

SEAL = "◯_● · 51/49/100"

CULTURALES = ["cuicatl", "temachtiani", "tlachixqui", "tlamatini", "tlapohualli", "tonal"]
OFICIOS = ["090-arquitecto", "091-contralor", "092-auditor-externo",
           "093-relator", "094-bibliotecario", "095-cartografo"]


def listar_agentes() -> dict:
    """Lista los 12 agentes del enjambre ARKHÉ."""
    return {
        "culturales": CULTURALES,
        "oficios": OFICIOS,
        "total": len(CULTURALES) + len(OFICIOS),
        "sellado": SEAL,
    }


def info_agente(agente_id: str) -> dict:
    """Devuelve info de un agente."""
    todos = CULTURALES + OFICIOS
    if agente_id not in todos:
        return {"error": f"agente no encontrado: {agente_id}", "sellado": SEAL}
    return {
        "id": agente_id,
        "tipo": "cultural" if agente_id in CULTURALES else "oficio",
        "estado": "activo",
        "sellado": SEAL,
    }


def verificar_quorum(votos: list[str]) -> dict:
    """Verifica quórum 4/5."""
    quorum_requerido = 4
    max_votantes = 5
    votos_unicos = list(set(votos))[:max_votantes]

    return {
        "votos": votos_unicos,
        "total": len(votos_unicos),
        "requerido": quorum_requerido,
        "alcanzado": len(votos_unicos) >= quorum_requerido,
        "veredicto": f"QUÓRUM {len(votos_unicos)}/{max_votantes}",
        "sellado": SEAL,
    }