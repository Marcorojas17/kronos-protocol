# Cripto Core · Legado Humano–IA

Módulo 1.1 · núcleo criptográfico reutilizable de todo el ecosistema.

## Propósito
Proveer una API estable para cifrar, firmar, persistir y verificar datos localmente.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Web Crypto API (PBKDF2, AES-GCM-256, Ed25519, SHA-256)
- IndexedDB nativo (sin librerías)
- Canvas 2D (fondo líquido cian-violeta)
- Local-first · sin backend

## API pública
```js
import { CriptoCore } from '../cimiento/cripto-core/core.js';
const core = new CriptoCore();
await core.init('contraseña-maestra');
await core.guardar({ tipo, payload });
const registros = await core.recuperarTodo();
const ok = await core.verificarCadena();
await core.limpiar();