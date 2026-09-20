// ────────────────────────────────────────────────────────────
// STORAGE DEXIE · Legado Humano–IA · v1.0
// Persistencia estructurada versionada sobre Cripto Core
// ────────────────────────────────────────────────────────────

const DB_NAME = 'legado_storage';
const DB_VERSION = 2;

export class StorageDexie {
  constructor(core) {
    this.core = core;
    this.db = null;
    this.ultimoHash = '';
    this.inicializado = false;
  }

  // ── Inicialización y migraciones ──────────────────────────
  async init() {
    if (this.inicializado) return this.db;

    this.db = new Dexie(DB_NAME);

    // v1 · esquema base
    this.db.version(1).stores({
      registros: '++id, tipo, timestamp, hash',
      meta: 'clave'
    });

    // v2 · añade estado a registros y tabla migraciones
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

    // Registrar migración si no existe
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

  // ── Guardar registro cifrado ──────────────────────────────
  async guardar(tipo, payload) {
    if (!this.inicializado) throw new Error('Ejecuta init() primero.');
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');

    // 1. Cifrar + firmar + persistir en Cripto Core (hash chain propio)
    const bloque = await this.core.guardar({ tipo, payload });

    // 2. Guardar copia indexada en Dexie
    const id = await this.db.registros.add({
      tipo,
      timestamp: bloque.timestamp,
      hash: bloque.hash,
      firma: bloque.firma_ed25519,
      cipher: bloque.cipher,
      iv: bloque.iv,
      estado: 'activo'
    });

    this.ultimoHash = bloque.hash;
    return id;
  }

  // ── Listar todo ───────────────────────────────────────────
  async listar() {
    if (!this.inicializado) throw new Error('Ejecuta init() primero.');
    const registros = await this.db.registros.toArray();
    // Descifrar cada uno con Cripto Core
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
        const payload = JSON.parse(new TextDecoder().decode(plainBuf));
        salida.push({ ...r, payload });
      } catch (e) {
        salida.push({ ...r, payload: null, error: 'No descifrable' });
      }
    }
    return salida.sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));
  }

  // ── Filtrar por tipo (índice) ─────────────────────────────
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
        salida.push({ ...r, payload: null });
      }
    }
    return salida;
  }

  // ── Contar ────────────────────────────────────────────────
  async contar() {
    if (!this.inicializado) throw new Error('Ejecuta init() primero.');
    return await this.db.registros.count();
  }

  // ── Exportar DB completa cifrada ──────────────────────────
  async exportar() {
    if (!this.inicializado) throw new Error('Ejecuta init() primero.');
    const registros = await this.db.registros.toArray();
    const migraciones = await this.db.migraciones.toArray();
    const meta = await this.db.meta.toArray();
    const payload = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'storage-1.0',
      db_version: this.db.verno,
      exportado: new Date().toISOString(),
      clave_publica: this.core.clavePublicaHex,
      total_registros: registros.length,
      registros,
      migraciones,
      meta,
      nota: 'Los registros están cifrados. Para descifrar se requiere la contraseña maestra + Cripto Core.'
    };
    return new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  }

  // ── Importar DB ───────────────────────────────────────────
  async importar(json) {
    if (!this.inicializado) throw new Error('Ejecuta init() primero.');
    const data = typeof json === 'string' ? JSON.parse(json) : json;
    if (!data.registros) throw new Error('Formato inválido: falta registros.');

    let importados = 0;
    for (const r of data.registros) {
      delete r.id; // reasignar id
      await this.db.registros.add(r);
      importados++;
    }
    return importados;
  }

  // ── Limpiar todo ──────────────────────────────────────────
  async limpiar() {
    if (!this.inicializado) throw new Error('Ejecuta init() primero.');
    await this.db.registros.clear();
    await this.db.migraciones.clear();
    this.ultimoHash = '';
    return true;
  }
}

// ── Helper ──────────────────────────────────────────────────
function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}