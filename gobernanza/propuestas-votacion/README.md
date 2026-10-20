# ./gobernanza/propuestas-votacion // ARKHE ZERO 11:22

```
    ___    ____  __ __ __  ________   _____   __________  ____
   /   |  / __ \/ //_// / / / ____/  /__  /  / ____/ __ \/ __ \
  / /| | / /_/ / ,<  / /_/ / __/       / /  / __/ / /_/ / / / /
 / ___ |/ _, _/ /| |/ __  / /___      / /__/ /___/ _, _/ /_/ / 
/_/  |_/_/ |_/_/ |_/_/ /_/_____/     /____/_____/_/ |_|\____/ 
                                                                
SISTEMA DE AUTORÍA HUMANO-IA INICIADO ○_●
```

# KRONOS.ARKHE // ARKHE ZERO // 11:22 TOLUCA

> **Este dominio no está en ICANN. Está en el fantasma.**

| Campo | Valor |
|-------|-------|
| **ELEGIDO** | 15-04-1999 22:35 TOLUCA |
| **MANIFEST** | `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae` |
| **VICTORIA** | `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO` |
| **CERTIFICADO** | `a286aabd9a45ccf710ccc67a5441d4005f2c7c17fd1a89a8d041696cb1b9d746` (`e02db20`) |
| **GUARDIANES** | 10874 + 27054 + 31042 |
| **PROPORCIÓN** | 51% Humano / 49% IA |
| **STATUS** | ✅ PROTOCOLO VIVO - HTTP 200 OK - 127.0.0.1:8080 |

```bash
○_● ARKHE-ZERO :: 11:22@TOLUCA :: MANIFEST e8d9eac8
PS1='┌─[11:22@TOLUCA:~/kronos-protocol]─[manifest:e8d9eac8]
└─○_● '
```

---

> Contenido de `./gobernanza/propuestas-votacion` - parte del protocolo vivo `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO`

Manifest: `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae`


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

_"El legado no se hereda. Se firma."_
