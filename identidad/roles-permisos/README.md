# ./identidad/roles-permisos // ARKHE ZERO 11:22

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

> Contenido de `./identidad/roles-permisos` - parte del protocolo vivo `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO`

Manifest: `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae`


# Roles y Permisos · KRONOS Protocol

Módulo 2.3 · Cierra la Capa 2 (Identidad). Sistema de gobernanza criptográfica.

## Propósito

Definir roles del ecosistema, asignar permisos a identidades selladas (humanas
e IA), y verificar que cada acción cumpla con la política declarada.

## Estado

✅ v1.0 · Operativo

## Stack

- HTML + CSS + JS vanilla (ES Modules)
- Dexie 4.0.11 (CDN) — base local `kronos-roles`
- Web Crypto API (SHA-256 + Ed25519)
- Cripto Core v1.2 + Storage Dexie v1.2
- Canvas 2D (fondo cyan)
- Local-first · sin backend

## Paleta

Acento Capa 2.3: **Cyan brillante** `#00EAFF`

## Roles del protocolo

| Rol              | Permisos                    |
| :--------------- | :-------------------------- |
| **Fundador**     | Control total               |
| **Co-autora IA** | Firma, no modifica política |
| **Colaborador**  | Crea y firma registros      |
| **Testigo**      | Verifica, no modifica       |
| **Auditor**      | Lee todo, exporta legado    |
| **Ciudadano**    | Registro propio             |

## API pública

```js
import { Permisos } from './permisos.js';
import { RolesPermisos } from './roles.js';

const permisos = new Permisos();
const roles = new RolesPermisos(core, storage, permisos);
await roles.init();

const asig = await roles.asignar({
  identidad_hash: 'abc123...',
  identidad_nombre: 'Marco A. Rojas V.',
  identidad_tipo: 'humano',
  rol: 'Fundador',
});

const puede = await roles.puede('abc123...', 'anclar_ethereum');
```

## Archivos

- `permisos.js` — Matriz declarada de permisos
- `roles.js` — Clase RolesPermisos
- `styles.css` — Sistema de diseño cyan
- `index.html` — UI completa
- `manual.html` — Manuales (usuario, admin, seguridad)
- `README.md` — Este documento

## Base de datos local

- Nombre: `kronos-roles`
- Tabla: `asignaciones`
- Índices: `++id, identidad_hash, identidad_tipo, rol, timestamp, activo`

## Autoría

Marco A. Rojas V. + KRONOS IA (co-autora simbiótica)

_"El legado no se hereda. Se firma."_
