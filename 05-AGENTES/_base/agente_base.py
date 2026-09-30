"""Clase base para todos los agentes Kintsugi.

ESTADO: 🟡 MVP
Aplica doctrina v12 CIMIENTOS:
  - Juramento 5: no sobrescribir sin listar
  - Juramento 7: error handling visible
  - Juramento 9: checklist de verificación
  - Juramento 11: no construir sobre cimientos no verificados
  - Regla de solidez: sintaxis + sin deps ocultas + errores visibles
    + fallback honesto + verificable

NO garantiza:
  - Que las rutas existan (declarar como ⚠️ SUPUESTO en cada agente)
  - Que los archivos sean legibles (maneja PermissionError)
  - Que el resultado sea el esperado en todos los entornos
"""

from __future__ import annotations

import json
import sys
import traceback
from dataclasses import asdict, dataclass, field
from datetime import UTC, datetime
from pathlib import Path

# Códigos de salida honestos
EXIT_OK = 0
EXIT_FALLA = 1
EXIT_CIMIENTO_FALTANTE = 2


@dataclass
class Resultado:
    agente: str
    estado: str  # 🟡 MVP por defecto, o 🟢 si el agente lo declara
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
    # Subclases DEBEN sobrescribir
    nombre: str = "agente-base"
    descripcion: str = ""
    estado: str = "🟡 MVP"
    supuestos: list[str] = []
    riesgos: list[str] = []
    cimientos: list[str] = []
    no_garantiza: list[str] = []

    def __init__(self, raiz: Path | None = None) -> None:
        # ⚠️ SUPUESTO: cwd es la raíz del repo si no se pasa `raiz`
        self.raiz = raiz or Path.cwd()

    def _ahora(self) -> str:
        return datetime.now(UTC).isoformat()

    def _log_error(self, contexto: str, e: BaseException) -> None:
        """Error handling visible. Juramento 7: errores se ven en consola."""
        print(f"[ERROR {self.nombre}] {contexto}: {e}", file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)

    def verificar_cimientos(self) -> list[str]:
        """Devuelve lista de cimientos faltantes. Vacía = OK.

        Cimientos = archivos o carpetas que DEBEN existir antes de correr.
        Si faltan, el agente NO corre y sale con EXIT_CIMIENTO_FALTANTE.
        """
        faltantes = []
        for cimiento in self.cimientos:
            if not (self.raiz / cimiento).exists():
                faltantes.append(cimiento)
        return faltantes

    def correr(self) -> Resultado:
        raise NotImplementedError

    def ejecutar(self, salida: Path | None = None) -> int:
        # NIVEL 1 de cimientos: ¿la raíz existe?
        if not self.raiz.exists():
            print(f"[CIMIENTO] Raíz no existe: {self.raiz}", file=sys.stderr)
            return EXIT_CIMIENTO_FALTANTE

        # NIVEL 5 de cimientos: ¿los prerrequisitos están?
        faltantes = self.verificar_cimientos()
        if faltantes:
            print(
                f"[CIMIENTO] Faltan {len(faltantes)} prerrequisitos: {faltantes}",
                file=sys.stderr,
            )
            return EXIT_CIMIENTO_FALTANTE

        # Correr el agente
        try:
            resultado = self.correr()
        except NotImplementedError:
            print(f"[{self.nombre}] 'correr()' no implementado", file=sys.stderr)
            return EXIT_FALLA
        except Exception as e:
            self._log_error("excepción no capturada en correr()", e)
            return EXIT_FALLA

        # Escribir salida (si aplica)
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
