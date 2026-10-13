#!/usr/bin/env python3
import sys, re
from pathlib import Path

MAGIC = b"\x00OpenTimestamps\x00\x00Proof\x00\xbf\x89\xe2\xe8\x84\xe8\x92\x94"

def leer(path):
    data = Path(path).read_bytes()
    print(f"\n═══ {Path(path).name} ═══")
    print(f"  tamaño: {len(data)} bytes")

    if not data.startswith(MAGIC):
        print("  ✗ header inválido")
        return

    pos = len(MAGIC)
    version = data[pos]; pos += 1
    hash_algo = data[pos]; pos += 1
    algos = {0x01: "SHA-1", 0x08: "SHA-256", 0x0f: "SHA-512"}
    hlen = {0x01: 20, 0x08: 32, 0x0f: 64}[hash_algo]
    digest = data[pos:pos+hlen]; pos += hlen

    print(f"  versión:    {version}")
    print(f"  algoritmo:  {algos.get(hash_algo, '?')}")
    print(f"  digest:     {digest.hex()}")

    urls = re.findall(rb"https?://[a-zA-Z0-9./_-]+", data)
    if urls:
        print(f"  calendarios:")
        for u in sorted(set(urls)):
            print(f"    · {u.decode('utf-8', errors='ignore')}")

    print(f"  estado:     pending · esperando commit Bitcoin")

if __name__ == "__main__":
    sellos = Path.home() / "arkhe-zero" / "testimonio" / "sellos"
    for f in sorted(sellos.glob("*.ots")):
        leer(f)
