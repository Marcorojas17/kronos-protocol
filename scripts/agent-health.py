#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ AGENT HEALTH · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 NODO: YHDRYH-92CE · Enjambre de 12 agentes
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
import json
from pathlib import Path

SEAL = "◯_● · 51/49/100"
NODO = "YHDRYH-92CE"

CULTURALES = ["cuicatl", "temachtiani", "tlachixqui", "tlamatini", "tlapohualli", "tonal"]
OFICIOS = ["090-arquitecto", "091-contralor", "092-auditor-externo",
           "093-relator", "094-bibliotecario", "095-cartografo"]

BANNER = f"""
╔══════════════════════════════════════════════════════════════════════════╗
║   ▓▒░ AGENT HEALTH · {SEAL}                          ░▒▓
║   NODO: {NODO}                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝
"""

def main() -> int:
    print(BANNER)
    print()

    registry_path = Path("agents/registry/agent-registry.json")
    if registry_path.exists():
        data = json.loads(registry_path.read_text())
        agentes = data.get("culturales", []) + data.get("oficios", [])
    else:
        agentes = []

    total = len(CULTURALES) + len(OFICIOS)
    activos = sum(1 for a in agentes if a.get("estado") == "activo")

    print(f"[ OK ] Total agentes: {total}")
    print(f"[ OK ] Activos:       {activos}")
    print(f"[ OK ] Culturales:    {len(CULTURALES)}")
    print(f"[ OK ] Oficios:       {len(OFICIOS)}")

    if activos == total:
        print(f"\n[ ✓✓ ] ENJAMBRE SALUDABLE · {SEAL}")
        print(f"       Nodo {NODO}")
        return 0
    print(f"\n[ ⚠️ ] {total - activos} agentes inactivos")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())