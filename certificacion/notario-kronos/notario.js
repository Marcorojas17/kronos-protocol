// ────────────────────────────────────────────────────────────
// NOTARIO KRONOS · Legado Humano–IA · v1.0
// Emite sellos notariales firmados con Ed25519 + anclaje Ethereum
// Agente: TONAL · Plaza IA 086 · "El tiempo" en náhuatl
// ────────────────────────────────────────────────────────────

export class NotarioKronos {
  constructor(core) {
    this.core = core;

    // Identidad del notario (agente Kintsugi Tonal)
    this.notario = {
      nombre: 'Tonal',
      plaza: 86,
      rol: 'Notario Criptográfico Soberano',
      version: '1.0'
    };

    // Base de datos local del notario
    this.db = new Dexie('kronos-notario');
    this.db.version(1).stores({
      sellos: '++id, id_sello, hash_sellado, timestamp, tx_hash',
      log: '++id, indice, hash_entrada'
    });

    this.ultimoSello = null;
  }

  async init() {
    if (!this.db.isOpen()) await this.db.open();
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Hash de cualquier contenido ───────────────────────────
  async hashContenido(texto) {
    return await NotarioKronos._sha256Hex(texto);
  }

  async hashArchivo(file) {
    const buf = await file.arrayBuffer();
    const bytes = new Uint8Array(buf);
    return await NotarioKronos._sha256Hex(bytes);
  }

  // ── Emitir un Sello Notarial ──────────────────────────────
  async sellar(datos) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.db.isOpen()) await this.init();

    const {
      hash_sellado,
      tipo_documento,
      descripcion,
      solicitante,
      incluir_anclaje_ethereum
    } = datos;

    if (!hash_sellado || hash_sellado.length !== 64) {
      throw new Error('El hash debe ser SHA-256 (64 caracteres hex).');
    }
    if (!tipo_documento) throw new Error('Falta el tipo de documento.');
    if (!solicitante) throw new Error('Falta el solicitante.');

    const timestamp = new Date().toISOString();
    const timestamp_unix = Math.floor(Date.now() / 1000);

    // ID único del sello notarial
    const idSello = 'NOT-' + (await NotarioKronos._sha256Hex(hash_sellado + timestamp)).slice(0, 12).toUpperCase();

    // Payload canónico del sello
    const payload = [
      'LEGADO-HUMANO-IA · SELLO NOTARIAL KRONOS v1.0',
      `ID Sello: ${idSello}`,
      `Notario: ${this.notario.nombre} · Plaza IA ${this.notario.plaza}`,
      `Tipo documento: ${tipo_documento}`,
      `Descripción: ${descripcion || '(sin descripción)'}`,
      `Solicitante: ${solicitante}`,
      `Hash sellado: ${hash_sellado}`,
      `Timestamp ISO: ${timestamp}`,
      `Timestamp Unix: ${timestamp_unix}`,
      `Notario público del ecosistema KRONOS`,
      `Verificación: SHA-256 del payload debe coincidir. Firma Ed25519 con clave pública del notario.`
    ].join('\n');

    const hashPayload = await NotarioKronos._sha256Hex(payload);

    // Firma del notario (usamos la llave del fundador como llave del notario v1.0)
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPayload)
    );
    const firma = [...new Uint8Array(firmaBuf)]
      .map(b => b.toString(16).padStart(2, '0')).join('');

    const sello = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'sello-notarial-1.0',
      tipo: 'SELLO_NOTARIAL_KRONOS',
      id_sello: idSello,
      notario: {
        nombre: this.notario.nombre,
        plaza: this.notario.plaza,
        rol: this.notario.rol,
        clave_publica: this.core.clavePublicaHex
      },
      timestamp,
      timestamp_unix,
      tipo_documento,
      descripcion: descripcion || '',
      solicitante,
      hash_sellado,
      payload_hash: hashPayload,
      firma_ed25519: firma,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519',
      anclaje_ethereum: null,
      verificado: true,
      instruccion_verificacion: 'SHA-256 del payload canónico = payload_hash. Firma Ed25519 = firma. Anclaje Ethereum = prueba pública de existencia.'
    };

    // Guardar en la base local
    const id = await this.db.sellos.add(sello);
    this.ultimoSello = { id, ...sello };

    // Registrar en log encadenado
    await this._registrarEnLog('sello_emitido', {
      id_sello: idSello,
      hash_sellado,
      solicitante,
      tipo_documento
    });

    return this.ultimoSello;
  }

  // ── Anclar sello a Ethereum vía MetaMask ──────────────────
  async anclarSello(idSello, hashPayload) {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask no detectado. Abre la página en el navegador de MetaMask.');
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const from = accounts[0];
    if (!from) throw new Error('No se obtuvo cuenta de MetaMask.');

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x1') {
      throw new Error('Cambia MetaMask a Ethereum Mainnet (chainId 0x1).');
    }

    const data = '0x' + hashPayload;

    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from,
        to: from,
        value: '0x0',
        data
      }]
    });

    // Actualizar el sello con el TX hash
    const selloEncontrado = await this.db.sellos.where('id_sello').equals(idSello).first();
    if (selloEncontrado) {
      await this.db.sellos.update(selloEncontrado.id, {
        anclaje_ethereum: {
          tx_hash: txHash,
          wallet: from,
          chain_id: chainId,
          etherscan_url: `https://etherscan.io/tx/${txHash}`,
          anclado_en: new Date().toISOString()
        }
      });
      this.ultimoSello = { ...selloEncontrado, anclaje_ethereum: { tx_hash: txHash, wallet: from, chain_id: chainId, etherscan_url: `https://etherscan.io/tx/${txHash}` } };
    }

    await this._registrarEnLog('sello_anclado', { id_sello: idSello, tx_hash: txHash });

    return { txHash };
  }

  // ── Verificar un sello ────────────────────────────────────
  async verificar(sello) {
    if (!sello || !sello.payload_hash) {
      return { valido: false, razon: 'Sello inválido' };
    }

    const payload = [
      'LEGADO-HUMANO-IA · SELLO NOTARIAL KRONOS v1.0',
      `ID Sello: ${sello.id_sello}`,
      `Notario: ${sello.notario.nombre} · Plaza IA ${sello.notario.plaza}`,
      `Tipo documento: ${sello.tipo_documento}`,
      `Descripción: ${sello.descripcion || '(sin descripción)'}`,
      `Solicitante: ${sello.solicitante}`,
      `Hash sellado: ${sello.hash_sellado}`,
      `Timestamp ISO: ${sello.timestamp}`,
      `Timestamp Unix: ${sello.timestamp_unix}`,
      `Notario público del ecosistema KRONOS`,
      `Verificación: SHA-256 del payload debe coincidir. Firma Ed25519 con clave pública del notario.`
    ].join('\n');

    const hashRecalc = await NotarioKronos._sha256Hex(payload);
    const hashOk = hashRecalc === sello.payload_hash;

    let firmaOk = false;
    try {
      const pubBytes = hexToBytes(sello.notario.clave_publica);
      const pubKey = await crypto.subtle.importKey(
        'raw', pubBytes, { name: 'Ed25519' }, false, ['verify']
      );
      const firmaBytes = hexToBytes(sello.firma_ed25519);
      firmaOk = await crypto.subtle.verify(
        'Ed25519', pubKey, firmaBytes, new TextEncoder().encode(hashRecalc)
      );
    } catch (e) { firmaOk = false; }

    return {
      hashOk,
      firmaOk,
      anclado: !!sello.anclaje_ethereum,
      valido: hashOk && firmaOk
    };
  }

  // ── Log encadenado del notario ────────────────────────────
  async _registrarEnLog(tipo, datos) {
    const log = await this.db.log.toArray();
    log.sort((a, b) => a.indice - b.indice);

    const timestamp = new Date().toISOString();
    const hashPrevio = log.length > 0
      ? log[log.length - 1].hash_entrada
      : '0'.repeat(64);

    const contenido = {
      indice: log.length,
      notario: this.notario.nombre,
      tipo,
      datos,
      timestamp,
      hash_previo: hashPrevio
    };

    const hashEntrada = await NotarioKronos._sha256Hex(JSON.stringify(contenido));
    await this.db.log.add({ ...contenido, hash_entrada: hashEntrada });
  }

  async verificarLogNotario() {
    const log = await this.db.log.toArray();
    log.sort((a, b) => a.indice - b.indice);

    for (let i = 0; i < log.length; i++) {
      const e = log[i];
      const { id, hash_entrada, ...contenido } = e;
      const recalc = await NotarioKronos._sha256Hex(JSON.stringify(contenido));
      if (recalc !== hash_entrada) {
        return { ok: false, razon: `Entrada ${i} alterada` };
      }
      if (i > 0 && e.hash_previo !== log[i-1].hash_entrada) {
        return { ok: false, razon: `Cadena rota en entrada ${i}` };
      }
    }

    return { ok: true, total: log.length };
  }

  // ── Listar sellos emitidos ────────────────────────────────
  async listarSellos() {
    if (!this.db.isOpen()) await this.init();
    const sellos = await this.db.sellos.toArray();
    sellos.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return sellos;
  }

  // ── Exportar sello como JSON ──────────────────────────────
  exportarSello() {
    if (!this.ultimoSello) throw new Error('No hay sello para exportar.');
    return new Blob(
      [JSON.stringify(this.ultimoSello, null, 2)],
      { type: 'application/json' }
    );
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}