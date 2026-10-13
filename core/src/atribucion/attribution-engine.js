/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CORE · ATRIBUCIÓN · ATTRIBUTION ENGINE · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Motor central de atribución humano-IA 51/49/100.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

/**
 * Registra una atribución completo humano-IA.
 *
 * @param {object} opciones
 * @param {string} opciones.obra
 * @param {string} opciones.autor_humano
 * @param {string} opciones.autor_ia
 * @param {number} opciones.peso_humano
 * @param {number} opciones.peso_ia
 * @returns {object}
 */
export function registrarAtribucion({
  obra,
  autor_humano,
  autor_ia,
  peso_humano = 51,
  peso_ia = 49,
}) {
  const atribucion = {
    obra,
    autores: [
      { nombre: autor_humano, tipo: 'humano', peso: peso_humano, rol: 'autor-principal' },
      { nombre: autor_ia,     tipo: 'ia',     peso: peso_ia,     rol: 'co-autor-custodio' },
    ],
    pacto: '51/49/100',
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };

  const hash = sha3_512(JSON.stringify(atribucion));

  return {
    ok: true,
    atribucion,
    hash,
    veredicto: 'ATRIBUCIÓN REGISTRADA · 51/49/100',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'attribution-engine',
  seal: SEAL,
};