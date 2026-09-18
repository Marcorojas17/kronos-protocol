#!/usr/bin/env python3
"""
KRONOS VERIFIER
───────────────
Verificador público de la cadena Kronos.

Cualquiera puede correrlo y confirmar que el log no fue alterado.
No requiere permisos, ni claves, ni conexión a internet.

Uso:
    python verifier.py
    python verifier.py --json     (salida para máquinas)
"""

import hashlib
import json
import sys
from pathlib import Path

LOG_PATH = Path(__file__).parent / "logs" / "log.json"


def hash_sha256(texto):
    return hashlib.sha256(texto.encode("utf-8")).hexdigest()


def verificar_cadena(log):
    """Devuelve dict con el resultado de la verificación."""
    resultado = {
        "total": len(log),
        "integra": True,
        "rota_en": None,
        "razon": None,
        "principios_defendidos": set(),
    }

    hash_previo_esperado = None

    for i, e in enumerate(log):
        if e["hash_previo"] != hash_previo_esperado:
            resultado["integra"] = False
            resultado["rota_en"] = e["n"]
            resultado["razon"] = "hash_previo no coincide"
            break

        contenido = "|".join([
            str(e["n"]),
            e["cuando"],
            e["accion"],
            str(e["principio"]),
            e["entrada"],
            e["proposito"],
            e["autor"],
            e["anio"],
            e["hash_previo"] or "GENESIS",
        ])

        if hash_sha256(contenido) != e["hash"]:
            resultado["integra"] = False
            resultado["rota_en"] = e["n"]
            resultado["razon"] = "hash no coincide"
            break

        resultado["principios_defendidos"].add(e["principio"])
        hash_previo_esperado = e["hash"]

    resultado["principios_defendidos"] = sorted(resultado["principios_defendidos"])
    return resultado


def main():
    salida_json = "--json" in sys.argv

    if not LOG_PATH.exists():
        print("No existe log para verificar.")
        sys.exit(1)

    log = json.loads(LOG_PATH.read_text(encoding="utf-8"))
    r = verificar_cadena(log)

    if salida_json:
        print(json.dumps(r, indent=2, ensure_ascii=False))
        return

    print("KRONOS VERIFIER")
    print("─" * 60)
    print(f"Entradas:              {r['total']}")
    print(f"Cadena íntegra:        {'SÍ' if r['integra'] else 'NO'}")
    print(f"Principios defendidos: {r['principios_defendidos']}")
    if not r["integra"]:
        print(f"Rota en:               #{r['rota_en']}")
        print(f"Razón:                 {r['razon']}")
    print("─" * 60)


if __name__ == "__main__":
    main()