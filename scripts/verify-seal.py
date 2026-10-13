#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ VERIFY SEAL · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 Verifica que el sello KINTSUGI está presente en los archivos clave.
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
import sys
import re
from pathlib import Path
from typing import List, Tuple

SEAL = "◯_● · 51/49/100"
CRITICAL_FILES = [
    "README.md",
    "KINTSUGI.md",
    "GOVERNANCE.md",
    "AI-MANIFEST.json",
    "PROMPT-MAESTRO.md",
    "LICENSE-KINTSUGI.md",
    "PRIVACY.md",
    "TERMS.md",
]

def check_file(path: Path) -> Tuple[bool, str]:
    if not path.exists():
        return False, f"[MISS] {path}"
    content = path.read_text(encoding="utf-8", errors="ignore")
    if SEAL in content:
        return True, f"[ OK ] {path}"
    return False, f"[WARN] {path} · sin sello"

def main() -> int:
    strict = "--strict" in sys.argv
    verbose = "--verbose" in sys.argv or "-v" in sys.argv

    print("╔═══════════════════════════════════════════════════════════╗")
    print(f"║  VERIFY SEAL · {SEAL}                       ║")
    print("╚═══════════════════════════════════════════════════════════╝")

    root = Path(".").resolve()
    all_ok = True

    for rel in CRITICAL_FILES:
        ok, msg = check_file(root / rel)
        if verbose or not ok:
            print(msg)
        if not ok and strict:
            all_ok = False

    # Búsqueda general
    total = 0
    con_sello = 0
    for p in root.rglob("*.md"):
        if any(skip in str(p) for skip in [".git", "node_modules", "dist"]):
            continue
        total += 1
        if SEAL in p.read_text(encoding="utf-8", errors="ignore"):
            con_sello += 1

    print(f"\n[ >> ] {con_sello}/{total} archivos .md contienen el sello")
    print(f"[ ✓✓ ] {SEAL}" if all_ok else f"[ XX ] VERIFICACIÓN FALLIDA")

    return 0 if all_ok else 1

if __name__ == "__main__":
    sys.exit(main())