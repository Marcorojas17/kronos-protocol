"""095-cartografo: genera mapa ASCII del repo por niveles.

ESTADO: 🟡 MVP
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "_base"))
from agente_base import AgenteBase, Resultado, main

EXCLUIR_DIRS = {".git", "node_modules", "__pycache__", ".venv", ".pytest_cache"}
MAX_PROFUNDIDAD = 3


class Cartografo(AgenteBase):
    nombre = "095-cartografo"
    descripcion = "Genera mapa ASCII del repo"
    estado = "🟡 MVP"
    rol_pipeline = "📤 SALIDA"
    util_hoy = True
    bloqueado_por = []
    supuestos = [
        "El repo tiene raíz accesible",
        "Profundidad 3 es suficiente",
    ]
    riesgos = [
        "Repos anchos generan MAPA.md grandes",
        "Nombres raros pueden verse mal",
    ]
    cimientos = []
    no_garantiza = [
        "Que el mapa se vea bien en todos los terminales",
        "Que profundidad 3 capture toda la estructura relevante",
    ]

    def _arbol(self, ruta: Path, prefijo: str = "", nivel: int = 0) -> list[str]:
        if nivel >= MAX_PROFUNDIDAD:
            return []
        lineas = []
        try:
            hijos = sorted(
                [p for p in ruta.iterdir() if not p.name.startswith(".") or p.name == ".github"],
                key=lambda p: (not p.is_dir(), p.name),
            )
        except PermissionError as e:
            self._log_error(f"sin permiso en {ruta}", e)
            return [f"{prefijo}└── [sin permiso]"]

        hijos = [h for h in hijos if h.name not in EXCLUIR_DIRS]

        for i, hijo in enumerate(hijos):
            ultimo = i == len(hijos) - 1
            conector = "└── " if ultimo else "├── "
            lineas.append(f"{prefijo}{conector}{hijo.name}{'/' if hijo.is_dir() else ''}")
            if hijo.is_dir():
                nuevo_prefijo = prefijo + ("    " if ultimo else "│   ")
                lineas.extend(self._arbol(hijo, nuevo_prefijo, nivel + 1))
        return lineas

    def correr(self) -> Resultado:
        lineas = ["# Mapa del repo", "", "```", self.raiz.name + "/"]
        lineas.extend(self._arbol(self.raiz))
        lineas.append("```")
        lineas.append("")
        lineas.append(f"_Generado automáticamente. Profundidad máxima: {MAX_PROFUNDIDAD}._")

        texto = "\n".join(lineas)
        salida = self.raiz / "MAPA.md"
        try:
            salida.write_text(texto, encoding="utf-8")
            escrito = True
            error_msg = None
        except (PermissionError, OSError) as e:
            self._log_error(f"no se pudo escribir {salida}", e)
            escrito = False
            error_msg = str(e)

        return Resultado(
            agente=self.nombre,
            estado=self.estado,
            rol_pipeline=self.rol_pipeline,
            util_hoy=self.util_hoy,
            bloqueado_por=self.bloqueado_por,
            timestamp=self._ahora(),
            ok=escrito,
            hallazgos=[] if escrito else [{"tipo": "error-escritura", "detalle": error_msg}],
            metricas={
                "mapa_escrito_en": str(salida) if escrito else None,
                "lineas": len(lineas),
            },
            supuestos=self.supuestos,
            riesgos=self.riesgos,
            cimientos=self.cimientos,
            no_garantiza=self.no_garantiza,
        )


if __name__ == "__main__":
    main(Cartografo(), "05-AGENTES/095-cartografo/ultimo.json")
