# Dashboard Salud · Legado Humano–IA

Módulo 5.1 · abre la Capa 5 (Operación). Centro de mando del ecosistema.

## Propósito
Mostrar estado en vivo: módulos registrados, registros persistidos, eventos, evidencias, integridad de cadena y salud global con radar de 5 dimensiones.

## Estado
✅ v1.0 · Operativo

## Stack
- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (1.1) + Storage Dexie (1.2) + Identidades (2.x) + Evidencia (3.x) + Orquestación (4.x)
- Canvas 2D (radar + fondo líquido hielo-oro)
- Local-first · sin backend

## API pública
```js
import { DashboardSalud } from './dashboard.js';

const dashboard = new DashboardSalud(core, storage, bus, router);
const reporte = await dashboard.generar(humano);
// reporte.metricas · reporte.integridad · reporte.dimensiones · reporte.modulos · reporte.salud_global