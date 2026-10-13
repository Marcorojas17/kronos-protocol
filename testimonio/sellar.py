#!/usr/bin/env python3
import sys, secrets, hashlib, json
from datetime import datetime, timezone
from pathlib import Path

NODO = "YHDRYH-92CE"
VERSION = "ARKHE-SELLO-v1"
SELLOS = Path.home() / "arkhe-zero" / "testimonio" / "sellos"
SELLOS.mkdir(parents=True, exist_ok=True)

def digest(contenido, salt, nodo, autor):
    h = hashlib.sha3_256()
    h.update(VERSION.encode() + b"\x00")
    h.update(salt); h.update(b"\x00")
    h.update(nodo.encode()); h.update(b"\x00")
    h.update(autor.encode()); h.update(b"\x00")
    h.update(hashlib.sha3_256(contenido).digest())
    return h.hexdigest()

def sellar(ruta, autor):
    contenido = Path(ruta).read_bytes()
    salt = secrets.token_bytes(32)
    comp = digest(contenido, salt, NODO, autor)
    sello = {
        "sello_id": comp[:16],
        "compromiso": comp,
        "salt_hex": salt.hex(),
        "hash_contenido": hashlib.sha3_256(contenido).hexdigest(),
        "nodo": NODO,
        "autor": autor,
        "version": VERSION,
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
    }
    sid = sello["sello_id"]
    (SELLOS / f"{sid}.json").write_text(json.dumps(sello, indent=2, ensure_ascii=False))
    (SELLOS / f"{sid}.commit").write_text(comp)
    print(f"sello_id   : {sid}")
    print(f"compromiso : {comp}")
    print(f"json       : {SELLOS / f'{sid}.json'}")
    print(f"commit     : {SELLOS / f'{sid}.commit'}")
    return sello

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("uso: sellar.py <archivo> <autor>"); sys.exit(2)
    sellar(sys.argv[1], sys.argv[2])
