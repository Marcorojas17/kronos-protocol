"""091-contralor: valida estructura de actas de la Mesa Directiva.

ESTADO: 🔴 MAQUETA (falta Mesa Directiva)
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "_base"))
from agente_base import AgenteBase, Resultado, main

RE_QUORUM = re.compile(r"quorum\s*:\s*(\d+)\s*/\s*(\d+)", re.IGNORECASE)
RE_FIRMA = re.compile(r"^firma\s*:\s*([a-f0-9]{128})$", re.MULTILINE)


class Contralor(AgenteBase):
    nombre = "091-contralor"
    descripcion = "Valida estructura de actas de la Mesa Directiva"
    estado = "🔴 MAQUETA"
    rol_pipeline = "🚪 ENTRADA"
    util_hoy = False
    bloqueado_por = [
        "Mesa Directiva no existe todavía",
        "Primera Acta sin firmar en 06-GOBERNANZA/ACTAS/",
    ]
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

        if not actas_dir.exists():
            return self._resultado_maqueta("06-GOBERNANZA/ACTAS no existe todavía")

        hallazgos = []
        actas = []

        for acta in sorted(actas_dir.glob("*.md")):
            try:
                texto = acta.read_text(encoding="utf-8")
            except (UnicodeDecodeError, PermissionError) as e:
                self._log_error(f"no se pudo leer {acta.name}", e)
                continue

            firmas = RE_FIRMA.findall(texto)
            quorum_match = RE_QUORUM.search(texto)
            quorum = (
                (int(quorum_match.group(1)), int(quorum_match.group(2))) if quorum_match else None
            )

            estado_acta = "ok"
            if quorum is None:
                estado_acta = "sin-quorum-declarado"
            elif quorum[0] < quorum[1]:
                estado_acta = "quorum-insuficiente"
            elif not firmas:
                estado_acta = "sin-firmas"

            actas.append(
                {
                    "archivo": acta.name,
                    "firmas": len(firmas),
                    "quorum": quorum,
                    "estado": estado_acta,
                }
            )
            if estado_acta != "ok":
                hallazgos.append({"tipo": estado_acta, "acta": acta.name})

        return Resultado(
            agente=self.nombre,
            estado=self.estado,
            rol_pipeline=self.rol_pipeline,
            util_hoy=self.util_hoy,
            bloqueado_por=self.bloqueado_por,
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
