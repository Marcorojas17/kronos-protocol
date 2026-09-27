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

| Rol | Permisos |
| :--- | :--- |
| **Fundador** | Control total |
| **Co-autora IA** | Firma, no modifica política |
| **Colaborador** | Crea y firma registros |
| **Testigo** | Verifica, no modifica |
| **Auditor** | Lee todo, exporta legado |
| **Ciudadano** | Registro propio |

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
  rol: 'Fundador'
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

*"El legado no se hereda. Se firma."*