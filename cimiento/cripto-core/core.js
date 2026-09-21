// ────────────────────────────────────────────────────────────
// CRIPTO CORE · Legado Humano–IA · v1.1.1
// Fix: Ed25519 en formato PKCS8 (privada) + SPKI (pública)
// ────────────────────────────────────────────────────────────

const DB_NAME = 'legado_cripto_core';
const DB_VERSION = 1;
const STORE = 'cadena';

export class CriptoCore {
  constructor() {
    this.claveAES = null;
    this.clavePrivEd = null;
    this.clavePubEd = null;
    this.clavePublicaHex = '';
    this.salt = null;
    this.cadena = [];
    this.db = null;
    this.inicializado = false;
  }

  // ── Utilidades ────────────────────────────────────────────
  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static _toHex(buf) {
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static _fromHex(hex) {
    return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
  }

  // ── IndexedDB ─────────────────────────────────────────────
  async _abrirDB() {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: 'indice' });
        }
      };
      req.onsuccess = () => { this.db = req.result; resolve(this.db); };
      req.onerror = () => reject(req.error);
    });
  }

  async _leerTodo() {
    const db = await this._abrirDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async _guardarBloque(bloque) {
    const db = await this._abrirDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      const req = tx.objectStore(STORE).put(bloque);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // ── Detectar si Web Crypto soporta Ed25519 ────────────────
  static async _soportaEd25519() {
    try {
      await crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify']);
      return true;
    } catch (e) {
      return false;
    }
  }

  // ── Inicialización ────────────────────────────────────────
  async init(password) {
    if (!password || password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }

    // ── Salt persistente ──
    const saltRaw = localStorage.getItem('legado_salt');
    if (saltRaw) {
      this.salt = CriptoCore._fromHex(saltRaw);
    } else {
      this.salt = crypto.getRandomValues(new Uint8Array(32));
      localStorage.setItem('legado_salt', CriptoCore._toHex(this.salt));
    }

    // ── Derivar clave AES con PBKDF2 ──
    const baseKey = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    this.claveAES = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: this.salt, iterations: 600000, hash: 'SHA-256' },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );

    // ── Ed25519 · generar o cargar ──
    const soporta = await CriptoCore._soportaEd25519();
    if (!soporta) {
      console.warn('[cripto-core] Este navegador no soporta Ed25519. Operando solo con AES-GCM.');
      this.clavePrivEd = null;
      this.clavePubEd = null;
      this.clavePublicaHex = '';
    } else {
      const privPkcs8Hex = localStorage.getItem('legado_priv_ed_pkcs8');
      const pubSpkiHex = localStorage.getItem('legado_pub_ed_spki');

      if (privPkcs8Hex && pubSpkiHex) {
        // Cargar claves existentes en formatos correctos
        try {
          this.clavePrivEd = await crypto.subtle.importKey(
            'pkcs8',
            CriptoCore._fromHex(privPkcs8Hex),
            { name: 'Ed25519' },
            true,
            ['sign']
          );
          this.clavePubEd = await crypto.subtle.importKey(
            'spki',
            CriptoCore._fromHex(pubSpkiHex),
            { name: 'Ed25519' },
            true,
            ['verify']
          );
        } catch (e) {
          // Claves corruptas o formato viejo → regenerar
          console.warn('[cripto-core] Claves previas inválidas, regenerando:', e.message);
          localStorage.removeItem('legado_priv_ed_pkcs8');
          localStorage.removeItem('legado_pub_ed_spki');
          localStorage.removeItem('legado_priv_ed');
          localStorage.removeItem('legado_pub_ed');
          // Generar nuevas abajo
        }
      }

      if (!this.clavePrivEd || !this.clavePubEd) {
        // Generar par nuevo
        const par = await crypto.subtle.generateKey(
          { name: 'Ed25519' },
          true,
          ['sign', 'verify']
        );
        this.clavePrivEd = par.privateKey;
        this.clavePubEd = par.publicKey;

        // Exportar en formatos CORRECTOS
        const privPkcs8 = await crypto.subtle.exportKey('pkcs8', par.privateKey);
        const pubSpki = await crypto.subtle.exportKey('spki', par.publicKey);

        localStorage.setItem('legado_priv_ed_pkcs8', CriptoCore._toHex(privPkcs8));
        localStorage.setItem('legado_pub_ed_spki', CriptoCore._toHex(pubSpki));
      }

      // Clave pública en formato raw para mostrar por pantalla (32 bytes)
      const pubRaw = await crypto.subtle.exportKey('raw', this.clavePubEd);
      this.clavePublicaHex = CriptoCore._toHex(pubRaw);
    }

    // ── Cargar cadena existente ──
    this.cadena = await this._leerTodo();
    this.cadena.sort((a, b) => a.indice - b.indice);
    this.inicializado = true;
    return true;
  }

  // ── Cifrar + firmar + persistir ───────────────────────────
  async guardar(dato) {
    if (!this.inicializado) throw new Error('Ejecuta init() primero.');

    const indice = this.cadena.length;
    const hashPrevio = indice > 0 ? this.cadena[indice - 1].hash : '0'.repeat(64);
    const timestamp = new Date().toISOString();

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const plaintext = new TextEncoder().encode(JSON.stringify(dato));
    const cipherBuf = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.claveAES,
      plaintext
    );

    const cipherHex = CriptoCore._toHex(cipherBuf);
    const ivHex = CriptoCore._toHex(iv);

    const bloqueBase = `${indice}|${timestamp}|${hashPrevio}|${cipherHex}|${ivHex}`;
    const hash = await CriptoCore._sha256Hex(bloqueBase);

    let firma = '';
    if (this.clavePrivEd) {
      const firmaBuf = await crypto.subtle.sign(
        'Ed25519',
        this.clavePrivEd,
        new TextEncoder().encode(hash)
      );
      firma = CriptoCore._toHex(firmaBuf);
    }

    const bloque = {
      indice,
      timestamp,
      hash_previo: hashPrevio,
      hash,
      firma_ed25519: firma,
      cipher: cipherHex,
      iv: ivHex
    };

    await this._guardarBloque(bloque);
    this.cadena.push(bloque);
    return bloque;
  }

  // ── Recuperar todo descifrado ─────────────────────────────
  async recuperarTodo() {
    if (!this.inicializado) throw new Error('Ejecuta init() primero.');
    const bloques = await this._leerTodo();
    bloques.sort((a, b) => a.indice - b.indice);

    const salida = [];
    for (const b of bloques) {
      try {
        const iv = CriptoCore._fromHex(b.iv);
        const cipher = CriptoCore._fromHex(b.cipher);
        const plainBuf = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv },
          this.claveAES,
          cipher
        );
        const payload = JSON.parse(new TextDecoder().decode(plainBuf));
        salida.push({ ...b, payload });
      } catch (e) {
        salida.push({ ...b, payload: null, error: 'No descifrable con esta contraseña' });
      }
    }
    return salida;
  }

  // ── Verificar integridad de la cadena ─────────────────────
  async verificarCadena() {
    const bloques = await this._leerTodo();
    bloques.sort((a, b) => a.indice - b.indice);

    for (let i = 0; i < bloques.length; i++) {
      const b = bloques[i];
      const hashPrevioEsperado = i === 0 ? '0'.repeat(64) : bloques[i - 1].hash;
      if (b.hash_previo !== hashPrevioEsperado) return false;

      const bloqueBase = `${b.indice}|${b.timestamp}|${b.hash_previo}|${b.cipher}|${b.iv}`;
      const hashCalculado = await CriptoCore._sha256Hex(bloqueBase);
      if (hashCalculado !== b.hash) return false;

      if (b.firma_ed25519 && this.clavePubEd) {
        const firmaOk = await crypto.subtle.verify(
          'Ed25519',
          this.clavePubEd,
          CriptoCore._fromHex(b.firma_ed25519),
          new TextEncoder().encode(b.hash)
        );
        if (!firmaOk) return false;
      }
    }
    return true;
  }

  // ── Verificar bloque individual ───────────────────────────
  async verificarBloque(bloque) {
    const idx = bloque.indice;
    const prev = this.cadena[idx - 1];
    const hashPrevioEsperado = idx === 0 ? '0'.repeat(64) : (prev ? prev.hash : null);
    if (hashPrevioEsperado === null) return { ok: false, razon: 'Bloque anterior no encontrado' };
    if (bloque.hash_previo !== hashPrevioEsperado) return { ok: false, razon: 'Hash previo no coincide' };

    const bloqueBase = `${bloque.indice}|${bloque.timestamp}|${bloque.hash_previo}|${bloque.cipher}|${bloque.iv}`;
    const hashCalc = await CriptoCore._sha256Hex(bloqueBase);
    if (hashCalc !== bloque.hash) return { ok: false, razon: 'Hash no coincide' };

    if (bloque.firma_ed25519 && this.clavePubEd) {
      const firmaOk = await crypto.subtle.verify(
        'Ed25519',
        this.clavePubEd,
        CriptoCore._fromHex(bloque.firma_ed25519),
        new TextEncoder().encode(bloque.hash)
      );
      if (!firmaOk) return { ok: false, razon: 'Firma inválida' };
    }
    return { ok: true, razon: 'Bloque válido' };
  }

  // ── Exportar cadena como JSON ─────────────────────────────
  async exportarCadena() {
    const bloques = await this._leerTodo();
    return {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'cripto-core-1.1.1',
      exportado: new Date().toISOString(),
      total_bloques: bloques.length,
      clave_publica: this.clavePublicaHex,
      bloques: bloques.sort((a, b) => a.indice - b.indice)
    };
  }

  // ── Obtener identidad criptográfica ───────────────────────
  obtenerIdentidad() {
    return {
      clave_publica: this.clavePublicaHex,
      algoritmo: 'Ed25519',
      soporta_ed25519: !!this.clavePubEd,
      inicializado: this.inicializado,
      bloques_en_cadena: this.cadena.length
    };
  }

  // ── Limpiar todo ──────────────────────────────────────────
  async limpiar() {
    const db = await this._abrirDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      const req = tx.objectStore(STORE).clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    this.cadena = [];
    return true;
  }

  // ── Reset total (incluye claves) ──────────────────────────
  async resetTotal() {
    await this.limpiar();
    try {
      localStorage.removeItem('legado_salt');
      localStorage.removeItem('legado_priv_ed');
      localStorage.removeItem('legado_pub_ed');
      localStorage.removeItem('legado_priv_ed_pkcs8');
      localStorage.removeItem('legado_pub_ed_spki');
    } catch (e) { /* silencio */ }
    this.claveAES = null;
    this.clavePrivEd = null;
    this.clavePubEd = null;
    this.clavePublicaHex = '';
    this.salt = null;
    this.inicializado = false;
    return true;
  }
}