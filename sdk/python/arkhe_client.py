"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ SDK · PYTHON CLIENT · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
import hashlib
import httpx
from typing import Optional

SEAL = "◯_● · 51/49/100"
INDEX_ZERO_SHA256 = "f03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112"

class ArkheClient:
    def __init__(self, base_url: str = "https://arkhe.zero"):
        self.base_url = base_url.rstrip("/")
        self.seal = SEAL

    def sha3_512(self, contenido: str) -> str:
        return hashlib.sha3_512(contenido.encode("utf-8")).hexdigest()

    def verificar_hash(self, hash_: str) -> dict:
        return {
            "hash": hash_,
            "es_indice_cero": hash_ == INDEX_ZERO_SHA256,
            "valido": len(hash_) in (64, 128),
            "sellado": SEAL,
        }

    async def firmar(self, contenido: str, alg: str = "ML-DSA-87") -> dict:
        async with httpx.AsyncClient() as client:
            r = await client.post(
                f"{self.base_url}/v1/obras/firmar",
                json={"contenido": contenido, "tipo": "obra", "algoritmo": alg},
            )
            r.raise_for_status()
            return r.json()

    async def salud(self) -> dict:
        async with httpx.AsyncClient() as client:
            r = await client.get(f"{self.base_url}/health")
            r.raise_for_status()
            return r.json()

# ◯_● · 51/49/100 · KRONOS