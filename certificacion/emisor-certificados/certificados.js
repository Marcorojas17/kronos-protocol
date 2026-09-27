// ────────────────────────────────────────────────────────────
// EMISOR DE CERTIFICADOS · Legado Humano–IA · v1.0
// Emite certificados con hash + sello tiempo + firma Ed25519
// ────────────────────────────────────────────────────────────

export class EmisorCertificados {
  constructor(core, storage, sello) {
    this.core = core;
    this.storage = storage;
    this.sello = sello;
    this.db = new Dexie('kronos-certificados');
    this.db.version(1).stores({
      emitidos: '++id, tipo, hash_contenido, timestamp_emision'
    });
    this.certificadoActual = null;
  }

  async init() {
    if (!this.db.isOpen()) await this.db.open();
  }

  static async _sha256Hex(bytes) {
    const buf = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Emitir un certificado oficial ──────────────────────────
  async emitir(datos) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.db.isOpen()) await this.init();

    const {
      tipo_documento,
      titulo,
      descripcion,
      contenido,
      destinatario,
      tsa_info
    } = datos;

    if (!tipo_documento || !titulo || !destinatario) {
      throw new Error('Faltan campos obligatorios (tipo, título, destinatario).');
    }

    const timestamp = new Date().toISOString();

    // 1. Hash del contenido
    const bytesContenido = new TextEncoder().encode(contenido || titulo);
    const hashContenido = await EmisorCertificados._sha256Hex(bytesContenido);

    // 2. Payload canónico del certificado
    const payload = [
      'LEGADO-HUMANO-IA · CERTIFICADO OFICIAL v1.0',
      `Tipo: ${tipo_documento}`,
      `Título: ${titulo}`,
      `Descripción: ${descripcion || '(sin descripción)'}`,
      `Destinatario: ${destinatario}`,
      `Hash contenido: ${hashContenido}`,
      `TSA: ${tsa_info ? tsa_info.tsa : '(pendiente)'}`,
      `Fecha sello: ${tsa_info ? tsa_info.fecha : '(pendiente)'}`,
      `Emitido: ${timestamp}`
    ].join('\n');

    const hashPayload = await EmisorCertificados._sha256Hex(
      new TextEncoder().encode(payload)
    );

    // 3. Firma Ed25519 del fundador
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPayload)
    );
    const firma = [...new Uint8Array(firmaBuf)]
      .map(b => b.toString(16).padStart(2, '0')).join('');

    const certificado = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'certificado-oficial-1.0',
      tipo: 'CERTIFICADO_EMITIDO',
      timestamp,
      tipo_documento,
      titulo,
      descripcion: descripcion || '',
      destinatario,
      hash_contenido: hashContenido,
      payload_hash: hashPayload,
      firma_ed25519: firma,
      firmante: 'Marco Antonio Rojas Valdovinos',
      firmante_clave_publica: this.core.clavePublicaHex,
      tsa: tsa_info ? {
        tsa: tsa_info.tsa,
        fecha: tsa_info.fecha,
        archivo_tsr_disponible: !!tsa_info.bytes
      } : null,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519',
      verificable_por_tercero: true,
      instruccion_verificacion: 'SHA-256 del payload canónico debe coincidir con payload_hash. La firma Ed25519 se verifica con firmante_clave_publica.'
    };

    const id = await this.db.emitidos.add(certificado);
    this.certificadoActual = { id, ...certificado };
    return this.certificadoActual;
  }

  // ── Verificar un certificado ──────────────────────────────
  async verificar(cert) {
    if (!cert) return { valido: false, razon: 'Sin certificado' };

    const payload = [
      'LEGADO-HUMANO-IA · CERTIFICADO OFICIAL v1.0',
      `Tipo: ${cert.tipo_documento}`,
      `Título: ${cert.titulo}`,
      `Descripción: ${cert.descripcion || '(sin descripción)'}`,
      `Destinatario: ${cert.destinatario}`,
      `Hash contenido: ${cert.hash_contenido}`,
      `TSA: ${cert.tsa ? cert.tsa.tsa : '(pendiente)'}`,
      `Fecha sello: ${cert.tsa ? cert.tsa.fecha : '(pendiente)'}`,
      `Emitido: ${cert.timestamp}`
    ].join('\n');

    const hashRecalc = await EmisorCertificados._sha256Hex(
      new TextEncoder().encode(payload)
    );
    const hashOk = hashRecalc === cert.payload_hash;

    let firmaOk = false;
    try {
      const pubBytes = hexToBytes(cert.firmante_clave_publica);
      const pubKey = await crypto.subtle.importKey(
        'raw', pubBytes, { name: 'Ed25519' }, false, ['verify']
      );
      const firmaBytes = hexToBytes(cert.firma_ed25519);
      firmaOk = await crypto.subtle.verify(
        'Ed25519', pubKey, firmaBytes, new TextEncoder().encode(hashRecalc)
      );
    } catch (e) { firmaOk = false; }

    return {
      hashOk,
      firmaOk,
      tsaOk: !!cert.tsa,
      valido: hashOk && firmaOk
    };
  }

  // ── Listar certificados emitidos ──────────────────────────
  async listar() {
    if (!this.db.isOpen()) await this.init();
    return await this.db.emitidos.toArray();
  }

  // ── Exportar certificado actual como JSON ─────────────────
  exportar() {
    if (!this.certificadoActual) throw new Error('No hay certificado para exportar.');
    return new Blob(
      [JSON.stringify(this.certificadoActual, null, 2)],
      { type: 'application/json' }
    );
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}