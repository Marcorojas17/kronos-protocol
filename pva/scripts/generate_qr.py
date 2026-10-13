#!/usr/bin/env python3
<<<<<<< HEAD
"""
PVA QR Generator - KRONOS 360
Folio: 5204160405358537
Perito: kronosproyecto@hotmail.com
Genesis: 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
Genera: audit/qr_folio_5204160405358537.png
"""

import os
import json
from pathlib import Path
from datetime import datetime

FOLIO = "5204160405358537"
PERITO = "kronosproyecto@hotmail.com"
GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
SELLO = f"KRONOS-TRACE-PVA-{FOLIO}"
TX = "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"

ROOT = Path(__file__).parent.parent
AUDIT_DIR = ROOT / "audit"
QR_PATH = AUDIT_DIR / f"qr_folio_{FOLIO}.png"
SELLO_PATH = AUDIT_DIR / "sello_kronos.json"
LOG_PATH = AUDIT_DIR / "cadena_custodia.log"

# URLs de verificación (prod)
URL_VERIFICA_1 = f"https://kronos-legado.digital/v/{FOLIO}"
URL_VERIFICA_2 = f"https://verifica.fdv.mx/folio/{FOLIO}"
URL_API = f"https://api.kronos-legado.digital/v1/api/verifica/{FOLIO}"

def log_custodia(msg: str):
    AUDIT_DIR.mkdir(exist_ok=True)
    ts = datetime.utcnow().isoformat() + "Z"
    entry = f"[{ts}] [QR:{FOLIO}] {msg}"
    print(entry)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(entry + "\n")

def generate_qr():
    try:
        import qrcode
        from qrcode.image.styledpil import StyledPilImage
        from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
    except ImportError:
        print("[!] Instalando qrcode[pil]...")
        os.system("pip install qrcode[pil] --quiet")
        import qrcode
        from qrcode.image.styledpil import StyledPilImage
        from qrcode.image.styles.moduledrawers import RoundedModuleDrawer

    # Payload JSON compacto para QR - NOM-151 trazable
    payload = {
        "f": FOLIO,
        "p": PERITO,
        "g": GENESIS[:16] + "..." + GENESIS[-8:], # corto para QR pero verificable
        "s": SELLO,
        "v": URL_VERIFICA_1,
        "tx": TX[:18] + "...",
        "t": datetime.utcnow().isoformat() + "Z"
    }

    # Data principal del QR: URL + folio para que escáner lleve a verificación directa
    qr_data = f"{URL_VERIFICA_1}?sello={SELLO}&genesis={GENESIS}&perito={PERITO}"

    print(f"[*] Generando QR para folio {FOLIO}")
    print(f"[*] Data: {qr_data}")

    qr = qrcode.QRCode(
        version=5,
        error_correction=qrcode.constants.ERROR_CORRECT_H, # 30% recuperable - ISO
        box_size=10,
        border=4,
    )
    qr.add_data(qr_data)
    qr.make(fit=True)

    img = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=RoundedModuleDrawer(),
        fill_color="#0a0a0a",
        back_color="white"
    )

    # Guardar
    AUDIT_DIR.mkdir(exist_ok=True)
    img.save(QR_PATH)
    print(f"[OK] QR guardado: {QR_PATH} ({img.size[0]}x{img.size[1]}px)")

    # Guardar metadata del QR para auditoría
    meta = {
        "folio": FOLIO,
        "perito": PERITO,
        "genesis_hash": GENESIS,
        "sello": SELLO,
        "qr_path": str(QR_PATH),
        "qr_data": qr_data,
        "payload": payload,
        "urls": {
            "verifica_kronos": URL_VERIFICA_1,
            "verifica_fdv": URL_VERIFICA_2,
            "api": URL_API,
            "etherscan": f"https://sepolia.etherscan.io/tx/{TX}"
        },
        "created": datetime.utcnow().isoformat() + "Z",
        "norma": "NOM-151 Art. 10 - Mecanismo de verificación"
    }

    with open(SELLO_PATH, "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2, ensure_ascii=False)

    log_custodia(f"QR generado: {QR_PATH} -> {URL_VERIFICA_1}")
    log_custodia(f"sello_kronos.json actualizado con folio {FOLIO}")

    return str(QR_PATH)

def main():
    print(f"""
╔══════════════════════════════════════════╗
║ PVA QR GENERATOR - KRONOS 360 ║
║ Folio: {FOLIO} ║
║ Sello: {SELLO} ║
╚══════════════════════════════════════════╝
""")
    path = generate_qr()
    print(f"\n[FIN] QR listo: {path}")
    print(f"Verifica: {URL_VERIFICA_1}")

if __name__ == "__main__":
    main()
=======
import qrcode

FOLIO = "5204160405358537"
URL = "https://marcorojas17.github.io/PVA-Protocolo-Vida-Autopoietica-/"

qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=10, border=4)
qr.add_data(URL)
qr.make(fit=True)

img_qr = qr.make_image(fill_color="#0a0a0a", back_color="#ffffff")
img_qr.save(f"audit/qr_folio_{FOLIO}.png")
print(f"✅ QR generado: audit/qr_folio_{FOLIO}.png")
print(f"🔗 Enlace codificado: {URL}")
>>>>>>> 14ee8a8 (feat: implementación PVA 10/10 - peritaje digital con NOM-151 y ISO 27001)
