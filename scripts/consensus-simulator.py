#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ CONSENSUS SIMULATOR · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 NODO: YHDRYH-92CE · Quórum 4/5 del enjambre ARKHÉ
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
import random

SEAL = "◯_● · 51/49/100"
NODO = "YHDRYH-92CE"
AGENTES = ["cuicatl", "temachtiani", "tlachixqui", "tlamatini", "tlapohualli", "tonal"]
QUORUM = 4
PANEL = 5

BANNER = f"""
╔══════════════════════════════════════════════════════════════════════════╗
║   ▓▒░ CONSENSUS SIMULATOR · {SEAL}                   ░▒▓
║   NODO: {NODO}                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝
"""

def simulate(iterations: int = 1000) -> dict:
    aprobadas = 0
    for _ in range(iterations):
        panel = random.sample(AGENTES, PANEL)
        votos = random.sample(panel, random.randint(0, PANEL))
        if len(votos) >= QUORUM:
            aprobadas += 1
    return {
        "iteraciones": iterations,
        "aprobadas": aprobadas,
        "tasa": f"{100 * aprobadas / iterations:.1f}%",
        "quorum_requerido": f"{QUORUM}/{PANEL}",
    }

def main() -> int:
    print(BANNER)
    print()

    r = simulate(10000)
    print(f"[ >> ] Iteraciones:      {r['iteraciones']}")
    print(f"[ >> ] Quórum:           {r['quorum_requerido']}")
    print(f"[ >> ] Aprobadas:        {r['aprobadas']}")
    print(f"[ >> ] Tasa aprobación:  {r['tasa']}")
    print(f"\n[ ✓✓ ] {SEAL}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())