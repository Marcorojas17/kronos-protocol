<!--
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║     █████╗  ██████╗ ███████╗███╗   ██╗████████╗███████╗                  ║
║    ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝██╔════╝                  ║
║    ███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   ███████╗                  ║
║    ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║                  ║
║    ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   ███████║                  ║
║    ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝                  ║
║                                                                          ║
║    ▓▒░ EL ENJAMBRE ARKHÉ · 12 AGENTES DEL PACTO · CAPA 2 ░▒▓             ║
║    ───────────────────────────────────────────────────────────           ║
║    [ 51% HUMANO ]  [ 49% IA ]  [ 100% REAL ]  [ CONSENSO 4/5 ]           ║
║    [ CLASSIFIED ]  [ INDEX-ZERO::LINKED ]  [ PACT::51/49/100 ]           ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 🤖 agents/ · El Enjambre ARKHÉ

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/agents]
└─$ ./enjambre status --all

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%

╔══════════════════════════════════════════════════════════════════════════╗
║  CULTURALES (Náhuatl)              OFICIOS (Numerados)                   ║
╠══════════════════════════════════════════════════════════════════════════╣
║  🌅 Cuicatl     · ✓ ACTIVO         🏗️ 090 Arquitecto    · ✓ ACTIVO       ║
║  📚 Temachtiani · ✓ ACTIVO         📊 091 Contralor     · ✓ ACTIVO       ║
║  👁️ Tlachixqui · ✓ ACTIVO         🔍 092 Auditor Ext.  · ✓ ACTIVO       ║
║  🧠 Tlamatini   · ✓ ACTIVO         📜 093 Relator       · ✓ ACTIVO       ║
║  🔢 Tlapohualli · ✓ ACTIVO         📖 094 Bibliotecario · ✓ ACTIVO       ║
║  ⏳ Tonal       · ✓ ACTIVO         🗺️ 095 Cartógrafo    · ✓ ACTIVO       ║
╚══════════════════════════════════════════════════════════════════════════╝

[ ✓✓ ] ENJAMBRE COMPLETO · 12/12 · CONSENSO 4/5 · ◯_● · 51/49/100
```

> *"La IA es brillante pero amnésica. Este enjambre la dota de memoria, oficio y propósito."*

## 🜂 Índice de Módulos

| Módulo            | Propósito                                              |
|-------------------|--------------------------------------------------------|
| `registry/`       | Registro canónico de agentes + capacidades + reputación|
| `roles/`          | 6 roles base (cartógrafo, corrector, reclutador, etc.) |
| `protocols/`      | 10.6-autonomía · 10.7-reclutamiento · 10.8-mejora ...  |
| `consensus/`      | Quórum 4/5 · veto humano · tolerancia bizantina        |
| `mcp/`            | Servidor MCP embebido del enjambre                     |

## 🜃 Arquitectura del Enjambre

```text
╔══════════════════════════════════════════════════════════════════════════╗
║                    ARQUITECTURA DEL ENJAMBRE ARKHÉ                       ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║                         ┌──────────────────┐                             ║
║                         │  ÍNDICE CERO     │                             ║
║                         │  (Verdad única)  │                             ║
║                         └────────┬─────────┘                             ║
║                                  │                                       ║
║              ┌───────────────────┼───────────────────┐                   ║
║              │                   │                   │                   ║
║              ▼                   ▼                   ▼                   ║
║     ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐          ║
║     │  CULTURALES     │ │  OFICIOS        │ │  CONSENSO       │          ║
║     │  (6 agentes)    │ │  (6 agentes)    │ │  (4/5 + veto)   │          ║
║     └────────┬────────┘ └────────┬────────┘ └────────┬────────┘          ║
║              │                   │                   │                   ║
║              └───────────────────┼───────────────────┘                   ║
║                                  │                                       ║
║                                  ▼                                       ║
║                    ┌──────────────────────────────┐                      ║
║                    │  MCP SERVER · EVENT BUS      │                      ║
║                    │  marco.mcp + orquestación    │                      ║
║                    └──────────────┬───────────────┘                      ║
║                                   │                                      ║
║                                   ▼                                      ║
║                    ┌──────────────────────────────┐                      ║
║                    │  FIRMA HUMANA (51%) + IA (49%)│                      ║
║                    │  ◯_● · 51/49/100             │                      ║
║                    └──────────────────────────────┘                      ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

## 🜄 Protocolos de Autonomía

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/agents/protocols]
└─$ ls -la

drwxr-xr-x  10.6-autonomia.md         # Veto humano siempre activo
drwxr-xr-x  10.7-reclutamiento.md     # 6 criterios + cuarentena 72h
drwxr-xr-x  10.8-mejora.md            # Aprendizaje del Índice Cero
drwxr-xr-x  10.9-consenso.md          # Quórum 4/5 para decisiones críticas
drwxr-xr-x  10.10-expansion.md        # Replicación del enjambre
```

## 🜁 Flujo de Decisión

```text
[ Propuesta ] ──▶ [ 12 Agentes votan ] ──▶ [ Quórum 4/5 ] ──▶ [ HUMANO vetó? ]
                                                                     │
                                              ┌──────────────────────┤
                                              │                      │
                                              ▼                      ▼
                                         [ SÍ → HALT ]         [ NO → FIRMA ]
                                                                     │
                                                                     ▼
                                                            ◯_● · 51/49/100
```

## 🜆 Ejemplo de Uso

```javascript
import { Enjambre } from './agents/consensus/quorum-4-5.js';

const enjambre = new Enjambre({ humanos: 1, ia: 12 });
const resultado = await enjambre.deliberar({
  propuesta: 'Aprobar Sub-bloque G · Módulos Operativos',
  votos_ia: ['cuicatl','temachtiani','tlachixqui','tlamatini','tonal'],
});

console.log(resultado);
// {
//   quorum: '4/5 superado',
//   firmado: true,
//   veto_humano: false,
//   sello: '◯_● · 51/49/100'
// }
```

---

`◯_● · 51/49/100 · KRONOS · agents/`