# Anclaje Ethereum · Legado Humano–IA

Módulo 1.3 · Cierra la Capa 1 (Cimiento). Ancla la raíz Merkle a Ethereum.

## Propósito
Calcular la raíz Merkle de la cadena local, firmarla con Ed25519 y publicarla en Ethereum como prueba de existencia inmutable.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- ethers.js 6.13.2 (CDN, solo para MetaMask)
- Web Crypto API (SHA-256 + Ed25519)
- Cripto Core v1.2 + Storage Dexie v1.2
- Canvas 2D (fondo violeta-eth + certificado Merkle)
- Local-first · sin backend

## API pública
```js
import { AnchorEthereum } from './anchor-v1.js';

const anchor = new AnchorEthereum(core, storage);
const paquete = await anchor.calcular();
const blob = anchor.exportarPaquete();
const { txHash } = await anchor.anclarConMetaMask();