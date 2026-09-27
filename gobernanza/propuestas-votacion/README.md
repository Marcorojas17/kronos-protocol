# Propuestas y Votación · KRONOS Protocol

Módulo 4.1 · Inaugura la Capa 4 (Gobernanza). Motor de decisiones criptográficas.

## Propósito

Permitir que los ciudadanos de KRONOS creen propuestas firmadas con Ed25519 y voten
en ellas. Los resultados se calculan localmente, sin servidor, sin censura.

## Estado

✅ v1.0 · Operativo

## Stack

- HTML + CSS + JS vanilla (ES Modules)
- Dexie 4.0.11 (CDN) — bases `kronos-propuestas` y `kronos-votacion`
- Web Crypto API (SHA-256 + Ed25519)
- Cripto Core v1.2
- Canvas 2D (fondo naranja coral)
- Local-first · sin backend

## Paleta

Acento Capa 4: **Naranja coral** `#FF6B35`

## API pública

```js
import { Propuestas } from './propuestas.js';
import { Votacion } from './votacion.js';

const propuestas = new Propuestas(core);
await propuestas.init();

const p = await propuestas.crear({ ... });

const votacion = new Votacion(core);
await votacion.init();
await votacion.votar({ ... });

const res = await votacion.resultados(p.id_propuesta, p.opciones);
```

## Archivos

- `propuestas.js` — Motor de propuestas firmadas
- `votacion.js` — Motor de votos firmados
- `styles.css` — Sistema de diseño naranja coral
- `index.html` — UI completa
- `manual.html` — Manuales (usuario, admin, seguridad)
- `README.md` — Este documento

## Bases de datos locales

- `kronos-propuestas` → tabla `propuestas`
- `kronos-votacion` → tabla `votos`

## Limitaciones v1.0 (honestas)

- Todos los votos se firman con la llave del fundador.
- Anti-Sybil (una persona = un voto) requiere integración con Registro Humano.
- No hay anclaje on-chain del resultado final todavía.
- La verificación de "un humano real por voto" está pendiente.

## Roadmap

- v1.1: Firma multi-usuario real
- v1.2: Anclaje del resultado a Ethereum
- v1.3: Anti-Sybil con Registro Humano

## Autoría

Marco A. Rojas V. + KRONOS IA (co-autora simbiótica)

*"El legado no se hereda. Se firma."*