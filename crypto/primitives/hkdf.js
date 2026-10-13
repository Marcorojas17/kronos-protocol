/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · HKDF-SHA3-512 · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ RFC 5869 ]  ·  [ SHA3-512 ]  ·  [ extract + expand ]
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { hkdf } from '@noble/hashes/hkdf';
import { sha3_512 } from '@noble/hashes/sha3';
import { utf8ToBytes, bytesToHex } from '@noble/hashes/utils';

export const ALG = 'HKDF-SHA3-512';
export const RFC = 'RFC 5869';
export const SEAL = '◯_● · 51/49/100';

/**
 * Deriva una clave.
 * @param {Uint8Array|string} ikm  - input key material
 * @param {Uint8Array|string} salt - salt (opcional pero recomendado)
 * @param {Uint8Array|string} info - contexto de la derivación
 * @param {number} length          - bytes a derivar (default 32)
 */
export function derive(ikm, salt, info, length = 32) {
  const ikmBytes  = typeof ikm === 'string'  ? utf8ToBytes(ikm)  : ikm;
  const saltBytes = typeof salt === 'string' ? utf8ToBytes(salt) : salt;
  const infoBytes = typeof info === 'string' ? utf8ToBytes(info) : info;
  return hkdf(sha3_512, ikmBytes, saltBytes, infoBytes, length);
}

export function deriveHex(ikm, salt, info, length = 32) {
  return bytesToHex(derive(ikm, salt, info, length));
}

export const meta = {
  alg: ALG, rfc: RFC,
  uso: 'Derivar claves desde secretos compartidos',
  seal: SEAL,
};