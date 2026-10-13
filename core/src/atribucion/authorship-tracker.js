/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CORE · ATRIBUCIÓN · AUTHORSHIP TRACKER · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Registra trayectoria de contribución de cada autor.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

/**
 * Registra una contribución.
 *
 * @param {object} opciones
 * @param {string} opciones.autor
 * @param {string} opciones.obra
 * @param {number} opciones.peso
 * @param {string} opciones.tipo
 * @returns {object}
 */
export function registrarContribucion({ autor, obra, peso, tipo }) {
  const contribucion = {
    autor,
    obra,
    peso,
    tipo,
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };

  return {
    ok: true,
    contribucion,
    hash: sha3_512(JSON.stringify(contribucion)),
    veredicto: 'CONTRIBUCIÓN REGISTRADA',
    sellado: SEAL,
  };
}

/**
 * Calcula trayectoria total de un autor.
 */
export function trayectoriaAutor(autor, contribuciones) {
  const total = contribuciones
    .filter((c) => c.autor === autor)
    .reduce((acc, c) => acc + (c.peso || 0), 0);

  return {
    autor,
    contribuciones: contribuciones.filter((c) => c.autor === autor).length,
    peso_total: total,
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'authorship-tracker',
  seal: SEAL,
};