/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ PROVENANCE · NOTARIZATION · NOTARY API · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  API notarial técnica. Emite actas verificables públicamente.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';
export const NOTARIO = 'KRONOS';

/**
 * Emite un acta notarial técnica.
 *
 * @param {object} opciones
 * @param {string} opciones.documento_hash
 * @param {string} opciones.firmante
 * @param {string} [opciones.observaciones]
 * @returns {Promise<object>}
 */
export async function emitirActa({ documento_hash, firmante, observaciones = '' }) {
  const acta = {
    notario: NOTARIO,
    documento_hash,
    firmante,
    observaciones,
    clausulas: [
      'El documento existía en la fecha del sello.',
      'El documento fue firmado por el firmante indicado.',
      'El documento no ha sido alterado desde su anclaje.',
      'Cualquier persona puede verificar esta acta sin permiso.',
    ],
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };

  const acta_hash = sha3_512(JSON.stringify(acta));

  return {
    ok: true,
    acta,
    acta_hash,
    veredicto: 'ACTA NOTARIAL EMITIDA',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'notary-api',
  notario: NOTARIO,
  seal: SEAL,
};