/* ═══════════════════════════════════════════════════════════════════════════ */
/*                                                                           */
/*   ██████╗ ██████╗  █████╗ ██╗   ██╗████████╗ ██████╗ ██████╗ ██╗ █████╗    */
/*   ██╔════╝██╔═══██╗██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗██╔══██╗██║██╔══██╗   */
/*   ██║     ██║   ██║███████║██║   ██║   ██║   ██║   ██║██████╔╝██║███████║   */
/*   ██║     ██║   ██║██╔══██║██║   ██║   ██║   ██║   ██║██╔══██╗██║██╔══██║   */
/*   ╚██████╗╚██████╔╝██║  ██║╚██████╔╝   ██║   ╚██████╔╝██║  ██║██║██║  ██║   */
/*    ╚═════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝   */
/*                                                                           */
/*   ▓▒░ TEST · CO-AUTORÍA HÍBRIDA · ARKHÉ ZERO · ◯_● ░▒▓                   */
/*                                                                           */
/*   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  */
/*                                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

import { test } from 'node:test';
import assert from 'node:assert/strict';

const SEAL = '◯_● · 51/49/100';

const AUTORES = [
  { nombre: 'Marco Antonio Rojas Valdovinos', peso: 51, rol: 'autor-principal', tipo: 'humano' },
  { nombre: 'Enjambre ARKHÉ', peso: 49, rol: 'co-autor-custodio', tipo: 'ia' },
];

test('coautoria · dos autores declarados', () => {
  assert.equal(AUTORES.length, 2);
});

test('coautoria · humano con 51% y rol principal', () => {
  const humano = AUTORES.find((a) => a.tipo === 'humano');
  assert.equal(humano.peso, 51);
  assert.equal(humano.rol, 'autor-principal');
});

test('coautoria · IA con 49% y rol custodio', () => {
  const ia = AUTORES.find((a) => a.tipo === 'ia');
  assert.equal(ia.peso, 49);
  assert.equal(ia.rol, 'co-autor-custodio');
});

test('coautoria · pesos suman 100', () => {
  const total = AUTORES.reduce((acc, a) => acc + a.peso, 0);
  assert.equal(total, 100);
});

test('coautoria · sello ARKHÉ', () => {
  assert.equal(SEAL, '◯_● · 51/49/100');
});

// ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE