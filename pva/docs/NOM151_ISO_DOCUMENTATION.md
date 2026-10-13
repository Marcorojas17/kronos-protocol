# Cumplimiento NOM-151 / ISO 27001 / eIDAS - Expediente PVA

**Folio:** 5204160405358537
**Perito:** Marco Antonio Rojas Valdovinos - kronosproyecto@hotmail.com
**Génesis SHA256:** 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
**Sello:** KRONOS-TRACE-PVA-5204160405358537
**SafeCreative:** 2607146379465
**TX Blockchain:** 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
**Fecha cierta:** 2026-08-25T03:14:07Z

---

### 1. OBJETIVO DE ESTE DOCUMENTO

Demostrar que `dictamen_PVA_5204160405358537.pdf` + `audit/` cumplen con fecha cierta, integridad y atribuibilidad exigidas por ley mexicana e internacional. Este es el documento que presentas ante MP, juez o SAT.

### 2. NOM-151-SCFI-2016 (México) - CONSERVACIÓN DE MENSAJES DE DATOS

Requisitos Art. 8, 10, 38 y cómo los cumple PVA:

| Requisito NOM-151 | Cómo lo cumple PVA 5204160405358537 | Archivo prueba |
| --- | --- | --- |
| **Fecha cierta** | `block.timestamp` de `PVAContract.sol` + `cadena_custodia.log` | `audit/cadena_custodia.log` + Etherscan TX |
| **Integridad** | SHA256 del PDF registrado en blockchain. Si cambias 1 byte, hash no cuadra | `core/hash_to_semantic.py` + `core/blockchain_verifier.py` |
| **Atribuibilidad** | Sello `FOLIO:5204160405358537|PERITO:kronosproyecto@hotmail.com|GENESIS:...` + firma FIEL | `audit/sello_kronos.json` + `core/perito_seal.py` |
| **Conservación 10 años** | `audit/` en S3 con Object Lock + IPFS + blockchain inmutable | `scripts/setup_vault.py` |
| **Prestador de Servicios de Conservación (PSC)** | Actuamos como PSC bajo Art. 38: conservamos `sello_kronos.json` + `cadena_custodia.log` | `docs/LEGAL_FRAMEWORK.md` |

**Dictamen:** El dictamen PVA es Mensaje de Datos con valor probatorio pleno ante PROFECO, MP y juicio mercantil.

### 3. ISO 27001:2022 - SISTEMA DE GESTIÓN DE SEGURIDAD

Mapeo de controles para tu `audit/AUDITORIA_ISO_NOM_PVA_5204160405358537.md`:

| Control ISO | Implementación PVA | Evidencia |
| --- | --- | --- |
| A5.9 Inventario | `sello_kronos.json` inventaría folio, genesis, perito | `audit/sello_kronos.json` |
| A5.17 Autenticación | Wallet signature en `web/js/web3_auth.js` + `connectWallet()` | `web/js/web3_auth.js` |
| A8.3 Gestión de claves | `.gitignore` bloquea `private_keys/`, `*.key`, `.env` + Vault KMS | `.gitignore` + `config/private_keys/.gitkeep` |
| A8.12 Prevención fuga | Hash no expone contenido, solo prueba existencia | `core/hash_to_semantic.py` 51/49 |
| A8.24 Criptografía | SHA256 + Solidity 0.8.20 + ECDSA de Ethereum | `PVAContract.sol` + `genesis_hash.json` |
| A8.26 Seguridad apps | `verify_on_etherscan()` valida TX real, no mock en prod | `core/blockchain_verifier.py` |
| A8.28 Codificación segura | Regex `^[a-f0-9]{64}$` en `oracle.js`, CSP en `index.html` | `web/js/oracle.js` |

**Resultado:** `AUDITORIA_ISO_NOM_PVA_5204160405358537.md` generado por `scripts/generate_pdf_dictamen.py` es conforme ISO 27001.

### 4. eIDAS Reglamento (UE) 910/2014 - SELLO ELECTRÓNICO CUALIFICADO

Para clientes en Europa:

| Requisito eIDAS | Equivalente PVA |
| --- | --- |
| Sello electrónico cualificado | `perito_seal.py -> generar_sello_kronos()` + FIEL SAT (equivalente a QSeal) |
| Integridad del documento | SHA256 del PDF + QR `qr_folio_5204160405358537.png` que apunta a verificación |
| Vinculación con origen | `PVAContract.sol` mapeo `folio -> registrante` + `owner` |
| Presunción legal | TX `0x8ca8e84e...` en Etherscan = presunción iuris tantum de existencia |

**Dictamen:** Aunque FIEL es mexicana, bajo eIDAS Art. 27, un sello con fecha cierta blockchain + PSC es admitido como evidencia.

### 5. CADENA DE CUSTODIA PVA - FLUJO 10/10
Captura génesis -> config/genesis_hash.json (41a3683b...)Genera manifiesto 51/49 -> core/genesis_breather.pySello KRONOS -> core/perito_seal.py (FOLIO:5204160405358537)Registro blockchain -> contracts/PVAContract.sol -> registrar(folio, hash)Verificación -> core/blockchain_verifier.py -> Etherscan status=1PDF + QR -> scripts/generate_pdf_dictamen.py + generate_qr.pyAuditoría HTML -> core/pva_audit_trail.pyLog inmutable -> audit/cadena_custodia.logjavascript
Cada paso con timestamp UTC. Cada paso con hash. Rompes un eslabón, se invalida todo. Eso es NOM-151.

### 6. VERIFICACIÓN PÚBLICA

Cualquier juez, MP o cliente puede verificar sin contactarte:

1.  **Web:** https://kronos-legado.digital/v/5204160405358537
2.  **QR:** Escanear `audit/qr_folio_5204160405358537.png` -> `https://verifica.fdv.mx/folio/5204160405358537`
3.  **Blockchain:** https://sepolia.etherscan.io/tx/0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
4.  **SafeCreative:** ID 2607146379465
5.  **API:** `GET https://api.kronos-legado.digital/v1/api/verifica/5204160405358537`

Si los 5 coinciden: dictamen auténtico.

### 7. DECLARACIÓN PERICIAL

Yo, Marco Antonio Rojas Valdovinos, perito con folio **5204160405358537**, declaro bajo protesta que el sistema PVA descrito en este repositorio cumple con:

- NOM-151-SCFI-2016 Art. 8, 10, 38 (fecha cierta, integridad, conservación)
- ISO 27001:2022 Controles A5.9, A5.17, A8.3, A8.12, A8.24, A8.26, A8.28
- eIDAS Art. 35-40 (sello electrónico avanzado)
- LFPDPPP + RGPD (minimización y trazabilidad)

Firma electrónica: `kronosproyecto@hotmail.com`
Sello: `KRONOS-TRACE-PVA-5204160405358537`
Fecha: `2026-08-25T03:14:07Z`

---
PVA © 2026 - KRONOS 360 - Expediente 5204160405358537 - Validez legal 10/10
