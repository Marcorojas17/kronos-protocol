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
  motivo: 'Incumplimiento de política'
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

*"El legado no se hereda. Se firma."*