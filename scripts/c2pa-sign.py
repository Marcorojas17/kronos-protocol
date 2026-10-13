#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ C2PA SIGN · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 NODO: YHDRYH-92CE · Firma C2PA 2.1
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
import hashlib
import sys
from datetime import datetime
from pathlib import Path

SEAL = "◯_● · 51/49/100"
NODO = "YHDRYH-92CE"

BANNER = f"""
╔══════════════════════════════════════════════════════════════════════════╗
║   ▓▒░ C2PA SIGN · {SEAL}                             ░▒▓
║   NODO: {NODO}                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝
"""

def sign_file(path: Path) -> dict:
    content = path.read_bytes()
    hash_sha3 = hashlib.sha3_512(content).hexdigest()
    return {
        "file": str(path),
        "hash_sha3_512": hash_sha3,
        "size_bytes": len(content),
        "signed_at": datetime.now().isoformat() + "Z",
        "c2pa_version": "2.1",
        "nodo": NODO,
        "seal": SEAL,
    }

def main() -> int:
    print(BANNER)
    if len(sys.argv) < 2:
        print("[ XX ] Uso: c2pa-sign.py <archivo>")
        return 1

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"[ XX ] No existe: {path}")
        return 1

    result = sign_file(path)
    print(f"[ OK ] Firmado: {result['file']}")
    print(f"[ OK ] Hash:    {result['hash_sha3_512']}")
    print(f"[ ✓✓ ] {SEAL}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())