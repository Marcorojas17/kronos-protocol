# LICENCIAS · ARKHÉ ZERO

Licencias emitidas bajo el Pacto 51/49/100.

## Estructura
Cada licencia es un JSON firmado con Ed25519 (fundador-v3.key).

Campos:
- `folio` · identificador único
- `obra` · qué se licencia
- `titular` · a quién se licencia
- `uso` · tipo de uso permitido
- `fecha_emision` · timestamp UTC
- `vigencia` · hasta cuándo
- `monto` · pago asociado
- `mp_payment_id` · ID de MercadoPago
- `firma_ed25519` · firma hex
- `pub_key_fingerprint` · fingerprint del firmante

## Verificación
Cualquiera puede verificar con la llave pública en:
07-LLAVES/FUNDADOR-V3/fundador-v3.pub

Autor: Marco Antonio Rojas Valdovinos · Nodo YHDRYH-92CE
