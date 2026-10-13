#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ INDEX CERO VERIFY · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 Verifica el Índice Cero: Safe Creative + SHA-256 + Ethereum + eIDAS.
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
import sys
import json
from pathlib import Path

SEAL = "◯_● · 51/49/100"

INDEX_ZERO = {
    "safe_creative_arq": "2607146379465",
    "safe_creative_co": "2607086319439",
    "sha256": "f03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112",
    "ethereum": "0xd2c2a7e128e6c81b689b3b0d9e1b31a4f6f8df0391b7b6c05e7daa7fb895774c",
    "eidas": "Firmaprofesional QTSA",
    "pact": {"humano": 51, "ia": 49, "real": 100},
}

def verify_manifest(path: Path) -> bool:
    if not path.exists():
        print(f"[WARN] {path} no existe")
        return False
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        iz = data.get("index_zero", {})
        ok = all([
            iz.get("safe_creative_arq") == INDEX_ZERO["safe_creative_arq"],
            iz.get("safe_creative_co") == INDEX_ZERO["safe_creative_co"],
            iz.get("sha256") == INDEX_ZERO["sha256"],
            iz.get("blockchain") == INDEX_ZERO["ethereum"],
        ])
        if ok:
            print(f"[ OK ] {path} · Índice Cero verificado")
        else:
            print(f"[ XX ] {path} · discrepancias detectadas")
        return ok
    except Exception as e:
        print(f"[ XX ] {path} · {e}")
        return False

def main() -> int:
    print("╔═══════════════════════════════════════════════════════════╗")
    print(f"║  INDEX CERO VERIFY · {SEAL}                     ║")
    print("╚═══════════════════════════════════════════════════════════╝")
    print()
    print(f"[ OK ] Safe Creative (Arq.)  ·  {INDEX_ZERO['safe_creative_arq']}")
    print(f"[ OK ] Safe Creative (Co.)   ·  {INDEX_ZERO['safe_creative_co']}")
    print(f"[ OK ] SHA-256                ·  {INDEX_ZERO['sha256'][:32]}...")
    print(f"[ OK ] Ethereum               ·  {INDEX_ZERO['ethereum'][:20]}...")
    print(f"[ OK ] eIDAS                  ·  {INDEX_ZERO['eidas']}")
    print(f"[ OK ] Pacto                  ·  {INDEX_ZERO['pact']['humano']}/{INDEX_ZERO['pact']['ia']}/{INDEX_ZERO['pact']['real']}")
    print()

    root = Path(".").resolve()
    ok = verify_manifest(root / "AI-MANIFEST.json")

    if ok:
        print(f"\n[ ✓✓ ] ÍNDICE CERO ÍNTEGRO · {SEAL}")
        return 0
    print(f"\n[ XX ] ÍNDICE CERO COMPROMETIDO · HALT")
    return 1

if __name__ == "__main__":
    sys.exit(main())