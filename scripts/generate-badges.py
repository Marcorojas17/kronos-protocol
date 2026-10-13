#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ GENERATE BADGES · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 NODO: YHDRYH-92CE · 7 badges canónicos
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
from pathlib import Path

SEAL = "◯_● · 51/49/100"
NODO = "YHDRYH-92CE"

BANNER = f"""
╔══════════════════════════════════════════════════════════════════════════╗
║   ▓▒░ GENERATE BADGES · {SEAL}                       ░▒▓
║   NODO: {NODO}                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝
"""

BADGES = {
    "status-primigenio.svg":   ("STATUS", "PRIMIGENIO", "#d4af37"),
    "licencia-lgu.svg":        ("LICENSE", "LGU", "#b47aff"),
    "cripto-mlkem.svg":        ("CRYPTO", "FIPS 203/204/205", "#ff3b3b"),
    "coauthor-humano-ia.svg":  ("CO-AUTHOR", "51/49", "#00ff9f"),
    "c2pa-compliant.svg":      ("PROVENANCE", "C2PA 2.1", "#00d4ff"),
    "kintsugi.svg":            ("◯_●", "KINTSUGI", "#d4af37"),
    "enjambre-activo.svg":     ("ENJAMBRE", "12/12", "#00ff9f"),
}

def make_badge(label: str, value: str, color: str) -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 28" width="200" height="28">
  <rect width="90" height="28" fill="#1a1a1a"/>
  <rect x="90" width="110" height="28" fill="{color}"/>
  <text x="45" y="19" text-anchor="middle" fill="#b0b0b0" font-family="monospace" font-size="11">{label}</text>
  <text x="145" y="19" text-anchor="middle" fill="#0a0a0a" font-family="monospace" font-size="11" font-weight="700">{value}</text>
</svg>'''

def main() -> int:
    print(BANNER)
    print()

    out = Path("assets/badges")
    out.mkdir(parents=True, exist_ok=True)

    for name, (label, value, color) in BADGES.items():
        (out / name).write_text(make_badge(label, value, color), encoding="utf-8")
        print(f"[ OK ] {name}")

    print(f"\n[ ✓✓ ] {len(BADGES)} badges generados · {SEAL}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())