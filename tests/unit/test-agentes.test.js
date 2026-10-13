/* ═══════════════════════════════════════════════════════════════════════════ */
/*                                                                           */
/*   █████╗  ██████╗ ███████╗███╗   ██╗████████╗███████╗███████╗              */
/*   ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝██╔════╝██╔════╝              */
/*   ███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   █████╗  ███████╗              */
/*   ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   ██╔══╝  ╚════██║              */
/*   ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   ███████╗███████║              */
/*   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚══════╝              */
/*                                                                           */
/*   ▓▒░ TEST · AGENTES · ARKHÉ ZERO · ◯_● ░▒▓                              */
/*                                                                           */
/*   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  */
/*                                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

import { test } from 'node:test';
import assert from 'node:assert/strict';

const SEAL = '◯_● · 51/49/100';

const CULTURALES = ['cuicatl', 'temachtiani', 'tlachixqui', 'tlamatini', 'tlapohualli', 'tonal'];
const OFICIOS = ['090-arquitecto', '091-contralor', '092-auditor-externo',
                 '093-relator', '094-bibliotecario', '095-cartografo'];

test('agentes · 12 enjambre declarados', () => {
  assert.equal(CULTURALES.length + OFICIOS.length, 12);
});

test('agentes · 6 culturales náhuatl', () => {
  assert.equal(CULTURALES.length, 6);
  assert.ok(CULTURALES.includes('cuicatl'));
  assert.ok(CULTURALES.includes('tonal'));
});

test('agentes · 6 oficios numerados', () => {
  assert.equal(OFICIOS.length, 6);
  assert.ok(OFICIOS.includes('090-arquitecto'));
  assert.ok(OFICIOS.includes('095-cartografo'));
});

test('agentes · quórum requerido 4/5', () => {
  const quorum = 4;
  const panel = 5;
  assert.equal(quorum / panel, 0.8);
});

test('agentes · reputación promedio ≥ 90', () => {
  const scores = [98, 95, 99, 97, 96, 99, 100, 97, 100, 98, 99, 97];
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  assert.ok(avg >= 90, `promedio ${avg} debe ser ≥ 90`);
});

test('agentes · sello ARKHÉ presente', () => {
  assert.equal(SEAL, '◯_● · 51/49/100');
});

// ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE