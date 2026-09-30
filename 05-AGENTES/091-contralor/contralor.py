"""091-contralor: valida estructura de actas de la Mesa Directiva.

ESTADO: 🟡 MVP
SUPUESTOS:
  - Las actas están en 06-GOBERNANZA/ACTAS/
  - Las actas son archivos .md
  - Cada acta declara quorum como "quorum: N/M"
  - Cada acta declara firmas como "firma: <128hex>"
RIESGOS:
  - Si el formato de acta cambia, el regex falla silenciosamente
  - No verifica criptografía (requiere cryptography, no disponible)
CIMIENTOS:
  - 06-GOBERNANZA/ACTAS/ debe existir (si no, reporta "sin-mesa")
NO GARANTIZA:
  - Que las firmas sean criptográficamente válidas
  - Que el quórum declarado sea suficiente para el caso de uso
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "_base"))
from agente_base import AgenteBase, Resultado, main  # noqa: E402


RE_QUORUM = re.compile(r"quorum\s*:\s*(\d+)\s*/\s*(\d+)", re.IGNORECASE)
RE_FIRMA = re.compile(r"^firma\s*:\s*([a-f0-9]{128})$", re.MULTILINE)


class Contralor(AgenteBase):
    nombre = "091-contralor"
    descripcion = "Valida estructura de actas de la Mesa Directiva"
    estado = "🟡 MVP"
    supuestos = [
        "Actas en 06-GOBERNANZA/ACTAS/",
        "Cada acta declara 'quorum: N/M'",
        "Cada acta declara firmas como 'firma: <128hex>'",
    ]
    riesgos = [
        "Cambio de formato de acta rompe el regex",
        "No verifica criptografía (requiere cryptography)",
    ]
    cimientos = []
    no_garantiza = [
        "Que las firmas sean válidas criptográficamente",
        "Que el quórum declarado sea suficiente",
    ]

    def correr(self) -> Resultado:
        actas_dir = self.raiz / "06-GOBERNANZA" / "ACTAS"
        hallazgos = []
        actas = []

        if not actas_dir.exists():
            return Resultado(
                agente=self.nombre,
                estado=self.estado,
                timestamp=self._ahora(),
                ok=True,
                hallazgos=[{
                    "tipo": "sin-mesa",
                    "detalle": "06-GOBERNANZA/ACTAS no existe todavía",
                }],
                metricas={"actas": 0},
                supuestos=self.supuestos,
                riesgos=self.riesgos,
                cimientos=self.cimientos,
                no_garantiza=self.no_garantiza,
            )

        for acta in sorted(actas_dir.glob("*.md")):
            try:
                texto = acta.read_text(encoding="utf-8")
            except (UnicodeDecodeError, PermissionError) as e:
                self._log_error(f"no se pudo leer {acta.name}", e)
                continue

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
            estado=self.estado,
            timestamp=self._ahora(),
            ok=len(hallazgos) == 0,
            hallazgos=hallazgos,
            metricas={
                "actas": len(actas),
                "incompletas": len(hallazgos),
                "detalle": actas,
            },
            supuestos=self.supuestos,
            riesgos=self.riesgos,
            cimientos=self.cimientos,
            no_garantiza=self.no_garantiza,
        )


if __name__ == "__main__":
    main(Contralor(), "05-AGENTES/091-contralor/ultimo.json")