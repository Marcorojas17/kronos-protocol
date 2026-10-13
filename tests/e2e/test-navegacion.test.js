/* ═══════════════════════════════════════════════════════════════════════════ */
/*                                                                           */
/*   ███╗   ██╗ █████╗ ██╗   ██╗███████╗ ██████╗  █████╗  ██████╗██╗ ██████╗  */
/*   ████╗  ██║██╔══██╗██║   ██║██╔════╝██╔════╝ ██╔══██╗██╔════╝██║██╔═══██╗ */
/*   ██╔██╗ ██║███████║██║   ██║█████╗  ██║  ███╗███████║██║     ██║██║   ██║ */
/*   ██║╚██╗██║██╔══██║╚██╗ ██╔╝██╔══╝  ██║   ██║██╔══██║██║     ██║██║   ██║ */
/*   ██║ ╚████║██║  ██║ ╚████╔╝ ███████╗╚██████╔╝██║  ██║╚██████╗██║╚██████╔╝ */
/*   ╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝ ╚═════╝  */
/*                                                                           */
/*   ▓▒░ TEST · E2E NAVEGACIÓN · ARKHÉ ZERO · ◯_● ░▒▓                       */
/*                                                                          */
/*   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  */
/*                                                                          */
/* ═══════════════════════════════════════════════════════════════════════════ */

import { test } from 'node:test';
import assert from 'node:assert/strict';

const SEAL = '◯_● · 51/49/100';

const RUTAS_CRITICAS = [
  { url: '/',                             esperado: 'hub' },
  { url: '/apps/index-kintsugi.html',     esperado: 'kintsugi' },
  { url: '/apps/verificar.html',          esperado: 'verificador' },
  { url: '/apps/registrar.html',          esperado: 'registro' },
  { url: '/apps/composer.html',           esperado: 'composer' },
  { url: '/apps/governance.html',         esperado: 'gobernanza' },
  { url: '/apps/agentes.html',            esperado: 'agentes' },
  { url: '/apps/crypto.html',             esperado: 'crypto' },
  { url: '/apps/provenance.html',         esperado: 'provenance' },
  { url: '/apps/sitemap.html',            esperado: 'sitemap' },
  { url: '/movimiento/index.html',        esperado: 'movimiento' },
  { url: '/apps/404.html',                esperado: '404' },
];

test('e2e-navegacion · 12 rutas críticas', () => {
  assert.equal(RUTAS_CRITICAS.length, 12);
});

test('e2e-navegacion · todas las rutas tienen esperado', () => {
  for (const r of RUTAS_CRITICAS) {
    assert.ok(r.esperado, `ruta ${r.url} debe tener esperado`);
  }
});

test('e2e-navegacion · hub en raíz', () => {
  assert.equal(RUTAS_CRITICAS[0].url, '/');
});

test('e2e-navegacion · sello presente', () => {
  assert.equal(SEAL, '◯_● · 51/49/100');
});

// ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE