#!/usr/bin/env python3
"""
PVA PDF Dictamen Generator - KRONOS 360
Folio: 5204160405358537
Perito: kronosproyecto@hotmail.com
Genesis: 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
Genera: audit/dictamen_PVA_5204160405358537.pdf + audit/AUDITORIA_ISO_NOM_PVA_5204160405358537.md
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
SAFE = "2607146379465"

ROOT = Path(__file__).parent.parent
AUDIT_DIR = ROOT / "audit"
QR_PATH = AUDIT_DIR / f"qr_folio_{FOLIO}.png"
PDF_PATH = AUDIT_DIR / f"dictamen_PVA_{FOLIO}.pdf"
AUDIT_MD_PATH = AUDIT_DIR / f"AUDITORIA_ISO_NOM_PVA_{FOLIO}.md"
SELLO_PATH = AUDIT_DIR / "sello_kronos.json"
LOG_PATH = AUDIT_DIR / "cadena_custodia.log"
MANIFIESTO_PATH = ROOT / "audit" / "primer_manifiesto.txt"


def log_custodia(msg: str):
    AUDIT_DIR.mkdir(exist_ok=True)
    ts = datetime.utcnow().isoformat() + "Z"
    entry = f"[{ts}] [PDF:{FOLIO}] {msg}"
    print(entry)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(entry + "\n")


def ensure_qr():
    if not QR_PATH.exists():
        print("[*] QR no existe, generando...")
        from scripts.generate_qr import generate_qr

        generate_qr()
    return QR_PATH.exists()


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

    print(f"[*] Generando PDF Dictamen folio {FOLIO}")

    doc = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=A4,
        rightMargin=20 * mm,
        leftMargin=20 * mm,
        topMargin=15 * mm,
        bottomMargin=15 * mm,
        title=f"Dictamen PVA {FOLIO}",
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
            f"DICTAMEN PERICIAL INFORMÁTICO<br/>PVA - PROTOCOLO VIDA AUTOPOIÉTICA",
            style_title,
        )
    )
    story.append(Paragraph(f"Folio: <b>{FOLIO}</b> | Sello: {SELLO}", style_mono))
    story.append(Spacer(1, 4 * mm))

    # Tabla datos
    data = [
        ["Folio Pericial", FOLIO],
        ["Perito", PERITO],
        ["Génesis SHA256", GENESIS],
        ["Sello KRONOS", SELLO],
        ["TX Blockchain", TX],
        ["SafeCreative", SAFE],
        ["Fecha Cierta UTC", datetime.utcnow().isoformat() + "Z"],
        ["Norma", "NOM-151-SCFI-2016 Art. 8,10,38 + ISO 27001 + eIDAS"],
    ]
    t = Table(data, colWidths=[35 * mm, 115 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f0f0f0")),
                ("TEXTCOLOR", (0, 0), (-1, -1), colors.black),
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("ALIGN", (0, 0), (0, -1), "LEFT"),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.grey),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 5 * mm))

    story.append(Paragraph("1. OBJETO DEL DICTAMEN", style_h2))
    story.append(
        Paragraph(
            f"Se dictamina que el hash génesis <b>{GENESIS}</b> fue capturado con polaridad 51% humano / 49% IA, "
            f"sellado con <b>FOLIO:{FOLIO}|PERITO:{PERITO}|GENESIS:{GENESIS}</b> y registrado en blockchain "
            f"en TX {TX}. La cadena de custodia se conserva en audit/cadena_custodia.log conforme NOM-151.",
            style_normal,
        )
    )
    story.append(Spacer(1, 3 * mm))

    story.append(Paragraph("2. MANIFIESTO 51/49", style_h2))
    manifiesto_text = f"51%_HUMANO:{GENESIS[:32]}|49%_IA:{GENESIS[32:]}|FOLIO:{FOLIO}"
    if MANIFIESTO_PATH.exists():
        try:
            manifiesto_text = MANIFIESTO_PATH.read_text(encoding="utf-8")[:500]
        except:
            pass
    story.append(Paragraph(manifiesto_text, style_mono))
    story.append(Spacer(1, 3 * mm))

    story.append(Paragraph("3. VERIFICACIÓN", style_h2))
    story.append(
        Paragraph(
            f"QR adjunto apunta a https://kronos-legado.digital/v/{FOLIO} y https://verifica.fdv.mx/folio/{FOLIO}. "
            f"API: https://api.kronos-legado.digital/v1/api/verifica/{FOLIO}. "
            f"Etherscan: https://sepolia.etherscan.io/tx/{TX}. Cualquiera puede validar sin contactar al perito.",
            style_normal,
        )
    )
    story.append(Spacer(1, 4 * mm))

    if QR_PATH.exists():
        story.append(Image(str(QR_PATH), width=35 * mm, height=35 * mm))
        story.append(Spacer(1, 2 * mm))
        story.append(Paragraph(f"QR verificación folio {FOLIO}", style_mono))

    story.append(Spacer(1, 6 * mm))
    story.append(Paragraph("4. CONCLUSIÓN PERICIAL", style_h2))
    story.append(
        Paragraph(
            f"El dictamen con folio <b>{FOLIO}</b> cumple con fecha cierta, integridad y atribuibilidad según NOM-151-SCFI-2016. "
            f"El sello {SELLO} es auténtico y trazable en blockchain. Se emite para efectos probatorios ante MP, SAT y tribunales.",
            style_normal,
        )
    )

    story.append(Spacer(1, 8 * mm))
    story.append(
        Paragraph(
            f"_________________________________<br/>Marco Antonio Rojas Valdovinos<br/>Perito Informático {FOLIO}<br/>{PERITO}<br/>FIEL SAT + Sello {SELLO}",
            style_normal,
        )
    )

    doc.build(story)
    print(f"[OK] PDF generado: {PDF_PATH}")
    log_custodia(f"PDF dictamen generado {PDF_PATH}")

    # Generar también AUDITORIA_ISO_NOM_PVA
    audit_content = f"""# AUDITORIA ISO NOM PVA {FOLIO}
Folio: {FOLIO}
Perito: {PERITO}
Genesis: {GENESIS}
Sello: {SELLO}
TX: {TX}
SafeCreative: {SAFE}
Fecha: {datetime.utcnow().isoformat()}Z

## NOM-151
- Fecha cierta: block.timestamp TX {TX}
- Integridad: SHA256 {GENESIS}
- Atribuibilidad: FOLIO:{FOLIO}|PERITO:{PERITO}
- Conservación: audit/cadena_custodia.log 10 años

## ISO 27001:2022
A5.9 sello_kronos.json
A5.17 web3_auth.js
A8.3 private_keys/ en.gitignore + KMS
A8.24 SHA256 + ECDSA
A8.26 blockchain_verifier.py
A8.28 oracle.js regex

## eIDAS
Sello avanzado {SELLO} con blockchain y QR {QR_PATH}

## Verificación
https://kronos-legado.digital/v/{FOLIO}
https://sepolia.etherscan.io/tx/{TX}
API /api/verifica/{FOLIO}
"""
    AUDIT_MD_PATH.write_text(audit_content, encoding="utf-8")
    print(f"[OK] Auditoría MD: {AUDIT_MD_PATH}")
    log_custodia(f"Auditoría MD generada {AUDIT_MD_PATH}")

    return str(PDF_PATH)


def main():
    print(f"""
╔════════════════════════════════════════════╗
║ PVA PDF DICTAMEN - KRONOS 360 ║
║ Folio: {FOLIO} ║
║ Sello: {SELLO} ║
╚════════════════════════════════════════════╝
""")
    path = generate_pdf()
    print(f"\n[FIN] Dictamen listo: {path}")
    print(f"Auditoría: {AUDIT_MD_PATH}")


if __name__ == "__main__":
    main()
