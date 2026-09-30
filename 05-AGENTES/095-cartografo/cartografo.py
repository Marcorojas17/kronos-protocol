"""095-cartografo: genera mapa ASCII del repo por niveles.

Util para ver la estructura de un golpe. Escribe MAPA.md.
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "_base"))
from agente_base import AgenteBase, Resultado, main  # noqa: E402


EXCLUIR_DIRS = {".git", "node_modules", "__pycache__", ".venv", ".pytest_cache"}
MAX_PROFUNDIDAD = 3


class Cartografo(AgenteBase):
    nombre = "095-cartografo"
    descripcion = "Genera mapa ASCII del repo"

    def _arbol(self, ruta: Path, prefijo: str = "", nivel: int = 0) -> list[str]:
        if nivel >= MAX_PROFUNDIDAD:
            return []
        lineas = []
        try:
            hijos = sorted(
                [p for p in ruta.iterdir() if not p.name.startswith(".") or p.name == ".github"],
                key=lambda p: (not p.is_dir(), p.name),
            )
        except PermissionError:
            return []

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
        lineas = [f"# Mapa del repo", "", "```", self.raiz.name + "/"]
        lineas.extend(self._arbol(self.raiz))
        lineas.append("```")
        lineas.append("")
        lineas.append(f"_Generado automaticamente. Profundidad maxima: {MAX_PROFUNDIDAD}._")

        texto = "\n".join(lineas)
        salida = self.raiz / "MAPA.md"
        salida.write_text(texto, encoding="utf-8")

        return Resultado(
            agente=self.nombre,
            timestamp=self._ahora(),
            ok=True,
            hallazgos=[],
            metricas={
                "mapa_escrito_en": "MAPA.md",
                "lineas": len(lineas),
            },
        )


if __name__ == "__main__":
    main(Cartografo(), "05-AGENTES/095-cartografo/ultimo.json")