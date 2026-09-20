// ────────────────────────────────────────────────────────────
// CRIPTO CORE · Legado Humano–IA · v1.0
// Núcleo criptográfico reutilizable · 100% Web Crypto API
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

  // ── Inicialización ────────────────────────────────────────
  async init(password) {
    if (!password || password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }

    // Salt persistente en localStorage (no secreto, solo único)
    const saltRaw = localStorage.getItem('legado_salt');
    if (saltRaw) {
      this.salt = CriptoCore._fromHex(saltRaw);
    } else {
      this.salt = crypto.getRandomValues(new Uint8Array(32));
      localStorage.setItem('legado_salt', CriptoCore._toHex(this.salt));
    }

    // Derivación con PBKDF2 SHA-256 · 600k iteraciones
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

    // Par Ed25519 persistente
    const privHex = localStorage.getItem('legado_priv_ed');
    if (privHex) {
      const privBytes = CriptoCore._fromHex(privHex);
      this.clavePrivEd = await crypto.subtle.importKey(
        'raw', privBytes, { name: 'Ed25519' }, true, ['sign']
      );
      this.clavePubEd = await crypto.subtle.importKey(
        'raw',
        CriptoCore._fromHex(localStorage.getItem('legado_pub_ed')),
        { name: 'Ed25519' }, true, ['verify']
      );
    } else {
      const par = await crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify']);
      this.clavePrivEd = par.privateKey;
      this.clavePubEd = par.publicKey;
      const privRaw = await crypto.subtle.exportKey('raw', par.privateKey);
      const pubRaw = await crypto.subtle.exportKey('raw', par.publicKey);
      localStorage.setItem('legado_priv_ed', CriptoCore._toHex(privRaw));
      localStorage.setItem('legado_pub_ed', CriptoCore._toHex(pubRaw));
    }

    const pubRaw = await crypto.subtle.exportKey('raw', this.clavePubEd);
    this.clavePublicaHex = CriptoCore._toHex(pubRaw);

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

    // Cifrar payload
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const plaintext = new TextEncoder().encode(JSON.stringify(dato));
    const cipherBuf = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.claveAES,
      plaintext
    );

    const cipherHex = CriptoCore._toHex(cipherBuf);
    const ivHex = CriptoCore._toHex(iv);

    // Hash chain
    const bloqueBase = `${indice}|${timestamp}|${hashPrevio}|${cipherHex}|${ivHex}`;
    const hash = await CriptoCore._sha256Hex(bloqueBase);

    // Firma Ed25519
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.clavePrivEd,
      new TextEncoder().encode(hash)
    );
    const firma = CriptoCore._toHex(firmaBuf);

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
        salida.push({ ...b, payload: null, error: 'No descifrable' });
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

      const firmaOk = await crypto.subtle.verify(
        'Ed25519',
        this.clavePubEd,
        CriptoCore._fromHex(b.firma_ed25519),
        new TextEncoder().encode(b.hash)
      );
      if (!firmaOk) return false;
    }
    return true;
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
}