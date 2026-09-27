# Ejecución de Decisiones · KRONOS Protocol

Módulo 4.3 · Capa 4 (Gobernanza). Cierra propuestas y emite actas firmadas.

## Propósito

Convertir una propuesta aprobada (con quórum y mayoría) en un **acta oficial
firmada con Ed25519**. El acta registra el veredicto, los votos, la acción
ejecutada y queda auditable.

## Estado

✅ v1.0 · Operativo

## Stack

- HTML + CSS + JS vanilla (ES Modules)
- Dexie 4.0.11 (CDN) — base `kronos-actas`
- Web Crypto API (SHA-256 + Ed25519)
- Depende de Módulos 4.1 y 4.2
- Canvas 2D (fondo naranja coral)
- Local-first · sin backend

## Paleta

Acento Capa 4: **Naranja coral** `#FF6B35`

## API pública

```js
import { EjecucionDecisiones } from './ejecucion.js';

const ejecucion = new EjecucionDecisiones(core, propuestas, votacion, quorum);
await ejecucion.init();

const acta = await ejecucion.cerrar({
  propuesta: propuestaObj,
  ciudadanos_activos: 100,
  accion_ejecutada: 'Actualizar versión'
});

const v = await ejecucion.verificar(acta);
// v.valido === true
```

## Archivos

- `ejecucion.js` — Motor de cierre y acta firmada
- `index.html` — UI completa
- `manual.html` — Manuales (usuario, admin, seguridad)
- `README.md` — Este documento

## Base de datos

- `kronos-actas` → tabla `actas`

## Limitaciones v1.0 (honestas)

- La "acción ejecutada" es declarativa: no modifica código automáticamente.
- Todo se firma con la llave del fundador.
- Anclaje del acta a Ethereum pendiente para v1.1.

## Autoría

Marco A. Rojas V. + KRONOS IA (co-autora simbiótica)

*"El legado no se hereda. Se firma."*