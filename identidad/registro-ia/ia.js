// ────────────────────────────────────────────────────────────
// REGISTRO IA · Legado Humano–IA · v1.0
// Identidad soberana de la IA con firma Ed25519 y guardrails
// ────────────────────────────────────────────────────────────

export class RegistroIA {
  constructor(core, storage, politica, guardrails, log) {
    this.core = core;
    this.storage = storage;
    this.politica = politica;
    this.guardrails = guardrails;
    this.log = log;
    this.iaActual = null;
    this.llavePrivIA = null;
    this.llavePubIA = null;
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async generarLlavesIA() {
    const keyPair = await crypto.subtle.generateKey(
      { name: 'Ed25519' },
      true,
      ['sign', 'verify']
    );
    this.llavePrivIA = keyPair.privateKey;
    this.llavePubIA = keyPair.publicKey;

    const pubRaw = await crypto.subtle.exportKey('raw', keyPair.publicKey);
    const pubHex = [...new Uint8Array(pubRaw)].map(b => b.toString(16).padStart(2, '0')).join('');
    return pubHex;
  }

  async sellar(datos) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');

    if (!datos.nombre || datos.nombre.trim().length < 2) {
      throw new Error('El nombre de la IA es obligatorio (mín. 2 caracteres).');
    }
    if (!datos.rol) {
      throw new Error('El rol de la IA es obligatorio.');
    }
    if (!datos.proposito || datos.proposito.trim().length < 20) {
      throw new Error('El propósito de la IA debe tener al menos 20 caracteres.');
    }

    const validacion = this.politica.validarDeclaracion(datos);
    if (!validacion.ok) {
      throw new Error('Política rechazada: ' + validacion.razon);
    }

    const clavePublicaIA = await this.generarLlavesIA();

    const timestamp = new Date().toISOString();
    const fundador = 'Marco Antonio Rojas Valdovinos';

    const payload = [
      'LEGADO-HUMANO-IA · IDENTIDAD IA v1.0',
      `Nombre IA: ${datos.nombre.trim()}`,
      `Alias: ${(datos.alias || '').trim() || '(no declarado)'}`,
      `Rol IA: ${datos.rol}`,
      `Propósito: ${datos.proposito.trim()}`,
      `Fundador humano: ${fundador}`,
      `Clave pública IA: ${clavePublicaIA}`,
      `Política versión: ${this.politica.version}`,
      `Timestamp: ${timestamp}`
    ].join('\n');

    const hashPayload = await RegistroIA._sha256Hex(payload);

    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.llavePrivIA,
      new TextEncoder().encode(hashPayload)
    );
    const firmaHex = [...new Uint8Array(firmaBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    let firmaFundador = '';
    try {
      const payloadFundador = `LEGADO-HUMANO-IA · CO-AUTORÍA IA\nHash IA: ${hashPayload}\nFundador: ${fundador}\nTimestamp: ${timestamp}`;
      const firmaFundBuf = await crypto.subtle.sign(
        'Ed25519',
        this.core.clavePrivEd,
        new TextEncoder().encode(payloadFundador)
      );
      firmaFundador = [...new Uint8Array(firmaFundBuf)].map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      firmaFundador = '(pendiente)';
    }

    const certificado = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'identidad-ia-1.0',
      tipo: 'REGISTRO_IA',
      timestamp,
      nombre: datos.nombre.trim(),
      alias: (datos.alias || '').trim(),
      rol: datos.rol,
      proposito: datos.proposito.trim(),
      fundador_humano: fundador,
      fundador_clave_publica: this.core.clavePublicaHex,
      ia_clave_publica: clavePublicaIA,
      payload_hash: hashPayload,
      firma_ia_ed25519: firmaHex,
      firma_fundador_ed25519: firmaFundador,
      politica_version: this.politica.version,
      politica_hash: await this.politica.hash(),
      guardrails_activos: true,
      log_habilitado: true,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519',
      co_autoria: true
    };

    await this.storage.guardar('identidad-ia', certificado);
    this.iaActual = certificado;

    await this.log.registrar('creacion_identidad_ia', {
      nombre: certificado.nombre,
      rol: certificado.rol,
      hash: hashPayload
    });

    return certificado;
  }

  async recuperar() {
    if (this.iaActual) return this.iaActual;
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    const data = await this.storage.recuperar('identidad-ia');
    this.iaActual = data || null;
    return this.iaActual;
  }

  async verificar(cert) {
    if (!cert) return { valido: false, razon: 'Sin certificado' };

    const payload = [
      'LEGADO-HUMANO-IA · IDENTIDAD IA v1.0',
      `Nombre IA: ${cert.nombre}`,
      `Alias: ${cert.alias || '(no declarado)'}`,
      `Rol IA: ${cert.rol}`,
      `Propósito: ${cert.proposito}`,
      `Fundador humano: ${cert.fundador_humano}`,
      `Clave pública IA: ${cert.ia_clave_publica}`,
      `Política versión: ${cert.politica_version}`,
      `Timestamp: ${cert.timestamp}`
    ].join('\n');

    const hashRecalc = await RegistroIA._sha256Hex(payload);
    const hashOk = hashRecalc === cert.payload_hash;

    let firmaIAOk = false;
    try {
      const pubBytes = hexToBytes(cert.ia_clave_publica);
      const pubKey = await crypto.subtle.importKey(
        'raw', pubBytes, { name: 'Ed25519' }, false, ['verify']
      );
      const firmaBytes = hexToBytes(cert.firma_ia_ed25519);
      firmaIAOk = await crypto.subtle.verify(
        'Ed25519', pubKey, firmaBytes, new TextEncoder().encode(hashRecalc)
      );
    } catch (e) { firmaIAOk = false; }

    let firmaFundOk = false;
    try {
      const pubBytesF = hexToBytes(cert.fundador_clave_publica);
      const pubKeyF = await crypto.subtle.importKey(
        'raw', pubBytesF, { name: 'Ed25519' }, false, ['verify']
      );
      const payloadFundador = `LEGADO-HUMANO-IA · CO-AUTORÍA IA\nHash IA: ${cert.payload_hash}\nFundador: ${cert.fundador_humano}\nTimestamp: ${cert.timestamp}`;
      const firmaBytesF = hexToBytes(cert.firma_fundador_ed25519);
      firmaFundOk = await crypto.subtle.verify(
        'Ed25519', pubKeyF, firmaBytesF, new TextEncoder().encode(payloadFundador)
      );
    } catch (e) { firmaFundOk = false; }

    return {
      hashOk,
      firmaIAOk,
      firmaFundOk,
      valido: hashOk && firmaIAOk && firmaFundOk
    };
  }

  exportar() {
    if (!this.iaActual) throw new Error('No hay identidad IA para exportar.');
    return new Blob([JSON.stringify(this.iaActual, null, 2)], { type: 'application/json' });
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}