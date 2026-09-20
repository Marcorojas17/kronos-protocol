// ────────────────────────────────────────────────────────────
// EVENT BUS · Legado Humano–IA · v1.0
// Pub/sub local con BroadcastChannel + firma Ed25519
// ────────────────────────────────────────────────────────────

const CANAL_BC = 'legado_humano_ia_event_bus';

export class EventBus {
  constructor(core, storage) {
    this.core = core;
    this.storage = storage;
    this.bc = null;
    this.suscritos = {}; // canal → [handlers]
    this.inicializado = false;
  }

  async init() {
    if (this.inicializado) return;
    if (typeof BroadcastChannel !== 'undefined') {
      this.bc = new BroadcastChannel(CANAL_BC);
      this.bc.onmessage = (e) => {
        const { canal, evento } = e.data || {};
        if (canal && evento) this._despacharLocal(canal, evento);
      };
    }
    this.inicializado = true;
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Suscripción ───────────────────────────────────────────
  on(canal, handler) {
    if (!this.suscritos[canal]) this.suscritos[canal] = [];
    this.suscritos[canal].push(handler);
    return () => {
      this.suscritos[canal] = this.suscritos[canal].filter(h => h !== handler);
    };
  }

  _despacharLocal(canal, evento) {
    const handlers = this.suscritos[canal] || [];
    for (const h of handlers) {
      try { h(evento); } catch (e) { console.error('[bus] handler error', e); }
    }
  }

  // ── Emitir evento ─────────────────────────────────────────
  async emit(canal, tipo, payload) {
    if (!this.inicializado) throw new Error('EventBus no inicializado.');
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    if (!canal || !tipo) throw new Error('Canal y tipo son obligatorios.');

    const timestamp = new Date().toISOString();
    const indice = await this.storage.contar();
    const idEvento = 'EVT-' + Date.now().toString(36).toUpperCase() + '-' + indice;

    // Payload canónico
    const payloadCanonico = [
      'LEGADO-HUMANO-IA · EVENT BUS v1.0',
      `ID: ${idEvento}`,
      `Canal: ${canal}`,
      `Tipo: ${tipo}`,
      `Timestamp: ${timestamp}`,
      `Payload: ${JSON.stringify(payload)}`
    ].join('\n');

    const hashEvento = await EventBus._sha256Hex(payloadCanonico);

    // Firma Ed25519 con la clave privada del humano
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hashEvento)
    );
    const firma = [...new Uint8Array(firmaBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    const evento = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'event-1.0',
      id_evento: idEvento,
      canal,
      tipo,
      timestamp,
      payload,
      payload_canonico_hash: hashEvento,
      hash_evento: hashEvento,
      firma_ed25519: firma,
      clave_publica: this.core.clavePublicaHex,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519'
    };

    // 1. Despachar localmente (misma pestaña)
    this._despacharLocal(canal, evento);

    // 2. Broadcast a otras pestañas
    if (this.bc) {
      try { this.bc.postMessage({ canal, evento }); } catch (e) { /* silencio */ }
    }

    // 3. Persistir cifrado
    await this.storage.guardar('event-bus', evento);

    return evento;
  }

  // ── Listar eventos ────────────────────────────────────────
  async listar() {
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    const todos = await this.storage.listarPorTipo('event-bus');
    return todos.map(t => t.payload).sort((a, b) =>
      (a.timestamp || '').localeCompare(b.timestamp || '')
    );
  }

  // ── Verificar todos los eventos ───────────────────────────
  async verificarTodos() {
    const eventos = await this.listar();
    const pubKey = await crypto.subtle.importKey(
      'raw',
      hexToBytes(this.core.clavePublicaHex),
      { name: 'Ed25519' },
      false,
      ['verify']
    );

    let invalid = 0;
    for (const e of eventos) {
      const payloadCanonico = [
        'LEGADO-HUMANO-IA · EVENT BUS v1.0',
        `ID: ${e.id_evento}`,
        `Canal: ${e.canal}`,
        `Tipo: ${e.tipo}`,
        `Timestamp: ${e.timestamp}`,
        `Payload: ${JSON.stringify(e.payload)}`
      ].join('\n');

      const hashCalc = await EventBus._sha256Hex(payloadCanonico);
      if (hashCalc !== e.payload_canonico_hash) { invalid++; continue; }

      const ok = await crypto.subtle.verify(
        'Ed25519',
        pubKey,
        hexToBytes(e.firma_ed25519),
        new TextEncoder().encode(e.payload_canonico_hash)
      );
      if (!ok) invalid++;
    }

    return { ok: invalid === 0, total: eventos.length, invalidos: invalid };
  }

  // ── Exportar log completo ─────────────────────────────────
  async exportar() {
    const eventos = await this.listar();
    const payload = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'event-bus-log-1.0',
      exportado: new Date().toISOString(),
      total: eventos.length,
      clave_publica: this.core.clavePublicaHex,
      eventos,
      instruccion_verificacion: 'Cada evento contiene payload_canonico_hash y firma_ed25519. Verificar firma con clave_publica sobre payload_canonico_hash.'
    };
    return new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  }

  async limpiar() {
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    const todos = await this.storage.listarPorTipo('event-bus');
    for (const t of todos) {
      try {
        if (this.storage.db && this.storage.db.registros) {
          await this.storage.db.registros.where('tipo').equals('event-bus').delete();
          break;
        }
      } catch (e) { /* silencio */ }
    }
    return true;
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}