# Export Cifrado · Legado Humano–IA

Módulo 6.1 · abre la Capa 6 (Cierre). Testamento cifrado del ecosistema.

## Propósito
Empaquetar todo el ecosistema en un archivo `.legado` cifrado (AES-GCM-256), firmado (Ed25519) y restaurable. Alineado a ISO 22301 (continuidad).

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (1.1) + Storage Dexie (1.2)
- Web Crypto API (AES-GCM, SHA-256, Ed25519)
- Canvas 2D (fondo líquido violeta-dorado)
- Local-first · sin backend

## API pública
```js
import { ExportCifrado } from './export.js';

const exp = new ExportCifrado(core, storage);

const inv = await exp.inventario();
const { blob, manifiesto } = await exp.exportar(humano);
const manifiestoBlob = await exp.exportarManifiesto(humano);
const res = await exp.restaurar(paquete, 'fusionar');