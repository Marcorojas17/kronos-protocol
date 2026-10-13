/* ═══════════════════════════════════════════════════════════════════════════ */
/*                                                                           */
/*   ███╗   ██╗ █████╗ ██╗   ██╗                                             */
/*   ████╗  ██║██╔══██╗██║   ██║                                             */
/*   ██╔██╗ ██║███████║██║   ██║                                             */
/*   ██║╚██╗██║██╔══██║╚██╗ ██╔╝                                             */
/*   ██║ ╚████║██║  ██║ ╚████╔╝                                              */
/*   ╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═══╝                                               */
/*                                                                           */
/*   ▓▒░ TEST · NAVIGATION · ARKHÉ ZERO · ◯_● ░▒▓                           */
/*                                                                          */
/*   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  */
/*                                                                          */
/* ═══════════════════════════════════════════════════════════════════════════ */

import { test } from 'node:test';
import assert from 'node:assert/strict';

const SEAL = '◯_● · 51/49/100';

const PAGINAS = [
  { id: 'hub', href: '../index.html' },
  { id: 'kintsugi', href: 'index-kintsugi.html' },
  { id: 'verificar', href: 'verificar.html' },
  { id: 'registrar', href: 'registrar.html' },
  { id: 'governance', href: 'governance.html' },
  { id: 'agentes', href: 'agentes.html' },
  { id: 'crypto', href: 'crypto.html' },
  { id: 'provenance', href: 'provenance.html' },
];

test('nav · 8 links canónicos', () => {
  assert.equal(PAGINAS.length, 8);
});

test('nav · hub apunta a raíz', () => {
  const hub = PAGINAS.find((p) => p.id === 'hub');
  assert.equal(hub.href, '../index.html');
});

test('nav · páginas apps empiezan sin ../', () => {
  const appsPages = PAGINAS.filter((p) => p.id !== 'hub');
  for (const p of appsPages) {
    assert.ok(!p.href.startsWith('../'), `${p.id} no debe empezar con ../`);
  }
});

test('nav · sello ARKHÉ', () => {
  assert.equal(SEAL, '◯_● · 51/49/100');
});

// ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE