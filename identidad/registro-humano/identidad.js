// ────────────────────────────────────────────────────────────
// IDENTIDAD HUMANA · Legado Humano–IA · v1.0
// Firma Ed25519 + huella criptográfica + persistencia cifrada
// ────────────────────────────────────────────────────────────

export class IdentidadHumana {
  constructor(core, storage) {
    this.core = core;
    this.storage = storage;
    this.perfilActual = null;
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Sellar identidad ──────────────────────────────────────
  async sellar(datos) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');

    // Validación básica
    if (!datos.alias || !datos.nombre || !datos.pais || !datos.rol || !datos.proposito) {
      throw new Error('Faltan campos obligatorios.');
    }
    if (datos.proposito.length < 20) {
      throw new Error('El propósito debe tener al menos 20 caracteres.');
    }

    const timestamp = new Date().toISOString();

    // Payload canónico (orden fijo para reproducibilidad)
    const payload = [
      'LEGADO-HUMANO-IA · IDENTIDAD HUMANA v1.0',
      `Alias: ${datos.alias}`,
      `Nombre: ${datos.nombre}`,
      `Pais: ${datos.pais}`,
      `Rol: ${datos.rol}`,
      `Proposito: ${datos.proposito}`,
      `Correo: ${datos.correo || '(no declarado)'}`,
      `Fundador: Marco Antonio Rojas Valdovinos`,
      `Coautora IA: KRONOS IA`,
      `Timestamp: ${timestamp}`
    ].join('\n');

    // Hash SHA-256 del payload
    const hash = await IdentidadHumana._sha256Hex(payload);

    // Firma Ed25519 del hash
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hash)
    );
    const firma = [...new Uint8Array(firmaBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    // Huella = SHA-256(clave_publica + hash) · 64 caracteres
    const huellaRaw = await IdentidadHumana._sha256Hex(this.core.clavePublicaHex + hash);

    const certificado = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'identidad-humana-1.0',
      timestamp,
      alias: datos.alias,
      nombre: datos.nombre,
      pais: datos.pais,
      rol: datos.rol,
      proposito: datos.proposito,
      correo: datos.correo || null,
      huella: huellaRaw,
      payload_hash: hash,
      firma_ed25519: firma,
      clave_publica: this.core.clavePublicaHex,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519',
      verificable_por_tercero: true,
      instruccion_verificacion: 'SHA-256 del payload canónico debe coincidir con payload_hash. La firma Ed25519 se verifica con clave_publica.'
    };

    // Persistir cifrado en Storage Dexie
    await this.storage.guardar('identidad-humana', certificado);

    this.perfilActual = certificado;
    return certificado;
  }

  // ── Recuperar perfil actual ───────────────────────────────
  async recuperar() {
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    const todos = await this.storage.listarPorTipo('identidad-humana');
    if (todos.length === 0) return null;
    // El más reciente
    this.perfilActual = todos[0].payload;
    return this.perfilActual;
  }

  // ── Verificar integridad de un certificado ────────────────
  async verificar(cert) {
    const payload = [
      'LEGADO-HUMANO-IA · IDENTIDAD HUMANA v1.0',
      `Alias: ${cert.alias}`,
      `Nombre: ${cert.nombre}`,
      `Pais: ${cert.pais}`,
      `Rol: ${cert.rol}`,
      `Proposito: ${cert.proposito}`,
      `Correo: ${cert.correo || '(no declarado)'}`,
      `Fundador: Marco Antonio Rojas Valdovinos`,
      `Coautora IA: KRONOS IA`,
      `Timestamp: ${cert.timestamp}`
    ].join('\n');

    const hashCalc = await IdentidadHumana._sha256Hex(payload);
    if (hashCalc !== cert.payload_hash) return false;

    const firmaOk = await crypto.subtle.verify(
      'Ed25519',
      this.core.clavePubEd,
      hexToBytes(cert.firma_ed25519),
      new TextEncoder().encode(cert.payload_hash)
    );
    return firmaOk;
  }

  // ── Exportar pasaporte como Blob descargable ──────────────
  exportar() {
    if (!this.perfilActual) throw new Error('No hay perfil sellado.');
    return new Blob([JSON.stringify(this.perfilActual, null, 2)], { type: 'application/json' });
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}