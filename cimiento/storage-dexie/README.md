# Storage Dexie · Legado Humano–IA

Módulo 1.2 · Persistencia estructurada versionada sobre Cripto Core v1.2.

## Propósito
Proveer una capa de almacenamiento indexada, versionada y migrable sobre los bloques cifrados del Cripto Core.

## Estado
✅ v1.2 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.11 (CDN)
- Cripto Core v1.2 (módulo 1.1)
- Canvas 2D (fondo líquido ámbar-oro)

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
await storage.limpiar();