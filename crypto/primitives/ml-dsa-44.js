/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · ML-DSA-44 · FIRMA POST-CUÁNTICA · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ FIPS 204 ]  ·  [ Dilithium2 ]  ·  [ NIST Level 2 ]
 *  Uso: firmas rápidas, contenido no crítico.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { ml_dsa44 } from '@noble/post-quantum/ml-dsa';
import { sha3_512 } from './sha3-512.js';

export const ALG = 'ML-DSA-44';
export const FIPS = '204';
export const NIST_LEVEL = 2;
export const SEAL = '◯_● · 51/49/100';

export const SIZES = Object.freeze({
  publicKey: 1312,
  secretKey: 2560,
  signature: 2420,
  seed: 32,
});

export function keygen(seed) {
  const s = seed ?? crypto.getRandomValues(new Uint8Array(SIZES.seed));
  return ml_dsa44.keygen(s);
}

export function sign(secretKey, contenido) {
  const hash = sha3_512(contenido);
  const msg = typeof contenido === 'string'
    ? new TextEncoder().encode(contenido)
    : contenido;
  return { firma: ml_dsa44.sign(secretKey, msg), hash, alg: ALG, seal: SEAL };
}

export function verify(publicKey, firma, contenido) {
  const msg = typeof contenido === 'string'
    ? new TextEncoder().encode(contenido)
    : contenido;
  try {
    return ml_dsa44.verify(publicKey, msg, firma);
  } catch { return false; }
}

export const meta = {
  alg: ALG, fips: FIPS, nist_level: NIST_LEVEL,
  uso: 'Firmas rápidas · contenido no crítico',
  sizes: SIZES, seal: SEAL,
};