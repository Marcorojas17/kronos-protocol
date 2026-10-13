/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ ORQUESTACIÓN · EVENT BUS · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Bus de eventos con tópicos canónicos. Toda emisión se firma.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/orquestacion/event-bus]
 *  └─$ node -e "import('./event-bus.js').then(m => \
 *       console.log(m.TOPICOS))"
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

export const TOPICOS = Object.freeze([
  'arkhe.firma.creada',
  'arkhe.documento.anclado',
  'arkhe.agente.activado',
  'arkhe.consenso.alcanzado',
  'arkhe.veto.aplicado',
]);

export class EventBus {
  constructor() {
    this.suscriptores = new Map();
    this.historial = [];
  }

  suscribir(topico, handler) {
    if (!TOPICOS.includes(topico)) {
      throw new Error(`[ XX ] Tópico no canónico: ${topico}`);
    }
    if (!this.suscriptores.has(topico)) {
      this.suscriptores.set(topico, []);
    }
    this.suscriptores.get(topico).push(handler);
    return () => this.#desuscribir(topico, handler);
  }

  #desuscribir(topico, handler) {
    const lista = this.suscriptores.get(topico) || [];
    this.suscriptores.set(
      topico,
      lista.filter((h) => h !== handler)
    );
  }

  async emitir(topico, payload) {
    if (!TOPICOS.includes(topico)) {
      throw new Error(`[ XX ] Tópico no canónico: ${topico}`);
    }
    const evento = {
      topico,
      payload,
      hash: sha3_512(JSON.stringify({ topico, payload, ts: Date.now() })),
      ts: new Date().toISOString(),
      sellado: SEAL,
    };
    this.historial.push(evento);

    const handlers = this.suscriptores.get(topico) || [];
    await Promise.all(handlers.map((h) => h(evento)));

    return evento;
  }

  historialCompleto() {
    return [...this.historial];
  }
}

export const meta = {
  rol: 'event-bus',
  topicos: TOPICOS,
  seal: SEAL,
};