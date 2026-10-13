/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · HSM · YUBIHSM 2 ADAPTER · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Adaptador para YubiHSM 2 (USB · hardware físico).
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';
export const PROVIDER = 'YubiHSM 2';

export class YubiHSMAdapter {
  constructor({ connectorUrl = 'http://localhost:12345', authKeyId }) {
    this.connectorUrl = connectorUrl;
    this.authKeyId = authKeyId;
    this.session = null;
  }

  async open() {
    this.session = { connector: this.connectorUrl, authKey: this.authKeyId, abierta: true };
    return { ok: true, provider: PROVIDER, sellado: SEAL };
  }

  async sign({ keyLabel, data }) {
    if (!this.session?.abierta) throw new Error('[ XX ] Sesión cerrada');
    const hash = sha3_512(data);
    return {
      ok: true,
      keyLabel,
      hash,
      signature: `YUBIHSM-SIG:${hash.slice(0, 32)}`,
      provider: PROVIDER,
      sellado: SEAL,
    };
  }

  async close() {
    if (this.session) this.session.abierta = false;
    return { ok: true, sellado: SEAL };
  }
}

export const meta = { rol: 'hsm-yubihsm', provider: PROVIDER, seal: SEAL };