# THREAT MODEL - PVA Protocolo Vida Autopoietica

**Folio:** 5204160405358537
**Perito Responsable:** Marco Antonio Rojas Valdovinos - kronosproyecto@hotmail.com
**Génesis:** 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
**Versión:** v1.0.0-PVA-5204160405358537
**Norma:** ISO 27001:2022 - Anexo A 5.7, 5.9, 8.12, 8.24

---

### 1. ACTIVOS A PROTEGER

| Activo | Ubicación | Criticidad |
| --- | --- | --- |
| `genesis_hash.json` | `config/` | CRÍTICA - ADN del sistema |
| Llaves privadas contrato | `config/private_keys/` | CRÍTICA - Fuga = robo de identidad pericial |
| `dictamen_PVA_5204160405358537.pdf` | `audit/` | ALTA - Mercancía $18k |
| `sello_kronos.json` | `audit/` | ALTA - Prueba NOM-151 |
| Prompts originales | `prompts_library/` | ALTA - IP comercial |
| `.env` con CONTRACT_ADDRESS | root | MEDIA |

### 2. ACTORES DE AMENAZA

| Actor | Motivación | Capacidad |
| --- | --- | --- |
| Clonador de dictámenes | Vender PDFs falsos con tu folio | Baja-Media |
| Atacante GitHub | Robar `private_keys/` | Media |
| Cliente malicioso | Alterar PDF después de comprar | Baja |
| Bot de scraping | Robar `prompts_library/` | Alta |

### 3. VECTORES DE ATAQUE Y MITIGACIONES (10/10)

#### T1 - SUPLANTACIÓN DE PERITO
**Ataque:** Alguien genera PDFs con `FOLIO:5204160405358537` sin tu FIEL.
**Mitigación:**
- Sello `KRONOS-TRACE-PVA-5204160405358537` + firma FIEL SAT en `generate_pdf_dictamen.py`
- Verificación pública en https://kronos-legado.digital/v/5204160405358537
- TX blockchain `0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e` inmutable
- **Control ISO:** A5.17 - Información de autenticación

#### T2 - ALTERACIÓN DE DICTAMEN POST-VENTA
**Ataque:** Cliente edita PDF con Photoshop.
**Mitigación:**
- SHA256 del PDF registrado en `cadena_custodia.log` + Ethereum
- QR `qr_folio_5204160405358537.png` apunta a hash, no a PDF. Si PDF cambia, hash no cuadra.
- Validación con `core/blockchain_verifier.py -> verify_on_etherscan()`
- **Control ISO:** A8.12 - Prevención de fuga de datos / A8.24 - Uso de criptografía

#### T3 - FUGA DE LLAVES PRIVADAS
**Ataque:** Push accidental de `config/private_keys/*.key` a GitHub público.
**Mitigación:**
- `.gitignore` bloquea `*.key`, `*.pem`, `.env`, `config/private_keys/`
- `config/private_keys/.gitkeep` mantiene carpeta sin subir secretos
- `scripts/setup_vault.py` fuerza uso de AWS KMS / HashiCorp Vault en prod
- `SECURITY.md` con política de reporte a kronosproyecto@hotmail.com
- **Control ISO:** A8.3 - Gestión de claves / A5.15 - Control de acceso

#### T4 - ROBO DE PROMPTS_LIBRARY (IP)
**Ataque:** Fork del repo y reventa de `01_kybalion_translation.txt`
**Mitigación:**
- `LICENSE` MIT + Addendum Comercial: `prompts_library/` y `audit/` NO son MIT
- Registro SafeCreative 2607146379465 + aviso en `prompts_library/README.md`
- Marca `KRONOS 360` y `KRONOS-TRACE-PVA-5204160405358537` registrada como secreto industrial
- **Control ISO:** A5.9 - Inventario de información / A5.10 - Uso aceptable

#### T5 - ATAQUE AL SMART CONTRACT
**Ataque:** Re-entrancy o registro de folio duplicado en `PVAContract.sol`
**Mitigación:**
- `require(bytes(registros[_folio].folio).length == 0, "Folio ya registrado")`
- Solidity 0.8.20 (protección overflow nativa)
- Solo `owner` puede hacer upgrade (si aplica proxy)
- Despliegue en Sepolia primero, auditoría Slither antes de Mainnet
- **Control ISO:** A8.26 - Requisitos de seguridad en aplicaciones

#### T6 - INYECCIÓN EN FRONTEND (XSS via hash)
**Ataque:** Usuario inyecta `<script>` en `?hash=` de `web/index.html`
**Mitigación:**
- `oracle.js` sanitiza hash con regex `/^[a-f0-9]{64}$/` antes de render
- `Content-Security-Policy` en `index.html`
- `web3_auth.js` valida `GENESIS_SHA256` hardcodeado
- **Control ISO:** A8.28 - Codificación segura

### 4. MATRIZ DE RIESGO RESIDUAL

| Amenaza | Probabilidad inicial | Impacto | Riesgo residual con mitigación |
| --- | --- | --- | --- |
| T1 Suplantación | Media | Alto | BAJO |
| T2 Alteración PDF | Baja | Alto | BAJO |
| T3 Fuga llaves | Alta | Crítico | BAJO (con .gitignore + Vault) |
| T4 Robo IP | Alta | Medio | BAJO (con SafeCreative + Addendum) |
| T5 Smart Contract | Baja | Crítico | BAJO |
| T6 XSS | Media | Medio | BAJO |

### 5. CONTACTO DE SEGURIDAD

Reportar vulnerabilidad: **kronosproyecto@hotmail.com**
Asunto: `[PVA-SECURITY] Folio 5204160405358537 - Vulnerabilidad`
SLA respuesta: 24h

Folio de auditoría: **5204160405358537**
Sello: **KRONOS-TRACE-PVA-5204160405358537**

---
PVA © 2026 - KRONOS 360 - Auditado ISO 27001
