#!/usr/bin/env python3
"""
PVA Generar Links - KRONOS 360 MT01JAAF SHA a4ff808e
Genera web/certificado.html con TRACE completo
"""

import json
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
WEB_DIR = ROOT / "web"
AUDIT_DIR = ROOT / "audit"
LOG_PATH = AUDIT_DIR / "cadena_custodia.log"

URL_GITHUB = "https://jas17.github.io/PVA-Protocolo-Vida-Autopoietica-/"
URL_CERT = f"{URL_GITHUB}web/certificado.html"


def log_custodia(msg: str):
    AUDIT_DIR.mkdir(exist_ok=True)
    ts = datetime.utcnow().isoformat() + "Z"
    entry = f"[{ts}] [LINKS:{FOLIO_MAESTRO}:{FOLIO_PERICIAL}:{SHA}] {msg}"
    print(entry)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(entry + "\n")


def main():
    print(
        f"╔══════════════════════════════════════════════════╗\n║ PVA LINKS MT01JAAF SHA {SHA} ║\n║ {SELLO} ║\n╚══════════════════════════════════════════════════╝"
    )
    WEB_DIR.mkdir(exist_ok=True)

    cert_html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Certificado PVA {FOLIO_PERICIAL} SHA {SHA}</title>
<meta name="pva-folio-maestro" content="{FOLIO_MAESTRO}">
<meta name="pva-folio-pericial" content="{FOLIO_PERICIAL}">
<meta name="pva-sha" content="{SHA}">
<meta name="pva-sello" content="{SELLO}">
<meta name="pva-genesis" content="{GENESIS}">
<meta name="pva-sc" content="{SC}">
<meta name="pva-tx" content="{TX}">
<meta name="pva-chain-id" content="{CHAIN_ID}">
<style>body{{font-family:monospace;max-width:800px;margin:20px auto;padding:20px;background:#0a0a0a;color:#00ff88}}a{{color:#00ff88}}.box{{border:1px solid #00ff88;padding:15px;margin:15px 0}}</style>
</head>
<body>
<h1>KRONOS 360 PVA 100/10 MT01JAAF</h1>
<div class="box">
<p><b>Folio Maestro:</b> {FOLIO_MAESTRO}</p>
<p><b>Folio Pericial:</b> {FOLIO_PERICIAL}</p>
<p><b>SHA:</b> {SHA}</p>
<p><b>Sello TRACE:</b> {SELLO}</p>
<p><b>Genesis:</b> {GENESIS}</p>
<p><b>SC SafeCreative:</b> {SC}</p>
<p><b>TX Amoy:</b> {TX}</p>
<p><b>ChainId:</b> {CHAIN_ID} Polygon Amoy</p>
<p><b>Fecha:</b> {datetime.utcnow().isoformat()}Z</p>
</div>
<div class="box">
<p>Verificación:</p>
<p><a href="https://amoy.polygonscan.com/tx/{TX}" target="_blank">Amoy Polygonscan TX</a></p>
<p><a href="{URL_GITHUB}" target="_blank">GitHub Pages Oficial</a></p>
<p><a href="../audit/sello_kronos.json" target="_blank">sello_kronos.json MT01JAAF</a></p>
</div>
<script>console.log("MT01JAAF {FOLIO_MAESTRO} {FOLIO_PERICIAL} {SHA} {SELLO}");</script>
</body>
</html>
"""

    cert_path = WEB_DIR / "certificado.html"
    cert_path.write_text(cert_html, encoding="utf-8")
    print(f"[OK] {cert_path}")

    # links.json
    links = {
        "folio_maestro": FOLIO_MAESTRO,
        "folio_pericial": FOLIO_PERICIAL,
        "sha": SHA,
        "sello": SELLO,
        "genesis": GENESIS,
        "sc": SC,
        "tx": TX,
        "chain_id": CHAIN_ID,
        "chain": "Polygon Amoy",
        "github_pages": URL_GITHUB,
        "certificado": URL_CERT,
        "polygonscan": f"https://amoy.polygonscan.com/tx/{TX}",
        "qr": f"audit/qr_folio_{FOLIO_MAESTRO}_{FOLIO_PERICIAL}.png",
        "sello_json": "audit/sello_kronos.json",
        "generated": datetime.utcnow().isoformat() + "Z",
    }
    (WEB_DIR / "links.json").write_text(json.dumps(links, indent=2), encoding="utf-8")
    log_custodia(f"Links MT01JAAF generados {cert_path}")

    print(f"[FIN] MT01JAAF Links 100/10 listo - {cert_path}")


if __name__ == "__main__":
    main()
