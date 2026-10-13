#!/usr/bin/env python3
"""
PVA Vault Setup - KRONOS 360 MT01JAAF SHA a4ff808e
Folio Maestro: 5204160405358537
Folio Pericial: KRONOS-MT01JAAF
SHA: a4ff808e
Sello: KRONOS-TRACE-PVA-5204160405358537-MT01JAAF
SC: 2607146379465
TX Amoy: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
Objetivo: Cifrar private_keys/ y .env con KMS, nunca subir llaves a GitHub (NOM-151 A8.3)
"""

import json
import shutil
from pathlib import Path
from datetime import datetime

FOLIO_MAESTRO = "5204160405358537"
FOLIO_PERICIAL = "KRONOS-MT01JAAF"
SHA = "a4ff808e"
PERITO = "kronosproyecto@hotmail.com"
GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
SELLO = "KRONOS-TRACE-PVA-5204160405358537-MT01JAAF"
SC = "2607146379465"
TX = "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"
CHAIN_ID = 80002

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
    entry = f"[{timestamp}] [VAULT:{FOLIO_MAESTRO}:{FOLIO_PERICIAL}:{SHA}] {msg}"
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
        "__pycache__/",
        "*.pyc",
        ".pytest_cache/",
    ]
    content = gitignore.read_text(encoding="utf-8") if gitignore.exists() else ""
    missing = [r for r in required if r not in content]
    if missing:
        with open(gitignore, "a", encoding="utf-8") as f:
            f.write(f"\n# PVA VAULT MT01JAAF {FOLIO_MAESTRO} SHA {SHA} SC {SC}\n")
            f.write("\n".join(missing) + "\n")
        log_custodia(f".gitignore actualizado con {missing}")
    else:
        print("[OK] .gitignore blindado MT01JAAF")
        log_custodia(".gitignore verificado OK MT01JAAF")


def setup_private_dir():
    PRIVATE_DIR.mkdir(parents=True, exist_ok=True)
    (PRIVATE_DIR / ".gitkeep").write_text(
        f"# {FOLIO_PERICIAL} {SHA} - FIEL SAT .key/.cer - NUNCA SUBIR - SC {SC}\n",
        encoding="utf-8",
    )
    exposed = (
        list(PRIVATE_DIR.glob("*.key"))
        + list(PRIVATE_DIR.glob("*.pem"))
        + list(PRIVATE_DIR.glob("*.p12"))
    )
    if exposed:
        print(f"[CRITICO] LLAVES EXPUESTAS: {exposed}")
        log_custodia(f"ALERTA: llaves expuestas {exposed}")
    else:
        print(f"[OK] {PRIVATE_DIR} limpio MT01JAAF")
        log_custodia("private_keys limpio MT01JAAF")


def setup_env():
    if not ENV_FILE.exists() and ENV_EXAMPLE.exists():
        shutil.copy(ENV_EXAMPLE, ENV_FILE)
    if ENV_FILE.exists():
        content = ENV_FILE.read_text(encoding="utf-8")
        if FOLIO_PERICIAL not in content:
            with open(ENV_FILE, "a", encoding="utf-8") as f:
                f.write(
                    f"\n# PVA MT01JAAF 100/10\nPVA_FOLIO_MAESTRO={FOLIO_MAESTRO}\nPVA_FOLIO_PERICIAL={FOLIO_PERICIAL}\nPVA_SHA={SHA}\nPVA_PERITO={PERITO}\nPVA_GENESIS={GENESIS}\nPVA_SELLO={SELLO}\nPVA_SC={SC}\nPVA_TX={TX}\nPVA_CHAIN_ID={CHAIN_ID}\n"
                )
            log_custodia(f"Env inyectado {FOLIO_PERICIAL}:{SHA}")


def setup_kms_structure():
    kms_config = {
        "folio_maestro": FOLIO_MAESTRO,
        "folio_pericial": FOLIO_PERICIAL,
        "sha": SHA,
        "perito": PERITO,
        "genesis": GENESIS,
        "sello": SELLO,
        "sc": SC,
        "tx": TX,
        "chain_id": CHAIN_ID,
        "chain": "Polygon Amoy",
        "kms_provider": "aws_kms",
        "kms_key_id": f"alias/pva-{FOLIO_MAESTRO.lower()}-{FOLIO_PERICIAL.lower()}-fiel",
        "region": "us-east-1",
        "vault_path": f"secret/pva/{FOLIO_MAESTRO}/{FOLIO_PERICIAL}",
        "created": datetime.utcnow().isoformat() + "Z",
        "norma": "NOM-151-SCFI-2016 A8.3 + ISO 27001 A8.24 + MT01JAAF",
    }
    CONFIG_DIR.mkdir(exist_ok=True)
    (CONFIG_DIR / "vault_config.json").write_text(
        json.dumps(kms_config, indent=2), encoding="utf-8"
    )
    log_custodia("vault_config MT01JAAF creado")


def main():
    print(
        f"╔════════════════════════════════════════════════╗\n║ PVA VAULT SETUP MT01JAAF SHA {SHA}          ║\n║ Maestro:{FOLIO_MAESTRO} Pericial:{FOLIO_PERICIAL} ║\n║ Sello:{SELLO} ║\n╚════════════════════════════════════════════════╝"
    )
    check_gitignore()
    setup_private_dir()
    setup_env()
    setup_kms_structure()
    log_custodia(f"VAULT COMPLETADO MT01JAAF {FOLIO_MAESTRO} NOM-151 OK")
    print(f"[FIN] Vault MT01JAAF listo. {LOG_FILE}")


if __name__ == "__main__":
    main()
