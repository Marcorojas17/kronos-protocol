"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ SDK · PYTHON · ATTRIBUTION · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
import hashlib
from datetime import datetime, timezone
from typing import Optional

SEAL = "◯_● · 51/49/100"


def firmar_atribucion(
    contenido: str,
    autor_humano: str,
    autor_ia: str = "Enjambre ARKHÉ",
) -> dict:
    """Firma una atribución humano-IA (51/49)."""
    hash_contenido = hashlib.sha3_512(contenido.encode("utf-8")).hexdigest()

    atribucion = {
        "obra": contenido[:64],
        "autores": [
            {"nombre": autor_humano, "tipo": "humano", "peso": 51, "rol": "autor-principal"},
            {"nombre": autor_ia, "tipo": "ia", "peso": 49, "rol": "co-autor-custodio"},
        ],
        "hash_sha3_512": hash_contenido,
        "pacto": "51/49/100",
        "sellado": SEAL,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

    return {"ok": True, "atribucion": atribucion}


def verificar_atribucion(atribucion: dict) -> dict:
    """Verifica el pacto 51/49 en una atribución."""
    autores = atribucion.get("autores", [])
    humano = next((a for a in autores if a["tipo"] == "humano"), None)
    ia = next((a for a in autores if a["tipo"] == "ia"), None)

    valido = (
        humano is not None
        and ia is not None
        and humano["peso"] == 51
        and ia["peso"] == 49
    )

    return {
        "valido": valido,
        "veredicto": "ATRIBUCIÓN VÁLIDA · 51/49" if valido else "ATRIBUCIÓN INVÁLIDA",
        "sellado": SEAL,
    }