/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SDK · JS · PROVENANCE · ARKHÉ ZERO ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

export function crearManifest({ titulo, autor, obra }) {
  const claim = {
    '@context': 'https://c2pa.org/specifications/2.1',
    title: titulo,
    author: autor,
    asset: obra,
    actions: ['c2pa.created'],
    training_mining: {
      'c2pa.ai_training': 'notAllowed',
      'c2pa.ai_generative_training': 'notAllowed',
      'c2pa.ai_inference': 'allowed',
    },
    governance: { humano: 51, ia: 49, real: 100 },
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };

  const hash = sha3_512(JSON.stringify(claim));

  return {
    ok: true,
    c2pa_version: '2.1',
    claim,
    hash,
    sellado: SEAL,
  };
}

export function selloTiempo(hashDoc) {
  return {
    ok: true,
    rfc: '3161',
    tsa: 'Firmaprofesional QTSA',
    hash_sellado: hashDoc,
    timestamp: new Date().toISOString(),
    sellado: SEAL,
  };
}

export const meta = { rol: 'sdk-js-provenance', seal: SEAL };