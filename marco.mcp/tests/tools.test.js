/**
 * ═══════════════════════════════════════════════════════════════════
 *  ▓▒░ MARCO.MCP · TESTS · TOOLS ░▒▓
 * ═══════════════════════════════════════════════════════════════════
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runTool, TOOLS } from '../src/tools.js';

test('TOOLS · expone las 5 herramientas canónicas', () => {
  const names = TOOLS.map((t) => t.name);
  assert.deepEqual(names.sort(), [
    'marco.consultar',
    'marco.contextualizar',
    'marco.firmar',
    'marco.recordar',
    'marco.verificar',
  ].sort());
});

test('marco.firmar · devuelve hash SHA3-512 y sello', async () => {
  const r = await runTool('marco.firmar', { contenido: 'prueba' });
  assert.equal(r.ok, true);
  assert.equal(r.hash_sha3_512.length, 128);
  assert.equal(r.sellado, '◯_● · 51/49/100');
});

test('marco.contextualizar · genera prompt para claude', async () => {
  const r = await runTool('marco.contextualizar', { agente: 'claude' });
  assert.equal(r.ok, true);
  assert.match(r.prompt_sistema, /ARKHÉ ZERO/);
  assert.match(r.prompt_sistema, /◯_● · 51\/49\/100/);
});

test('marco.consultar · devuelve índice completo', async () => {
  const r = await runTool('marco.consultar', { campo: 'todo' });
  assert.equal(r.ok, true);
  assert.ok(r.resultado.safe_creative);
});