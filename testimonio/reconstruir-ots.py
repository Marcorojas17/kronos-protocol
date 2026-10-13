#!/usr/bin/env python3
"""Reconstruye un .ots completo desde el response crudo del calendario."""
import sys, hashlib
from pathlib import Path

MAGIC = b"\x00OpenTimestamps\x00\x00Proof\x00\xbf\x89\xe2\xe8\x84\xe8\x92\x94"
VERSION = b"\x01"   # v1
HASH_SHA256 = b"\x08"

def reconstruir(commit_path: Path):
    data = commit_path.read_bytes().strip()
    digest = hashlib.sha256(data).digest()

    ots_path = commit_path.with_suffix(commit_path.suffix + ".ots")
    if not ots_path.exists():
        print(f"  ✗ no existe {ots_path.name}")
        return None

    response = ots_path.read_bytes()

    # Si ya empieza con el magic, está bien formado
    if response.startswith(MAGIC):
        print(f"  ✓ {ots_path.name} ya está bien formado")
        return ots_path

    # Reconstruir
    nuevo = MAGIC + VERSION + HASH_SHA256 + digest + response
    ots_path.write_bytes(nuevo)
    print(f"  ✓ {ots_path.name} reconstruido ({len(nuevo)} bytes)")
    print(f"    digest: {digest.hex()}")
    return ots_path

if __name__ == "__main__":
    sellos = Path.home() / "arkhe-zero" / "testimonio" / "sellos"
    for commit in sorted(sellos.glob("*.commit")):
        reconstruir(commit)
