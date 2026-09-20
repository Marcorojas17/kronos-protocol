# -*- coding: utf-8 -*-
"""
Verificador independiente de pruebas de Merkle KRONOS.
No depende de genesis_miner.py. Solo de Python stdlib.
"""
import json
import hashlib
import sys


def sha256_pair(h1, h2):
    return hashlib.sha256(bytes.fromhex(h1) + bytes.fromhex(h2)).hexdigest()


def verificar(prueba):
    actual = prueba["hoja_hash"]
    for paso in prueba["camino"]:
        if paso["posicion"] == "derecha":
            actual = sha256_pair(actual, paso["hash"])
        else:
            actual = sha256_pair(paso["hash"], actual)
    return actual == prueba["root_esperada"]


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python verificar_merkle.py <archivo.json>")
        sys.exit(1)

    with open(sys.argv[1], "r", encoding="utf-8") as f:
        data = json.load(f)

    prueba = data["prueba_inclusion"]
    ok = verificar(prueba)

    print(f"Archivo    : {sys.argv[1]}")
    print(f"Protocolo  : {data['protocolo']} {data['version']}")
    print(f"Bloque     : #{prueba['bloque']}")
    print(f"Raíz       : {prueba['root_esperada']}")
    print(f"Resultado  : {'✓ VÁLIDO' if ok else '✗ INVÁLIDO'}")
    sys.exit(0 if ok else 2)
