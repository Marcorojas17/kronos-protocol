"""090-arquitecto: valida que las carpetas esperadas existan.

ESTADO: 🟡 MVP
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "_base"))
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
    estado = "🟡 MVP"
    rol_pipeline = "🚪 ENTRADA"
    util_hoy = True
    bloqueado_por = []
    supuestos = [
        "El repo tiene raíz accesible",
        "Las carpetas esperadas son las de v12 CIMIENTOS",
    ]
    riesgos = [
        "Renombrar carpetas sin actualizar ESTRUCTURA_ESPERADA rompe el reporte",
        "Carpetas vacías cuentan como presentes",
    ]
    cimientos = []
    no_garantiza = [
        "Que la estructura esperada sea la correcta para tu caso",
        "Que las carpetas presentes tengan contenido útil",
    ]

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

        try:
            hijas = [
                p.name for p in self.raiz.iterdir()
                if p.is_dir() and not p.name.startswith(".")
            ]
        except PermissionError as e:
            self._log_error("no se pudo leer la raíz", e)
            hijas = []

        huerfanas = [
            h for h in hijas
            if h not in ESTRUCTURA_ESPERADA and h not in {"tests", "src", "__pycache__"}
        ]
        if huerfanas:
            hallazgos.append({
                "tipo": "carpetas-huerfanas",
                "cantidad": len(huerfanas),
                "rutas": huerfanas,
            })

        return Resultado(
            agente=self.nombre,
            estado=self.estado,
            rol_pipeline=self.rol_pipeline,
            util_hoy=self.util_hoy,
            bloqueado_por=self.bloqueado_por,
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
            supuestos=self.supuestos,
            riesgos=self.riesgos,
            cimientos=self.cimientos,
            no_garantiza=self.no_garantiza,
        )


if __name__ == "__main__":
    main(Arquitecto(), "05-AGENTES/090-arquitecto/ultimo.json")