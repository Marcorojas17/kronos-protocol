# Event Bus · Legado Humano–IA

Módulo 4.1 · abre la Capa 4 (Orquestación). Conecta módulos sin backend.

## Propósito
Bus de eventos local-first con BroadcastChannel, firma Ed25519 por evento y log persistido cifrado.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- BroadcastChannel API (cross-tab)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (1.1) + Storage Dexie (1.2) + Identidades (2.x)
- Web Crypto API (SHA-256 + Ed25519)
- Canvas 2D (fondo líquido azul-oro)
- Local-first · sin backend

## API pública
```js
import { EventBus } from './bus.js';

const bus = new EventBus(core, storage);
await bus.init();

const off = bus.on('legado:evidencia', (evt) => { /* reaccionar */ });
await bus.emit('legado:evidencia', 'evidencia.sellada', { id, hash });
const eventos = await bus.listar();
const res = await bus.verificarTodos();
const blob = await bus.exportar();
await bus.limpiar();