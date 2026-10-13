#!/usr/bin/env python3
"""
PVA QR Generator - KRONOS 360 MT01JAAF SHA a4ff808e
Folio Maestro: 5204160405358537
Folio Pericial: KRONOS-MT01JAAF
SHA: a4ff808e
Sello: KRONOS-TRACE-PVA-5204160405358537-MT01JAAF
SC: 2607146379465
TX Amoy: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
Genera: audit/qr_folio_5204160405358537_MT01JAAF.png
"""

import os, json
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
AUDIT_DIR = ROOT / "audit"
QR_PATH = AUDIT_DIR / f"qr_folio_{FOLIO_MAESTRO}_{FOLIO_PERICIAL}.png"
SELLO_PATH = AUDIT_DIR / "sello_kronos.json"
LOG_PATH = AUDIT_DIR / "cadena_custodia.log"

# URLs 100/10 MT01JAAF - GitHub Pages real + Amoy
URL_GITHUB = "https://jas17.github.io/PVA-Protocolo-Vida-Autopoietica-/"
URL_VERIFICA_1 = f"{URL_GITHUB}web/certificado.html?folio={SELLO}"
URL_VERIFICA_2 = f"https://verifica.fdv.mx/folio/{FOLIO_MAESTRO}"
URL_API = f"https://api.kronos-legado.digital/v1/api/verifica/{SELLO}"
EXPLORER_URL = f"https://amoy.polygonscan.com/tx/{TX}"


def log_custodia(msg: str):
    AUDIT_DIR.mkdir(exist_ok=True)
    ts = datetime.utcnow().isoformat() + "Z"
    entry = f"[{ts}] [QR:{FOLIO_MAESTRO}:{FOLIO_PERICIAL}:{SHA}] {msg}"
    print(entry)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(entry + "\n")


def generate_qr():
    try:
        import qrcode
        from qrcode.image.styledpil import StyledPilImage
        from qrcode.image.styles.moduledrawers import RoundedModuleDrawer

        has_styled = True
    except ImportError:
        print("[!] Instalando qrcode[pil]...")
        os.system("pip install qrcode[pil] --quiet")
        import qrcode

        try:
            from qrcode.image.styledpil import StyledPilImage
            from qrcode.image.styles.moduledrawers import RoundedModuleDrawer

            has_styled = True
        except:
            has_styled = False

    payload = {
        "f_maestro": FOLIO_MAESTRO,
        "f_pericial": FOLIO_PERICIAL,
        "sha": SHA,
        "p": PERITO,
        "g": GENESIS,
        "g_short": GENESIS[:16] + "..." + GENESIS[-8:],
        "s": SELLO,
        "sc": SC,
        "tx": TX,
        "chain_id": CHAIN_ID,
        "v": URL_VERIFICA_1,
        "explorer": EXPLORER_URL,
        "github": URL_GITHUB,
        "t": datetime.utcnow().isoformat() + "Z",
    }

    # QR data 100/10: lleva a certificado real + sello completo MT01JAAF
    qr_data = (
        f"{URL_VERIFICA_1}&genesis={GENESIS}&perito={PERITO}&sha={SHA}&sc={SC}&tx={TX}"
    )

    print(f"[*] Generando QR MT01JAAF para {FOLIO_MAESTRO}")
    print(f"[*] Data: {qr_data}")

    qr = qrcode.QRCode(
        version=6,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=12,
        border=4,
    )
    qr.add_data(qr_data)
    qr.make(fit=True)

    if has_styled:
        img = qr.make_image(
            image_factory=StyledPilImage,
            module_drawer=RoundedModuleDrawer(),
            fill_color="#0a0a0a",
            back_color="white",
        )
    else:
        img = qr.make_image(fill_color="#0a0a0a", back_color="#ffffff")

    AUDIT_DIR.mkdir(exist_ok=True)
    img.save(QR_PATH)
    print(f"[OK] QR MT01JAAF guardado: {QR_PATH} ({img.size[0]}x{img.size[1]}px)")

    meta = {
        "folio_maestro": FOLIO_MAESTRO,
        "folio_pericial": FOLIO_PERICIAL,
        "sha": SHA,
        "perito": PERITO,
        "genesis_hash": GENESIS,
        "sello": SELLO,
        "sc": SC,
        "tx": TX,
        "chain_id": CHAIN_ID,
        "chain": "Polygon Amoy",
        "qr_path": str(QR_PATH),
        "qr_data": qr_data,
        "payload": payload,
        "urls": {
            "github_pages": URL_GITHUB,
            "verifica_kronos": URL_VERIFICA_1,
            "verifica_fdv": URL_VERIFICA_2,
            "api": URL_API,
            "polygonscan_amoy": EXPLORER_URL,
        },
        "created": datetime.utcnow().isoformat() + "Z",
        "norma": "NOM-151 Art.10 + MT01JAAF + SHA a4ff808e",
    }

    with open(SELLO_PATH, "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2, ensure_ascii=False)

    log_custodia(f"QR MT01JAAF generado: {QR_PATH} -> {URL_VERIFICA_1}")
    return str(QR_PATH)


def main():
    print(
        f"╔══════════════════════════════════════════════════╗\n║ PVA QR GENERATOR MT01JAAF SHA {SHA} ║\n║ Maestro:{FOLIO_MAESTRO} Pericial:{FOLIO_PERICIAL} ║\n║ Sello:{SELLO} ║\n╚══════════════════════════════════════════════════╝"
    )
    path = generate_qr()
    print(
        f"\n[FIN] QR MT01JAAF listo: {path}\nVerifica: {URL_VERIFICA_1}\nExplorer: {EXPLORER_URL}"
    )


if __name__ == "__main__":
    main()
