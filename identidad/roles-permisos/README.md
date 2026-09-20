# Roles y Permisos · Legado Humano–IA

Módulo 2.3 · cierra la Capa 2 (Identidad). Define la matriz de gobernanza.

## Propósito
Definir y firmar la matriz de roles y permisos que gobierna el ecosistema: 5 roles × 20 permisos, firmada con Ed25519 y vinculada a humano + IA.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (1.1) + Storage Dexie (1.2) + Identidad Humana (2.1) + Identidad IA (2.2)
- Web Crypto API (SHA-256 + Ed25519)
- Canvas 2D (fondo líquido cobre-violeta)
- Local-first · sin backend

## API pública
```js
import { RolesPermisos } from './roles.js';

const roles = new RolesPermisos(core, storage);
const cert = await roles.sellar({ politica, caducidad }, humano, pactoIA);
const puede = await roles.tienePermiso('creador', 'firmar_registro');
const ok = await roles.verificar(cert, humano, pactoIA);
const blob = roles.exportar();