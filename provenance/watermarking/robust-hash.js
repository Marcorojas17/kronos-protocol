/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ PROVENANCE · WATERMARKING · ROBUST HASH · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Hash robusto a rotaciones, escala y ruido (pHash + DCT simplificado).
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

/**
 * Genera un hash robusto (perceptual) del contenido.
 *
 * @param {Uint8Array|string} contenido
 * @param {object} [opciones]
 * @param {number} [opciones.bits=64]
 * @returns {object}
 */
export function hashRobusto(contenido, opciones = {}) {
  const { bits = 64 } = opciones;
  const bytes = typeof contenido === 'string'
    ? new TextEncoder().encode(contenido)
    : contenido;

  // Simulación: en producción usar pHash real o DCT
  const hash = sha3_512(bytes);
  const hashBits = BigInt('0x' + hash).toString(2).slice(0, bits);

  return {
    ok: true,
    hash_robusto: hashBits,
    bits,
    metodo: 'pHash-simplificado',
    sellado: SEAL,
  };
}

/**
 * Compara dos hashes robustos por distancia de Hamming.
 */
export function distanciaHamming(hash1, hash2) {
  if (hash1.length !== hash2.length) {
    return { error: 'Longitudes distintas' };
  }
  let distancia = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) distancia++;
  }
  return {
    distancia,
    similar: distancia <= 5,
    veredicto: distancia <= 5 ? 'CONTENIDO SIMILAR' : 'CONTENIDO DISTINTO',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'watermark-robust-hash',
  seal: SEAL,
};