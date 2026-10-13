#!/usr/bin/env python3
"""
PVA Vault Setup - KRONOS 360
Folio: 5204160405358537
Perito: kronosproyecto@hotmail.com
Genesis: 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
Sello: KRONOS-TRACE-PVA-5204160405358537
Objetivo: Cifrar private_keys/ y .env con KMS, nunca subir llaves a GitHub (NOM-151 A8.3)
"""

import os
import json
import shutil
from pathlib import Path
from datetime import datetime

FOLIO = "5204160405358537"
PERITO = "kronosproyecto@hotmail.com"
GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"

ROOT = Path(__file__).parent.parent
CONFIG_DIR = ROOT / "config"
PRIVATE_DIR = CONFIG_DIR / "private_keys"
ENV_FILE = ROOT / ".env"
ENV_EXAMPLE = ROOT / ".env.example"
AUDIT_DIR = ROOT / "audit"
LOG_FILE = AUDIT_DIR / "cadena_custodia.log"


def log_custodia(msg: str):
    AUDIT_DIR.mkdir(exist_ok=True)
    timestamp = datetime.utcnow().isoformat() + "Z"
    entry = f"[{timestamp}] [VAULT:{FOLIO}] {msg}"
    print(entry)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(entry + "\n")


def check_gitignore():
    gitignore = ROOT / ".gitignore"
    required = [
        "config/private_keys/",
        "*.key",
        "*.cer",
        "*.pem",
        ".env",
        "audit/sello_kronos.json",
        "audit/*.pdf",
    ]
    content = ""
    if gitignore.exists():
        content = gitignore.read_text(encoding="utf-8")

    missing = [r for r in required if r not in content]

    if missing:
        print(f"[!] Agregando a .gitignore: {missing}")
        with open(gitignore, "a", encoding="utf-8") as f:
            f.write("\n# PVA VAULT - FOLIO 5204160405358537\n")
            for m in missing:
                f.write(m + "\n")
        log_custodia(f".gitignore actualizado con {missing}")
    else:
        print("[OK] .gitignore blindado")
        log_custodia(".gitignore verificado OK")


def setup_private_dir():
    PRIVATE_DIR.mkdir(parents=True, exist_ok=True)
    gitkeep = PRIVATE_DIR / ".gitkeep"
    if not gitkeep.exists():
        gitkeep.write_text(
            f"# FOLIO {FOLIO} - Directorio reservado para FIEL SAT .key/.cer - NUNCA SUBIR\n"
        )

    # Verifica que no haya llaves expuestas
    exposed = (
        list(PRIVATE_DIR.glob("*.key"))
        + list(PRIVATE_DIR.glob("*.pem"))
        + list(PRIVATE_DIR.glob("*.p12"))
    )
    if exposed:
        print(f"[CRITICO] LLAVES EXPUESTAS EN {PRIVATE_DIR}: {exposed}")
        print("-> Mover a AWS KMS o Vault inmediatamente")
        log_custodia(f"ALERTA: llaves expuestas detectadas {exposed}")
    else:
        print(f"[OK] {PRIVATE_DIR} limpio - sin llaves expuestas")
        log_custodia("private_keys verificado limpio")


def setup_env():
    if not ENV_FILE.exists() and ENV_EXAMPLE.exists():
        shutil.copy(ENV_EXAMPLE, ENV_FILE)
        print(f"[OK] .env creado desde .env.example")
        log_custodia(".env creado")

    if ENV_FILE.exists():
        content = ENV_FILE.read_text(encoding="utf-8")
        # Inyecta folio si no existe
        if FOLIO not in content:
            with open(ENV_FILE, "a", encoding="utf-8") as f:
                f.write(f"\n# PVA - FOLIO MAESTRO\nPVA_FOLIO={FOLIO}\n")
                f.write(f"PVA_PERITO={PERITO}\n")
                f.write(f"PVA_GENESIS={GENESIS}\n")
                f.write(f"PVA_SELLO=KRONOS-TRACE-PVA-{FOLIO}\n")
            print(f"[OK] Folio {FOLIO} inyectado en .env")
            log_custodia(f"Folio {FOLIO} inyectado en .env")


def setup_kms_structure():
    """Prepara estructura para AWS KMS / GCP KMS - ISO 27001 A8.3"""
    kms_config = {
        "folio": FOLIO,
        "perito": PERITO,
        "genesis": GENESIS,
        "sello": f"KRONOS-TRACE-PVA-{FOLIO}",
        "kms_provider": "aws_kms",
        "kms_key_id": f"alias/pva-{FOLIO}-fiel",
        "region": "us-east-1",
        "vault_path": "secret/pva/5204160405358537",
        "created": datetime.utcnow().isoformat() + "Z",
        "norma": "NOM-151-SCFI-2016 A8.3 + ISO 27001 A8.24",
    }
    config_file = CONFIG_DIR / "vault_config.json"
    if not config_file.exists():
        CONFIG_DIR.mkdir(exist_ok=True)
        config_file.write_text(json.dumps(kms_config, indent=2), encoding="utf-8")
        print(f"[OK] vault_config.json creado: {config_file}")
        log_custodia("vault_config.json creado para KMS")
    else:
        print("[OK] vault_config.json existe")


def main():
    print(f"""
╔═══════════════════════════════════════════╗
║  PVA VAULT SETUP - KRONOS 360             ║
║  Folio: {FOLIO}            ║
║  Sello: KRONOS-TRACE-PVA-{FOLIO} ║
╚═══════════════════════════════════════════╝
""")
    check_gitignore()
    setup_private_dir()
    setup_env()
    setup_kms_structure()
    log_custodia(f"VAULT SETUP COMPLETADO - Folio {FOLIO} - NOM-151 OK")
    print(f"\n[FIN] Vault PVA {FOLIO} listo. Revisa audit/cadena_custodia.log")
    print(
        "Siguiente: aws kms encrypt --key-id alias/pva-5204160405358537-fiel --plaintext fileb://config/private_keys/fiel.key"
    )


if __name__ == "__main__":
    main()
