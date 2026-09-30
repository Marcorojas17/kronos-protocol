"""Clase base para todos los agentes Kintsugi.

Determinista. Sin LLM. Sin dependencias externas.
Cada agente hereda y define su `correr()`.
"""
from __future__ import annotations

import json
import sys
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


@dataclass
class Resultado:
    agente: str
    timestamp: str
    ok: bool
    hallazgos: list = field(default_factory=list)
    metricas: dict = field(default_factory=dict)

    def a_json(self) -> str:
        return json.dumps(
            {
                "agente": self.agente,
                "timestamp": self.timestamp,
                "ok": self.ok,
                "hallazgos": self.hallazgos,
                "metricas": self.metricas,
            },
            indent=2,
            ensure_ascii=False,
        )


class AgenteBase:
    nombre: str = "agente-base"
    descripcion: str = ""

    def __init__(self, raiz: Path | None = None) -> None:
        self.raiz = raiz or Path.cwd()

    def _ahora(self) -> str:
        return datetime.now(timezone.utc).isoformat()

    def correr(self) -> Resultado:
        raise NotImplementedError

    def ejecutar(self, salida: Path | None = None) -> int:
        resultado = self.correr()
        texto = resultado.a_json()
        print(texto)
        if salida:
            salida.parent.mkdir(parents=True, exist_ok=True)
            salida.write_text(texto, encoding="utf-8")
        return 0 if resultado.ok else 1


def main(agente: AgenteBase, salida_default: str | None = None) -> None:
    salida = Path(salida_default) if salida_default else None
    sys.exit(agente.ejecutar(salida))