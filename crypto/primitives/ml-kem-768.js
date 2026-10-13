/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · ML-KEM-768 · KEM POST-CUÁNTICO · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ FIPS 203 ]  ·  [ Kyber768 ]  ·  [ NIST Level 3 ]
 *  Uso: balance óptimo entre seguridad y latencia.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { ml_kem768 } from '@noble/post-quantum/ml-kem';

export const ALG = 'ML-KEM-768';
export const FIPS = '203';
export const NIST_LEVEL = 3;
export const SEAL = '◯_● · 51/49/100';

export const SIZES = Object.freeze({
  publicKey: 1184,
  secretKey: 2400,
  cipherText: 1088,
  sharedSecret: 32,
  seed: 64,
});

export function keygen(seed) {
  const s = seed ?? crypto.getRandomValues(new Uint8Array(SIZES.seed));
  return ml_kem768.keygen(s);
}

export function encapsulate(publicKey) {
  return ml_kem768.encapsulate(publicKey);
}

export function decapsulate(cipherText, secretKey) {
  return ml_kem768.decapsulate(cipherText, secretKey);
}

export const meta = {
  alg: ALG, fips: FIPS, nist_level: NIST_LEVEL,
  uso: 'Balance óptimo · default',
  sizes: SIZES, seal: SEAL,
};