"""093-relator: genera reporte simple de estado del repo.

Cuenta archivos, tamanos y tipos. Base para el CHANGELOG automatico.
"""
from __future__ import annotations

import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "_base"))
from agente_base import AgenteBase, Resultado, main  # noqa: E402


EXCLUIR_DIRS = {".git", "node_modules", "__pycache__", ".venv", ".pytest_cache"}


class Relator(AgenteBase):
    nombre = "093-relator"
    descripcion = "Cuenta archivos y genera reporte de estado"

    def correr(self) -> Resultado:
        ext = Counter()
        tamanos = Counter()
        total = 0

        for archivo in self.raiz.rglob("*"):
            if not archivo.is_file():
                continue
            if any(part in EXCLUIR_DIRS for part in archivo.parts):
                continue
            total += 1
            e = archivo.suffix or "(sin ext)"
            ext[e] += 1
            tamanos[e] += archivo.stat().st_size

        top = ext.most_common(15)

        return Resultado(
            agente=self.nombre,
            timestamp=self._ahora(),
            ok=True,
            hallazgos=[],
            metricas={
                "total_archivos": total,
                "por_extension": [
                    {"ext": e, "cantidad": n, "bytes": tamanos[e]}
                    for e, n in top
                ],
            },
        )


if __name__ == "__main__":
    main(Relator(), "05-AGENTES/093-relator/ultimo.json")