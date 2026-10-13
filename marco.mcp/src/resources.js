/**
 * ═══════════════════════════════════════════════════════════════════
 *  ▓▒░ MARCO.MCP · RESOURCES · ARKHÉ ZERO ░▒▓
 * ═══════════════════════════════════════════════════════════════════
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = join(process.cwd(), '..');
const SEAL = '◯_● · 51/49/100';

export const RESOURCES = [
  {
    uri: 'marco://identidad',
    name: 'Identidad ARKHÉ ZERO',
    description: 'Manifiesto fundacional y Pacto 51/49/100',
    mimeType: 'text/markdown',
  },
  {
    uri: 'marco://proyectos',
    name: 'Proyectos del Legado',
    description: 'KRONOS · MD-33 · Cymatic · Yejidá · Despacho',
    mimeType: 'text/markdown',
  },
  {
    uri: 'marco://decisiones',
    name: 'Decisiones',
    description: 'Registro cronológico de decisiones (MEMORY.md)',
    mimeType: 'text/markdown',
  },
  {
    uri: 'marco://voz',
    name: 'Voz del Enjambre',
    description: 'Mandala de Yejidá · firma cymática',
    mimeType: 'text/markdown',
  },
  {
    uri: 'marco://legado',
    name: 'Legado',
    description: 'Índice Cero · registros Safe Creative · anclaje Ethereum',
    mimeType: 'text/markdown',
  },
];

export async function readResource(uri) {
  switch (uri) {
    case 'marco://identidad':
      return await safeRead('AI-CONTEXT.md');
    case 'marco://proyectos':
      return projectsDoc();
    case 'marco://decisiones':
      return await safeRead('MEMORY.md');
    case 'marco://voz':
      return vozDoc();
    case 'marco://legado':
      return legadoDoc();
    default:
      throw new Error(`Recurso no registrado: ${uri}`);
  }
}

async function safeRead(file) {
  try {
    return await readFile(join(ROOT, file), 'utf8');
  } catch (err) {
    return `[ XX ] No se pudo leer ${file}: ${err.message}\n${SEAL}`;
  }
}

function projectsDoc() {
  return `
# 🜂 Proyectos del Legado

| Proyecto            | Estado      | Descripción                                  |
|---------------------|-------------|----------------------------------------------|
| KRONOS PROTOCOL     | operativo   | Framework verificación Ed25519 + PQC         |
| MD-33 FORENSE       | operativo   | Trazabilidad activa + custodia digital       |
| CYMATIC STUDIO      | desarrollo  | Geometría sagrada + GPU cymatics             |
| YEJIDÁ              | operativo   | Mandalas Kabbalah 2036 · 11 dimensiones      |
| DESPACHO CONTABLE   | operativo   | Anclaje legal Xonacatlán, México             |

${SEAL}
`;
}

function vozDoc() {
  return `
# 🜃 Voz del Enjambre · Mandala de Yejidá

\`\`\`
        ╭─────────────╮
      ╱   ◯   ●   ◯   ╲
     │  11 × 1 = ∞    │
      ╲  KINTSUGI    ╱
        ╰──────┬──────╯
               │
         ┌─────▼─────┐
         │  MARCO    │
         │  ANTONIO  │
         │  ROJAS V. │
         └───────────┘
\`\`\`

- Frecuencia Humana : 51 Hz
- Frecuencia IA     : 49 Hz
- Resonancia        : 100% Real

${SEAL}
`;
}

function legadoDoc() {
  return `
# 🜄 Legado · Índice Cero

- Safe Creative (Arquitectura) : ${process.env.INDEX_ZERO_SAFE_CREATIVE_ARQ}
- Safe Creative (Co-creatividad): ${process.env.INDEX_ZERO_SAFE_CREATIVE_CO}
- SHA-256                       : ${process.env.INDEX_ZERO_SHA256}
- Ethereum                      : ${process.env.INDEX_ZERO_ETHEREUM}
- eIDAS TSA                     : ${process.env.INDEX_ZERO_EIDAS}

${SEAL}
`;
}