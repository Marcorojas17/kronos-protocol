"""091-contralor: valida que las actas de la Mesa esten firmadas.

Revisa 06-GOBERNANZA/ACTAS/*.md buscando bloque de firmas.
No verifica criptografia (eso requiere cryptography). Solo estructura.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "_base"))
from agente_base import AgenteBase, Resultado, main  # noqa: E402


RE_QUORUM = re.compile(r"quorum\s*:\s*(\d+)\s*/\s*(\d+)", re.IGNORECASE)
RE_FIRMA = re.compile(r"^firma\s*:\s*([a-f0-9]{128})$", re.MULTILINE)


class Contralor(AgenteBase):
    nombre = "091-contralor"
    descripcion = "Valida estructura de actas de la Mesa Directiva"

    def correr(self) -> Resultado:
        actas_dir = self.raiz / "06-GOBERNANZA" / "ACTAS"
        hallazgos = []
        actas = []

        if not actas_dir.exists():
            return Resultado(
                agente=self.nombre,
                timestamp=self._ahora(),
                ok=True,
                hallazgos=[{
                    "tipo": "sin-mesa",
                    "detalle": "06-GOBERNANZA/ACTAS no existe todavia",
                }],
                metricas={"actas": 0},
            )

        for acta in sorted(actas_dir.glob("*.md")):
            texto = acta.read_text(encoding="utf-8")
            firmas = RE_FIRMA.findall(texto)
            quorum_match = RE_QUORUM.search(texto)
            quorum = (
                (int(quorum_match.group(1)), int(quorum_match.group(2)))
                if quorum_match else None
            )

            estado = "ok"
            if quorum is None:
                estado = "sin-quorum-declarado"
            elif quorum[0] < quorum[1]:
                estado = "quorum-insuficiente"
            elif not firmas:
                estado = "sin-firmas"

            actas.append({
                "archivo": acta.name,
                "firmas": len(firmas),
                "quorum": quorum,
                "estado": estado,
            })
            if estado != "ok":
                hallazgos.append({"tipo": estado, "acta": acta.name})

        return Resultado(
            agente=self.nombre,
            timestamp=self._ahora(),
            ok=len(hallazgos) == 0,
            hallazgos=hallazgos,
            metricas={
                "actas": len(actas),
                "incompletas": len(hallazgos),
                "detalle": actas,
            },
        )


if __name__ == "__main__":
    main(Contralor(), "05-AGENTES/091-contralor/ultimo.json")