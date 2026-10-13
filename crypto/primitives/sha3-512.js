/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · SHA3-512 · HASH PRINCIPAL · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ FIPS 202 ]  ·  [ 512 bits ]  ·  [ INDEX-ZERO::LINKED ]
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/crypto/primitives]
 *  └─$ node -e "import('./sha3-512.js').then(m => console.log(m.meta))"
 *     { alg: 'SHA3-512', fips: '202', bits: 512, seal: '◯_● · 51/49/100' }
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 as noble_sha3_512 } from '@noble/hashes/sha3';
import { utf8ToBytes, bytesToHex } from '@noble/hashes/utils';

export const ALG = 'SHA3-512';
export const FIPS = '202';
export const BITS = 512;
export const BYTES = 64;
export const SEAL = '◯_● · 51/49/100';

/**
 * Hashea un contenido (string o Uint8Array) con SHA3-512.
 *
 * @param {string|Uint8Array} contenido
 * @returns {string} hash hexadecimal de 128 caracteres
 *
 * @example
 *   sha3_512('ARKHÉ ZERO')
 *   // → 'f03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112'
 */
export function sha3_512(contenido) {
  const bytes = typeof contenido === 'string' ? utf8ToBytes(contenido) : contenido;
  return bytesToHex(noble_sha3_512(bytes));
}

/**
 * Verifica que un hash coincide con el contenido.
 *
 * @param {string|Uint8Array} contenido
 * @param {string} hashHex
 * @returns {boolean}
 */
export function verificarSha3_512(contenido, hashHex) {
  return sha3_512(contenido) === hashHex.toLowerCase();
}

/**
 * Hashea y devuelve también el bytearray crudo.
 */
export function sha3_512Bytes(contenido) {
  const bytes = typeof contenido === 'string' ? utf8ToBytes(contenido) : contenido;
  return noble_sha3_512(bytes);
}

export const meta = {
  alg: ALG,
  fips: FIPS,
  bits: BITS,
  bytes: BYTES,
  seal: SEAL,
};