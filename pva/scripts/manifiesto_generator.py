#!/usr/bin/env python3
"""
PVA Manifesto Generator - KRONOS 360 MT01JAAF SHA a4ff808e
Folio Maestro: 5204160405358537
Folio Pericial: KRONOS-MT01JAAF
SHA: a4ff808e
Sello: KRONOS-TRACE-PVA-5204160405358537-MT01JAAF
SC: 2607146379465
TX Amoy: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
Genera: audit/primer_manifiesto.txt + audit/sello_kronos.json + examples/manifiesto_{sha}.txt
Polaridad: 51% HUMANO / 49% IA - innegociable
"""

import hashlib, json, sys, argparse
from pathlib import Path
from datetime import datetime

FOLIO_MAESTRO = "5204160405358537"
FOLIO_PERICIAL = "KRONOS-MT01JAAF"
SHA = "a4ff808e"
PERITO = "kronosproyecto@hotmail.com"
GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
SELLO = "KRONOS-TRACE-PVA-5204160405358537-MT01JAAF"
TX = "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"
SC = "2607146379465"
CHAIN_ID = 80002

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))

AUDIT_DIR = ROOT / "audit"
MANIFIESTO_PATH = AUDIT_DIR / "primer_manifiesto.txt"
SELLO_PATH = AUDIT_DIR / "sello_kronos.json"
LOG_PATH = AUDIT_DIR / "cadena_custodia.log"
EXAMPLES_DIR = ROOT / "examples"

URL_GITHUB = "https://jas17.github.io/PVA-Protocolo-Vida-Autopoietica-/"
URL_CERT = f"{URL_GITHUB}web/certificado.html?folio={SELLO}"

# Core 10/10
try:
    from core.hash_to_semantic import generate_manifesto_from_hash
    from core.perito_seal import generar_sello_kronos
    from core.genesis_breather import breathe

    HAS_CORE = True
except ImportError:
    HAS_CORE = False

    def breathe(config="config/genesis_hash.json"):
        return f"KRONOS 360 MT01JAAF BREATHE {GENESIS}"


def log_custodia(msg: str):
    AUDIT_DIR.mkdir(exist_ok=True)
    ts = datetime.utcnow().isoformat() + "Z"
    entry = f"[{ts}] [MANIFIESTO:{FOLIO_MAESTRO}:{FOLIO_PERICIAL}:{SHA}] {msg}"
    print(entry)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(entry + "\n")


def generar_manifiesto_51_49(
    genesis: str,
    use_breathe: bool = False,
    config_path: str = "config/genesis_hash.json",
) -> str:
    # 1. Si piden breathe fractal + MT01JAAF
    if use_breathe and HAS_CORE:
        try:
            fractal = breathe(config_path)
        except:
            fractal = ""
    else:
        fractal = ""

    if HAS_CORE and not use_breathe:
        try:
            core_m = generate_manifesto_from_hash(genesis, 51, 49)
            if FOLIO_PERICIAL in core_m and SHA in core_m:
                return core_m + (f"\n{fractal}" if fractal else "")
        except:
            pass

    sha = hashlib.sha256(genesis.encode()).hexdigest()
    humano = sha[:32]
    ia = sha[32:]

    manifiesto = f"""KRONOS 360 - MANIFIESTO ORIGINARIO 51/49 MT01JAAF 100/10
FOLIO_MAESTRO:{FOLIO_MAESTRO}|FOLIO_PERICIAL:{FOLIO_PERICIAL}|SHA:{SHA}|PERITO:{PERITO}|GENESIS:{genesis}
SELLO:{SELLO}
TX:{TX} CHAIN_ID:{CHAIN_ID} AMOY
SC:{SC}
POLARIDAD:51%_HUMANO:{humano}|49%_IA:{ia}
GENESIS_HASH:{genesis} PREFIX:{SHA}
SEMANTICA:Yo,{PERITO},perito {FOLIO_MAESTRO}/{FOLIO_PERICIAL} SHA {SHA},declaro que este genesis {genesis} es 51% humano 49% IA.
El humano decide, la IA asiste. El sello {SELLO} traza la verdad SC {SC}.
FECHA_CIERTO:{datetime.utcnow().isoformat()}Z
NORMA:NOM-151-SCFI-2016 Art.8/10/38 + ISO 27001 A8.24 + MT01JAAF
VERIFICA:{URL_CERT}
GITHUB:{URL_GITHUB}
POLYGONSCAN:https://amoy.polygonscan.com/tx/{TX}
{fractal}
"""
    return manifiesto


def main():
    parser = argparse.ArgumentParser(
        description="Genera manifiesto fractal PVA MT01JAAF"
    )
    parser.add_argument(
        "--config", default="config/genesis_hash.json", help="Ruta al JSON con hashes"
    )
    parser.add_argument(
        "--breathe", action="store_true", help="Usa genesis_breather fractal"
    )
    args = parser.parse_args()

    print(
        f"╔══════════════════════════════════════════════════╗\n║ PVA MANIFIESTO 51/49 MT01JAAF SHA {SHA} ║\n║ Maestro:{FOLIO_MAESTRO} Pericial:{FOLIO_PERICIAL} ║\n║ Genesis:{GENESIS[:16]}...{GENESIS[-8:]} ║\n║ Sello:{SELLO} ║\n╚══════════════════════════════════════════════════╝"
    )
    AUDIT_DIR.mkdir(exist_ok=True)
    EXAMPLES_DIR.mkdir(exist_ok=True)

    # 1. Manifiesto
    manifiesto = generar_manifiesto_51_49(
        GENESIS, use_breathe=args.breathe, config_path=args.config
    )
    MANIFIESTO_PATH.write_text(manifiesto, encoding="utf-8")
    print(f"[OK] Manifiesto: {MANIFIESTO_PATH} ({len(manifiesto)} chars)")
    log_custodia(f"primer_manifiesto.txt MT01JAAF {GENESIS}")

    # 1b. Guardado fractal en examples/
    hash_m = hashlib.sha256(manifiesto.encode()).hexdigest()
    example_path = EXAMPLES_DIR / f"manifiesto_{hash_m[:8]}_{FOLIO_PERICIAL}_{SHA}.txt"
    example_path.write_text(manifiesto, encoding="utf-8")
    print(f"[OK] Fractal example: {example_path}")

    # 2. Sello
    try:
        sello_str = (
            generar_sello_kronos(GENESIS)
            if HAS_CORE
            else f"FOLIO_MAESTRO:{FOLIO_MAESTRO}|FOLIO_PERICIAL:{FOLIO_PERICIAL}|SHA:{SHA}|PERITO:{PERITO}|GENESIS:{GENESIS}"
        )
    except:
        sello_str = f"FOLIO_MAESTRO:{FOLIO_MAESTRO}|FOLIO_PERICIAL:{FOLIO_PERICIAL}|SHA:{SHA}|PERITO:{PERITO}|GENESIS:{GENESIS}"

    # 3. sello_kronos.json MT01JAAF
    sello_data = {
        "folio_maestro": FOLIO_MAESTRO,
        "folio_pericial": FOLIO_PERICIAL,
        "sha": SHA,
        "perito": PERITO,
        "genesis_hash": GENESIS,
        "genesis_sha256": hashlib.sha256(GENESIS.encode()).hexdigest(),
        "sello": SELLO,
        "sello_raw": sello_str,
        "manifiesto": manifiesto,
        "manifiesto_hash": hash_m,
        "polaridad": "51%_HUMANO_49%_IA",
        "tx_blockchain": TX,
        "chain_id": CHAIN_ID,
        "chain": "Polygon Amoy",
        "safe_creative": SC,
        "qr_path": f"audit/qr_folio_{FOLIO_MAESTRO}_{FOLIO_PERICIAL}.png",
        "pdf_path": f"audit/dictamen_PVA_{FOLIO_MAESTRO}_{FOLIO_PERICIAL}.pdf",
        "example_path": str(example_path),
        "urls": {
            "github_pages": URL_GITHUB,
            "verifica": URL_CERT,
            "verifica_fdv": f"https://verifica.fdv.mx/folio/{FOLIO_MAESTRO}",
            "api": f"https://api.kronos-legado.digital/v1/api/verifica/{SELLO}",
            "polygonscan_amoy": f"https://amoy.polygonscan.com/tx/{TX}",
        },
        "created_utc": datetime.utcnow().isoformat() + "Z",
        "norma": "NOM-151-SCFI-2016 + ISO 27001 + eIDAS + MT01JAAF SHA a4ff808e",
    }

    if SELLO_PATH.exists():
        try:
            existing = json.loads(SELLO_PATH.read_text(encoding="utf-8"))
            # Preserva contract_address si existe
            if "contract_address" in existing:
                sello_data["contract_address"] = existing["contract_address"]
            existing.update(sello_data)
            sello_data = existing
        except:
            pass

    with open(SELLO_PATH, "w", encoding="utf-8") as f:
        json.dump(sello_data, f, indent=2, ensure_ascii=False)

    print(f"[OK] Sello MT01JAAF: {SELLO_PATH}")
    log_custodia(f"sello_kronos.json MT01JAAF {FOLIO_PERICIAL} SHA {SHA}")

    assert "51%_HUMANO" in manifiesto
    assert "49%_IA" in manifiesto
    assert FOLIO_MAESTRO in manifiesto
    assert FOLIO_PERICIAL in manifiesto
    assert SHA in manifiesto

    print(
        f"\n[FIN] MANIFIESTO MT01JAAF 100/10 LISTO\n- {MANIFIESTO_PATH}\n- {example_path}\n- {SELLO_PATH}\n- Sello: {SELLO}\n- Siguiente: python scripts/qr_generator.py && python scripts/pdf_dictamen.py"
    )


if __name__ == "__main__":
    main()
