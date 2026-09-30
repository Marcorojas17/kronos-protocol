"""090-arquitecto: valida que las carpetas esperadas existan.

ESTADO: 🟡 MVP
SUPUESTOS:
  - El repo tiene raíz accesible
  - Las carpetas esperadas son las de v12 CIMIENTOS
RIESGOS:
  - Si renombrás carpetas, hay que actualizar ESTRUCTURA_ESPERADA
  - No detecta carpetas que existen pero están vacías
CIMIENTOS:
  - (ninguno obligatorio: corre incluso sin carpetas, y las reporta faltantes)
NO GARANTIZA:
  - Que la estructura sea la correcta para tu proyecto
  - Que las carpetas presentes tengan contenido útil
"""
from __future__ import annotations

import sys
from pathlib import Path

# ⚠️ SUPUESTO: _base está en el nivel superior de agentes/
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
            # ⚠️ SUPUESTO: rutas relativas desde self.raiz
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

        # Carpetas en raíz que no están en la lista esperada
        try:
            hijas = [
                p.name for p in self.raiz.iterdir()
                if p.is_dir() and not p.name.startswith(".")
            ]
        except PermissionError:
            self._log_error("no se pudo leer la raíz", PermissionError("lectura"))
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