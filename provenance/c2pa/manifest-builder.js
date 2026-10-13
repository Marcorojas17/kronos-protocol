/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ PROVENANCE · C2PA MANIFEST BUILDER · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  C2PA 2.1 · assertions · claim firmado · cadena verificable
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/provenance/c2pa]
 *  └─$ node -e "import('./manifest-builder.js').then(m => console.log(m.meta))"
 *     { rol: 'c2pa-manifest-builder', version: '2.1', seal: '◯_● · 51/49/100' }
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const C2PA_VERSION = '2.1';
export const ASSERTIONS = [
  'c2pa.actions',
  'c2pa.creative-work',
  'c2pa.training-mining',
];
export const SEAL = '◯_● · 51/49/100';

/**
 * Construye un manifiesto C2PA para una obra.
 *
 * @param {{ titulo: string, autor: string, obra: string, acciones?: string[] }} input
 * @returns {Promise<object>}
 */
export async function construirManifiesto({
  titulo,
  autor,
  obra,
  acciones = ['c2pa.created'],
}) {
  const claim = {
    '@context': 'https://c2pa.org/specifications/2.1',
    title: titulo,
    author: autor,
    asset: obra,
    actions: acciones,
    training_mining: {
      'c2pa.ai_training': 'notAllowed',
      'c2pa.ai_generative_training': 'notAllowed',
      'c2pa.ai_inference': 'allowed',
    },
    governance: { humano: 51, ia: 49, real: 100 },
    seal: SEAL,
    timestamp: new Date().toISOString(),
  };

  const hash = sha3_512(JSON.stringify(claim));

  return {
    ok: true,
    c2pa_version: C2PA_VERSION,
    claim,
    hash,
    assertions: ASSERTIONS,
    firmado_por: 'Marco Antonio Rojas Valdovinos',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'c2pa-manifest-builder',
  version: C2PA_VERSION,
  seal: SEAL,
};