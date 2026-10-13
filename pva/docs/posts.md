# Posts de difusión

## 1. r/GalaxyS9

**Título:** Analicé 10 meses de logs de almacenamiento de mi S9+. Encontré ECC/TMO crónicos. Hice una herramienta web para que cualquiera lo revise.

**Cuerpo:**

Tenía un S9+ (SM-G9650, Android 10) corriendo desde 2023. Hace un par de meses empecé a revisar los logs `m0_history` que Samsung guarda en el firmware del chip UFS — telemetría interna que persiste entre reinicios.

El resumen del hallazgo:

- **147 entradas** de historial analizadas
- **84 presentan anomalías** (57%)
- **ECC = 162** (correcciones de datos del chip)
- **TMO = 220** (timeouts de I/O)
- **Pico TMO = 26** el 2025-11-18

El periodo activo va desde marzo 2025 hasta enero 2026. Anomalías continuas, sin ventanas limpias.

ECC aislado es normal — 1-2 al mes. 162 en 10 meses es una tendencia. TMO con picos de 26 en un día no es ruido.

Armé una herramienta en el navegador para que cualquiera pueda revisar su propio teléfono. Es 100% client-side, sin instalación, sin subir nada a ningún servidor:

https://marcorojas17.github.io/PVA-Protocolo-Vida-Autopoietica-/pva.html

Pestaña PANORAMA → cargas tu `m0_history.txt` → ANALIZAR TODO → te sale la lectura.

Si alguien tiene logs de su S9+ o de otro Samsung, me interesa comparar. ¿Ven el mismo patrón?

El caso completo documentado: https://github.com/marcorojas17/PVA-Protocolo-Vida-Autopoietica-/blob/main/docs/caso-s9-plus.md

---

## 2. XDA Developers → Samsung Galaxy S9+ → General

**Título:** Análisis técnico: ECC/TMO crónicos en SM-G9650 (10 meses de logs fsdbg)

**Cuerpo:**

Comparto un análisis técnico sobre el subsistema de almacenamiento de un S9+ (Snapdragon, SM-G9650, UFS Samsung) usando los logs internos `m0_history` que el firmware mantiene.

**Periodo:** marzo 2025 → enero 2026
**Entradas analizadas:** 147
**Con anomalías:** 84 (57%)
**ECC acumulados:** 162
**TMO acumulados:** 220
**Pico TMO:** 26 en 2025-11-18 06:00:28

Los contadores ECC (Error Correction Code) y TMO (Timeout) provienen del propio controlador UFS y persisten entre reinicios. Son un registro silencioso del estado del chip que Samsung no expone en ninguna interfaz pública.

**Verificación de integridad:**
- SHA-256 m0_history_1: `262ca27a74599d81065ba6c4e143703e4d7fef66ca38bf2cd30985a337e1a964`
- SHA-256 m0_history_2: `1ebab25874c594a19d440bc7b3569db2a21f656820a5d179fa8058df9d43e519`

Cualquiera puede reproducir el análisis con la herramienta que armé (browser, sin instalación, sin backend):
https://marcorojas17.github.io/PVA-Protocolo-Vida-Autopoietica-/pva.html

Si alguien tiene logs de otros S9/S9+ o de S10/Note 9, me interesa comparar. ¿Es patrón de la línea, de la unidad, o del firmware?

Caso completo: https://github.com/marcorojas17/PVA-Protocolo-Vida-Autopoietica-/blob/main/docs/caso-s9-plus.md

---

## 3. r/ComputerForensics

**Título:** Free browser-based Samsung fsdbg parser — no install, no upload, SHA-256 included

**Cuerpo:**

Built a small tool for parsing Samsung's `fsdbg` diagnostic logs (`m0_history`, `u_history`, `us_history`, `ulc_history`) entirely in the browser.

**Why it matters for DFIR:**

- **Zero upload.** Everything runs client-side. `FileReader` + vanilla JS. Nothing leaves the device.
- **SHA-256 in-browser.** Uses `crypto.subtle.digest` for chain-of-custody hashing before analysis.
- **Multi-format auto-detect.** Detects log type by regex signature (raw gzip-base64, m0, u, us, ulc, or IWC WiFi logs).
- **Interpretation layer.** For `m0_history` it doesn't just count — it prints a plain-language readout of ECC/TMO patterns and the worst spike with timestamp.

Live demo:
https://marcorojas17.github.io/PVA-Protocolo-Vida-Autopoietica-/pva.html

Source:
https://github.com/marcorojas17/PVA-Protocolo-Vida-Autopoietica-

**Case study** — analyzed 147 entries from a SM-G9650 (S9+) spanning 10 months. Found 162 accumulated ECC events and 220 TMO events, with a peak of 26 TMO in a single day (2025-11-18). Full writeup:

https://github.com/marcorojas17/PVA-Protocolo-Vida-Autopoietica-/blob/main/docs/caso-s9-plus.md

Feedback welcome, especially from anyone who's done UFS-level forensics on Samsung devices.