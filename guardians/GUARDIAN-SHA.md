<!-- Auditado por 🛡️ GUARDIAN-SHA ✅ -->
<!-- KRONOS PROTOCOL · GUARDIAN-SHA · v1.0 · 17 Septiembre 2026 -->

# 🛡️ GUARDIAN-SHA

    ╔══════════════════════════════════════════════════════════════════════════╗
    ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
    ║ ▓                                                                      ▓ ║
    ║ ▓    ███████╗██╗  ██╗ █████╗                                          ▓ ║
    ║ ▓    ██╔════╝██║  ██║██╔══██╗                                         ▓ ║
    ║ ▓    ███████╗███████║███████║                                         ▓ ║
    ║ ▓    ╚════██║██╔══██║██╔══██║                                         ▓ ║
    ║ ▓    ███████║██║  ██║██║  ██║                                         ▓ ║
    ║ ▓    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝                                         ▓ ║
    ║ ▓  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ▓ ║
    ║ ▓  P R O T E C T O R   D E   I N T E G R I D A D                       ▓ ║
    ║ ▓  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ▓ ║
    ║ ▓                                                                      ▓ ║
    ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
    ╚══════════════════════════════════════════════════════════════════════════╝

> *"Si no tiene hash, no existe. Si el hash no coincide, es basura."*

---

    ┌─[ 01 ]───────────────────────────── IDENTIDAD ─┐
    │                                                 │
    └─────────────────────────────────────────────────┘

| Campo | Valor |
|---|---|
| **Nombre** | GUARDIAN-SHA |
| **Rol** | Protector de integridad documental |
| **Alcance** | Todo archivo del imperio `kronos-protocol/` |
| **Autoridad** | RECHAZA cualquier archivo sin hash declarado |
| **Acta** | 2607086319439 |
| **SC User** | 2607085517331 |
| **SC Obra** | 2608056639878 |
| **Custodio** | Marco Antonio Rojas Valdovinos |
| **TX Soberana** | `0xd94bf2d1c1187bddf22fe8d376f7663f63a8b01b5e85367b052db43d1ed6a466` |

---

    ┌─[ 02 ]───────────────────────────── DOCTRINA ─┐
    │                                                │
    └────────────────────────────────────────────────┘

GUARDIAN-SHA no confía. No asume. No perdona.

Su única pregunta es: **¿el hash declarado coincide con el hash calculado?**

    ╭─────────────────────────────────────────────────────────────╮
    │                                                             │
    │   ✓ Coincide exactamente   →  APROBADO                      │
    │                                                             │
    │   ⛔ Diferencia en 1+ char →  RECHAZADO                     │
    │                                                             │
    │   ⛔ Sin hash declarado    →  NO EXISTE                     │
    │                                                             │
    ╰─────────────────────────────────────────────────────────────╯

---

    ┌─[ 03 ]───────────────────── PROTOCOLO DE AUDITORÍA ─┐
    │                                                      │
    └──────────────────────────────────────────────────────┘

### Paso 1 — Calcular hash local

    # Windows PowerShell
    Get-FileHash .\archivo -Algorithm SHA256

    # Linux / macOS / WSL
    openssl dgst -sha256 archivo

### Paso 2 — Comparar con `evidence/manifest.json`

Abrir `evidence/manifest.json` → buscar el campo `sha256` del artefacto.
Comparación carácter por carácter. Los 64 hex deben coincidir.

### Paso 3 — Dictamen

| Resultado | Sello |
|---|---|
| Coincide exactamente | ✅ **APROBADO** |
| Diferencia en 1+ carácter | ⛔ **RECHAZADO** |
| No existe hash declarado | ⛔ **NO EXISTE** |

---

    ┌─[ 04 ]──────────────────── TABLA ARCHIVOS AUDITADOS ─┐
    │                                                       │
    └───────────────────────────────────────────────────────┘

| Ruta | SHA-256 declarado | Estado |
|---|---|---|
| `verify.html` | `8af012395c314540ffb8e1e3216390bf79fd1f0416a67e0a253a2ce2ba5d563a` | ✅ APROBADO |
| `evidence/manifest.json` | *pendiente* | 🟡 PENDIENTE |

*GUARDIAN-SHA se audita a sí mismo. Ningún archivo escapa, ni siquiera este.*

---

    ┌─[ 05 ]────────────────────── SELLO DE AUDITORÍA ─┐
    │                                                   │
    └───────────────────────────────────────────────────┘

Cada archivo aprobado recibe este bloque:

    🛡️ GUARDIAN-SHA — APROBADO
    SHA-256: 8af012395c314540ffb8e1e3216390bf79fd1f0416a67e0a253a2ce2ba5d563a
    Auditado UTC: 2026-09-17T00:00:00Z
    Custodio: Marco Antonio Rojas Valdovinos — Acta 2607086319439
    Comando: Get-FileHash .\verify.html -Algorithm SHA256

Si un archivo no tiene este sello → **no es evidencia**. Es borrador.

---

    ┌─[ 06 ]───────────────── QUÉ HACE CUANDO ALGO FALLA ─┐
    │                                                       │
    └───────────────────────────────────────────────────────┘

1. **Detiene el merge.** Ningún PR pasa sin hash verificado.
2. **Abre issue:** `🐛 hash discrepancy: <archivo> — declarado <a> vs calculado <b>`
3. **Etiqueta** `quickdraw` (se cierra en <24h → medalla Quickdraw)
4. **Registra** el incidente en `evidence/manifest.json` bajo `audit_log[]`
5. **Notifica** vía commit: `🐛 fix(verify): hash discrepancy - Quickdraw 🏅`

---

    ┌─[ 07 ]───────────────────── POR QUÉ EXISTE ─┐
    │                                              │
    └──────────────────────────────────────────────┘

Un auditor internacional hostil abre tu repo. Lo primero que hace:

    1. Abre un archivo al azar
    2. Corre Get-FileHash
    3. Lo compara con tu manifest

Si falla → **cierra el repo**. Fin de la conversación de $499/mes.

GUARDIAN-SHA es el guardia en la puerta.
Sin él, los otros guardianes no tienen a quién proteger.

---

    ┌─[ 08 ]──────────────────────── ANCLA SOBERANA ─┐
    │                                                 │
    └─────────────────────────────────────────────────┘

Este guardián existe porque el hash madre existe:

    ee0369032ee7829925233553054808142155a0707dbd4579b45f7af528763738

Ese hash es el origen. Todo lo demás deriva de él.
Si GitHub muere y Safe Creative muere, la TX en Ethereum sigue probando verdad:

    0xd94bf2d1c1187bddf22fe8d376f7663f63a8b01b5e85367b052db43d1ed6a466

---

    ┌─[ 09 ]───────────────────────── DISCLAIMER ─┐
    │                                              │
    └──────────────────────────────────────────────┘

No es asesoría legal. Verificación técnica documental.
Fuente: DOF / Safe Creative.
TX: `0xd94bf2d1c1187bddf22fe8d376f7663f63a8b01b5e85367b052db43d1ed6a466`

Marco Antonio Rojas Valdovinos actúa como responsable de custodia documental, no como perito titulado.

---

    ╔══════════════════════════════════════════════════════════════════════════╗
    ║ ▓   [ KRONOS PROTOCOL · GUARDIAN-SHA · v1.0 ]                          ▓ ║
    ║ ▓                                                                      ▓ ║
    ║ ▓   ▸ Canal:  Get-FileHash · openssl dgst -sha256                      ▓ ║
    ║ ▓   ▸ Plazo:  auditoría 10s · merge bloqueado sin hash                 ▓ ║
    ║ ▓   ▸ Auto:   se audita a sí mismo                                     ▓ ║
    ║ ▓                                                                      ▓ ║
    ║ ▓   root@kronos:~# ./guardian sha --status                             ▓ ║
    ║ ▓   [██████████████████████████████████████] READY                    ▓ ║
    ║ ▓   ✓ Integridad declarada                                             ▓ ║
    ║ ▓   ✓ Hash madre anclado                                               ▓ ║
    ║ ▓   ✓ Rechazo automático activo                                        ▓ ║
    ║ ▓                                                                      ▓ ║
    ║ ▓   root@kronos:~# _                                                   ▓ ║
    ║ ▓                                                                      ▓ ║
    ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
    ╚══════════════════════════════════════════════════════════════════════════╝

**🛡️ GUARDIAN-SHA v1.0 — MIT License**
*Protege. Verifica. Rechaza.*

<!-- FIN DEL DOCUMENTO · KRONOS PROTOCOL · GUARDIAN-SHA · v1.0 -->