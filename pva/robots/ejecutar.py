#!/usr/bin/env python3
"""
Ejecutar Robots Autopoieticos - MT01JAAF SHA a4ff808e
"""

import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))

from robots import FOLIO_MAESTRO, FOLIO_PERICIAL, SHA, SELLO
from robots.robot_auditor import auditor_kronos
from robots.robot_kronos import kronos_core
from robots.robot_matriz import matriz_autopoietica


def main():
    print(
        f"╔══════════════════════════════════════╗\n║ ROBOTS MT01JAAF SHA {SHA} ║\n║ {SELLO} ║\n╚══════════════════════════════════════╝"
    )
    print(f"[*] Auditor...")
    auditor_kronos()
    print(f"[*] Kronos Core...")
    kronos_core()
    print(f"[*] Matriz...")
    matriz_autopoietica()
    print(f"[FIN] Robots MT01JAAF 100/10 - {FOLIO_MAESTRO}/{FOLIO_PERICIAL} SHA {SHA}")


if __name__ == "__main__":
    main()
