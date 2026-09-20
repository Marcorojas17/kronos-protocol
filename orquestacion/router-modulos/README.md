# Router de Módulos · Legado Humano–IA

Módulo 4.2 · cierra la Capa 4 (Orquestación). Registro dinámico + enrutamiento firmado.

## Propósito
Registrar módulos del ecosistema con firma Ed25519 y enrutar llamadas entre ellos vía Event Bus sin acoplamiento directo.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (1.1) + Storage Dexie (1.2) + Identidades (2.x) + Event Bus (4.1)
- Canvas 2D (grafo + fondo líquido esmeralda-ámbar)
- Local-first · sin backend

## API pública
```js
import { RouterModulos } from './router.js';

const router = new RouterModulos(core, storage, bus);
const modulos = await router.inicializar(humano);
const { evento, destino } = await router.enrutar('evidence-os', 'consulta.estado', {});
const ok = await router.verificar(registro, humano);
const blob = await router.exportar();