// ────────────────────────────────────────────────────────────
// ROLES · Legado Humano–IA · v1.0
// Asignación y verificación de roles sobre identidades selladas
// ────────────────────────────────────────────────────────────

export class RolesPermisos {
  constructor(core, storage, permisos) {
    this.core = core;
    this.storage = storage;
    this.permisos = permisos;
    this.db = new Dexie('kronos-roles');
    this.db.version(1).stores({
      asignaciones: '++id, identidad_hash, identidad_tipo, rol, timestamp, activo'
    });
    this.asignacionActual = null;
  }

  async init() {
    if (!this.db.isOpen()) await this.db.open();
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async asignar(datos) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.db.isOpen()) await this.init();

    const { identidad_hash, identidad_tipo, identidad_nombre, rol } = datos;

    if (!identidad_hash || identidad_hash.length < 32) {
      throw new Error('Hash de identidad inválido.');
    }
    if (!['humano', 'ia'].includes(identidad_tipo)) {
      throw new Error('Tipo de identidad inválido (humano o ia).');
    }
    if (!this.permisos.validarRol(rol)) {
      throw new Error('Rol no válido: ' + rol);
    }

    const timestamp = new Date().toISOString();

    const payload = [
      'LEGADO-HUMANO-IA · ASIGNACIÓN DE ROL v1.0',
      `Identidad tipo: ${identidad_tipo}`,
      `Identidad nombre: ${identidad_nombre || '(sin nombre)'}`,
      `Identidad hash: ${identidad_hash}`,
      `Rol asignado: ${rol}`,
      `Permisos: ${this.permisos.permisosDe(rol).join(', ')}`,
      `Matriz versión: ${this.permisos.version}`,
      `Timestamp: ${timestamp}`
    ].join('\n');

    const hashPayload = await RolesPermisos._sha256Hex(payload);

    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPayload)
    );
    const firma = [...new Uint8Array(firmaBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    const asignacion = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'roles-permisos-1.0',
      tipo: 'ASIGNACION_ROL',
      timestamp,
      identidad_hash,
      identidad_tipo,
      identidad_nombre: identidad_nombre || '(sin nombre)',
      rol,
      permisos: this.permisos.permisosDe(rol),
      matriz_version: this.permisos.version,
      matriz_hash: await this.permisos.hash(),
      payload_hash: hashPayload,
      firma_ed25519: firma,
      firmante: 'Marco Antonio Rojas Valdovinos',
      firmante_clave_publica: this.core.clavePublicaHex,
      activo: true
    };

    const id = await this.db.asignaciones.add(asignacion);
    this.asignacionActual = { id, ...asignacion };
    return this.asignacionActual;
  }

  async verificar(asignacion) {
    if (!asignacion) return { valido: false, razon: 'Sin asignación' };

    const payload = [
      'LEGADO-HUMANO-IA · ASIGNACIÓN DE ROL v1.0',
      `Identidad tipo: ${asignacion.identidad_tipo}`,
      `Identidad nombre: ${asignacion.identidad_nombre}`,
      `Identidad hash: ${asignacion.identidad_hash}`,
      `Rol asignado: ${asignacion.rol}`,
      `Permisos: ${asignacion.permisos.join(', ')}`,
      `Matriz versión: ${asignacion.matriz_version}`,
      `Timestamp: ${asignacion.timestamp}`
    ].join('\n');

    const hashRecalc = await RolesPermisos._sha256Hex(payload);
    const hashOk = hashRecalc === asignacion.payload_hash;

    let firmaOk = false;
    try {
      const pubBytes = hexToBytes(asignacion.firmante_clave_publica);
      const pubKey = await crypto.subtle.importKey(
        'raw', pubBytes, { name: 'Ed25519' }, false, ['verify']
      );
      const firmaBytes = hexToBytes(asignacion.firma_ed25519);
      firmaOk = await crypto.subtle.verify(
        'Ed25519', pubKey, firmaBytes, new TextEncoder().encode(hashRecalc)
      );
    } catch (e) { firmaOk = false; }

    return { hashOk, firmaOk, valido: hashOk && firmaOk };
  }

  async puede(identidad_hash, permiso) {
    if (!this.db.isOpen()) await this.init();
    const asignaciones = await this.db.asignaciones
      .where('identidad_hash').equals(identidad_hash)
      .and(a => a.activo === true)
      .toArray();

    if (asignaciones.length === 0) return false;

    asignaciones.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    const rol = asignaciones[0].rol;
    return this.permisos.tienePermiso(rol, permiso);
  }

  async listar() {
    if (!this.db.isOpen()) await this.init();
    return await this.db.asignaciones.toArray();
  }

  async revocar(id) {
    if (!this.db.isOpen()) await this.init();
    return await this.db.asignaciones.update(id, { activo: false });
  }

  exportar() {
    if (!this.asignacionActual) throw new Error('No hay asignación para exportar.');
    return new Blob([JSON.stringify(this.asignacionActual, null, 2)], { type: 'application/json' });
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}