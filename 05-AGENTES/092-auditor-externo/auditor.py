"""092-auditor-externo: busca patrones peligrosos en el repo.

No valida firmas (eso requiere cryptography).
Busca placeholders, secretos expuestos y basura.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "_base"))
from agente_base import AgenteBase, Resultado, main

PATRONES_PELIGROSOS = [
    ("secretos", re.compile(r"(PRIVATE_KEY|SECRET_KEY|ACCESS_TOKEN)\s*=\s*[A-Za-z0-9+/=]{20,}")),
    ("placeholders", re.compile(r"DEMO-NOT-FOR-PRODUCTION|DemoSigner")),
    ("pendientes", re.compile(r"PENDIENTE_DE_(CALCULAR|FIRMAR)")),
    ("keys-pem", re.compile(r"-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----")),
]

EXCLUIR_DIRS = {".git", "node_modules", "__pycache__", ".venv", ".pytest_cache"}
EXCLUIR_EXTS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".ico",
    ".pdf",
    ".zip",
    ".woff",
    ".woff2",
    ".ttf",
}


class AuditorExterno(AgenteBase):
    nombre = "092-auditor-externo"
    descripcion = "Busca secretos, placeholders y patrones peligrosos"

    def correr(self) -> Resultado:
        hallazgos = []
        archivos_escaneados = 0

        for archivo in self.raiz.rglob("*"):
            if not archivo.is_file():
                continue
            if any(part in EXCLUIR_DIRS for part in archivo.parts):
                continue
            if archivo.suffix.lower() in EXCLUIR_EXTS:
                continue
            if archivo.stat().st_size > 500_000:
                continue

            archivos_escaneados += 1
            try:
                texto = archivo.read_text(encoding="utf-8", errors="ignore")
            except Exception:
                continue

            for nombre, patron in PATRONES_PELIGROSOS:
                for m in patron.finditer(texto):
                    hallazgos.append(
                        {
                            "tipo": nombre,
                            "archivo": str(archivo.relative_to(self.raiz)),
                            "linea": texto[: m.start()].count("\n") + 1,
                        }
                    )

        return Resultado(
            agente=self.nombre,
            timestamp=self._ahora(),
            ok=len(hallazgos) == 0,
            hallazgos=hallazgos[:100],
            metricas={
                "archivos_escaneados": archivos_escaneados,
                "hallazgos": len(hallazgos),
                "truncado": len(hallazgos) > 100,
            },
        )


if __name__ == "__main__":
    main(AuditorExterno(), "05-AGENTES/092-auditor-externo/ultimo.json")
