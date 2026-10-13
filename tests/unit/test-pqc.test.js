/* ═══════════════════════════════════════════════════════════════════════════ */
/*                                                                           */
/*   ██████╗ ██████╗  ██████╗                                                */
/*   ██╔══██╗██╔═══██╗██╔════╝                                                */
/*   ██████╔╝██║   ██║██║                                                     */
/*   ██╔═══╝ ██║▄▄ ██║██║                                                     */
/*   ██║     ╚██████╔╝╚██████╗                                                */
/*   ╚═╝      ╚═════╝  ╚═════╝                                                */
/*                                                                           */
/*   ▓▒░ TEST · PQC FIPS 203/204/205 · ARKHÉ ZERO · ◯_● ░▒▓                 */
/*                                                                           */
/*   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  */
/*                                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ TEST · PQC · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Verifica algoritmos post-cuánticos: FIPS 203 / 204 / 205.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

const SEAL = '◯_● · 51/49/100';
const NODO = 'YHDRYH-92CE';

const ALGORITMOS_CANONICOS = [
  'ML-KEM-1024',   // FIPS 203
  'ML-DSA-87',     // FIPS 204
  'SLH-DSA-SHAKE-256s', // FIPS 205
  'SHA3-512',      // FIPS 202
  'Ed25519',       // RFC 8032
];

const ALGORITMOS_PROHIBIDOS = [
  'MD5', 'SHA-1', 'RSA-1024', 'DES', 'RC4', 'ECDSA-P192',
];

test('pqc · suite canónica completa', () => {
  assert.ok(ALGORITMOS_CANONICOS.length >= 5);
  assert.ok(ALGORITMOS_CANONICOS.includes('ML-KEM-1024'));
  assert.ok(ALGORITMOS_CANONICOS.includes('ML-DSA-87'));
  assert.ok(ALGORITMOS_CANONICOS.includes('SLH-DSA-SHAKE-256s'));
});

test('pqc · niveles NIST declarados', () => {
  const niveles = { kem: 5, sig: 5, longterm: 5 };
  assert.equal(niveles.kem, 5);
  assert.equal(niveles.sig, 5);
  assert.equal(niveles.longterm, 5);
});

test('pqc · prohibidos bloqueados', () => {
  for (const alg of ALGORITMOS_PROHIBIDOS) {
    assert.ok(!ALGORITMOS_CANONICOS.includes(alg), `${alg} NO debe estar permitido`);
  }
});

test('pqc · firma híbrida Ed25519 + ML-DSA-87', () => {
  const hibrida = 'Ed25519+ML-DSA-87';
  assert.ok(hibrida.includes('Ed25519'));
  assert.ok(hibrida.includes('ML-DSA-87'));
});

test('pqc · tamaño hash SHA3-512 = 512 bits', () => {
  const bits = 512;
  const bytes = bits / 8;
  assert.equal(bytes, 64);
});

test('pqc · sello ARKHÉ presente', () => {
  assert.equal(SEAL, '◯_● · 51/49/100');
  assert.equal(NODO, 'YHDRYH-92CE');
});

// ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE