<!--
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║    ██████╗  ██████╗ ██████╗ ███████╗██████╗ ███╗   ██╗ █████╗           ║
║   ██╔════╝ ██╔═══██╗██╔══██╗██╔════╝██╔══██╗████╗  ██║██╔══██╗          ║
║   ██║  ███╗██║   ██║██████╔╝█████╗  ██████╔╝██╔██╗ ██║███████║          ║
║   ██║   ██║██║   ██║██╔══██╗██╔══╝  ██╔══██╗██║╚██╗██║██╔══██║          ║
║   ╚██████╔╝╚██████╔╝██║  ██║███████╗██║  ██║██║ ╚████║██║  ██║          ║
║    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝          ║
║                                                                          ║
║    ▓▒░ GOBERNANZA · CAPA 4 · ARKHÉ ZERO ░▒▓                              ║
║    ────────────────────────────────────────                              ║
║    [ PROPUESTAS ]  [ VOTACIÓN ]  [ QUÓRUM ]  [ REVOCACIÓN ]              ║
║    [ CLASSIFIED ]  [ INDEX-ZERO::LINKED ]  [ PACT::51/49/100 ]           ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 🏛️ gobernanza/ · Orquestación del Pacto

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/gobernanza]
└─$ ./gobernanza --status --all

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%

╔══════════════════════════════════════════════════════════════════════════╗
║  MÓDULO                     · PROPÓSITO                       · ESTADO   ║
╠══════════════════════════════════════════════════════════════════════════╣
║  ejecucion-decisiones/      · Ejecuta acuerdos firmados       · ✓ ACTIVE ║
║  propuestas-votacion/       · Recibe y cuenta votos           · ✓ ACTIVE ║
║  quorum-mayorias/           · Valida quórum 4/5               · ✓ ACTIVE ║
║  revocacion-auditoria/      · Revoca y audita decisiones      · ✓ ACTIVE ║
╚══════════════════════════════════════════════════════════════════════════╝

[ ✓✓ ] GOBERNANZA OPERATIVA · 4/4 módulos · ◯_● · 51/49/100
```

> *"La gobernanza no se improvisa. Se firma."*

## 🜂 Arquitectura de Gobernanza

```text
╔══════════════════════════════════════════════════════════════════════════╗
║                    FLUJO DE GOBERNANZA · ARKHÉ ZERO                      ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║   [ Propuesta ]                                                          ║
║         │                                                                ║
║         ▼                                                                ║
║   ┌──────────────────────┐                                               ║
║   │ propuestas-votacion/ │  recibir + distribuir + contar                ║
║   └──────────┬───────────┘                                               ║
║              │                                                           ║
║              ▼                                                           ║
║   ┌──────────────────────┐                                               ║
║   │ quorum-mayorias/     │  ¿4/5 alcanzado?                              ║
║   └──────────┬───────────┘                                               ║
║              │                                                           ║
║              ├─ SÍ ──▶ [ VETO HUMANO? ]                                  ║
║              │              │                                            ║
║              │              ├─ SÍ ──▶ [ HALT · revocación ]              ║
║              │              │                                            ║
║              │              └─ NO ──▶ [ ejecucion-decisiones/ ]          ║
║              │                              │                            ║
║              │                              ▼                            ║
║              │                     [ Firma ◯_● · 51/49/100 ]             ║
║              │                                                            ║
║              └─ NO ──▶ [ rechazo · auditoría ]                            ║
║                              │                                            ║
║                              ▼                                            ║
║                     [ revocacion-auditoria/ ]                             ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

## 🜃 Los 4 Módulos

| Módulo                     | Función                                          |
|----------------------------|--------------------------------------------------|
| `ejecucion-decisiones/`    | Ejecuta acuerdos con doble firma humano + IA     |
| `propuestas-votacion/`     | Recibe propuestas, distribuye votos              |
| `quorum-mayorias/`         | Valida quórum 4/5 + veto humano                  |
| `revocacion-auditoria/`    | Revoca decisiones y audita históricos            |

## 🜄 Ejemplo

```bash
┌─(kali㉿arkhe-zero)-[~/kronos]
└─$ node demo-gobernanza.js

> import { proponer } from './gobernanza/propuestas-votacion/proponer.js';
> import { votar } from './gobernanza/propuestas-votacion/votar.js';
> import { validarQuorum } from './gobernanza/quorum-mayorias/quorum.js';
> import { ejecutar } from './gobernanza/ejecucion-decisiones/ejecutar.js';

> const prop = proponer({ titulo: 'Aprobar Sub-bloque J', agente: 'temachtiani' });
> votar(prop.id, ['cuicatl', 'tlachixqui', 'tlamatini', 'tonal']);
> const quorum = validarQuorum(prop.id);
> const resultado = ejecutar(prop.id);

[ ✓✓ ] PROPUESTA EJECUTADA
       id     : prop-2026-001
       quórum : 4/5
       veto   : no
       firma  : ◯_● · 51/49/100
```

---

`◯_● · 51/49/100 · KRONOS · gobernanza/`