// ────────────────────────────────────────────────────────────
// LOG DE ACCIONES · Legado Humano–IA · v1.0
// Registro firmado y encadenado de cada acción de la IA
// ────────────────────────────────────────────────────────────

export class LogAcciones {
  constructor(storage) {
    this.storage = storage;
    this.entradas = [];
    this.inicializado = false;
  }

  async init() {
    if (this.inicializado) return;
    if (!this.storage.inicializado) throw new Error('Storage no inicializado.');
    const data = await this.storage.recuperar('log-ia');
    this.entradas = Array.isArray(data) ? data : [];
    this.inicializado = true;
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async registrar(tipo, datos) {
    if (!this.inicializado) await this.init();

    const timestamp = new Date().toISOString();
    const hashPrevio = this.entradas.length > 0
      ? this.entradas[this.entradas.length - 1].hash_entrada
      : '0000000000000000000000000000000000000000000000000000000000000000';

    const contenido = {
      indice: this.entradas.length,
      tipo,
      datos,
      timestamp,
      hash_previo: hashPrevio
    };

    const hashEntrada = await LogAcciones._sha256Hex(JSON.stringify(contenido));

    const entrada = {
      ...contenido,
      hash_entrada: hashEntrada
    };

    this.entradas.push(entrada);
    await this.storage.guardar('log-ia', this.entradas);

    return entrada;
  }

  async listar() {
    if (!this.inicializado) await this.init();
    return this.entradas;
  }

  async verificarIntegridad() {
    if (!this.inicializado) await this.init();
    if (this.entradas.length === 0) return { ok: true, total: 0 };

    for (let i = 0; i < this.entradas.length; i++) {
      const e = this.entradas[i];
      const { hash_entrada, ...contenido } = e;
      const recalc = await LogAcciones._sha256Hex(JSON.stringify(contenido));
      if (recalc !== hash_entrada) {
        return {
          ok: false,
          razon: `Entrada ${i} alterada`,
          indice: i
        };
      }
      if (i > 0 && e.hash_previo !== this.entradas[i - 1].hash_entrada) {
        return {
          ok: false,
          razon: `Cadena rota en entrada ${i}`,
          indice: i
        };
      }
    }

    return { ok: true, total: this.entradas.length };
  }

  exportar() {
    return new Blob([JSON.stringify(this.entradas, null, 2)], { type: 'application/json' });
  }
}
