// ────────────────────────────────────────────────────────────
// STORAGE DEXIE · Legado Humano–IA · v1.0.1
// Persistencia estructurada versionada sobre Cripto Core
// FIX: verificar que Dexie esté cargado antes de instanciar
// ────────────────────────────────────────────────────────────

const DB_NAME = 'legado_storage';
const DB_VERSION = 2;

export class StorageDexie {
  constructor(core) {
    if (typeof Dexie === 'undefined') {
      throw new Error('Dexie no está cargado. Agrega el CDN en tu HTML: <script src="https://unpkg.com/dexie@4.0.11/dist/dexie.min.js"></script>');
    }
    this.core = core;
    this.db = null;
    this.ultimoHash = '';
    this.inicializado = false;
  }

  async init() {
    if (this.inicializado) return this.db;

    this.db = new Dexie(DB_NAME);

    this.db.version(1).stores({
      registros: '++id, tipo, timestamp, hash',
      meta: 'clave'
    });

    this.db.version(2).stores({
      registros: '++id, tipo, timestamp, hash, estado',
      meta: 'clave',
      migraciones: '++id, fecha, version'
    }).upgrade(tx => {
      return tx.table('registros').toCollection().modify(r => {
        r.estado = r.estado || 'activo';
      });
    });

    await this.db.open();
    this.inicializado = true;

    const yaExiste = await this.db.migraciones
      .where('version').equals(DB_VERSION).count();
    if (yaExiste === 0) {
      await this.db.migraciones.add({
        fecha: new Date().toISOString(),
        version: DB_VERSION,
        nota: 'Migración automática v1 → v2 · añadido campo estado'
      });
    }

    return this.db;
  }

  async guardar(tipo, payload) {
    if (!this.inicializado) throw new Error('Ejecuta init() primero.');
    if (!this.core) throw new Error('Cripto Core requerido.');

    // Cifrar payload
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const plaintext = new TextEncoder().encode(JSON.stringify(payload));
    const cipherBuf = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.core.claveAES,
      plaintext
    );
    const cipherHex = [...new Uint8Array(cipherBuf)].map(b => b.toString(16).padStart(2, '0')).join('');
    const ivHex = [...iv].map(b => b.toString(16).padStart(2, '0')).join('');

    const timestamp = new Date().toISOString();
    const bloqueBase = `${tipo}|${timestamp}|${cipherHex}|${ivHex}`;
    const hashBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(bloqueBase));
    const hash = [...new Uint8Array(hashBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    const id = await this.db.registros.add({
      tipo,
      timestamp,
      hash,
      cipher: cipherHex,
      iv: ivHex,
      estado: 'activo'
    });

    this.ultimoHash = hash;
    return id;
  }

  async listarPorTipo(tipo) {
    if (!this.inicializado) throw new Error('Ejecuta init() primero.');
    const registros = await this.db.registros.where('tipo').equals(tipo).toArray();
    const salida = [];
    for (const r of registros) {
      try {
        const iv = hexToBytes(r.iv);
        const cipher = hexToBytes(r.cipher);
        const plainBuf = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv },
          this.core.claveAES,
          cipher
        );
        salida.push({ ...r, payload: JSON.parse(new TextDecoder().decode(plainBuf)) });
      } catch (e) {
        salida.push({ ...r, payload: null, error: 'No descifrable' });
      }
    }
    return salida;
  }

  async contar() {
    if (!this.inicializado) throw new Error('Ejecuta init() primero.');
    return await this.db.registros.count();
  }

  async limpiar() {
    if (!this.inicializado) throw new Error('Ejecuta init() primero.');
    await this.db.registros.clear();
    await this.db.migraciones.clear();
    this.ultimoHash = '';
    return true;
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}