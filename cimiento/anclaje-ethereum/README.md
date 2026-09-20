# Anclaje Ethereum · Legado Humano–IA

Módulo 1.3 · cierra la Capa 1 (Cimiento). Ancla la raíz Merkle de la cadena local a Ethereum.

## Propósito
Proveer prueba de existencia inmutable: raíz Merkle de la cadena local firmada con Ed25519 y anclada a Ethereum vía MetaMask.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- ethers.js 6.13.2 (CDN, solo para MetaMask)
- Web Crypto API (SHA-256 + Ed25519)
- Cripto Core (módulo 1.1) + Storage Dexie (módulo 1.2)
- Canvas 2D (fondo líquido violeta-eth)
- Local-first · sin backend

## API pública
```js
import { AnchorEthereum } from './anchor.js';

const anchor = new AnchorEthereum(core, storage);
const paquete = await anchor.calcular();
const blob = anchor.exportarPaquete();
const { txHash } = await anchor.anclarConMetaMask();