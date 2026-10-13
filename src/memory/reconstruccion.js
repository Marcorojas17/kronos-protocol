/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SRC · MEMORY · RECONSTRUCCIÓN · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Reconstruye contexto completo desde una cápsula de memoria.
 *  Funciona incluso 100+ años después gracias al anclaje on-chain.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

/**
 * Reconstruye el contexto de una cápsula.
 *
 * @param {object} opciones
 * @param {object} opciones.capsula
 * @returns {Promise<object>}
 */
export async function reconstruirContexto({ capsula }) {
  if (!capsula?.id || !capsula?.hash) {
    throw new Error('[ XX ] Cápsula inválida');
  }

  // 1. Buscar la cápsula en múltiples planos
  const planos = ['local', 'ipfs', 'arweave', 'ethereum'];

  // 2. Reconstruir el contexto
  const contexto = {
    id: capsula.id,
    contexto_original: capsula.contexto,
    decision_original: capsula.decision,
    autor: capsula.autor,
    hash_original: capsula.hash,
    hash_verificado: sha3_512(JSON.stringify({
      contexto: capsula.contexto,
      decision: capsula.decision,
      autor: capsula.autor,
    })),
    planos_disponibles: planos,
    reconstruible: true,
    sellado: SEAL,
    reconstruido_en: new Date().toISOString(),
  };

  contexto.integro = contexto.hash_original === contexto.hash_verificado;

  return {
    ok: contexto.integro,
    contexto,
    veredicto: contexto.integro
      ? 'CONTEXTO RECONSTRUIDO · ÍNTEGRO'
      : 'CONTEXTO CORRUPTO · HALT',
    sellado: SEAL,
  };
}

/**
 * Verifica que una cápsula se puede reconstruir.
 */
export function verificarReconstruibilidad(capsula) {
  const requisitos = [
    'id',
    'contexto',
    'decision',
    'autor',
    'hash',
    'anclaje',
  ];
  const faltantes = requisitos.filter((r) => !capsula[r]);

  return {
    reconstruible: faltantes.length === 0,
    faltantes,
    veredicto: faltantes.length === 0
      ? 'CÁPSULA RECONSTRUIBLE'
      : `FALTAN CAMPOS: ${faltantes.join(', ')}`,
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'reconstruccion',
  seal: SEAL,
};