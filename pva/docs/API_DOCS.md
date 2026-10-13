# PVA API Docs - Protocolo Vida Autopoietica

**Base URL:** `https://api.kronos-legado.digital/v1`
**Folio Maestro:** `5204160405358537`
**Perito:** `kronosproyecto@hotmail.com`
**Génesis:** `41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3`
**Contrato:** `PVAContract.sol` - Solidity 0.8.20
**Autenticación:** Wallet Signature + API Key (para planes pagos)

---

### 1. Generar Manifiesto 51/49

Genera el manifiesto autopoietico a partir de un hash.

**Endpoint:** `POST /api/generate-manifesto`

**Headers:**Content-Type: application/json
X-Folio: 5204160405358537javascript
**Body:**
```json
{
  "genesis_hash": "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3",
  "human_percent": 51,
  "ai_percent": 49
}Response 200:json{
  "success": true,
  "folio": "5204160405358537",
  "manifiesto": "51%_HUMANO:41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3|49%_IA:...",
  "sello": "FOLIO:5204160405358537|PERITO:kronosproyecto@hotmail.com|GENESIS:41a3683b...",
  "timestamp": "2026-08-25T03:14:07Z"
}Lógica: Llama a core/hash_to_semantic.py -> generate_manifesto_from_hash()
2. Generar Dictamen PDF Pericial
Genera el PDF con sello KRONOS y QR de verificación.
Endpoint: POST /api/generate-dictamen
Body:json{
  "txHash": "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e",
  "userAccount": "0xTuWalletCliente",
  "nivel": 2
}Niveles:
1 - Manifiesto $9 USD -> primer_manifiesto.txt2 - Dictamen PDF $49 USD -> dictamen_PVA_5204160405358537.pdf3 - Auditoría Forense $199 USD -> AUDITORIA_ISO_NOM_PVA_5204160405358537.md + PDF + QRResponse 200:json{
  "success": true,
  "url_pdf": "https://kronos-legado.digital/audit/dictamen_PVA_5204160405358537.pdf",
  "url_qr": "https://kronos-legado.digital/audit/qr_folio_5204160405358537.png",
  "sello_kronos": {
    "folio": "5204160405358537",
    "perito": "kronosproyecto@hotmail.com",
    "genesis_hash": "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
  },
  "blockchain_verificado": true
}Lógica: Ejecuta scripts/generate_pdf_dictamen.py + scripts/generate_qr.py + core/blockchain_verifier.py
3. Verificar Folio / Dictamen
Endpoint público para validar que un dictamen no fue alterado.
Endpoint: GET /api/verifica/{folio}
Ejemplo: GET /api/verifica/5204160405358537
Response 200:json{
  "folio": "5204160405358537",
  "valido": true,
  "perito": "kronosproyecto@hotmail.com",
  "genesis_hash": "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3",
  "blockchain_tx": "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e",
  "safe_creative_id": "2607146379465",
  "cadena_custodia": [
    "[2026-08-25 03:14:07] Génesis capturado",
    "[2026-08-25 03:14:10] PDF generado"
  ],
  "estado": "SELLADO_KRONOS"
}Response 404:json{
  "valido": false,
  "error": "Folio no encontrado o dictamen alterado"
}Lógica: Lee audit/sello_kronos.json + audit/cadena_custodia.log + contracts/PVAContract.sol -> verificar()
4. Verificar en Blockchain (Etherscan)
Proxy para no exponer API key de Etherscan en frontend.
Endpoint: POST /api/verify-onchain
Body:json{
  "tx_hash": "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"
}Response:json{
  "exists": true,
  "status": "1",
  "blockNumber": "12345678",
  "verified_by": "core/blockchain_verifier.py"
}5. Códigos de ErrorCódigoSignificado400Hash no es SHA256 válido (64 hex)401Wallet no conectada / firma inválida402Pago requerido - Nivel no pagado404Folio 5204160405358537 no encontrado409Folio ya registrado en PVAContract500Error en Vault / KMS6. Ejemplo cURL Completobashcurl -X POST https://api.kronos-legado.digital/v1/api/generate-dictamen \
  -H "Content-Type: application/json" \
  -H "X-Folio: 5204160405358537" \
  -d '{
    "txHash": "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e",
    "userAccount": "0x1234...",
    "nivel": 2
  }'7. SDK Frontend
web/js/web3_auth.js ya implementa:javascriptconst GENESIS_SHA256 = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3";
const FOLIO = "5204160405358537";
await payForDictamen(priceInWei);Contacto API: kronosproyecto@hotmail.com
Sello: KRONOS-TRACE-PVA-5204160405358537
Docs: https://kronos-legado.digital/docs
