"""094-bibliotecario: detecta duplicados y archivos basura.

ESTADO: 🟡 MVP
SUPUESTOS:
  - Archivos < 100 KB son candidatos a hashing (los mayores se excluyen)
  - Nombres basura conocidos: .DS_Store, Thumbs.db, i, Pnp, 403, ._*
RIESGOS:
  - Falsos positivos: "i" puede ser un archivo legítimo
  - Falsos negativos: duplicados > 100 KB no se detectan por hash
CIMIENTOS:
  - (ninguno obligatorio: recorre lo que haya)
NO GARANTIZA:
  - Detectar todos los duplicados (solo < 100 KB)
  - Distinguir basura real de archivos legítimos con nombres raros
"""
from __future__ import annotations

import hashlib
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "_base"))
from agente_base import AgenteBase, Resultado, main  # noqa: E402


EXCLUIR_DIRS = {".git", "node_modules", "__pycache__", ".venv", ".pytest_cache"}

BASURA_NOMBRES = {".DS_Store", "Thumbs.db"}
BASURA_PREFIJOS = ("._",)
# ⚠️ SUPUESTO: "i", "Pnp", "403" aparecen en este repo como basura
# pero pueden ser legítimos en otro. Solo se reportan, no se borran.
BASURA_CONTEXTUAL = {"i", "Pnp", "403"}

MAX_TAMANO_HASH = 100_000


class Bibliotecario(AgenteBase):
    nombre = "094-bibliotecario"
    descripcion = "Detecta duplicados por nombre y archivos basura"
    estado = "🟡 MVP"
    supuestos = [
        "Archivos < 100 KB son candidatos a hashing",
        "Nombres basura: .DS_Store, Thumbs.db, ._*",
        "Nombres sospechosos contextuales: i, Pnp, 403",
    ]
    riesgos = [
        "Falsos positivos: 'i' puede ser legítimo",
        "Falsos negativos: duplicados > 100 KB no se detectan",
    ]
    cimientos = []
    no_garantiza = [
        "Detectar todos los duplicados (solo < 100 KB)",
        "Distinguir basura real de archivos legítimos con nombres raros",
    ]

    def correr(self) -> Resultado:
        por_nombre: dict[str, list[str]] = defaultdict(list)
        basura = []
        sospechosos = []
        duplicados_hash: dict[str, list[str]] = defaultdict(list)

        for archivo in self.raiz.rglob("*"):
            if not archivo.is_file():
                continue
            if any(part in EXCLUIR_DIRS for part in archivo.parts):
                continue

            if archivo.name in BASURA_NOMBRES or archivo.name.startswith(BASURA_PREFIJOS):
                basura.append(str(archivo.relative_to(self.raiz)))
                continue

            if archivo.name in BASURA_CONTEXTUAL:
                sospechosos.append(str(archivo.relative_to(self.raiz)))
                continue

            rel = str(archivo.relative_to(self.raiz))
            por_nombre[archivo.name].append(rel)

            try:
                if archivo.stat().st_size < MAX_TAMANO_HASH:
                    h = hashlib.sha256(archivo.read_bytes()).hexdigest()
                    duplicados_hash[h].append(rel)
            except (OSError, PermissionError) as e:
                self._log_error(f"hash falló en {archivo}", e)

        duplicados_nombre = {
            nombre: rutas for nombre, rutas in por_nombre.items() if len(rutas) > 1
        }
        duplicados_contenido = {
            h: rutas for h, rutas in duplicados_hash.items() if len(rutas) > 1
        }

        hallazgos = []
        if basura:
            hallazgos.append({"tipo": "basura", "cantidad": len(basura), "rutas": basura[:30]})
        if sospechosos:
            hallazgos.append({
                "tipo": "sospechosos-contextuales",
                "cantidad": len(sospechosos),
                "rutas": sospechosos,
                "nota": "revisar manualmente antes de borrar",
            })
        if duplicados_nombre:
            hallazgos.append({
                "tipo": "duplicados-nombre",
                "cantidad": len(duplicados_nombre),
                "ejemplos": list(duplicados_nombre.items())[:10],
            })
        if duplicados_contenido:
            hallazgos.append({
                "tipo": "duplicados-contenido",
                "cantidad": len(duplicados_contenido),
                "ejemplos": [rutas for rutas in list(duplicados_contenido.values())[:5]],
            })

        return Resultado(
            agente=self.nombre,
            estado=self.estado,
            timestamp=self._ahora(),
            ok=len(basura) == 0,
            hallazgos=hallazgos,
            metricas={
                "basura": len(basura),
                "sospechosos": len(sospechosos),
                "duplicados_nombre": len(duplicados_nombre),
                "duplicados_contenido": len(duplicados_contenido),
            },
            supuestos=self.supuestos,
            riesgos=self.riesgos,
            cimientos=self.cimientos,
            no_garantiza=self.no_garantiza,
        )


if __name__ == "__main__":
    main(Bibliotecario(), "05-AGENTES/094-bibliotecario/ultimo.json")