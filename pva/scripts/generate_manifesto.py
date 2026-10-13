#!/usr/bin/env python3
<<<<<<< HEAD
"""
PVA Manifesto Generator - KRONOS 360
Folio: 5204160405358537
Perito: kronosproyecto@hotmail.com
Genesis: 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
Genera: audit/primer_manifiesto.txt + audit/sello_kronos.json
Polaridad: 51% HUMANO / 49% IA - innegociable
"""

import hashlib
import json
from pathlib import Path
from datetime import datetime

FOLIO = "5204160405358537"
PERITO = "kronosproyecto@hotmail.com"
GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
SELLO = f"KRONOS-TRACE-PVA-{FOLIO}"
TX = "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"
SAFE = "2607146379465"

ROOT = Path(__file__).parent.parent
AUDIT_DIR = ROOT / "audit"
MANIFIESTO_PATH = AUDIT_DIR / "primer_manifiesto.txt"
SELLO_PATH = AUDIT_DIR / "sello_kronos.json"
LOG_PATH = AUDIT_DIR / "cadena_custodia.log"

# Importa lógica core si existe, si no usa local
try:
    from core.hash_to_semantic import generate_manifesto_from_hash
    from core.perito_seal import generar_sello_kronos
    HAS_CORE = True
except ImportError:
    HAS_CORE = False

def log_custodia(msg: str):
    AUDIT_DIR.mkdir(exist_ok=True)
    ts = datetime.utcnow().isoformat() + "Z"
    entry = f"[{ts}] [MANIFIESTO:{FOLIO}] {msg}"
    print(entry)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(entry + "\n")

def generar_manifiesto_51_49(genesis: str) -> str:
    if HAS_CORE:
        try:
            return generate_manifesto_from_hash(genesis, 51, 49)
        except:
            pass

    # Lógica local 51/49 determinística - blindada
    sha = hashlib.sha256(genesis.encode()).hexdigest()
    humano = sha[:32]  # 51% -> primera mitad
    ia = sha[32:]      # 49% -> segunda mitad
    
    manifiesto = f"""KRONOS 360 - MANIFIESTO ORIGINARIO 51/49
FOLIO:{FOLIO}|PERITO:{PERITO}|GENESIS:{genesis}
SELLO:{SELLO}
TX:{TX}
SAFE:{SAFE}
POLARIDAD:51%_HUMANO:{humano}|49%_IA:{ia}
GENESIS_HASH:{genesis}
SEMANTICA:Yo,{PERITO},perito folio {FOLIO},declaro que este genesis {genesis} es 51% humano 49% IA.
El humano decide, la IA asiste. El sello {SELLO} traza la verdad.
FECHA_CIERTO:{datetime.utcnow().isoformat()}Z
NORMA:NOM-151-SCFI-2016 Art.8/10/38 + ISO 27001 A8.24
VERIFICA:https://kronos-legado.digital/v/{FOLIO}
"""
    return manifiesto

def main():
    print(f"""
╔════════════════════════════════════════════╗
║ PVA MANIFIESTO 51/49 - KRONOS 360 ║
║ Folio: {FOLIO} ║
║ Genesis: {GENESIS} ║
║ Sello: {SELLO} ║
╚════════════════════════════════════════════╝
""")

    AUDIT_DIR.mkdir(exist_ok=True)

    # 1. Generar manifiesto
    manifiesto = generar_manifiesto_51_49(GENESIS)
    MANIFIESTO_PATH.write_text(manifiesto, encoding="utf-8")
    print(f"[OK] Manifiesto: {MANIFIESTO_PATH}")
    log_custodia(f"primer_manifiesto.txt generado con genesis {GENESIS}")

    # 2. Generar sello
    if HAS_CORE:
        try:
            sello_str = generar_sello_kronos(GENESIS)
        except:
            sello_str = f"FOLIO:{FOLIO}|PERITO:{PERITO}|GENESIS:{GENESIS}"
    else:
        sello_str = f"FOLIO:{FOLIO}|PERITO:{PERITO}|GENESIS:{GENESIS}"

    # 3. sello_kronos.json - trazabilidad total
    sello_data = {
        "folio": FOLIO,
        "perito": PERITO,
        "genesis_hash": GENESIS,
        "genesis_sha256": hashlib.sha256(GENESIS.encode()).hexdigest(),
        "sello": SELLO,
        "sello_raw": sello_str,
        "manifiesto": manifiesto,
        "polaridad": "51%_HUMANO_49%_IA",
        "tx_blockchain": TX,
        "safe_creative": SAFE,
        "qr_path": f"audit/qr_folio_{FOLIO}.png",
        "pdf_path": f"audit/dictamen_PVA_{FOLIO}.pdf",
        "urls": {
            "verifica": f"https://kronos-legado.digital/v/{FOLIO}",
            "verifica_fdv": f"https://verifica.fdv.mx/folio/{FOLIO}",
            "api": f"https://api.kronos-legado.digital/v1/api/verifica/{FOLIO}",
            "etherscan": f"https://sepolia.etherscan.io/tx/{TX}"
        },
        "created_utc": datetime.utcnow().isoformat() + "Z",
        "norma": "NOM-151-SCFI-2016 + ISO 27001 + eIDAS"
    }

    # Si ya existe, merge para no perder contract_address
    if SELLO_PATH.exists():
        try:
            existing = json.loads(SELLO_PATH.read_text(encoding="utf-8"))
            existing.update(sello_data)
            sello_data = existing
        except:
            pass

    with open(SELLO_PATH, "w", encoding="utf-8") as f:
        json.dump(sello_data, f, indent=2, ensure_ascii=False)

    print(f"[OK] Sello: {SELLO_PATH}")
    log_custodia(f"sello_kronos.json actualizado - manifiesto 51/49 folio {FOLIO}")

    # 4. Validación final
    assert "51%_HUMANO" in manifiesto
    assert "49%_IA" in manifiesto
    assert FOLIO in manifiesto
    assert GENESIS in manifiesto
    assert FOLIO in sello_str

    print(f"""
[FIN] MANIFIESTO 51/49 LISTO
- {MANIFIESTO_PATH} ({len(manifiesto)} chars)
- {SELLO_PATH}
- Sello: {SELLO}
- Genesis: {GENESIS[:16]}...{GENESIS[-8:]}
- Siguiente: python scripts/generate_qr.py && python scripts/generate_pdf_dictamen.py
""")
=======
import sys
import os
import argparse
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.genesis_breather import breathe

def main():
    parser = argparse.ArgumentParser(description="Genera un manifiesto fractal del PVA")
    parser.add_argument("--config", default="config/genesis_hash.json", help="Ruta al JSON con hashes")
    args = parser.parse_args()
    
    manifiesto = breathe(args.config)
    print(manifiesto)
    
    import hashlib
    hash_manifest = hashlib.sha256(manifiesto.encode()).hexdigest()
    os.makedirs("examples", exist_ok=True)
    with open(f"examples/manifiesto_{hash_manifest[:8]}.txt", "w") as f:
        f.write(manifiesto)
    print(f"\nManifiesto guardado en examples/manifiesto_{hash_manifest[:8]}.txt")
>>>>>>> 14ee8a8 (feat: implementación PVA 10/10 - peritaje digital con NOM-151 y ISO 27001)

if __name__ == "__main__":
    main()
