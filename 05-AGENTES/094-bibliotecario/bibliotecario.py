"""094-bibliotecario: detecta duplicados y archivos basura.

Duplicados = mismo nombre en distintas rutas.
Basura = archivos con nombres conocidos como basura del sistema.
"""

from __future__ import annotations

import hashlib
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "_base"))
from agente_base import AgenteBase, Resultado, main

EXCLUIR_DIRS = {".git", "node_modules", "__pycache__", ".venv", ".pytest_cache"}

BASURA_NOMBRES = {".DS_Store", "Thumbs.db", "Pnp", "i", "403"}
BASURA_PREFIJOS = ("._",)


class Bibliotecario(AgenteBase):
    nombre = "094-bibliotecario"
    descripcion = "Detecta duplicados por nombre y archivos basura"

    def correr(self) -> Resultado:
        por_nombre = defaultdict(list)
        basura = []
        duplicados_hash = defaultdict(list)

        for archivo in self.raiz.rglob("*"):
            if not archivo.is_file():
                continue
            if any(part in EXCLUIR_DIRS for part in archivo.parts):
                continue

            if archivo.name in BASURA_NOMBRES or archivo.name.startswith(BASURA_PREFIJOS):
                basura.append(str(archivo.relative_to(self.raiz)))
                continue

            por_nombre[archivo.name].append(str(archivo.relative_to(self.raiz)))

            # Hash solo para archivos pequenos
            if archivo.stat().st_size < 100_000:
                try:
                    h = hashlib.sha256(archivo.read_bytes()).hexdigest()
                    duplicados_hash[h].append(str(archivo.relative_to(self.raiz)))
                except Exception:
                    pass

        duplicados_nombre = {
            nombre: rutas for nombre, rutas in por_nombre.items() if len(rutas) > 1
        }
        duplicados_contenido = {h: rutas for h, rutas in duplicados_hash.items() if len(rutas) > 1}

        hallazgos = []
        if basura:
            hallazgos.append({"tipo": "basura", "cantidad": len(basura), "rutas": basura[:30]})
        if duplicados_nombre:
            hallazgos.append(
                {
                    "tipo": "duplicados-nombre",
                    "cantidad": len(duplicados_nombre),
                    "ejemplos": list(duplicados_nombre.items())[:10],
                }
            )
        if duplicados_contenido:
            hallazgos.append(
                {
                    "tipo": "duplicados-contenido",
                    "cantidad": len(duplicados_contenido),
                    "ejemplos": [rutas for rutas in list(duplicados_contenido.values())[:5]],
                }
            )

        return Resultado(
            agente=self.nombre,
            timestamp=self._ahora(),
            ok=len(basura) == 0,
            hallazgos=hallazgos,
            metricas={
                "basura": len(basura),
                "duplicados_nombre": len(duplicados_nombre),
                "duplicados_contenido": len(duplicados_contenido),
            },
        )


if __name__ == "__main__":
    main(Bibliotecario(), "05-AGENTES/094-bibliotecario/ultimo.json")
