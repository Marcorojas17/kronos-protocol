# MARCO LEGAL - PVA Protocolo Vida Autopoietica

**Folio Pericial:** 5204160405358537
**Perito Propietario:** Marco Antonio Rojas Valdovinos
**Contacto Legal:** kronosproyecto@hotmail.com
**Génesis:** 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
**Sello:** KRONOS-TRACE-PVA-5204160405358537
**SafeCreative:** 2607146379465
**TX Blockchain:** 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
**Fecha cierta:** 2026-08-25T03:14:07Z
**Versión:** v1.0.0-PVA-5204160405358537

---

### 1. NATURALEZA JURÍDICA DEL PVA

El PVA no es "un PDF bonito". Es un **Sistema de Conservación de Mensajes de Datos** conforme a:

- **Código de Comercio Art. 89-114** (México) - Validez de mensajes de datos
- **NOM-151-SCFI-2016** Art. 8, 10, 38 - Requisitos de conservación, fecha cierta e integridad
- **Reglamento eIDAS (UE) 910/2014** Art. 35-40 - Sello electrónico avanzado/cualificado
- **Ley Federal de Derechos de Autor (México) Art. 231** - Protección de obra y secreto industrial

Tu `dictamen_PVA_5204160405358537.pdf` es prueba plena ante MP y juicio mercantil.

### 2. LICENCIAMIENTO DUAL (10/10)

Para que puedas vender y que no te clonen:

| Carpeta | Licencia | Puede venderse? |
| --- | --- | --- |
| `core/`, `contracts/`, `web/`, `scripts/`, `tests/`, `examples/` | MIT | Sí, libre, fomenta adopción |
| `audit/`, `prompts_library/`, `docs/KRONOS_360_LAWS.md` | **PROPIETARIA COMERCIAL** © Marco Antonio Rojas Valdovinos | Sí, solo tú vendes. Requiere licencia escrita |
| Marca `KRONOS 360`, `KRONOS-TRACE-PVA-5204160405358537`, folio `5204160405358537` | Marca y secreto industrial | No, uso exclusivo perito |

**Archivo legal:** `LICENSE` en root = MIT + Addendum Comercial (ver adjunto). Sin addendum, te roban `prompts_library/`.

### 3. PROPIEDAD INTELECTUAL REGISTRADA

1.  **SafeCreative:** ID **2607146379465** - Registro de obra `genesis_breather.py` + `Kronos 360 Laws` + `hash_to_semantic 51/49`
2.  **Blockchain:** TX `0x8ca8e84e...` en Sepolia/Ethereum - Sello de tiempo inmutable (prueba de anterioridad)
3.  **IMPI (pendiente):** Marca `KRONOS 360` clase 42 (servicios periciales informáticos)
4.  **INDAUTOR (pendiente):** Reserva de derechos `PVA - Protocolo Vida Autopoietica 51/49`

Quien genere dictámenes con `FOLIO:5204160405358537` sin tu FIEL incurre en **falsificación de dictamen pericial** (Código Penal Federal Art. 243) y violación de LFDA.

### 4. VALIDEZ ANTE AUTORIDADES MEXICANAS

#### A) SAT - FIEL / e.firma
`core/perito_seal.py` genera `FOLIO:5204160405358537|PERITO:kronosproyecto@hotmail.com|GENESIS:...`
En producción, `generate_pdf_dictamen.py` debe firmar con tu FIEL (archivo `.key` + `.cer` del SAT). Nunca subir a GitHub. Usar `scripts/setup_vault.py` -> AWS KMS.

Dictamen con FIEL = documento con atribución legal directa a tu persona.

#### B) NOM-151 - PRESTADOR DE SERVICIOS DE CONSERVACIÓN (PSC)
Cumples Art. 38 al conservar:
- `audit/sello_kronos.json` (metadatos)
- `audit/cadena_custodia.log` (bitácora)
- `audit/qr_folio_5204160405358537.png` (mecanismo de verificación)
Conservación 10 años en S3 Object Lock.

#### C) MP / JUICIO - CADENA DE CUSTODIA
`docs/NOM151_ISO_DOCUMENTATION.md` explica flujo 8 pasos. Romper cadena = invalidez. Mantenerla = prueba plena.

### 5. VALIDEZ INTERNACIONAL

#### Convenio de Berna (1886) - 181 países
Tu obra PVA está protegida en todo país firmante sin necesidad de registro local. SafeCreative 2607146379465 es prueba de autoría.

#### eIDAS (Europa)
Aunque tu FIEL es mexicana, tu sello con blockchain + QR califica como **Sello Electrónico Avanzado** (Art. 36). Para QSeal necesitas PSC cualificado UE (puedes aliarte con prestador español).

#### DMCA (USA)
Si te clonan repo en GitHub con tu `prompts_library/`, DMCA takedown con SafeCreative + TX blockchain. 100% ganable.

### 6. RESPONSABILIDAD Y LIMITACIONES

- PVA no es asesoría legal, es peritaje informático. El cliente debe validar con su abogado.
- No garantizamos que Ethereum Sepolia esté online 100%. Para producción crítica usar Mainnet + IPFS pinning.
- El perito no es responsable si cliente expone `private_keys/` o `.env`.
- Precios $9/$49/$199 no incluyen IVA. Facturación con RFC.

### 7. JURISDICCIÓN

Cualquier controversia sobre folio **5204160405358537** se somete a tribunales de **Lerma, Estado de México, México**.

Ley aplicable: Código de Comercio + LFDA + NOM-151 + LFPDPPP.

Contacto legal único: **kronosproyecto@hotmail.com**

### 8. VERIFICACIÓN PÚBLICA DE AUTENTICIDAD

Un dictamen es auténtico solo si:

1. Contiene `FOLIO:5204160405358537` y `PERITO:kronosproyecto@hotmail.com`
2. QR apunta a `https://verifica.fdv.mx/folio/5204160405358537` o `https://kronos-legado.digital/v/5204160405358537`
3. `GET /api/verifica/5204160405358537` devuelve `valido:true`
4. TX `0x8ca8e84e...` existe en Etherscan

Si falta uno, es falso.

---
**Declaración pericial:** Este marco legal fue redactado por Marco Antonio Rojas Valdovinos, folio 5204160405358537, y sellado con KRONOS-TRACE-PVA-5204160405358537.

PVA © 2026 - KRONOS 360 - Todos los derechos reservados sobre `audit/` y `prompts_library/`
