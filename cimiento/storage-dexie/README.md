# Storage Dexie · Legado Humano–IA

Módulo 1.2 · persistencia estructurada versionada sobre Cripto Core.

## Propósito
Proveer una capa de almacenamiento indexada, versionada y migrable sobre los bloques cifrados del Cripto Core.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (módulo 1.1)
- Canvas 2D (fondo líquido ámbar-violeta)
- Local-first · sin backend

## API pública
```js
import { CriptoCore } from '../cripto-core/core.js';
import { StorageDexie } from './storage.js';

const core = new CriptoCore();
await core.init(password);

const storage = new StorageDexie(core);
await storage.init();
await storage.guardar('nota', { texto: 'hola' });
const todos = await storage.listar();
const notas = await storage.listarPorTipo('nota');
const total = await storage.contar();
const blob = await storage.exportar();
await storage.importar(json);
await storage.limpiar();