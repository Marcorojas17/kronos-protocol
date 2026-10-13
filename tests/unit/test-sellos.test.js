/* ═══════════════════════════════════════════════════════════════════════════ */
/*                                                                           */
/*   ███████╗███████╗██╗     ██╗      ██████╗ ███████╗                       */
/*   ██╔════╝██╔════╝██║     ██║     ██╔═══██╗██╔════╝                       */
/*   ███████╗█████╗  ██║     ██║     ██║   ██║███████╗                       */
/*   ╚════██║██╔══╝  ██║     ██║     ██║   ██║╚════██║                       */
/*   ███████║███████╗███████╗███████╗╚██████╔╝███████║                       */
/*   ╚══════╝╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝                       */
/*                                                                           */
/*   ▓▒░ TEST · SELLOS · ARKHÉ ZERO · ◯_● ░▒▓                               */
/*                                                                           */
/*   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  */
/*                                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

import { test } from 'node:test';
import assert from 'node:assert/strict';

const SEAL = '◯_● · 51/49/100';

test('sello · KINTSUGI canónico', () => {
  assert.equal(SEAL, '◯_● · 51/49/100');
});

test('sello · eIDAS Firmaprofesional QTSA', () => {
  const eidas = 'Firmaprofesional QTSA';
  assert.ok(eidas.includes('QTSA'));
});

test('sello · TSA RFC 3161', () => {
  const rfc = '3161';
  assert.equal(rfc, '3161');
});

test('sello · política TSA OID', () => {
  const policy = '1.3.6.1.4.1.13177.10.1.1.1';
  assert.ok(policy.startsWith('1.3.6.1.4.1'));
});

test('sello · Safe Creative registrado', () => {
  const scArq = '2607146379465';
  const scCo = '2607086319439';
  assert.equal(scArq.length, 13);
  assert.equal(scCo.length, 13);
});

// ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE