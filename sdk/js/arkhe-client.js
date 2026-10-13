/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SDK · JS CLIENT · ARKHÉ ZERO ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';
export const INDEX_ZERO_SHA256 = 'f03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112';

export class ArkheClient {
  constructor(baseUrl = 'https://arkhe.zero') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.seal = SEAL;
  }

  hash(contenido) {
    return sha3_512(contenido);
  }

  verificarHash(hash) {
    return {
      hash,
      es_indice_cero: hash === INDEX_ZERO_SHA256,
      valido: /^[0-9a-f]{64,128}$/i.test(hash),
      sellado: SEAL,
    };
  }

  async firmar(contenido, alg = 'ML-DSA-87') {
    const r = await fetch(`${this.baseUrl}/v1/obras/firmar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contenido, tipo: 'obra', algoritmo: alg }),
    });
    if (!r.ok) throw new Error(`[ XX ] ${r.status}`);
    return r.json();
  }

  async salud() {
    const r = await fetch(`${this.baseUrl}/health`);
    if (!r.ok) throw new Error(`[ XX ] ${r.status}`);
    return r.json();
  }
}

export default ArkheClient;