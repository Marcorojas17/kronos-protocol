# ./gobernanza/revocacion-auditoria // ARKHE ZERO 11:22

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

> Contenido de `./gobernanza/revocacion-auditoria` - parte del protocolo vivo `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO`

Manifest: `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae`


# Revocación y Auditoría · KRONOS Protocol

Módulo 4.4 · Cierra la Capa 4 (Gobernanza). Revocación de roles y auditoría completa.

## Propósito

Permitir revocar roles de forma firmada y auditable, y generar un reporte
completo del ecosistema de gobernanza (propuestas, votos, actas, revocaciones).

## Estado

✅ v1.0 · Operativo

## Stack

- HTML + CSS + JS vanilla (ES Modules)
- Dexie 4.0.11 (CDN) — base `kronos-revocaciones`
- Web Crypto API (SHA-256 + Ed25519)
- Depende de Módulos 4.1, 4.2 y 4.3
- Canvas 2D (fondo naranja coral)
- Local-first · sin backend

## Paleta

Acento Capa 4: **Naranja coral** `#FF6B35`

## API pública

```js
import { RevocacionAuditoria } from './revocacion.js';

const rev = new RevocacionAuditoria(core, propuestas, votacion, ejecucion);
await rev.init();

const r = await rev.revocarRol({
  identidad_hash: 'abc123...',
  identidad_nombre: 'Colaborador XYZ',
  identidad_tipo: 'humano',
  rol_revocado: 'Colaborador',
  motivo: 'Incumplimiento de política',
});

const auditoria = await rev.auditar();
```

## Archivos

- `revocacion.js` — Motor de revocación y auditoría
- `index.html` — UI completa
- `manual.html` — Manuales (usuario, admin, seguridad)
- `README.md` — Este documento

## Base de datos

- `kronos-revocaciones` → tabla `revocaciones`

## Filosofía clave

**Nada se borra.** Las revocaciones se marcan como activas o levantadas.
El histórico queda intacto para auditoría.

## Limitaciones v1.0 (honestas)

- La revocación es declarativa: no elimina el rol automáticamente en otros módulos.
- El chequeo en tiempo real requiere integración con roles-permisos.
- Todo se firma con la llave del fundador.
- Anclaje de revocaciones a Ethereum pendiente para v1.1.

## Autoría

Marco A. Rojas V. + KRONOS IA (co-autora simbiótica)

_"El legado no se hereda. Se firma."_
