// ────────────────────────────────────────────────────────────
// PROPUESTAS · Legado Humano–IA · v1.0
// Motor de propuestas criptográficamente firmadas
// ────────────────────────────────────────────────────────────

export class Propuestas {
  constructor(core) {
    this.core = core;
    this.db = new Dexie('kronos-propuestas');
    this.db.version(1).stores({
      propuestas: '++id, autor_hash, tipo, estado, timestamp, id_propuesta'
    });
    this.propuestaActual = null;
  }

  async init() {
    if (!this.db.isOpen()) await this.db.open();
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Crear una propuesta firmada ────────────────────────────
  async crear(datos) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.db.isOpen()) await this.init();

    const {
      titulo,
      descripcion,
      tipo,
      opciones,
      autor_hash,
      autor_nombre,
      autor_rol,
      duracion_dias
    } = datos;

    if (!titulo || titulo.length < 5) {
      throw new Error('El título es obligatorio (mín. 5 caracteres).');
    }
    if (!descripcion || descripcion.length < 20) {
      throw new Error('La descripción es obligatoria (mín. 20 caracteres).');
    }
    if (!tipo) {
      throw new Error('El tipo de propuesta es obligatorio.');
    }
    if (!autor_hash || !autor_nombre) {
      throw new Error('Autor no identificado.');
    }
    if (!opciones || opciones.length < 2) {
      throw new Error('Se necesitan al menos 2 opciones de voto.');
    }

    const timestamp = new Date().toISOString();
    const duracionMs = (duracion_dias || 7) * 24 * 60 * 60 * 1000;
    const fechaCierre = new Date(Date.now() + duracionMs).toISOString();

    // Payload canónico
    const payload = [
      'LEGADO-HUMANO-IA · PROPUESTA v1.0',
      `Título: ${titulo}`,
      `Descripción: ${descripcion}`,
      `Tipo: ${tipo}`,
      `Opciones: ${opciones.join(' | ')}`,
      `Autor: ${autor_nombre}`,
      `Autor hash: ${autor_hash}`,
      `Rol autor: ${autor_rol || '(sin rol)'}`,
      `Creada: ${timestamp}`,
      `Cierra: ${fechaCierre}`
    ].join('\n');

    const hashPayload = await Propuestas._sha256Hex(payload);

    // Firma del autor con la llave del fundador (en v1.0 solo el fundador propone)
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPayload)
    );
    const firma = [...new Uint8Array(firmaBuf)]
      .map(b => b.toString(16).padStart(2, '0')).join('');

    // ID de propuesta derivado del hash del título + timestamp
    const idPropuesta = 'PROP-' + (await Propuestas._sha256Hex(titulo + timestamp)).slice(0, 8).toUpperCase();

    const propuesta = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'propuesta-1.0',
      tipo_registro: 'PROPUESTA',
      id_propuesta: idPropuesta,
      timestamp,
      fecha_cierre: fechaCierre,
      titulo,
      descripcion,
      tipo,
      opciones,
      autor_hash,
      autor_nombre,
      autor_rol: autor_rol || '(sin rol)',
      estado: 'abierta',
      payload_hash: hashPayload,
      firma_ed25519: firma,
      firmante_clave_publica: this.core.clavePublicaHex,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519'
    };

    const id = await this.db.propuestas.add(propuesta);
    this.propuestaActual = { id, ...propuesta };
    return this.propuestaActual;
  }

  // ── Verificar firma de una propuesta ───────────────────────
  async verificar(propuesta) {
    if (!propuesta || !propuesta.payload_hash) {
      return { valido: false, razon: 'Propuesta inválida' };
    }

    const payload = [
      'LEGADO-HUMANO-IA · PROPUESTA v1.0',
      `Título: ${propuesta.titulo}`,
      `Descripción: ${propuesta.descripcion}`,
      `Tipo: ${propuesta.tipo}`,
      `Opciones: ${propuesta.opciones.join(' | ')}`,
      `Autor: ${propuesta.autor_nombre}`,
      `Autor hash: ${propuesta.autor_hash}`,
      `Rol autor: ${propuesta.autor_rol}`,
      `Creada: ${propuesta.timestamp}`,
      `Cierra: ${propuesta.fecha_cierre}`
    ].join('\n');

    const hashRecalc = await Propuestas._sha256Hex(payload);
    const hashOk = hashRecalc === propuesta.payload_hash;

    let firmaOk = false;
    try {
      const pubBytes = hexToBytes(propuesta.firmante_clave_publica);
      const pubKey = await crypto.subtle.importKey(
        'raw', pubBytes, { name: 'Ed25519' }, false, ['verify']
      );
      const firmaBytes = hexToBytes(propuesta.firma_ed25519);
      firmaOk = await crypto.subtle.verify(
        'Ed25519', pubKey, firmaBytes, new TextEncoder().encode(hashRecalc)
      );
    } catch (e) { firmaOk = false; }

    return { hashOk, firmaOk, valido: hashOk && firmaOk };
  }

  // ── Listar propuestas ──────────────────────────────────────
  async listar() {
    if (!this.db.isOpen()) await this.init();
    return await this.db.propuestas.toArray();
  }

  // ── Cambiar estado de la propuesta ─────────────────────────
  async cambiarEstado(id, nuevoEstado) {
    if (!this.db.isOpen()) await this.init();
    return await this.db.propuestas.update(id, { estado: nuevoEstado });
  }

  exportar() {
    if (!this.propuestaActual) throw new Error('No hay propuesta para exportar.');
    return new Blob(
      [JSON.stringify(this.propuestaActual, null, 2)],
      { type: 'application/json' }
    );
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}