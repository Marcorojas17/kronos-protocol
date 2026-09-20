# Registro Humano · Legado Humano–IA

Módulo 2.1 · abre la Capa 2 (Identidad). Crea la identidad firmada del fundador humano.

## Propósito
Emitir un pasaporte digital firmado con Ed25519, con huella criptográfica única de 64 caracteres, reutilizable por todo el ecosistema.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (1.1) + Storage Dexie (1.2)
- Web Crypto API (SHA-256 + Ed25519)
- Canvas 2D (fondo líquido verde esmeralda)
- Local-first · sin backend

## API pública
```js
import { IdentidadHumana } from './identidad.js';

const identidad = new IdentidadHumana(core, storage);
const cert = await identidad.sellar({
  alias, nombre, pais, rol, proposito, correo
});
const perfil = await identidad.recuperar();
const ok = await identidad.verificar(cert);
const blob = identidad.exportar();