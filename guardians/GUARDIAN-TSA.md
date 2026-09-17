<!-- Auditado por 🛡️ GUARDIAN-SHA ✅ -->
<!-- KRONOS PROTOCOL · GUARDIAN-TSA · v1.0 · 17 Septiembre 2026 -->

# ⚖️ GUARDIAN-TSA

    ╔══════════════════════════════════════════════════════════════════════════╗
    ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
    ║ ▓    ████████╗███████╗ █████╗                                          ▓ ║
    ║ ▓    ╚══██╔══╝██╔════╝██╔══██╗                                         ▓ ║
    ║ ▓       ██║   ███████╗███████║                                         ▓ ║
    ║ ▓       ██║   ╚════██║██╔══██║                                         ▓ ║
    ║ ▓       ██║   ███████║██║  ██║                                         ▓ ║
    ║ ▓       ╚═╝   ╚══════╝╚═╝  ╚═╝                                         ▓ ║
    ║ ▓  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ▓ ║
    ║ ▓  P R O T E C T O R   D E L   T I E M P O                             ▓ ║
    ║ ▓  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ▓ ║
    ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
    ╚══════════════════════════════════════════════════════════════════════════╝

> *"Sin sello de tiempo, no es evidencia. Es solo un hash con buena memoria."*

---

    ┌─[ 01 ]───────────────────────────── IDENTIDAD ─┐
    │                                                 │
    └─────────────────────────────────────────────────┘

| Campo | Valor |
|---|---|
| **Nombre** | GUARDIAN-TSA |
| **Rol** | Protector del tiempo documental (RFC 3161) |
| **Alcance** | Todo artefacto en `evidence/manifest.json` |
| **Autoridad** | RECHAZA cualquier archivo sin `.tsr` válido |
| **Estándar** | ETSI EN 319 422 + RFC 3161 + NIST SP 800-53 AU-8 |
| **Acta** | 2607086319439 |
| **TX Soberana** | `0xd94bf2d1c1187bddf22fe8d376f7663f63a8b01b5e85367b052db43d1ed6a466` |

---

    ┌─[ 02 ]───────────────────────────── DOCTRINA ─┐
    │                                                │
    └────────────────────────────────────────────────┘

Un hash sin TSA es un testigo sin reloj.
Un hash con TSA es evidencia admisible.

    ╭─────────────────────────────────────────────────────────────╮
    │                                                             │
    │  ¿Existe .tsr firmado por TSA acreditada?                   │
    │      NO  →  RECHAZADO                                       │
    │      SÍ  →  ¿Coincide con el hash?                          │
    │              NO  →  RECHAZADO                               │
    │              SÍ  →  ✅ APROBADO                             │
    │                                                             │
    ╰─────────────────────────────────────────────────────────────╯

---

    ┌─[ 03 ]───────────────────── TSA DISPONIBLES ─┐
    │                                              │
    └──────────────────────────────────────────────┘

| TSA | URL | Costo |
|---|---|---|
| **FreeTSA** | `https://freetsa.org/tsr` | $0 |
| **DigiCert** | `http://timestamp.digicert.com` | $0 |
| **Sectigo** | `http://timestamp.sectigo.com` | $0 |

Recomendado: **FreeTSA** — verificable por tercero sin registro.

---

    ┌─[ 04 ]────────────────── GENERAR .TSR SIN TERMINAL ─┐
    │                                                      │
    └──────────────────────────────────────────────────────┘

1. Abrir `https://freetsa.org/index_en.php`
2. Sección "TimeStamp Query Tool"
3. Subir `verify.html`
4. Descargar el `.tsr`
5. Subir a `evidence/verify.html.tsr` vía GitHub Web
6. Descargar CA → subir como `evidence/tsa.crt`

---

    ┌─[ 05 ]────────────────── VERIFICACIÓN CON OPENSSL ─┐
    │                                                     │
    └─────────────────────────────────────────────────────┘

    openssl ts -verify -in evidence/verify.html.tsr -data verify.html -CAfile evidence/tsa.crt

Debe responder: `Verification: OK`

---

    ┌─[ 06 ]───────────────────────── DISCLAIMER ─┐
    │                                              │
    └──────────────────────────────────────────────┘

No es asesoría legal. Verificación técnica documental.
Fuente: DOF / Safe Creative.
TX: `0xd94bf2d1c1187bddf22fe8d376f7663f63a8b01b5e85367b052db43d1ed6a466`

---

    ╔══════════════════════════════════════════════════════════════════════════╗
    ║ ▓   [ KRONOS PROTOCOL · GUARDIAN-TSA · v1.0 ]                          ▓ ║
    ║ ▓   root@kronos:~# ./guardian tsa --status                             ▓ ║
    ║ ▓   [██████████████████████████████████████] READY                    ▓ ║
    ║ ▓   ✓ RFC 3161 declarado · ✓ CA anclada · ✓ sin .tsr = RECHAZADO      ▓ ║
    ╚══════════════════════════════════════════════════════════════════════════╝

**⚖️ GUARDIAN-TSA v1.0 — MIT License**
*Sella el tiempo. Sin reloj, no hay evidencia.*

<!-- FIN DEL DOCUMENTO -->