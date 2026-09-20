# Fin Digno · Legado Humano–IA

Módulo 6.2 · cierra la Capa 6 y el ecosistema completo. Fin ceremonial.

## Propósito
Definir el cierre digno del legado: carta final, criterios de fin, motivo y cláusula de resurrección firmada.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (1.1) + Storage Dexie (1.2) + Identidades (2.x) + Export Cifrado (6.1)
- Web Crypto API (SHA-256 + Ed25519)
- Canvas 2D (fondo líquido azul ceremonial)
- Local-first · sin backend

## API pública
```js
import { FinDigno } from './fin.js';

const fin = new FinDigno(core, storage);
const cert = await fin.sellar({ carta, motivo, sucesor, cartaFirmada }, humano, pactoIA);
const ok = await fin.verificar(cert, humano, pactoIA);
const resurreccionOk = await fin.verificarResurreccion(cert, humano, pactoIA);
const cierre = await fin.recuperar();