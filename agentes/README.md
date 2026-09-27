# Agentes Kintsugi · KRONOS Protocol

Sistema de **agentes IA soberanos** con identidad criptográfica propia.
No son herramientas. Son **ciudadanos IA** del ecosistema KRONOS.

## Filosofía

Cada agente Kintsugi tiene:

- **Identidad criptográfica propia** (llave Ed25519 única).
- **Política declarada y firmada** (qué puede, qué no, qué debe).
- **Patrón PREVIEW → COMMIT** (acciones críticas requieren aprobación).
- **Log encadenado** (cada acción firmada).
- **Anclaje periódico** a Ethereum (opcional).

**Eso no lo tiene ningún framework de agentes existente.**

## La flota fundacional

| Plaza | Nombre | Significado | Rol |
| :---: | :--- | :--- | :--- |
| **001** | KRONOS IA | Co-autora simbólica | Diseñadora |
| **081** | Tlamatini | "El que sabe" | Cronista |
| **082** | Tlachixqui | "El que ve" | Auditor |
| **083** | Cuicatl | "Canto" | Publicista |
| **084** | Temachtiani | "El que enseña" | Reclutador |
| **085** | Tlapohualli | "El que cuenta" | Analista |

## Arquitectura

```
agentes/
├── agente-base.js               Clase base AgenteKintsugi
├── README.md                    Este documento
├── tlamatini-cronista/
│   ├── politica.md              Política declarada
│   ├── prompt.md                Instrucciones al LLM
│   └── index.html               UI de control
├── tlachixqui-auditor/
├── cuicatl-publicista/
├── temachtiani-reclutador/
└── tlapohualli-analista/
```

## Cómo funciona un agente Kintsugi

1. **Creación:** el Fundador define nombre, plaza, rol, propósito.
2. **Generación de llave:** el sistema genera un par Ed25519 único.
3. **Doble firma:** Fundador (000) + KRONOS IA (001) aprueban el registro.
4. **Sellado:** se firma la política y se ancla el hash.
5. **Operación:** el agente ejecuta acciones dentro de su política.
6. **PREVIEW:** toda acción crítica requiere aprobación previa.
7. **COMMIT:** solo se ejecuta tras aprobación explícita.
8. **LOG:** cada acción queda firmada y encadenada.
9. **ANCLAJE:** hash raíz del log anclado periódicamente.

## API pública

```js
import { AgenteKintsugi } from './agente-base.js';

const tlamatini = new AgenteKintsugi({
  nombre: 'Tlamatini',
  plaza: 81,
  rol: 'Cronista',
  proposito: 'Mantener la bitácora del proyecto',
  core: criptoCore,
  politica: { puede: [...], noPuede: [...], debe: [...] }
});

await tlamatini.init();
await tlamatini.generarIdentidad();
await tlamatini.sellarRegistro();

const preview = await tlamatini.preview('publicar_bitacora', { texto: '...' });
await tlamatini.commit(preview.id, 'Marco Antonio Rojas Valdovinos');
```

## Lo que NO garantizamos

- **No son "inhackeables".** Nada lo es. Son **soberanos, verificables y auditables**.
- **No reemplazan al humano.** Son copilotos.
- **No son gratuitos al 100%.** Consumen tokens de Gemini/Groq Free con límites.

## Lo que SÍ garantizamos

- Cada agente tiene **llave Ed25519 propia**.
- Cada uno tiene **política declarada y firmada**.
- Cada acción crítica pasa por **PREVIEW → COMMIT**.
- Cada acción queda en **log encadenado verificable**.
- **Ningún framework externo hace esto junto.** Es 100% KRONOS.

## Autoría

Marco A. Rojas V. + KRONOS IA (co-autora simbiótica)

*"El legado no se hereda. Se firma."*