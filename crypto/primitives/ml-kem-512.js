/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · ML-KEM-512 · KEM POST-CUÁNTICO · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ FIPS 203 ]  ·  [ Kyber512 ]  ·  [ NIST Level 1 ]
 *  Uso: escenarios donde latencia > seguridad máxima.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { ml_kem512 } from '@noble/post-quantum/ml-kem';

export const ALG = 'ML-KEM-512';
export const FIPS = '203';
export const NIST_LEVEL = 1;
export const SEAL = '◯_● · 51/49/100';

export const SIZES = Object.freeze({
  publicKey: 800,
  secretKey: 1632,
  cipherText: 768,
  sharedSecret: 32,
  seed: 64,
});

export function keygen(seed) {
  const s = seed ?? crypto.getRandomValues(new Uint8Array(SIZES.seed));
  return ml_kem512.keygen(s);
}

export function encapsulate(publicKey) {
  return ml_kem512.encapsulate(publicKey);
}

export function decapsulate(cipherText, secretKey) {
  return ml_kem512.decapsulate(cipherText, secretKey);
}

export const meta = {
  alg: ALG, fips: FIPS, nist_level: NIST_LEVEL,
  uso: 'Latencia > seguridad',
  sizes: SIZES, seal: SEAL,
};