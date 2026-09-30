"""Clase base para todos los agentes Kintsugi.

ESTADO: 🟡 MVP
Aplica doctrina v12 CIMIENTOS en la parte técnica.

Clasificación de estado (no todos son MVP):
  🔴 MAQUETA    - corre pero no aporta valor todavía
  🟠 PROTOTIPO  - funciona parcialmente
  🟡 MVP        - funciona end-to-end en 1 caso
  🟢 PRODUCTO   - probado, documentado
  ✅ PRODUCCIÓN - verificado en múltiples entornos

Rol en el pipeline:
  🚪 ENTRADA  - detecta estado actual
  ⚙️  PROCESO  - transforma o analiza
  📤 SALIDA   - genera artefacto
  🔔 ALERTA   - notifica si algo está mal

Honestidad obligatoria:
  - Si un agente está bloqueado, lo declara con `bloqueado_por`.
  - Si un agente no aporta hoy, lo declara con `util_hoy = False`.
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
    nombre: str = "agente-base"
    descripcion: str = ""
    estado: str = "🔴 MAQUETA"
    rol_pipeline: str = "⚙️ PROCESO"
    util_hoy: bool = False
    bloqueado_por: list[str] = []
    supuestos: list[str] = []
    riesgos: list[str] = []
    cimientos: list[str] = []
    no_garantiza: list[str] = []

    def __init__(self, raiz: Path | None = None) -> None:
        self.raiz = raiz or Path.cwd()

    def _ahora(self) -> str:
        return datetime.now(timezone.utc).isoformat()

    def _log_error(self, contexto: str, e: BaseException) -> None:
        print(f"[ERROR {self.nombre}] {contexto}: {e}", file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)

    def verificar_cimientos(self) -> list[str]:
        faltantes = []
        for cimiento in self.cimientos:
            if not (self.raiz / cimiento).exists():
                faltantes.append(cimiento)
        return faltantes

    def correr(self) -> Resultado:
        raise NotImplementedError

    def _resultado_maqueta(self, motivo: str) -> Resultado:
        """Helper para agentes bloqueados: devuelven resultado honesto."""
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

    def ejecutar(self, salida: Path | None = None) -> int:
        if not self.raiz.exists():
            print(f"[CIMIENTO] Raíz no existe: {self.raiz}", file=sys.stderr)
            return EXIT_CIMIENTO_FALTANTE

        faltantes = self.verificar_cimientos()
        if faltantes:
            print(
                f"[CIMIENTO] Faltan {len(faltantes)} prerrequisitos: {faltantes}",
                file=sys.stderr,
            )
            return EXIT_CIMIENTO_FALTANTE

        try:
            resultado = self.correr()
        except NotImplementedError:
            print(f"[{self.nombre}] 'correr()' no implementado", file=sys.stderr)
            return EXIT_FALLA
        except Exception as e:
            self._log_error("excepción no capturada en correr()", e)
            return EXIT_FALLA

        texto = resultado.a_json()
        print(texto)
        if salida:
            try:
                salida.parent.mkdir(parents=True, exist_ok=True)
                salida.write_text(texto, encoding="utf-8")
            except PermissionError as e:
                self._log_error(f"sin permiso para escribir {salida}", e)
                return EXIT_FALLA
            except OSError as e:
                self._log_error(f"error escribiendo {salida}", e)
                return EXIT_FALLA

        return EXIT_OK if resultado.ok else EXIT_FALLA


def main(agente: AgenteBase, salida_default: str | None = None) -> None:
    salida = Path(salida_default) if salida_default else None
    sys.exit(agente.ejecutar(salida))