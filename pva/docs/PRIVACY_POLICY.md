# Política de Privacidad - PVA Protocolo Vida Autopoietica

**Folio de Responsable:** 5204160405358537
**Responsable del Tratamiento:** Marco Antonio Rojas Valdovinos
**Contacto Pericial / ARCO:** kronosproyecto@hotmail.com
**Génesis:** 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
**Sello:** KRONOS-TRACE-PVA-5204160405358537
**Última actualización:** 25 de Agosto de 2026
**Normas:** RGPD (UE) 2016/679, LFPDPPP (México), eIDAS 910/2014

---

### 1. Qué datos recopilamos

Solo lo mínimo necesario para emitir tu dictamen pericial PVA:

| Dato | Para qué | Base legal |
| --- | --- | --- |
| Correo electrónico | Envío de `dictamen_PVA_5204160405358537.pdf` y factura SAT | Ejecución de contrato |
| Dirección de wallet (0x...) | Registro en `PVAContract.sol` y trazabilidad blockchain | Ejecución de contrato |
| Hash de transacción (txHash) | Verificación con `core/blockchain_verifier.py` | Interés legítimo (NOM-151) |
| IP + User Agent | Log `audit/cadena_custodia.log` - fecha cierta | Obligación legal NOM-151 |
| Datos de pago (Stripe) | Cobro niveles $9/$49/$199 | Ejecución de contrato |

**NO recopilamos:** Nombre completo, CURP, domicilio, llaves privadas, seed phrase, biometría.

`config/private_keys/` nunca se sube. Está en `.gitignore`.

### 2. Qué NO hacemos con tus datos

- **NO vendemos** a terceros. `prompts_library/` es IP nuestra, no vendemos tu info.
- **NO entrenamos** IA con tu wallet o email.
- **NO hacemos** tracking publicitario. No hay Facebook Pixel.
- **NO guardamos** tu llave privada. La firma se hace en tu MetaMask, no en nuestro servidor.

### 3. Dónde se guardan

- `audit/sello_kronos.json` y `audit/cadena_custodia.log` - Almacenamiento cifrado AWS S3 (us-east-1) con KMS.
- Blockchain: Solo `folio`, `hashGenesis`, `timestamp` y `registrante` en `PVAContract.sol` (Sepolia / Mainnet). Esto es público por diseño NOM-151.
- Stripe: Datos de tarjeta los maneja Stripe, no nosotros. PCI-DSS.
- Verificación: `https://kronos-legado.digital/v/5204160405358537` solo expone folio y si es válido.

### 4. Tus derechos (ARCO + RGPD)

Puedes ejercer en **kronosproyecto@hotmail.com** con asunto `[ARCO PVA 5204160405358537]`:

- **Acceso:** Qué tenemos de ti (sello_kronos.json + logs)
- **Rectificación:** Corregir email si tu dictamen no llegó
- **Cancelación:** Borrar email y logs locales (no podemos borrar blockchain por NOM-151)
- **Oposición:** No usar tus datos para newsletter KRONOS 360
- **Portabilidad:** Te damos tu `sello_kronos.json` y tu PDF

Tiempo de respuesta: 20 días hábiles (LFPDPPP Art. 32) / 30 días (RGPD Art. 12).

Si estás en UE y no estás conforme: puedes reclamar ante tu autoridad de protección de datos. Si estás en México: INAI.

### 5. Conservación (NOM-151-SCFI-2016)

Por ley de mensajes de datos:

- `audit/` se conserva 10 años mínimo (NOM-151 Art. 38)
- `cadena_custodia.log` es inmutable
- Blockchain es permanente
- Email y wallet se anonimizan a los 5 años si no hay litigio

Esto es lo que hace que tu dictamen valga ante MP y no sea un PDF editable.

### 6. Cookies y `web/`

`web/index.html` y `web/marketplace.html`:

- **Esenciales:** `matrix-canvas` no usa cookies.
- **Web3:** `web3_auth.js` usa `localStorage` solo para guardar `userAccount` temporal.
- **No esenciales:** Si integras Stripe, Stripe pone cookie `_stripe_mid`. Aceptas al pagar.

No usamos Google Analytics sin tu consentimiento.

### 7. Transferencias internacionales

- Servidor: Vercel / AWS us-east-1 (EEUU)
- Blockchain: Ethereum (descentralizado)
- Base legal transferencia: Cláusulas contractuales tipo RGPD Art. 46 + consentimiento al pagar

### 8. Menores

PVA no es para menores de 18 años. No contratamos con menores. Si detectamos compra de menor, cancelamos y reembolsamos.

### 9. Cambios a esta política

Cualquier cambio se sella con nuevo hash y se registra en `audit/cadena_custodia.log` con folio **5204160405358537**. Te notificamos por email si es cambio sustancial.

### 10. Contacto y Responsable

**Marco Antonio Rojas Valdovinos**
Perito Informático - Folio 5204160405358537
Email: kronosproyecto@hotmail.com
Verificación: https://kronos-legado.digital/v/5204160405358537
SafeCreative: 2607146379465
Sello: KRONOS-TRACE-PVA-5204160405358537

Si tienes duda, escribe. Contestamos en 24h.

---
PVA © 2026 - KRONOS 360 - Cumplimiento RGPD + LFPDPPP + NOM-151 + eIDAS
