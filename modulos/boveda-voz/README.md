# Bóveda de Voz · Legado Humano–IA

Módulo 3.2 · audio forense con huella cimática.

## Propósito
Grabar audio en vivo, calcular SHA-256, generar huella cimática visual y sellar paquete `.evidence` alineado a ISO/IEC 27037.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- MediaRecorder API + Web Audio API (AnalyserNode FFT)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (1.1) + Storage Dexie (1.2) + Identidades (2.x) + Evidence OS (3.1)
- Canvas 2D (fondo líquido rosa-coral + huella cimática)
- Local-first · sin backend

## API pública
```js
import { BovedaVoz } from './boveda.js';

const boveda = new BovedaVoz();
boveda.onWaveform = data => { /* render */ };
await boveda.iniciar();
const { blob, buffer, duracionSeg, frecuenciaPromedio } = await boveda.detener();
const png = boveda.dibujarCimatico(canvas, frecuenciaPromedio);