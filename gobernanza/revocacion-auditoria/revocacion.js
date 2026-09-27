// ────────────────────────────────────────────────────────────
// REVOCACIÓN Y AUDITORÍA · Legado Humano–IA · v1.0
// Revoca roles y audita el histórico completo de gobernanza
// ────────────────────────────────────────────────────────────

export class RevocacionAuditoria {
  constructor(core, propuestas, votacion, ejecucion) {
    this.core = core;
    this.propuestas = propuestas;
    this.votacion = votacion;
    this.ejecucion = ejecucion;
    this.db = new Dexie('kronos-revocaciones');
    this.db.version(1).stores({
      revocaciones: '++id, identidad_hash, timestamp, activo'
    });
    this.revocacionActual = null;
  }

  async init() {
    if (!this.db.isOpen()) await this.db.open();
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Revocar un rol asignado ────────────────────────────────
  async revocarRol(datos) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.db.isOpen()) await this.init();

    const {
      identidad_hash,
      identidad_nombre,
      identidad_tipo,
      rol_revocado,
      motivo,
      propuesta_id
    } = datos;

    if (!identidad_hash) throw new Error('Falta el hash de la identidad.');
    if (!identidad_nombre) throw new Error('Falta el nombre de la identidad.');
    if (!rol_revocado) throw new Error('Falta el rol a revocar.');
    if (!motivo || motivo.length < 10) {
      throw new Error('El motivo de la revocación es obligatorio (mín. 10 caracteres).');
    }

    const timestamp = new Date().toISOString();

    const payload = [
      'LEGADO-HUMANO-IA · REVOCACIÓN DE ROL v1.0',
      `Identidad: ${identidad_nombre}`,
      `Tipo: ${identidad_tipo || 'humano'}`,
      `Hash: ${identidad_hash}`,
      `Rol revocado: ${rol_revocado}`,
      `Motivo: ${motivo}`,
      `Propuesta relacionada: ${propuesta_id || '(sin propuesta)'}`,
      `Timestamp: ${timestamp}`
    ].join('\n');

    const hashPayload = await RevocacionAuditoria._sha256Hex(payload);

    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPayload)
    );
    const firma = [...new Uint8Array(firmaBuf)]
      .map(b => b.toString(16).padStart(2, '0')).join('');

    const idRev = 'REV-' + (await RevocacionAuditoria._sha256Hex(identidad_hash + timestamp)).slice(0, 8).toUpperCase();

    const revocacion = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'revocacion-1.0',
      tipo: 'REVOCACION_ROL',
      id_revocacion: idRev,
      timestamp,
      identidad_hash,
      identidad_nombre,
      identidad_tipo: identidad_tipo || 'humano',
      rol_revocado,
      motivo,
      propuesta_relacionada: propuesta_id || null,
      payload_hash: hashPayload,
      firma_ed25519: firma,
      firmante: 'Marco Antonio Rojas Valdovinos',
      firmante_clave_publica: this.core.clavePublicaHex,
      activo: true,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519'
    };

    const id = await this.db.revocaciones.add(revocacion);
    this.revocacionActual = { id, ...revocacion };
    return this.revocacionActual;
  }

  // ── Verificar firma de una revocación ──────────────────────
  async verificar(revocacion) {
    if (!revocacion || !revocacion.payload_hash) {
      return { valido: false, razon: 'Revocación inválida' };
    }

    const payload = [
      'LEGADO-HUMANO-IA · REVOCACIÓN DE ROL v1.0',
      `Identidad: ${revocacion.identidad_nombre}`,
      `Tipo: ${revocacion.identidad_tipo}`,
      `Hash: ${revocacion.identidad_hash}`,
      `Rol revocado: ${revocacion.rol_revocado}`,
      `Motivo: ${revocacion.motivo}`,
      `Propuesta relacionada: ${revocacion.propuesta_relacionada || '(sin propuesta)'}`,
      `Timestamp: ${revocacion.timestamp}`
    ].join('\n');

    const hashRecalc = await RevocacionAuditoria._sha256Hex(payload);
    const hashOk = hashRecalc === revocacion.payload_hash;

    let firmaOk = false;
    try {
      const pubBytes = hexToBytes(revocacion.firmante_clave_publica);
      const pubKey = await crypto.subtle.importKey(
        'raw', pubBytes, { name: 'Ed25519' }, false, ['verify']
      );
      const firmaBytes = hexToBytes(revocacion.firma_ed25519);
      firmaOk = await crypto.subtle.verify(
        'Ed25519', pubKey, firmaBytes, new TextEncoder().encode(hashRecalc)
      );
    } catch (e) { firmaOk = false; }

    return { hashOk, firmaOk, valido: hashOk && firmaOk };
  }

  // ── Listar todas las revocaciones ──────────────────────────
  async listarRevocaciones() {
    if (!this.db.isOpen()) await this.init();
    return await this.db.revocaciones.toArray();
  }

  // ── Comprobar si una identidad tiene una revocación activa ─
  async tieneRevocacion(identidadHash) {
    if (!this.db.isOpen()) await this.init();
    const items = await this.db.revocaciones
      .where('identidad_hash').equals(identidadHash)
      .and(r => r.activo === true)
      .toArray();
    return items.length > 0 ? items : false;
  }

  // ── Levantar una revocación (reactivar) ────────────────────
  async levantar(idRevocacion) {
    if (!this.db.isOpen()) await this.init();
    return await this.db.revocaciones.update(idRevocacion, { activo: false });
  }

  // ── AUDITORÍA COMPLETA DEL ECOSISTEMA ──────────────────────
  async auditar() {
    const propuestas = await this.propuestas.listar();
    const votos = await this.votacion.listar();
    const actas = await this.ejecucion.listar();
    const revocaciones = await this.listarRevocaciones();

    const propuestasAbiertas = propuestas.filter(p => p.estado === 'abierta').length;
    const propuestasCerradas = propuestas.filter(p => p.estado === 'cerrada').length;
    const actasAprobadas = actas.filter(a => a.veredicto === 'aprobada').length;
    const actasRechazadas = actas.filter(a => a.veredicto === 'rechazada').length;
    const actasSinQuorum = actas.filter(a => a.veredicto === 'sin_quorum').length;
    const revocacionesActivas = revocaciones.filter(r => r.activo === true).length;

    return {
      propuestas: {
        total: propuestas.length,
        abiertas: propuestasAbiertas,
        cerradas: propuestasCerradas
      },
      votos: {
        total: votos.length,
        por_propuesta: propuestas.length > 0
          ? Math.round((votos.length / propuestas.length) * 10) / 10
          : 0
      },
      actas: {
        total: actas.length,
        aprobadas: actasAprobadas,
        rechazadas: actasRechazadas,
        sin_quorum: actasSinQuorum
      },
      revocaciones: {
        total: revocaciones.length,
        activas: revocacionesActivas,
        levantadas: revocaciones.length - revocacionesActivas
      },
      timestamp: new Date().toISOString()
    };
  }

  // ── Exportar auditoría ─────────────────────────────────────
  async exportarAuditoria() {
    const auditoria = await this.auditar();
    return new Blob(
      [JSON.stringify(auditoria, null, 2)],
      { type: 'application/json' }
    );
  }

  // ── Exportar revocación actual ─────────────────────────────
  exportar() {
    if (!this.revocacionActual) throw new Error('No hay revocación para exportar.');
    return new Blob(
      [JSON.stringify(this.revocacionActual, null, 2)],
      { type: 'application/json' }
    );
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}