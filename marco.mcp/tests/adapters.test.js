/**
 * ═══════════════════════════════════════════════════════════════════
 *  ▓▒░ MARCO.MCP · TESTS · ADAPTERS ░▒▓
 * ═══════════════════════════════════════════════════════════════════
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as claude from '../src/adapters/claude.js';
import * as gemini from '../src/adapters/gemini.js';
import * as cursor from '../src/adapters/cursor.js';
import * as copilot from '../src/adapters/copilot.js';

const ADAPTERS = [
  ['claude',  claude],
  ['gemini',  gemini],
  ['cursor',  cursor],
  ['copilot', copilot],
];

for (const [name, mod] of ADAPTERS) {
  test(`adapter ${name} · expone meta con sello`, () => {
    assert.equal(mod.meta.seal, '◯_● · 51/49/100');
    assert.ok(mod.meta.provider);
  });

  test(`adapter ${name} · expone prompt de sistema`, () => {
    const prompt = (mod[`${name}SystemPrompt`])();
    assert.match(prompt, /ARKHÉ ZERO/);
    assert.match(prompt, /◯_● · 51\/49\/100/);
  });
}