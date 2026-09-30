"""090-arquitecto: valida que las carpetas esperadas existan.

No mueve nada. Solo reporta drift entre estructura ideal y real.
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "_base"))
from agente_base import AgenteBase, Resultado, main  # noqa: E402


ESTRUCTURA_ESPERADA = [
    "00-FUNDACION",
    "01-CRIPTO",
    "02-SCHEMA",
    "03-VERIFICADOR",
    "04-PROTOCOLOS",
    "05-AGENTES",
    "06-GOBERNANZA",
    "07-LLAVES",
    "08-HERRAMIENTAS",
    "09-NEGOCIO",
    "10-DOCS",
    "11-ARCHIVO",
    "12-MOVIMIENTO",
    "13-PLAZAS",
    ".github/workflows",
]


class Arquitecto(AgenteBase):
    nombre = "090-arquitecto"
    descripcion = "Valida estructura del repo contra estructura esperada"

    def correr(self) -> Resultado:
        faltantes = []
        presentes = []

        for ruta in ESTRUCTURA_ESPERADA:
            if (self.raiz / ruta).exists():
                presentes.append(ruta)
            else:
                faltantes.append(ruta)

        total = len(ESTRUCTURA_ESPERADA)
        cobertura = round(len(presentes) / total * 100, 1) if total else 0

        hallazgos = []
        if faltantes:
            hallazgos.append({
                "tipo": "carpetas-faltantes",
                "cantidad": len(faltantes),
                "rutas": faltantes,
            })

        # Carpetas en raiz que no estan en la lista (candidatas a mover)
        hijas = [
            p.name for p in self.raiz.iterdir()
            if p.is_dir() and not p.name.startswith(".")
        ]
        huerfanas = [h for h in hijas if h not in ESTRUCTURA_ESPERADA and h not in {"tests", "src"}]
        if huerfanas:
            hallazgos.append({
                "tipo": "carpetas-huerfanas",
                "cantidad": len(huerfanas),
                "rutas": huerfanas,
            })

        return Resultado(
            agente=self.nombre,
            timestamp=self._ahora(),
            ok=len(faltantes) == 0,
            hallazgos=hallazgos,
            metricas={
                "estructura_esperada": total,
                "presentes": len(presentes),
                "faltantes": len(faltantes),
                "cobertura_pct": cobertura,
                "huerfanas": len(huerfanas),
            },
        )


if __name__ == "__main__":
    main(Arquitecto(), "05-AGENTES/090-arquitecto/ultimo.json")