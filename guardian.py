#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ GUARDIAN · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 Guardián activo: monitorea continuamente el sistema.
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
import hashlib
import sys
import time
from pathlib import Path
from datetime import datetime

SEAL = "◯_● · 51/49/100"
WATCH_FILES = [
    "AI-MANIFEST.json",
    "MEMORY.md",
    "package.json",
    "LICENSE-KINTSUGI.md",
]

def sha3_512(text: str) -> str:
    return hashlib.sha3_512(text.encode("utf-8")).hexdigest()

def watch_once(root: Path) -> dict:
    state = {}
    for f in WATCH_FILES:
        p = root / f
        if p.exists():
            state[f] = sha3_512(p.read_text(encoding="utf-8", errors="ignore"))
    return state

def main() -> int:
    root = Path(".").resolve()
    interval = 10

    print("╔═══════════════════════════════════════════════════════════╗")
    print(f"║  GUARDIAN ACTIVO · {SEAL}                        ║")
    print("╚═══════════════════════════════════════════════════════════╝")
    print()

    state = watch_once(root)
    print(f"[ {datetime.now().isoformat()} ] Estado inicial capturado · {len(state)} archivos")
    print()

    try:
        while True:
            time.sleep(interval)
            new_state = watch_once(root)
            for f, h in new_state.items():
                if f not in state or state[f] != h:
                    print(f"[ ALERTA ] {f} CAMBIÓ · {datetime.now().isoformat()}")
                    print(f"           hash: {h}")
                    state[f] = h
    except KeyboardInterrupt:
        print(f"\n[ ✓✓ ] GUARDIAN DETENIDO · {SEAL}")
        return 0

if __name__ == "__main__":
    sys.exit(main())