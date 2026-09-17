#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# ═══════════════════════════════════════════════════════════════════════
# KRONOS PROTOCOL · MD-33 · verifica_estandar.py · v1.0 · 17 Sep 2026
# ═══════════════════════════════════════════════════════════════════════
#
# Calcula SHA-256 de un documento y genera entrada de manifest.
# Cero dependencias. Solo stdlib. Verificable offline en 2099.
#
# Custodio      Marco Antonio Rojas Valdovinos
# Acta          2607086319439
# SC User       2607085517331
# SC Obra       2608056639878
# TX soberana   0xd94bf2d1c1187bddf22fe8d376f7663f63a8b01b5e85367b052db43d1ed6a466
#
# No es asesoría legal. Verificación técnica documental.
# Fuente: DOF / Safe Creative.
# ═══════════════════════════════════════════════════════════════════════

import argparse
import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

ACTA = "2607086319439"
SC_USER = "2607085517331"
SC_OBRA = "2608056639878"
TX_SOBERANA = "0xd94bf2d1c1187bddf22fe8d376f7663f63a8b01b5e85367b052db43d1ed6a466"
HASH_MADRE = "ee0369032ee7829925233553054808142155a0707dbd4579b45f7af528763738"

GOLD = "\033[33m"
GREEN = "\033[32m"
RED = "\033[31m"
DIM = "\033[2m"
RESET = "\033[0m"


def sha256_file(path: Path, chunk_size: int = 65536) -> str:
    """SHA-256 en streaming. Soporta archivos de cualquier tamaño."""
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(chunk_size), b""):
            h.update(chunk)
    return h.hexdigest()


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def build_entry(path: Path, digest: str, size: int) -> dict:
    """Entrada lista para pegar en evidence/manifest.json."""
    return {
        "path": str(path).replace("\\", "/"),
        "sha256": digest,
        "bytes": size,
        "method": "Python hashlib — SHA-256 — streaming",
        "audited_by": "GUARDIAN-SHA",
        "audit_status": "APROBADO",
        "audited_utc": utc_now(),
        "tsa": {
            "status": "PENDIENTE",
            "tsr_path": f"evidence/{path.name}.tsr",
            "tsa_url": "https://freetsa.org/tsr",
            "tsa_ca": "evidence/tsa.crt",
            "assigned_to": "GUARDIAN-TSA"
        }
    }


def print_header():
    print(f"{GOLD}╔══════════════════════════════════════════════════════════════════════╗{RESET}")
    print(f"{GOLD}║ MD-33 · VERIFICA ESTANDAR · SHA-256 · acta 2607086319439            ║{RESET}")
    print(f"{GOLD}╚══════════════════════════════════════════════════════════════════════╝{RESET}")
    print()


def cmd_hash(args):
    path = Path(args.file)
    if not path.exists():
        print(f"{RED}✗ NO EXISTE: {path}{RESET}")
        return 2
    if not path.is_file():
        print(f"{RED}✗ NO ES ARCHIVO: {path}{RESET}")
        return 2

    digest = sha256_file(path)
    size = path.stat().st_size

    print(f"{DIM}Archivo:{RESET}  {path}")
    print(f"{DIM}Bytes:{RESET}    {size}")
    print(f"{DIM}Método:{RESET}   Python hashlib · SHA-256 · streaming")
    print(f"{DIM}UTC:{RESET}      {utc_now()}")
    print()
    print(f"{GOLD}SHA-256:{RESET}")
    print(f"  {digest}")
    print()

    # Comparación opcional
    if args.expected:
        expected = args.expected.strip().lower().replace("0x", "")
        if digest == expected:
            print(f"{GREEN}✓ COINCIDE — archivo íntegro{RESET}")
            status = 0
        else:
            print(f"{RED}✗ NO COINCIDE — hash alterado o esperado incorrecto{RESET}")
            print(f"{DIM}  Esperado: {expected}{RESET}")
            print(f"{DIM}  Calculado: {digest}{RESET}")
            status = 1
    else:
        status = 0

    # Guardar JSON si se pide
    if args.json:
        entry = build_entry(path, digest, size)
        out = Path(args.json)
        out.parent.mkdir(parents=True, exist_ok=True)
        with out.open("w", encoding="utf-8") as f:
            json.dump(entry, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"\n{DIM}Entrada guardada:{RESET} {out}")
        print(f"{DIM}Pégala en evidence/manifest.json dentro de artifacts[] {RESET}")

    print()
    print(f"{DIM}Acta:          {ACTA}{RESET}")
    print(f"{DIM}SC User:       {SC_USER}{RESET}")
    print(f"{DIM}SC Obra:       {SC_OBRA}{RESET}")
    print(f"{DIM}Hash madre:    {HASH_MADRE[:16]}…{RESET}")
    print(f"{DIM}TX soberana:   {TX_SOBERANA[:16]}…{RESET}")
    print()
    print(f"{DIM}No es asesoría legal. Verificación técnica documental.{RESET}")
    print(f"{DIM}Fuente: DOF / Safe Creative.{RESET}")
    return status


def cmd_manifest(args):
    """Verifica un archivo contra el manifest existente."""
    manifest_path = Path(args.manifest)
    if not manifest_path.exists():
        print(f"{RED}✗ Manifest no existe: {manifest_path}{RESET}")
        return 2

    with manifest_path.open("r", encoding="utf-8") as f:
        manifest = json.load(f)

    target = Path(args.file) if args.file else None
    if not target:
        print(f"{RED}✗ Falta archivo a verificar{RESET}")
        return 2

    # Buscar entrada en manifest
    entry = None
    for art in manifest.get("artifacts", []):
        if Path(art["path"]).name == target.name:
            entry = art
            break

    if not entry:
        print(f"{RED}✗ {target.name} no está declarado en el manifest{RESET}")
        return 1

    digest = sha256_file(target)
    if digest == entry["sha256"]:
        print(f"{GREEN}✓ APROBADO — coincide con manifest{RESET}")
        print(f"  {digest}")
        return 0
    else:
        print(f"{RED}✗ RECHAZADO — hash no coincide{RESET}")
        print(f"{DIM}  Manifest:  {entry['sha256']}{RESET}")
        print(f"{DIM}  Calculado: {digest}{RESET}")
        return 1


def main():
    parser = argparse.ArgumentParser(
        prog="verifica_estandar",
        description="MD-33 · SHA-256 · trazabilidad documental verificable"
    )
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_hash = sub.add_parser("hash", help="Calcular SHA-256 de un archivo")
    p_hash.add_argument("file", help="Ruta del archivo")
    p_hash.add_argument("--expected", help="SHA-256 esperado (opcional)")
    p_hash.add_argument("--json", help="Ruta para guardar entrada de manifest")
    p_hash.set_defaults(func=cmd_hash)

    p_man = sub.add_parser("manifest", help="Verificar contra manifest existente")
    p_man.add_argument("manifest", help="Ruta del manifest.json")
    p_man.add_argument("--file", help="Archivo a verificar")
    p_man.set_defaults(func=cmd_manifest)

    args = parser.parse_args()
    print_header()
    sys.exit(args.func(args))


if __name__ == "__main__":
    main()