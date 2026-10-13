#!/usr/bin/env python3
"""
PVA PDF Dictamen Generator - KRONOS 360 MT01JAAF SHA a4ff808e
Folio Maestro: 5204160405358537
Folio Pericial: KRONOS-MT01JAAF
SHA: a4ff808e
Sello: KRONOS-TRACE-PVA-5204160405358537-MT01JAAF
SC: 2607146379465
TX Amoy: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
Genera: audit/dictamen_PVA_5204160405358537_MT01JAAF.pdf + audit/AUDITORIA_ISO_NOM_PVA_MT01JAAF.md
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
TX = "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"
SC = "2607146379465"
CHAIN_ID = 80002

ROOT = Path(__file__).parent.parent
AUDIT_DIR = ROOT / "audit"
QR_PATH = AUDIT_DIR / f"qr_folio_{FOLIO_MAESTRO}_{FOLIO_PERICIAL}.png"
QR_PATH_OLD = AUDIT_DIR / f"qr_folio_{FOLIO_MAESTRO}.png"
PDF_PATH = AUDIT_DIR / f"dictamen_PVA_{FOLIO_MAESTRO}_{FOLIO_PERICIAL}.pdf"
AUDIT_MD_PATH = AUDIT_DIR / f"AUDITORIA_ISO_NOM_PVA_{FOLIO_MAESTRO}_{FOLIO_PERICIAL}.md"
SELLO_PATH = AUDIT_DIR / "sello_kronos.json"
LOG_PATH = AUDIT_DIR / "cadena_custodia.log"
MANIFIESTO_PATH = ROOT / "audit" / "primer_manifiesto.txt"

URL_GITHUB = "https://jas17.github.io/PVA-Protocolo-Vida-Autopoietica-/"
URL_CERT = f"{URL_GITHUB}web/certificado.html?folio={SELLO}"


def log_custodia(msg: str):
    AUDIT_DIR.mkdir(exist_ok=True)
    ts = datetime.utcnow().isoformat() + "Z"
    entry = f"[{ts}] [PDF:{FOLIO_MAESTRO}:{FOLIO_PERICIAL}:{SHA}] {msg}"
    print(entry)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(entry + "\n")


def ensure_qr():
    if QR_PATH.exists() or QR_PATH_OLD.exists():
        return True
    print("[*] QR no existe, generando MT01JAAF...")
    try:
        from scripts.qr_generator import generate_qr

        generate_qr()
        return True
    except Exception as e:
        print(f"[!] No se pudo generar QR: {e}")
        return False


def generate_pdf():
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.units import mm
        from reportlab.lib import colors
        from reportlab.platypus import (
            SimpleDocTemplate,
            Paragraph,
            Spacer,
            Image,
            Table,
            TableStyle,
        )
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
    except ImportError:
        os.system("pip install reportlab --quiet")
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.units import mm
        from reportlab.lib import colors
        from reportlab.platypus import (
            SimpleDocTemplate,
            Paragraph,
            Spacer,
            Image,
            Table,
            TableStyle,
        )
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY

    ensure_qr()
    AUDIT_DIR.mkdir(exist_ok=True)
    print(f"[*] Generando PDF MT01JAAF folio {FOLIO_MAESTRO}")

    doc = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=A4,
        rightMargin=20 * mm,
        leftMargin=20 * mm,
        topMargin=15 * mm,
        bottomMargin=15 * mm,
        title=f"Dictamen PVA {FOLIO_MAESTRO} {FOLIO_PERICIAL}",
        author=PERITO,
    )

    styles = getSampleStyleSheet()
    style_title = ParagraphStyle(
        "Title2",
        parent=styles["Title"],
        fontSize=16,
        alignment=TA_CENTER,
        spaceAfter=6 * mm,
        textColor=colors.HexColor("#0a0a0a"),
    )
    style_h2 = ParagraphStyle(
        "H2",
        parent=styles["Heading2"],
        fontSize=11,
        spaceAfter=3 * mm,
        spaceBefore=5 * mm,
        textColor=colors.HexColor("#1a1a1a"),
    )
    style_normal = ParagraphStyle(
        "Normal2", parent=styles["Normal"], fontSize=9, leading=13, alignment=TA_JUSTIFY
    )
    style_mono = ParagraphStyle(
        "Mono",
        parent=styles["Normal"],
        fontSize=7.5,
        leading=10,
        fontName="Courier",
        textColor=colors.HexColor("#333333"),
    )

    story = []
    story.append(
        Paragraph(
            f"DICTAMEN PERICIAL INFORMÁTICO<br/>PVA - PROTOCOLO VIDA AUTOPOIÉTICA<br/>FOLIO PERICIAL {FOLIO_PERICIAL}",
            style_title,
        )
    )
    story.append(
        Paragraph(
            f"Maestro: <b>{FOLIO_MAESTRO}</b> | Pericial: <b>{FOLIO_PERICIAL}</b> | SHA: <b>{SHA}</b> | Sello: {SELLO}",
            style_mono,
        )
    )
    story.append(Spacer(1, 4 * mm))

    data = [
        ["Folio Maestro", FOLIO_MAESTRO],
        ["Folio Pericial", FOLIO_PERICIAL],
        ["SHA", SHA],
        ["Perito", PERITO],
        ["Génesis SHA256", GENESIS],
        ["Sello KRONOS TRACE", SELLO],
        ["TX Amoy 80002", TX],
        ["SC SafeCreative", SC],
        ["GitHub Pages", URL_GITHUB],
        ["Certificado", URL_CERT],
        ["Fecha Cierta UTC", datetime.utcnow().isoformat() + "Z"],
        ["Norma", "NOM-151 Art.8,10,38 + ISO 27001 + eIDAS + MT01JAAF"],
    ]
    t = Table(data, colWidths=[35 * mm, 115 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f0f0f0")),
                ("TEXTCOLOR", (0, 0), (-1, -1), colors.black),
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.grey),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 5 * mm))

    story.append(Paragraph("1. OBJETO DEL DICTAMEN MT01JAAF", style_h2))
    story.append(
        Paragraph(
            f"Se dictamina que el hash génesis <b>{GENESIS}</b> (prefijo SHA <b>{SHA}</b>) fue capturado con polaridad 51% humano / 49% IA, sellado con <b>FOLIO_MAESTRO:{FOLIO_MAESTRO}|FOLIO_PERICIAL:{FOLIO_PERICIAL}|SHA:{SHA}|PERITO:{PERITO}|GENESIS:{GENESIS}</b> y registrado en Polygon Amoy chainId {CHAIN_ID} en TX {TX}. Sello TRACE completo: {SELLO}. SC {SC}. Cadena de custodia en audit/cadena_custodia.log NOM-151.",
            style_normal,
        )
    )
    story.append(Spacer(1, 3 * mm))

    story.append(Paragraph("2. MANIFIESTO 51/49 MT01JAAF", style_h2))
    manifiesto_text = f"51%_HUMANO:{GENESIS[:32]}|49%_IA:{GENESIS[32:]}|FOLIO_PERICIAL:{FOLIO_PERICIAL}|SHA:{SHA}|SELLO:{SELLO}|SC:{SC}"
    if MANIFIESTO_PATH.exists():
        try:
            manifiesto_text = MANIFIESTO_PATH.read_text(encoding="utf-8")[:600]
        except:
            pass
    story.append(Paragraph(manifiesto_text, style_mono))
    story.append(Spacer(1, 3 * mm))

    story.append(Paragraph("3. VERIFICACIÓN MT01JAAF", style_h2))
    story.append(
        Paragraph(
            f"QR adjunto apunta a {URL_CERT} y GitHub Pages {URL_GITHUB}. Polygonscan Amoy: https://amoy.polygonscan.com/tx/{TX}. API /api/verifica/{SELLO}. Cualquiera puede validar sin contactar al perito. ChainId {CHAIN_ID} Polygon Amoy.",
            style_normal,
        )
    )
    story.append(Spacer(1, 4 * mm))

    qr_use = (
        QR_PATH if QR_PATH.exists() else QR_PATH_OLD if QR_PATH_OLD.exists() else None
    )
    if qr_use:
        story.append(Image(str(qr_use), width=35 * mm, height=35 * mm))
        story.append(Spacer(1, 2 * mm))
        story.append(
            Paragraph(
                f"QR MT01JAAF verificación {FOLIO_PERICIAL} SHA {SHA}", style_mono
            )
        )

    story.append(Spacer(1, 6 * mm))
    story.append(Paragraph("4. CONCLUSIÓN PERICIAL MT01JAAF", style_h2))
    story.append(
        Paragraph(
            f"El dictamen maestro <b>{FOLIO_MAESTRO}</b> pericial <b>{FOLIO_PERICIAL}</b> SHA <b>{SHA}</b> cumple fecha cierta, integridad y atribuibilidad NOM-151. Sello {SELLO} auténtico y trazable en Amoy TX {TX} SC {SC}. Para MP, SAT y tribunales. 100/10 luz prendida.",
            style_normal,
        )
    )
    story.append(Spacer(1, 8 * mm))
    story.append(
        Paragraph(
            f"_________________________________<br/>Marco Antonio Rojas Valdovinos<br/>Perito Informático {FOLIO_MAESTRO} / {FOLIO_PERICIAL} SHA {SHA}<br/>{PERITO}<br/>FIEL SAT + Sello {SELLO} + SC {SC} + TX {TX[:18]}...",
            style_normal,
        )
    )

    doc.build(story)
    print(f"[OK] PDF MT01JAAF: {PDF_PATH}")
    log_custodia(f"PDF MT01JAAF generado {PDF_PATH}")

    audit_content = f"""# AUDITORIA ISO NOM PVA MT01JAAF 100/10
Folio Maestro: {FOLIO_MAESTRO}
Folio Pericial: {FOLIO_PERICIAL}
SHA: {SHA}
Perito: {PERITO}
Genesis: {GENESIS}
Sello TRACE: {SELLO}
TX Amoy: {TX}
SC: {SC}
ChainId: {CHAIN_ID}
GitHub: {URL_GITHUB}
Certificado: {URL_CERT}
Fecha: {datetime.utcnow().isoformat()}Z

## NOM-151
- Fecha cierta: Amoy block.timestamp TX {TX}
- Integridad: SHA256 {GENESIS} prefijo {SHA}
- Atribuibilidad: FOLIO_MAESTRO:{FOLIO_MAESTRO}|FOLIO_PERICIAL:{FOLIO_PERICIAL}|SHA:{SHA}|PERITO:{PERITO}
- Conservación: audit/cadena_custodia.log 10 años
- Sello: {SELLO}

## ISO 27001:2022
A5.9 sello_kronos.json con MT01JAAF
A5.17 web3_auth.js Amoy 80002
A8.3 private_keys/ en .gitignore + KMS + {FOLIO_PERICIAL}
A8.24 SHA256 {SHA} + ECDSA
A8.26 blockchain_verifier.py Amoy
A8.28 oracle.js regex MT01JAAF

## eIDAS + SafeCreative
Sello avanzado {SELLO} con Amoy QR + SC {SC} + TX {TX}

## Verificación 100/10
GitHub Pages: {URL_GITHUB}
Certificado: {URL_CERT}
Polygonscan Amoy: https://amoy.polygonscan.com/tx/{TX}
API: /api/verifica/{SELLO}
QR: {QR_PATH}
"""
    AUDIT_MD_PATH.write_text(audit_content, encoding="utf-8")
    print(f"[OK] Auditoría MD MT01JAAF: {AUDIT_MD_PATH}")
    log_custodia(f"Auditoría MD MT01JAAF {AUDIT_MD_PATH}")
    return str(PDF_PATH)


def main():
    print(
        f"╔════════════════════════════════════════════╗\n║ PVA PDF DICTAMEN MT01JAAF SHA {SHA} ║\n║ Maestro:{FOLIO_MAESTRO} Pericial:{FOLIO_PERICIAL} ║\n║ Sello:{SELLO} ║\n╚════════════════════════════════════════════╝"
    )
    path = generate_pdf()
    print(f"\n[FIN] MT01JAAF Dictamen: {path}\nAuditoría: {AUDIT_MD_PATH}")


if __name__ == "__main__":
    main()
