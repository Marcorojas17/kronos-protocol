# Cripto Core · Legado Humano–IA

Módulo 1.1 · Abre la Capa 1 (Cimiento). Núcleo criptográfico reutilizable.

## Propósito
Proveer una API estable para cifrar, firmar, persistir y verificar datos localmente.

## Estado
✅ v1.1 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Web Crypto API (PBKDF2, AES-GCM-256, Ed25519, SHA-256)
- IndexedDB nativo
- Dexie.js 4.0.11 (CDN)
- Canvas 2D (fondo líquido azul eléctrico)

## API pública
```js
import { CriptoCore } from '../cimiento/cripto-core/core.js';
const core = new CriptoCore();
await core.init('password-12chars');
await core.guardar({ tipo, payload });
const registros = await core.recuperarTodo();
const ok = await core.verificarCadena();