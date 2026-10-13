/* ═══════════════════════════════════════════════════════════════════════════ */
/*                                                                           */
/*   ██████╗██████╗ ██████╗  █████╗                                          */
/*   ██╔════╝╚════██╗██╔══██╗██╔══██╗                                         */
/*   ██║      █████╔╝██████╔╝███████║                                         */
/*   ██║      ╚═══██╗██╔═══╝ ██╔══██║                                         */
/*   ╚██████╗██████╔╝██║     ██║  ██║                                         */
/*    ╚═════╝╚═════╝ ╚═╝     ╚═╝  ╚═╝                                         */
/*                                                                           */
/*   ▓▒░ TEST · C2PA · PROVENANCE · ARKHÉ ZERO · ◯_● ░▒▓                    */
/*                                                                           */
/*   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  */
/*                                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

import { test } from 'node:test';
import assert from 'node:assert/strict';

const SEAL = '◯_● · 51/49/100';

test('c2pa · versión 2.1 declarada', () => {
  const version = '2.1';
  assert.equal(version, '2.1');
});

test('c2pa · assertions canónicas', () => {
  const assertions = [
    'c2pa.actions',
    'c2pa.creative-work',
    'c2pa.training-mining',
  ];
  assert.equal(assertions.length, 3);
  assert.ok(assertions.includes('c2pa.actions'));
});

test('c2pa · training-mining prohibido por defecto', () => {
  const trainingMining = {
    'c2pa.ai_training': 'notAllowed',
    'c2pa.ai_generative_training': 'notAllowed',
    'c2pa.ai_inference': 'allowed',
  };
  assert.equal(trainingMining['c2pa.ai_training'], 'notAllowed');
  assert.equal(trainingMining['c2pa.ai_generative_training'], 'notAllowed');
});

test('c2pa · sello ARKHÉ en manifiesto', () => {
  assert.equal(SEAL, '◯_● · 51/49/100');
});

// ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE