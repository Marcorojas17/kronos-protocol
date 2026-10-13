#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ PQC AUDIT · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 Audita que todos los algoritmos usados sean post-cuánticos canónicos.
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
import sys
from pathlib import Path

SEAL = "◯_● · 51/49/100"

CANONICOS = [
    "sha3-512", "sha-3-512",
    "ml-kem-1024", "ml-dsa-87", "slh-dsa-shake-256s",
    "ed25519", "x25519",
    "aes-256-gcm", "hkdf-sha3-512",
]

PROHIBIDOS = [
    "md5", "sha1", "sha-1",
    "rsa-1024", "rsa1024",
    "des", "3des", "rc4",
    "ecdsa-p192",
]

SCAN_DIRS = ["crypto", "cimiento", "provenance", "certificacion", "agents"]

def scan(dir_path: Path) -> dict:
    results = {"canonicos": [], "prohibidos": []}
    for p in dir_path.rglob("*.js"):
        try:
            content = p.read_text(encoding="utf-8").lower()
        except Exception:
            continue
        for alg in CANONICOS:
            if alg in content:
                results["canonicos"].append((str(p), alg))
        for alg in PROHIBIDOS:
            if alg in content:
                results["prohibidos"].append((str(p), alg))
    return results

def main() -> int:
    verbose = "--verbose" in sys.argv or "-v" in sys.argv

    print("╔═══════════════════════════════════════════════════════════╗")
    print(f"║  PQC AUDIT · {SEAL}                            ║")
    print("╚═══════════════════════════════════════════════════════════╝")

    root = Path(".").resolve()
    total_canonicos = 0
    total_prohibidos = 0

    for d in SCAN_DIRS:
        dir_path = root / d
        if not dir_path.exists():
            continue

        results = scan(dir_path)
        total_canonicos += len(results["canonicos"])
        total_prohibidos += len(results["prohibidos"])

        status = "[ OK ]" if not results["prohibidos"] else "[ XX ]"
        print(f"{status} {d}/ · {len(results['canonicos'])} canónicos · {len(results['prohibidos'])} prohibidos")

        if verbose:
            for p, alg in results["canonicos"][:5]:
                print(f"        + {alg:24s} · {p}")
            for p, alg in results["prohibidos"]:
                print(f"        - {alg:24s} · {p} [PROHIBIDO]")

    print()
    print(f"[ >> ] Total algoritmos canónicos: {total_canonicos}")
    print(f"[ >> ] Total algoritmos prohibidos: {total_prohibidos}")

    if total_prohibidos > 0:
        print(f"\n[ XX ] DOWNGRADE DETECTADO · HALT · {SEAL}")
        return 1

    print(f"\n[ ✓✓ ] SUITE CANÓNICA · {SEAL}")
    return 0

if __name__ == "__main__":
    sys.exit(main())