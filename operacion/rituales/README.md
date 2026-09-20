# Rituales · Legado Humano–IA

Módulo 5.2 · cierra la Capa 5 (Operación). Disciplina del legado.

## Propósito
Definir, ejecutar y registrar rituales periódicos firmados con Ed25519: diario, semanal y mensual.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (1.1) + Storage Dexie (1.2) + Identidades (2.x) + Event Bus (4.1)
- Canvas 2D (fondo líquido ámbar-esmeralda)
- Local-first · sin backend

## API pública
```js
import { Rituales } from './rituales.js';

const rituales = new Rituales(core, storage, bus);
const estado = await rituales.estado(humano);
const registro = await rituales.ejecutar('diario', notas, 'optimo', humano);
const ok = await rituales.verificar(registro);
const historial = await rituales.historial();
const blob = await rituales.exportar();