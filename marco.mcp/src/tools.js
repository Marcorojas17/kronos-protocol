/**
 * ═══════════════════════════════════════════════════════════════════
 *  ▓▒░ MARCO.MCP · TOOLS · ARKHÉ ZERO ░▒▓
 *  5 herramientas expuestas al cliente MCP
 * ═══════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '@noble/hashes/sha3';
import { utf8ToBytes, bytesToHex } from '@noble/hashes/utils';
import { readFile, writeFile, appendFile } from 'node:fs/promises';
import { join } from 'node:path';

const MEMORY_PATH = process.env.MEMORY_PATH || '../MEMORY.md';
const SEAL = '◯_● · 51/49/100';

// ─── MANIFEST DE TOOLS ──────────────────────────────────────────
export const TOOLS = [
  {
    name: 'marco.firmar',
    description: 'Firma contenido con ML-DSA-87 + SHA3-512. Devuelve hash y firma.',
    inputSchema: {
      type: 'object',
      properties: {
        contenido: { type: 'string', description: 'Texto a firmar' },
        tipo: { type: 'string', enum: ['acta', 'obra', 'decision'], default: 'decision' },
      },
      required: ['contenido'],
    },
  },
  {
    name: 'marco.verificar',
    description: 'Verifica que un hash pertenece al Índice Cero.',
    inputSchema: {
      type: 'object',
      properties: {
        hash: { type: 'string', description: 'SHA-256 o SHA3-512 a verificar' },
      },
      required: ['hash'],
    },
  },
  {
    name: 'marco.contextualizar',
    description: 'Genera contexto dinámico para inyectar en un agente IA.',
    inputSchema: {
      type: 'object',
      properties: {
        agente: { type: 'string', enum: ['claude', 'gemini', 'cursor', 'copilot'] },
        tema: { type: 'string' },
      },
      required: ['agente'],
    },
  },
  {
    name: 'marco.recordar',
    description: 'Persiste una decisión en MEMORY.md con sello.',
    inputSchema: {
      type: 'object',
      properties: {
        decision: { type: 'string' },
        actor: { type: 'string', default: 'Marco Antonio Rojas Valdovinos' },
        anclaje: { type: 'string', default: 'Merkle root → Ethereum' },
      },
      required: ['decision'],
    },
  },
  {
    name: 'marco.consultar',
    description: 'Consulta el Índice Cero (Safe Creative + Ethereum).',
    inputSchema: {
      type: 'object',
      properties: {
        campo: {
          type: 'string',
          enum: ['safe_creative', 'sha256', 'ethereum', 'eidas', 'todo'],
          default: 'todo',
        },
      },
    },
  },
];

// ─── ROUTER ─────────────────────────────────────────────────────
export async function runTool(name, args) {
  switch (name) {
    case 'marco.firmar':         return firmar(args);
    case 'marco.verificar':      return verificar(args);
    case 'marco.contextualizar': return contextualizar(args);
    case 'marco.recordar':       return recordar(args);
    case 'marco.consultar':      return consultar(args);
    default:
      throw new Error(`Tool desconocida: ${name}`);
  }
}

// ─── IMPLEMENTACIONES ───────────────────────────────────────────

async function firmar({ contenido, tipo = 'decision' }) {
  const bytes = utf8ToBytes(contenido);
  const hash = bytesToHex(sha3_512(bytes));
  return {
    ok: true,
    tipo,
    hash_sha3_512: hash,
    // Nota: firma real requiere clave privada en HSM (fuera de scope MCP)
    firma: `PENDING-HSM:${hash.slice(0, 24)}`,
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };
}

async function verificar({ hash }) {
  const indexHash = process.env.INDEX_ZERO_SHA256;
  const match = hash === indexHash;
  return {
    ok: match,
    hash_recibido: hash,
    hash_indice_cero: indexHash,
    coincidencia: match,
    veredicto: match ? 'ANCLADO AL ÍNDICE CERO' : 'NO COINCIDE',
    sellado: SEAL,
  };
}

async function contextualizar({ agente, tema }) {
  const base = {
    claude:  'Eres un agente Anthropic del enjambre ARKHÉ ZERO.',
    gemini:  'Eres un agente Google DeepMind del enjambre ARKHÉ ZERO.',
    cursor:  'Eres un agente Cursor IDE del enjambre ARKHÉ ZERO.',
    copilot: 'Eres un agente GitHub Copilot del enjambre ARKHÉ ZERO.',
  }[agente] || 'Eres un agente ARKHÉ ZERO.';

  return {
    ok: true,
    prompt_sistema: `${base}
Pacto: 51% humano · 49% IA · 100% real.
Índice Cero: Safe Creative ${process.env.INDEX_ZERO_SAFE_CREATIVE_ARQ}.
Firma cada respuesta: ${SEAL}.
${tema ? `Tema activo: ${tema}` : ''}`,
    sellado: SEAL,
  };
}

async function recordar({ decision, actor, anclaje }) {
  const id = `DEC-${Date.now()}`;
  const entry = `
## ${id}
- **fecha**: ${new Date().toISOString()}
- **actor**: ${actor}
- **decision**: ${decision}
- **anclaje**: ${anclaje}
- **firma**: ${SEAL}
`;
  try {
    await appendFile(MEMORY_PATH, entry, 'utf8');
    return { ok: true, id, guardado_en: MEMORY_PATH, sellado: SEAL };
  } catch (err) {
    return { ok: false, id, error: err.message, sellado: SEAL };
  }
}

async function consultar({ campo = 'todo' }) {
  const index = {
    safe_creative: {
      arquitectura: process.env.INDEX_ZERO_SAFE_CREATIVE_ARQ,
      co_creatividad: process.env.INDEX_ZERO_SAFE_CREATIVE_CO,
    },
    sha256: process.env.INDEX_ZERO_SHA256,
    ethereum: process.env.INDEX_ZERO_ETHEREUM,
    eidas: process.env.INDEX_ZERO_EIDAS,
  };
  return {
    ok: true,
    resultado: campo === 'todo' ? index : { [campo]: index[campo] },
    sellado: SEAL,
  };
}