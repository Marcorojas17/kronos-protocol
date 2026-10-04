"""093-relator: cuenta archivos y genera reporte de estado.

ESTADO: 🔴 MAQUETA (falta comparación con snapshot anterior)
"""

from __future__ import annotations

import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "_base"))
from agente_base import AgenteBase, Resultado, main

EXCLUIR_DIRS = {".git", "node_modules", "__pycache__", ".venv", ".pytest_cache"}


class Relator(AgenteBase):
    nombre = "093-relator"
    descripcion = "Cuenta archivos y genera reporte de estado"
    estado = "🔴 MAQUETA"
    rol_pipeline = "⚙️ PROCESO"
    util_hoy = False
    bloqueado_por = [
        "Sin comparación contra snapshot anterior",
        "Sin generación de CHANGELOG.md",
    ]
    supuestos = [
        "El repo tiene raíz accesible",
        "Los archivos relevantes excluyen .git y similares",
    ]
    riesgos = [
        "Carpetas grandes pueden tardar",
        "No distingue código de datos",
    ]
    cimientos = []
    no_garantiza = [
        "Que el conteo sea representativo",
        "Que los bytes totales sean útiles",
    ]

    def correr(self) -> Resultado:
        ext = Counter()
        tamanos = Counter()
        total = 0

        for archivo in self.raiz.rglob("*"):
            if not archivo.is_file():
                continue
            if any(part in EXCLUIR_DIRS for part in archivo.parts):
                continue
            try:
                tam = archivo.stat().st_size
            except OSError as e:
                self._log_error(f"stat falló en {archivo}", e)
                continue
            total += 1
            e_ext = archivo.suffix or "(sin ext)"
            ext[e_ext] += 1
            tamanos[e_ext] += tam

        top = ext.most_common(15)

        return Resultado(
            agente=self.nombre,
            estado=self.estado,
            rol_pipeline=self.rol_pipeline,
            util_hoy=self.util_hoy,
            bloqueado_por=self.bloqueado_por,
            timestamp=self._ahora(),
            ok=True,
            hallazgos=[],
            metricas={
                "total_archivos": total,
                "por_extension": [{"ext": e, "cantidad": n, "bytes": tamanos[e]} for e, n in top],
            },
            supuestos=self.supuestos,
            riesgos=self.riesgos,
            cimientos=self.cimientos,
            no_garantiza=self.no_garantiza,
        )


if __name__ == "__main__":
    main(Relator(), "05-AGENTES/093-relator/ultimo.json")
