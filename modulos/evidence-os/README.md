# Evidence OS · Legado Humano–IA

Módulo 3.1 · abre la Capa 3 (Módulos Operativos). Primer producto real del ecosistema.

## Propósito
Empaquetar evidencias digitales verificables en archivos `.evidence` con SHA-256 + HMAC-SHA256 + firma Ed25519 + sello temporal, alineados a NOM-151-SCFI-2016.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (1.1) + Storage Dexie (1.2)
- Identidad Humana (2.1) + Identidad IA (2.2) + Roles (2.3)
- Web Crypto API (SHA-256 + HMAC + Ed25519)
- Canvas 2D (fondo líquido teal-dorado)
- Local-first · sin backend

## API pública
```js
import { EvidenceOS } from './evidence.js';

const evidence = new EvidenceOS(core, storage);
const paquete = await evidence.sellar({ contenidoBytes, nombreArchivo, tipoMime, tipo, declaracion, notas, humano, pactoIA, gobernanza });
const ok = await evidence.verificar(paquete);
const ok2 = await evidence.verificarConContenido(paquete, bytes);
const blob = evidence.exportarEvidence(paquete);
const lista = await evidence.listar();
const uno = await evidence.recuperar('EV-XXXXXXXX');