/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ PROVENANCE · C2PA · CLAIM GENERATOR · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ C2PA 2.1 ]  ·  [ claim firmado ]  ·  [ assertions verificables ]
 *
 *  ┌─(kali㉿arkhe-zero)-[~/provenance/c2pa]
 *  └─$ node -e "import('./claim-generator.js').then(m => console.log(m.meta))"
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';
export const C2PA_VERSION = '2.1';

/**
 * Genera un claim C2PA completo.
 *
 * @param {object} opciones
 * @param {string} opciones.titulo
 * @param {string} opciones.autor
 * @param {string} opciones.obra
 * @param {string[]} opciones.acciones
 * @param {object} [opciones.metadatos]
 * @returns {Promise<object>}
 */
export async function generarClaim({
  titulo,
  autor,
  obra,
  acciones = ['c2pa.created'],
  metadatos = {},
}) {
  const claim = {
    '@context': 'https://c2pa.org/specifications/2.1',
    claim_generator: 'ARKHÉ ZERO · Kronos v1.0.0',
    title: titulo,
    author: autor,
    asset: {
      name: obra,
      hash_sha3_512: sha3_512(obra),
    },
    actions: acciones,
    assertions: {
      'c2pa.creative-work': { type: 'book', title: titulo, author: autor },
      'c2pa.actions': { actions: acciones },
      'c2pa.training-mining': {
        'c2pa.ai_training': 'notAllowed',
        'c2pa.ai_generative_training': 'notAllowed',
        'c2pa.ai_inference': 'allowed',
      },
    },
    governance: { humano: 51, ia: 49, real: 100 },
    metadatos,
    seal: SEAL,
    timestamp: new Date().toISOString(),
  };

  const hash = sha3_512(JSON.stringify(claim));

  return {
    ok: true,
    c2pa_version: C2PA_VERSION,
    claim,
    hash,
    firmado_por: autor,
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'c2pa-claim-generator',
  version: C2PA_VERSION,
  seal: SEAL,
};