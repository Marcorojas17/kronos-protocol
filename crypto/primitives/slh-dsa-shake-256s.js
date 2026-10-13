/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · SLH-DSA-SHAKE-256s · FIRMA LARGO PLAZO · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ FIPS 205 ]  ·  [ SPHINCS+ ]  ·  [ stateless hash-based ]
 *  Uso: preservación a 50+ años. Sin supuestos matemáticos de curvas.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/crypto/primitives]
 *  └─$ node -e "import('./slh-dsa-shake-256s.js').then(m => console.log(m.meta))"
 *     { alg: 'SLH-DSA-SHAKE-256s', fips: '205', horizonte: '50+ años', ... }
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { slh_dsa_shake_256s } from '@noble/post-quantum/slh-dsa';
import { sha3_512 } from './sha3-512.js';

export const ALG = 'SLH-DSA-SHAKE-256s';
export const FIPS = '205';
export const HORIZON = '50+ años';
export const SEAL = '◯_● · 51/49/100';

export const SIZES = Object.freeze({
  publicKey: 64,
  secretKey: 128,
  signature: 29792,
  seed: 48,
});

/**
 * Genera un par de llaves SLH-DSA-SHAKE-256s.
 */
export function keygen(seed) {
  const s = seed ?? crypto.getRandomValues(new Uint8Array(SIZES.seed));
  return slh_dsa_shake_256s.keygen(s);
}

/**
 * Firma un contenido con SLH-DSA-SHAKE-256s.
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
  return {
    firma: slh_dsa_shake_256s.sign(secretKey, msg),
    hash,
    alg: ALG,
    seal: SEAL,
  };
}

/**
 * Verifica una firma SLH-DSA-SHAKE-256s.
 */
export function verify(publicKey, firma, contenido) {
  const msg = typeof contenido === 'string'
    ? new TextEncoder().encode(contenido)
    : contenido;
  try {
    return slh_dsa_shake_256s.verify(publicKey, msg, firma);
  } catch {
    return false;
  }
}

export const meta = {
  alg: ALG,
  fips: FIPS,
  horizonte: HORIZON,
  sizes: SIZES,
  seal: SEAL,
};