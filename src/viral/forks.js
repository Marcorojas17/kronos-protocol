/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SRC · VIRAL · FORKS · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Registra y ancla forks con atribución al Índice Cero.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

/**
 * Registra un fork.
 *
 * @param {object} opciones
 * @param {string} opciones.repo
 * @param {string} opciones.autor
 * @param {string} [opciones.motivo]
 * @returns {object}
 */
export function registrarFork({ repo, autor, motivo = '' }) {
  const fork = {
    repo,
    autor,
    motivo,
    timestamp: new Date().toISOString(),
    sello: SEAL,
  };
  return {
    ok: true,
    fork,
    hash: sha3_512(JSON.stringify(fork)),
    veredicto: 'FORK REGISTRADO',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'viral-forks',
  seal: SEAL,
};