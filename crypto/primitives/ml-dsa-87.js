/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · ML-DSA-87 · FIRMA POST-CUÁNTICA · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ FIPS 204 ]  ·  [ Dilithium5 ]  ·  [ NIST Level 5 ]
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/crypto/primitives]
 *  └─$ node -e "import('./ml-dsa-87.js').then(m => console.log(m.meta))"
 *     { alg: 'ML-DSA-87', fips: '204', nist_level: 5, seal: '◯_● · 51/49/100' }
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { ml_dsa87 } from '@noble/post-quantum/ml-dsa';
import { sha3_512 } from './sha3-512.js';

export const ALG = 'ML-DSA-87';
export const FIPS = '204';
export const NIST_LEVEL = 5;
export const SEAL = '◯_● · 51/49/100';

export const SIZES = Object.freeze({
  publicKey: 2592,
  secretKey: 4896,
  signature: 4627,
  seed: 32,
});

/**
 * Genera un par de llaves ML-DSA-87.
 *
 * @param {Uint8Array} [seed] - opcional, 32 bytes
 * @returns {{ publicKey: Uint8Array, secretKey: Uint8Array }}
 */
export function keygen(seed) {
  const s = seed ?? crypto.getRandomValues(new Uint8Array(SIZES.seed));
  return ml_dsa87.keygen(s);
}

/**
 * Firma un contenido con ML-DSA-87.
 *
 * @param {Uint8Array} secretKey
 * @param {string|Uint8Array} contenido
 * @returns {{ firma: Uint8Array, hash: string, alg: string, seal: string }}
 */
export function sign(secretKey, contenido) {
  const hash = sha3_512(contenido);
  const msg = typeof contenido === 'string'
    ? new TextEncoder().encode(contenido)
    : contenido;
  const firma = ml_dsa87.sign(secretKey, msg);
  return { firma, hash, alg: ALG, seal: SEAL };
}

/**
 * Verifica una firma ML-DSA-87.
 *
 * @param {Uint8Array} publicKey
 * @param {Uint8Array} firma
 * @param {string|Uint8Array} contenido
 * @returns {boolean}
 */
export function verify(publicKey, firma, contenido) {
  const msg = typeof contenido === 'string'
    ? new TextEncoder().encode(contenido)
    : contenido;
  try {
    return ml_dsa87.verify(publicKey, msg, firma);
  } catch {
    return false;
  }
}

export const meta = {
  alg: ALG,
  fips: FIPS,
  nist_level: NIST_LEVEL,
  sizes: SIZES,
  seal: SEAL,
};