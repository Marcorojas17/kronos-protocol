#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ AUDIT STRUCTURE · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 NODO: YHDRYH-92CE · Auditoría de estructura de directorios
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
from pathlib import Path

SEAL = "◯_● · 51/49/100"
NODO = "YHDRYH-92CE"

EXPECTED_DIRS = [
    "apps", "assets", "agents", "agentes", "05-AGENTES",
    "certificacion", "cimiento", "compliance", "contracts",
    "core", "crypto", "docs", "evidence", "gobernanza",
    "guardians", "identidad", "infra", "jurisdiction",
    "legal", "marco.mcp", "modulos", "movimiento", "orquestacion",
    "payments", "provenance", "projects", "public", "reportes",
    "scripts", "security", "sdk", "src", "tests",
]

BANNER = f"""
╔══════════════════════════════════════════════════════════════════════════╗
║   ▓▒░ AUDIT STRUCTURE · {SEAL}                       ░▒▓
║   NODO: {NODO}                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝
"""

def main() -> int:
    print(BANNER)
    print()

    root = Path(".").resolve()
    found = 0
    missing = []

    for d in EXPECTED_DIRS:
        if (root / d).is_dir():
            found += 1
        else:
            missing.append(d)

    print(f"[ OK ] Directorios esperados: {len(EXPECTED_DIRS)}")
    print(f"[ OK ] Encontrados:           {found}")
    print(f"[ OK ] Faltantes:             {len(missing)}")

    if missing:
        for d in missing:
            print(f"[ XX ] falta: {d}")

    print(f"\n[ ✓✓ ] {SEAL}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())