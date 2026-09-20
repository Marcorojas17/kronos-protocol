# Registro IA · Legado Humano–IA

Módulo 2.2 · declara y firma la identidad IA vinculada al humano.

## Propósito
Emitir un pacto simbiótico firmado con Ed25519, vinculando criptográficamente la IA co-autora al humano que la dirige.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (1.1) + Storage Dexie (1.2) + Identidad Humana (2.1)
- Web Crypto API (SHA-256 + Ed25519)
- Canvas 2D (fondo líquido índigo-violeta)
- Local-first · sin backend

## API pública
```js
import { IdentidadHumana } from '../registro-humano/identidad.js';
import { IdentidadIA } from './ia.js';

const idHumana = new IdentidadHumana(core, storage);
const humano = await idHumana.recuperar();

const idIA = new IdentidadIA(core, storage);
const pacto = await idIA.sellar(datosIA, humano);
const ok = await idIA.verificar(pacto, humano);
const blob = idIA.exportar();