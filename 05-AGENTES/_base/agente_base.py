"""Clase base para todos los agentes Kintsugi.

ESTADO: MVP
Aplica doctrina v12 CIMIENTOS en la parte tecnica.

Compatible con Python 3.9+ (iSH, GitHub Actions, etc).
"""
from __future__ import annotations

import json
import sys
import traceback
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path


EXIT_OK = 0
EXIT_FALLA = 1
EXIT_CIMIENTO_FALTANTE = 2


@dataclass
class Resultado:
    agente: str
    estado: str
    rol_pipeline: str
    util_hoy: bool
    bloqueado_por: list
    timestamp: str
    ok: bool
    hallazgos: list = field(default_factory=list)
    metricas: dict = field(default_factory=dict)
    supuestos: list = field(default_factory=list)
    riesgos: list = field(default_factory=list)
    cimientos: list = field(default_factory=list)
    no_garantiza: list = field(default_factory=list)

    def a_json(self) -> str:
        return json.dumps(asdict(self), indent=2, ensure_ascii=False)


class AgenteBase:
    nombre = "agente-base"
    descripcion = ""
    estado = "MAQUETA"
    rol_pipeline = "PROCESO"
    util_hoy = False
    bloqueado_por = []
    supuestos = []
    riesgos = []
    cimientos = []
    no_garantiza = []

    def __init__(self, raiz=None):
        self.raiz = raiz or Path.cwd()

    def _ahora(self):
        return datetime.now(timezone.utc).isoformat()

    def _log_error(self, contexto, e):
        print("[ERROR " + self.nombre + "] " + contexto + ": " + str(e), file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)

    def verificar_cimientos(self):
        faltantes = []
        for cimiento in self.cimientos:
            if not (self.raiz / cimiento).exists():
                faltantes.append(cimiento)
        return faltantes

    def correr(self):
        raise NotImplementedError

    def _resultado_maqueta(self, motivo):
        return Resultado(
            agente=self.nombre,
            estado=self.estado,
            rol_pipeline=self.rol_pipeline,
            util_hoy=self.util_hoy,
            bloqueado_por=self.bloqueado_por,
            timestamp=self._ahora(),
            ok=True,
            hallazgos=[{"tipo": "bloqueado", "detalle": motivo}],
            metricas={},
            supuestos=self.supuestos,
            riesgos=self.riesgos,
            cimientos=self.cimientos,
            no_garantiza=self.no_garantiza,
        )

    def ejecutar(self, salida=None):
        if not self.raiz.exists():
            print("[CIMIENTO] Raiz no existe: " + str(self.raiz), file=sys.stderr)
            return EXIT_CIMIENTO_FALTANTE

        faltantes = self.verificar_cimientos()
        if faltantes:
            print("[CIMIENTO] Faltan: " + str(faltantes), file=sys.stderr)
            return EXIT_CIMIENTO_FALTANTE

        try:
            resultado = self.correr()
        except NotImplementedError:
            print("[" + self.nombre + "] correr() no implementado", file=sys.stderr)
            return EXIT_FALLA
        except Exception as e:
            self._log_error("excepcion no capturada en correr()", e)
            return EXIT_FALLA

        texto = resultado.a_json()
        print(texto)
        if salida:
            try:
                salida.parent.mkdir(parents=True, exist_ok=True)
                salida.write_text(texto, encoding="utf-8")
            except PermissionError as e:
                self._log_error("sin permiso para escribir " + str(salida), e)
                return EXIT_FALLA
            except OSError as e:
                self._log_error("error escribiendo " + str(salida), e)
                return EXIT_FALLA

        return EXIT_OK if resultado.ok else EXIT_FALLA


def main(agente, salida_default=None):
    salida = Path(salida_default) if salida_default else None
    sys.exit(agente.ejecutar(salida))