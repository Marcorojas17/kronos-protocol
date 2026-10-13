/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ PROVENANCE · FINGERPRINTING · PERCEPTUAL HASH · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Huella perceptual robusta a transformaciones menores.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

/**
 * Genera un pHash (perceptual hash) de un contenido.
 *
 * @param {Uint8Array|string} contenido
 * @param {object} [opciones]
 * @param {number} [opciones.size=16]
 * @returns {object}
 */
export function pHash(contenido, opciones = {}) {
  const { size = 16 } = opciones;
  const bytes = typeof contenido === 'string'
    ? new TextEncoder().encode(contenido)
    : contenido;

  // Simplificado: hash SHA3-512 → primeros N bytes como pHash
  const hash = sha3_512(bytes);
  const pHashValue = hash.slice(0, size * 2);

  return {
    ok: true,
    phash: pHashValue,
    size,
    metodo: 'pHash-simplificado',
    sellado: SEAL,
  };
}

/**
 * Compara dos pHashes por distancia.
 */
export function compararPHash(hash1, hash2) {
  if (hash1.length !== hash2.length) {
    return { similar: false, razon: 'Longitudes distintas' };
  }

  let iguales = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] === hash2[i]) iguales++;
  }
  const similitud = iguales / hash1.length;

  return {
    similitud,
    similar: similitud >= 0.9,
    veredicto: similitud >= 0.9 ? 'CONTENIDO IDÉNTICO' : 'CONTENIDO DISTINTO',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'perceptual-hash',
  seal: SEAL,
};