/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · HSM · SOFTHSM ADAPTER · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Adaptador para SoftHSM 2 · SOLO desarrollo. Nunca usar en producción.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';
export const PROVIDER = 'SoftHSM 2 (dev)';

export class SoftHSMAdapter {
  constructor({ libraryPath, tokenLabel = 'arkhe-dev', pin = '1234' }) {
    this.libraryPath = libraryPath;
    this.tokenLabel = tokenLabel;
    this.pin = pin;
    this.session = null;
  }

  async open() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[ XX ] SoftHSM prohibido en producción');
    }
    this.session = { token: this.tokenLabel, abierta: true, dev: true };
    return { ok: true, provider: PROVIDER, aviso: 'SOLO DEV', sellado: SEAL };
  }

  async sign({ keyLabel, data }) {
    if (!this.session?.abierta) throw new Error('[ XX ] Sesión cerrada');
    const hash = sha3_512(data);
    return {
      ok: true,
      keyLabel,
      hash,
      signature: `SOFTHSM-DEV-SIG:${hash.slice(0, 32)}`,
      provider: PROVIDER,
      aviso: 'FIRMA SIMULADA · NO USAR EN PRODUCCIÓN',
      sellado: SEAL,
    };
  }

  async close() {
    if (this.session) this.session.abierta = false;
    return { ok: true, sellado: SEAL };
  }
}

export const meta = {
  rol: 'hsm-softhsm',
  provider: PROVIDER,
  aviso: 'solo dev',
  seal: SEAL,
};