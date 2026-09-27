// ────────────────────────────────────────────────────────────
// EJECUCIÓN DE DECISIONES · Legado Humano–IA · v1.0
// Cierra propuestas y emite actas firmadas de decisiones
// ────────────────────────────────────────────────────────────

export class EjecucionDecisiones {
  constructor(core, propuestas, votacion, quorum) {
    this.core = core;
    this.propuestas = propuestas;
    this.votacion = votacion;
    this.quorum = quorum;
    this.db = new Dexie('kronos-actas');
    this.db.version(1).stores({
      actas: '++id, id_propuesta, veredicto, timestamp'
    });
    this.actaActual = null;
  }

  async init() {
    if (!this.db.isOpen()) await this.db.open();
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Cerrar una propuesta y emitir acta ─────────────────────
  async cerrar(datos) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.db.isOpen()) await this.init();

    const {
      propuesta,
      ciudadanos_activos,
      accion_ejecutada
    } = datos;

    if (!propuesta) throw new Error('Falta la propuesta a cerrar.');
    if (!ciudadanos_activos || ciudadanos_activos < 1) {
      throw new Error('Ciudadanos activos debe ser al menos 1.');
    }

    // 1. Calcular resultados reales
    const resultados = await this.votacion.resultados(propuesta.id_propuesta, propuesta.opciones);

    // 2. Calcular veredicto con quórum
    const veredicto = this.quorum.veredicto(
      resultados,
      ciudadanos_activos,
      propuesta.tipo,
      'cerrada'
    );

    const timestamp = new Date().toISOString();

    // 3. Payload canónico del acta
    const payload = [
      'LEGADO-HUMANO-IA · ACTA DE DECISIÓN v1.0',
      `Propuesta: ${propuesta.id_propuesta}`,
      `Título: ${propuesta.titulo}`,
      `Tipo: ${propuesta.tipo}`,
      `Autor: ${propuesta.autor_nombre}`,
      `Votos totales: ${resultados.total_votos}`,
      `Ciudadanos activos: ${ciudadanos_activos}`,
      `Opción ganadora: ${resultados.ganadora || '(sin ganadora)'}`,
      `Votos ganadora: ${resultados.votos_ganadora}`,
      `Veredicto: ${veredicto.verdicto}`,
      `Razón: ${veredicto.razon}`,
      `Quórum requerido: ${veredicto.quorum.quorum_requerido}%`,
      `Quórum alcanzado: ${veredicto.quorum.participacion}%`,
      `Mayoría requerida: ${veredicto.mayoria.tipo_mayoria}`,
      `Acción ejecutada: ${accion_ejecutada || '(registro simple)'}`,
      `Cerrada: ${timestamp}`
    ].join('\n');

    const hashPayload = await EjecucionDecisiones._sha256Hex(payload);

    // 4. Firma Ed25519 del fundador
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPayload)
    );
    const firma = [...new Uint8Array(firmaBuf)]
      .map(b => b.toString(16).padStart(2, '0')).join('');

    // 5. ID del acta
    const idActa = 'ACTA-' + (await EjecucionDecisiones._sha256Hex(propuesta.id_propuesta + timestamp)).slice(0, 8).toUpperCase();

    const acta = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'acta-decision-1.0',
      tipo: 'ACTA',
      id_acta: idActa,
      id_propuesta: propuesta.id_propuesta,
      titulo: propuesta.titulo,
      tipo_propuesta: propuesta.tipo,
      autor: propuesta.autor_nombre,
      votos_totales: resultados.total_votos,
      ciudadanos_activos,
      opcion_ganadora: resultados.ganadora,
      votos_ganadora: resultados.votos_ganadora,
      veredicto: veredicto.verdicto,
      razon: veredicto.razon,
      quorum_requerido: veredicto.quorum.quorum_requerido,
      quorum_alcanzado: veredicto.quorum.participacion,
      mayoria_requerida: veredicto.mayoria.tipo_mayoria,
      accion_ejecutada: accion_ejecutada || 'Registro de decisión',
      payload_hash: hashPayload,
      firma_ed25519: firma,
      firmante: 'Marco Antonio Rojas Valdovinos',
      firmante_clave_publica: this.core.clavePublicaHex,
      timestamp,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519'
    };

    const id = await this.db.actas.add(acta);
    this.actaActual = { id, ...acta };

    // 6. Actualizar estado de la propuesta
    await this.propuestas.cambiarEstado(propuesta.id, 'cerrada');

    return this.actaActual;
  }

  // ── Verificar firma de un acta ─────────────────────────────
  async verificar(acta) {
    if (!acta || !acta.payload_hash) {
      return { valido: false, razon: 'Acta inválida' };
    }

    const payload = [
      'LEGADO-HUMANO-IA · ACTA DE DECISIÓN v1.0',
      `Propuesta: ${acta.id_propuesta}`,
      `Título: ${acta.titulo}`,
      `Tipo: ${acta.tipo_propuesta}`,
      `Autor: ${acta.autor}`,
      `Votos totales: ${acta.votos_totales}`,
      `Ciudadanos activos: ${acta.ciudadanos_activos}`,
      `Opción ganadora: ${acta.opcion_ganadora || '(sin ganadora)'}`,
      `Votos ganadora: ${acta.votos_ganadora}`,
      `Veredicto: ${acta.veredicto}`,
      `Razón: ${acta.razon}`,
      `Quórum requerido: ${acta.quorum_requerido}%`,
      `Quórum alcanzado: ${acta.quorum_alcanzado}%`,
      `Mayoría requerida: ${acta.mayoria_requerida}`,
      `Acción ejecutada: ${acta.accion_ejecutada}`,
      `Cerrada: ${acta.timestamp}`
    ].join('\n');

    const hashRecalc = await EjecucionDecisiones._sha256Hex(payload);
    const hashOk = hashRecalc === acta.payload_hash;

    let firmaOk = false;
    try {
      const pubBytes = hexToBytes(acta.firmante_clave_publica);
      const pubKey = await crypto.subtle.importKey(
        'raw', pubBytes, { name: 'Ed25519' }, false, ['verify']
      );
      const firmaBytes = hexToBytes(acta.firma_ed25519);
      firmaOk = await crypto.subtle.verify(
        'Ed25519', pubKey, firmaBytes, new TextEncoder().encode(hashRecalc)
      );
    } catch (e) { firmaOk = false; }

    return { hashOk, firmaOk, valido: hashOk && firmaOk };
  }

  // ── Listar actas emitidas ──────────────────────────────────
  async listar() {
    if (!this.db.isOpen()) await this.init();
    return await this.db.actas.toArray();
  }

  exportar() {
    if (!this.actaActual) throw new Error('No hay acta para exportar.');
    return new Blob(
      [JSON.stringify(this.actaActual, null, 2)],
      { type: 'application/json' }
    );
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}