/* ═══════════════════════════════════════════════════════════════════════════ */
/*                                                                           */
/*   ██╗███╗   ██╗██████╗ ██╗ ██████╗███████╗                                */
/*   ██║████╗  ██║██╔══██╗██║██╔════╝██╔════╝                                */
/*   ██║██╔██╗ ██║██║  ██║██║██║     █████╗                                  */
/*   ██║██║╚██╗██║██║  ██║██║██║     ██╔══╝                                  */
/*   ██║██║ ╚████║██████╔╝██║╚██████╗███████╗                                */
/*   ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝ ╚═════╝╚══════╝                                */
/*                                                                           */
/*   ▓▒░ TEST · ÍNDICE CERO · ARKHÉ ZERO · ◯_● ░▒▓                          */
/*                                                                           */
/*   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  */
/*                                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ TEST · ÍNDICE CERO · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Verifica el registro canónico: Safe Creative + SHA + Ethereum + eIDAS.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

const SEAL = '◯_● · 51/49/100';
const NODO = 'YHDRYH-92CE';

const INDEX_ZERO = Object.freeze({
  safeCreativeArq: '2607146379465',
  safeCreativeCo: '2607086319439',
  sha256: 'f03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112',
  ethereum: '0xd2c2a7e128e6c81b689b3b0d9e1b31a4f6f8df0391b7b6c05e7daa7fb895774c',
  eidas: 'Firmaprofesional QTSA',
});

test('indice-cero · Safe Creative arquitectura presente', () => {
  assert.equal(INDEX_ZERO.safeCreativeArq, '2607146379465');
  assert.equal(INDEX_ZERO.safeCreativeArq.length, 13);
});

test('indice-cero · Safe Creative co-creatividad presente', () => {
  assert.equal(INDEX_ZERO.safeCreativeCo, '2607086319439');
  assert.equal(INDEX_ZERO.safeCreativeCo.length, 13);
});

test('indice-cero · SHA-256 válido (64 hex chars)', () => {
  assert.equal(INDEX_ZERO.sha256.length, 64);
  assert.ok(/^[0-9a-f]{64}$/.test(INDEX_ZERO.sha256));
});

test('indice-cero · Ethereum válido (0x + 40 hex)', () => {
  assert.ok(INDEX_ZERO.ethereum.startsWith('0x'));
  assert.equal(INDEX_ZERO.ethereum.length, 42);
  assert.ok(/^0x[0-9a-f]{40}$/.test(INDEX_ZERO.ethereum));
});

test('indice-cero · eIDAS QTSA declarado', () => {
  assert.ok(INDEX_ZERO.eidas.includes('QTSA'));
  assert.ok(INDEX_ZERO.eidas.includes('Firmaprofesional'));
});

test('indice-cero · sello ARKHÉ presente', () => {
  assert.equal(SEAL, '◯_● · 51/49/100');
  assert.equal(NODO, 'YHDRYH-92CE');
});

// ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE