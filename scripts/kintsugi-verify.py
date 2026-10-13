#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ KINTSUGI VERIFY · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 NODO: YHDRYH-92CE · Verifica el sello ◯_● en todos los archivos
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
from pathlib import Path

SEAL = "◯_● · 51/49/100"
NODO = "YHDRYH-92CE"

BANNER = f"""
╔══════════════════════════════════════════════════════════════════════════╗
║   ▓▒░ KINTSUGI VERIFY · {SEAL}                       ░▒▓
║   NODO: {NODO}                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝
"""

def main() -> int:
    print(BANNER)
    print()

    root = Path(".").resolve()
    files_with_seal = 0
    total_files = 0

    for p in root.rglob("*.md"):
        if any(s in str(p) for s in [".git", "node_modules", "dist"]):
            continue
        total_files += 1
        if SEAL in p.read_text(encoding="utf-8", errors="ignore"):
            files_with_seal += 1

    print(f"[ OK ] Archivos .md totales: {total_files}")
    print(f"[ OK ] Con sello:            {files_with_seal}")
    print(f"[ OK ] Cobertura:            {100 * files_with_seal / max(total_files, 1):.1f}%")
    print(f"\n[ ✓✓ ] {SEAL}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())