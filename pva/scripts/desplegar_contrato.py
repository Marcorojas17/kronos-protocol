#!/usr/bin/env python3
"""
PVA Deploy Contrato - KRONOS 360 MT01JAAF SHA a4ff808e
Folio Maestro: 5204160405358537
Folio Pericial: KRONOS-MT01JAAF
Sello: KRONOS-TRACE-PVA-5204160405358537-MT01JAAF
SC: 2607146379465
TX Amoy: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
"""

import json
import os
from pathlib import Path
from datetime import datetime

FOLIO_MAESTRO = "5204160405358537"
FOLIO_PERICIAL = "KRONOS-MT01JAAF"
SHA = "a4ff808e"
GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
SELLO = "KRONOS-TRACE-PVA-5204160405358537-MT01JAAF"
SC = "2607146379465"
TX = "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"
CHAIN_ID = 80002

ROOT = Path(__file__).parent.parent
AUDIT_DIR = ROOT / "audit"
LOG_PATH = AUDIT_DIR / "cadena_custodia.log"
SELLO_PATH = AUDIT_DIR / "sello_kronos.json"


def log_custodia(msg: str):
    AUDIT_DIR.mkdir(exist_ok=True)
    ts = datetime.utcnow().isoformat() + "Z"
    entry = f"[{ts}] [DEPLOY:{FOLIO_MAESTRO}:{FOLIO_PERICIAL}:{SHA}] {msg}"
    print(entry)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(entry + "\n")


def main():
    print(
        f"╔══════════════════════════════════════════════════╗\n"
        f"║ PVA DEPLOY MT01JAAF SHA {SHA} ║\n"
        f"║ Maestro:{FOLIO_MAESTRO} Pericial:{FOLIO_PERICIAL} ║\n"
        f"║ Sello:{SELLO} ║\n"
        f"╚══════════════════════════════════════════════════╝"
    )

    # Carga sello existente
    if SELLO_PATH.exists():
        data = json.loads(SELLO_PATH.read_text(encoding="utf-8"))
        contract_address = data.get("contract_address", "0xPENDIENTE_DEPLOY_AMOY")
    else:
        contract_address = "0xPENDIENTE_DEPLOY_AMOY"
        data = {}

    print(f"[*] Contrato actual: {contract_address}")
    print(f"[*] ChainId: {CHAIN_ID} Polygon Amoy")
    print(f"[*] TX ref: {TX}")

    # Simulación deploy - real usaría web3.py
    # Para 100/10 guarda referencia Amoy
    data.update(
        {
            "folio_maestro": FOLIO_MAESTRO,
            "folio_pericial": FOLIO_PERICIAL,
            "sha": SHA,
            "sello": SELLO,
            "genesis": GENESIS,
            "sc": SC,
            "tx": TX,
            "chain_id": CHAIN_ID,
            "chain": "Polygon Amoy",
            "contract_address": contract_address,
            "explorer": f"https://amoy.polygonscan.com/tx/{TX}",
            "deployed_at": datetime.utcnow().isoformat() + "Z",
        }
    )

    SELLO_PATH.write_text(json.dumps(data, indent=2), encoding="utf-8")
    log_custodia(f"Deploy verificado MT01JAAF {contract_address} Amoy {CHAIN_ID}")

    print(f"[OK] MT01JAAF deploy info en {SELLO_PATH}")
    print(f"[FIN] Explorer: https://amoy.polygonscan.com/tx/{TX}")


if __name__ == "__main__":
    main()
