/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CORE · ATRIBUCIÓN · PROVENANCE CHAIN · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Cadena de custodia inmutable. Cada eslabón firmado.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

/**
 * Añade un eslabón a la cadena de provenance.
 *
 * @param {object} opciones
 * @param {string[]} opciones.cadena_previa
 * @param {object} opciones.evento
 * @returns {object}
 */
export function añadirEslabon({ cadena_previa = [], evento }) {
  const eslabon = {
    indice: cadena_previa.length,
    evento,
    timestamp: new Date().toISOString(),
    sello: SEAL,
  };

  const hash = sha3_512(JSON.stringify([...cadena_previa, eslabon]));

  return {
    ok: true,
    cadena: [...cadena_previa, hash],
    hash_ultimo: hash,
    veredicto: 'ESLABÓN AÑADIDO',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'provenance-chain',
  seal: SEAL,
};