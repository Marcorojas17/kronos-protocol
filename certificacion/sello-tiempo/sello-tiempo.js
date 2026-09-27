// ────────────────────────────────────────────────────────────
// SELLO DE TIEMPO · Legado Humano–IA · v1.0
// Genera TimeStampQuery (RFC 3161) y parsea la respuesta TSA
// ────────────────────────────────────────────────────────────

export class SelloTiempo {
  constructor() {
    this.version = '1.0';
    this.ultimoHash = null;
    this.ultimoTSQ = null;
    this.ultimoTSR = null;
  }

  static async _sha256Hex(bytes) {
    const buf = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static hexToBytes(hex) {
    return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
  }

  // ── Calcular hash SHA-256 de un texto ──────────────────────
  async hashTexto(texto) {
    const bytes = new TextEncoder().encode(texto);
    const hex = await SelloTiempo._sha256Hex(bytes);
    this.ultimoHash = hex;
    return hex;
  }

  // ── Calcular hash SHA-256 de un archivo ────────────────────
  async hashArchivo(file) {
    const buf = await file.arrayBuffer();
    const hex = await SelloTiempo._sha256Hex(new Uint8Array(buf));
    this.ultimoHash = hex;
    return hex;
  }

  // ── Codificador DER mínimo (ASN.1) ─────────────────────────
  _derLength(len) {
    if (len < 0x80) return new Uint8Array([len]);
    if (len < 0x100) return new Uint8Array([0x81, len]);
    if (len < 0x10000) return new Uint8Array([0x82, (len >> 8) & 0xFF, len & 0xFF]);
    return new Uint8Array([0x83, (len >> 16) & 0xFF, (len >> 8) & 0xFF, len & 0xFF]);
  }

  _derWrap(tag, content) {
    const lenBytes = this._derLength(content.length);
    const out = new Uint8Array(1 + lenBytes.length + content.length);
    out[0] = tag;
    out.set(lenBytes, 1);
    out.set(content, 1 + lenBytes.length);
    return out;
  }

  _derInteger(value) {
    // Codifica entero positivo
    let bytes = [];
    let v = BigInt(value);
    while (v > 0n) {
      bytes.unshift(Number(v & 0xFFn));
      v >>= 8n;
    }
    if (bytes.length === 0) bytes = [0];
    if (bytes[0] & 0x80) bytes.unshift(0); // evitar negativos
    return this._derWrap(0x02, new Uint8Array(bytes));
  }

  _derOctetString(bytes) {
    return this._derWrap(0x04, bytes);
  }

  _derNull() {
    return new Uint8Array([0x05, 0x00]);
  }

  _derBoolean(value) {
    return new Uint8Array([0x01, 0x01, value ? 0xFF : 0x00]);
  }

  // OID SHA-256: 2.16.840.1.101.3.4.2.1
  _derOidSHA256() {
    return new Uint8Array([0x06, 0x09, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03, 0x04, 0x02, 0x01]);
  }

  // ── Construir TimeStampQuery (RFC 3161) ────────────────────
  construirTSQ(hashHex, incluirCert = true) {
    const hashBytes = SelloTiempo.hexToBytes(hashHex);

    // AlgorithmIdentifier ::= SEQUENCE { algorithm OID, parameters NULL }
    const algId = this._derWrap(0x30, this._concat(this._derOidSHA256(), this._derNull()));

    // MessageImprint ::= SEQUENCE { hashAlgorithm, hashedMessage }
    const msgImprint = this._derWrap(0x30, this._concat(algId, this._derOctetString(hashBytes)));

    // Nonce aleatorio (16 bytes)
    const nonceBytes = crypto.getRandomValues(new Uint8Array(8));
    let nonceInt = 0n;
    for (const b of nonceBytes) nonceInt = (nonceInt << 8n) | BigInt(b);
    const nonce = this._derInteger(nonceInt);

    // certReq BOOLEAN TRUE
    const certReq = this._derBoolean(incluirCert);

    // TimeStampReq ::= SEQUENCE { version, messageImprint, nonce, certReq }
    const tsq = this._derWrap(
      0x30,
      this._concat(
        this._derInteger(1),
        msgImprint,
        nonce,
        certReq
      )
    );

    this.ultimoTSQ = tsq;
    return tsq;
  }

  _concat(...arrays) {
    const total = arrays.reduce((s, a) => s + a.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const a of arrays) {
      out.set(a, offset);
      offset += a.length;
    }
    return out;
  }

  // ── Exportar .tsq como Blob descargable ────────────────────
  exportarTSQ() {
    if (!this.ultimoTSQ) throw new Error('No hay TSQ construido.');
    return new Blob([this.ultimoTSQ], { type: 'application/timestamp-query' });
  }

  // ── Parsear respuesta .tsr (extracción básica) ─────────────
  async parsearTSR(fileORBuffer) {
    let bytes;
    if (fileORBuffer instanceof Blob || fileORBuffer instanceof File) {
      bytes = new Uint8Array(await fileORBuffer.arrayBuffer());
    } else if (fileORBuffer instanceof ArrayBuffer) {
      bytes = new Uint8Array(fileORBuffer);
    } else {
      bytes = fileORBuffer;
    }

    this.ultimoTSR = bytes;
    const totalBytes = bytes.length;

    // Detectar estructura general (no validamos criptografía)
    const pareceTSR = bytes.length > 0 && bytes[0] === 0x30;

    // Buscar una fecha genTime (UTCTime o GeneralizedTime) de forma heurística
    // UTCTime: tag 0x17, GeneralizedTime: tag 0x18
    let fechaDetectada = null;
    for (let i = 0; i < bytes.length - 15; i++) {
      if (bytes[i] === 0x18 && bytes[i+1] === 0x0F) {
        // GeneralizedTime 15 chars YYYYMMDDHHMMSSZ
        try {
          const str = String.fromCharCode(...bytes.slice(i+2, i+17));
          if (/^\d{14}Z$/.test(str)) {
            const y = str.slice(0,4), mo = str.slice(4,6), d = str.slice(6,8);
            const h = str.slice(8,10), mi = str.slice(10,12), s = str.slice(12,14);
            fechaDetectada = `${y}-${mo}-${d}T${h}:${mi}:${s}Z`;
            break;
          }
        } catch(e){}
      }
      if (bytes[i] === 0x17 && bytes[i+1] === 0x0D) {
        // UTCTime 13 chars YYMMDDHHMMSSZ
        try {
          const str = String.fromCharCode(...bytes.slice(i+2, i+15));
          if (/^\d{12}Z$/.test(str)) {
            const yy = parseInt(str.slice(0,2));
            const y = yy >= 50 ? `19${str.slice(0,2)}` : `20${str.slice(0,2)}`;
            const mo = str.slice(2,4), d = str.slice(4,6);
            const h = str.slice(6,8), mi = str.slice(8,10), s = str.slice(10,12);
            fechaDetectada = `${y}-${mo}-${d}T${h}:${mi}:${s}Z`;
            break;
          }
        } catch(e){}
      }
    }

    return {
      ok: pareceTSR,
      bytes: totalBytes,
      fechaDetectada,
      nota: 'Verificación criptográfica completa requiere validar la cadena de la TSA, fuera del alcance de este cliente.'
    };
  }

  // ── Exportar TSR recibido ──────────────────────────────────
  exportarTSR() {
    if (!this.ultimoTSR) throw new Error('No hay TSR cargado.');
    return new Blob([this.ultimoTSR], { type: 'application/timestamp-reply' });
  }

  limpiar() {
    this.ultimoHash = null;
    this.ultimoTSQ = null;
    this.ultimoTSR = null;
  }
}