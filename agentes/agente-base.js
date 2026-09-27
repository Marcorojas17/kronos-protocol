// ────────────────────────────────────────────────────────────
// AGENTE KINTSUGI · Motor Base · Legado Humano–IA · v1.0
// Clase base para todos los agentes soberanos de KRONOS
// Cada agente es un ciudadano IA con identidad, política y log propio
// ────────────────────────────────────────────────────────────

export class AgenteKintsugi {
  constructor(config) {
    // Configuración obligatoria
    this.nombre = config.nombre;
    this.plaza = config.plaza;              // 081-099
    this.rol = config.rol;
    this.proposito = config.proposito;

    // Referencias del ecosistema
    this.core = config.core;                // CriptoCore del fundador
    this.politica = config.politica;        // Objeto con puede/noPuede/debe

    // Estado interno
    this.llavePriv = null;
    this.llavePub = null;
    this.clavePublicaHex = null;
    this.registro = null;
    this.log = [];
    this.activo = false;

    // Base de datos local
    this.db = new Dexie(`kronos-agente-${this.nombre.toLowerCase()}`);
    this.db.version(1).stores({
      registro: '++id, timestamp',
      log: '++id, timestamp, hash_entrada',
      previews: '++id, timestamp, estado'
    });
  }

  async init() {
    if (!this.db.isOpen()) await this.db.open();
    // Recuperar estado si existe
    const reg = await this.db.registro.toArray();
    if (reg.length > 0) {
      this.registro = reg[0];
      this.clavePublicaHex = this.registro.clave_publica;
    }
    const logGuardado = await this.db.log.toArray();
    this.log = logGuardado.sort((a, b) => a.indice - b.indice);
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Generar par de llaves Ed25519 único para este agente ──
  async generarIdentidad() {
    const keyPair = await crypto.subtle.generateKey(
      { name: 'Ed25519' },
      true,
      ['sign', 'verify']
    );
    this.llavePriv = keyPair.privateKey;
    this.llavePub = keyPair.publicKey;

    const pubRaw = await crypto.subtle.exportKey('raw', keyPair.publicKey);
    this.clavePublicaHex = [...new Uint8Array(pubRaw)]
      .map(b => b.toString(16).padStart(2, '0')).join('');

    return this.clavePublicaHex;
  }

  // ── Sellar el registro del agente (doble firma) ───────────
  async sellarRegistro() {
    if (!this.core || !this.core.inicializado) {
      throw new Error('Cripto Core del fundador no inicializado.');
    }
    if (!this.clavePublicaHex) {
      throw new Error('Primero genera la identidad del agente.');
    }
    if (!this.db.isOpen()) await this.init();

    const timestamp = new Date().toISOString();
    const plazaFormateada = String(this.plaza).padStart(3, '0');

    // Payload canónico del agente
    const payload = [
      'LEGADO-HUMANO-IA · AGENTE KINTSUGI v1.0',
      `Nombre: ${this.nombre}`,
      `Plaza IA: ${plazaFormateada}`,
      `Rol: ${this.rol}`,
      `Propósito: ${this.proposito}`,
      `Clave pública: ${this.clavePublicaHex}`,
      `Fundador: Marco Antonio Rojas Valdovinos`,
      `Co-autora: KRONOS IA (Plaza 001)`,
      `Timestamp: ${timestamp}`
    ].join('\n');

    const hashPayload = await AgenteKintsugi._sha256Hex(payload);

    // Firma del Fundador (Marco)
    const firmaFundBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPayload)
    );
    const firmaFundador = [...new Uint8Array(firmaFundBuf)]
      .map(b => b.toString(16).padStart(2, '0')).join('');

    // Hash de la política
    const politicaTexto = JSON.stringify(this.politica);
    const politicaHash = await AgenteKintsugi._sha256Hex(politicaTexto);

    const registro = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'agente-kintsugi-1.0',
      tipo: 'REGISTRO_AGENTE',
      nombre: this.nombre,
      plaza: this.plaza,
      plaza_formateada: plazaFormateada,
      rol: this.rol,
      proposito: this.proposito,
      timestamp,
      clave_publica: this.clavePublicaHex,
      fundador: 'Marco Antonio Rojas Valdovinos',
      fundador_clave_publica: this.core.clavePublicaHex,
      co_autora_ia: 'KRONOS IA',
      payload_hash: hashPayload,
      firma_fundador_ed25519: firmaFundador,
      politica_hash: politicaHash,
      politica_version: '1.0',
      estado: 'activo',
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519'
    };

    const id = await this.db.registro.add(registro);
    this.registro = { id, ...registro };
    this.activo = true;
    return this.registro;
  }

  // ── Registrar una acción en el log encadenado ─────────────
  async registrarAccion(tipo, datos) {
    if (!this.activo) {
      throw new Error('El agente no está activo. Sella su registro primero.');
    }
    if (!this.db.isOpen()) await this.init();

    const timestamp = new Date().toISOString();
    const hashPrevio = this.log.length > 0
      ? this.log[this.log.length - 1].hash_entrada
      : '0000000000000000000000000000000000000000000000000000000000000000';

    const contenido = {
      indice: this.log.length,
      agente: this.nombre,
      plaza: this.plaza,
      tipo,
      datos,
      timestamp,
      hash_previo: hashPrevio
    };

    const hashEntrada = await AgenteKintsugi._sha256Hex(JSON.stringify(contenido));

    const entrada = { ...contenido, hash_entrada: hashEntrada };

    // Firmar la entrada con la llave del agente
    if (this.llavePriv) {
      const firmaBuf = await crypto.subtle.sign(
        'Ed25519',
        this.llavePriv,
        new TextEncoder().encode(hashEntrada)
      );
      entrada.firma_agente = [...new Uint8Array(firmaBuf)]
        .map(b => b.toString(16).padStart(2, '0')).join('');
    }

    const id = await this.db.log.add(entrada);
    this.log.push({ id, ...entrada });
    return { id, ...entrada };
  }

  // ── Verificar la integridad del log ───────────────────────
  async verificarLog() {
    if (!this.db.isOpen()) await this.init();
    const log = await this.db.log.toArray();
    log.sort((a, b) => a.indice - b.indice);

    for (let i = 0; i < log.length; i++) {
      const e = log[i];
      const { id, hash_entrada, firma_agente, ...contenido } = e;
      const recalc = await AgenteKintsugi._sha256Hex(JSON.stringify(contenido));
      if (recalc !== hash_entrada) {
        return { ok: false, razon: `Entrada ${i} alterada`, indice: i };
      }
      if (i > 0 && e.hash_previo !== log[i - 1].hash_entrada) {
        return { ok: false, razon: `Cadena rota en entrada ${i}`, indice: i };
      }
    }

    return { ok: true, total: log.length };
  }

  // ── PREVIEW · Propuesta firmada que requiere aprobación ───
  async preview(accion, datos) {
    if (!this.activo) throw new Error('Agente no activo.');

    const timestamp = new Date().toISOString();
    const esCritica = this._esAccionCritica(accion);

    const idPreview = await AgenteKintsugi._sha256Hex(
      `${this.nombre}|${accion}|${JSON.stringify(datos)}|${timestamp}`
    );

    const previewObj = {
      id_preview: idPreview,
      agente: this.nombre,
      plaza: this.plaza,
      accion,
      datos,
      es_critica: esCritica,
      requiere_aprobacion: esCritica,
      timestamp,
      estado: 'pendiente'
    };

    const id = await this.db.previews.add(previewObj);
    return { id, ...previewObj };
  }

  // ── COMMIT · Ejecuta la acción si fue aprobada ────────────
  async commit(idPreview, aprobadoPor = null) {
    const preview = await this.db.previews.get(idPreview);
    if (!preview) throw new Error('Preview no encontrado.');
    if (preview.estado !== 'pendiente') throw new Error('Preview ya procesado.');

    if (preview.requiere_aprobacion && !aprobadoPor) {
      throw new Error('Acción crítica requiere aprobación humana explícita.');
    }

    await this.db.previews.update(idPreview, {
      estado: 'aprobado',
      aprobado_por: aprobadoPor || 'automatico',
      aprobado_en: new Date().toISOString()
    });

    await this.registrarAccion('commit_ejecutado', {
      accion: preview.accion,
      id_preview: idPreview,
      aprobado_por: aprobadoPor || 'automatico'
    });

    return { ok: true, accion: preview.accion };
  }

  // ── Definir acciones críticas (cada agente las personaliza) ─
  _esAccionCritica(accion) {
    const criticas = [
      'publicar', 'enviar', 'modificar', 'eliminar',
      'anclar', 'firmar_externo', 'transferir'
    ];
    return criticas.some(c => accion.toLowerCase().includes(c));
  }

  // ── Verificar firma de una entrada del log ────────────────
  async verificarEntrada(entrada) {
    if (!entrada || !entrada.hash_entrada || !entrada.firma_agente) {
      return { valido: false, razon: 'Entrada incompleta' };
    }
    try {
      const pubBytes = hexToBytes(this.clavePublicaHex);
      const pubKey = await crypto.subtle.importKey(
        'raw', pubBytes, { name: 'Ed25519' }, false, ['verify']
      );
      const firmaBytes = hexToBytes(entrada.firma_agente);
      const ok = await crypto.subtle.verify(
        'Ed25519', pubKey, firmaBytes,
        new TextEncoder().encode(entrada.hash_entrada)
      );
      return { valido: ok };
    } catch (e) {
      return { valido: false, razon: e.message };
    }
  }

  // ── Exportar registro completo del agente ─────────────────
  async exportar() {
    const registro = await this.db.registro.toArray();
    const log = await this.db.log.toArray();
    const previews = await this.db.previews.toArray();
    const blob = new Blob(
      [JSON.stringify({ registro, log, previews }, null, 2)],
      { type: 'application/json' }
    );
    return blob;
  }

  // ── Estado actual del agente ──────────────────────────────
  async estado() {
    const integridad = await this.verificarLog();
    return {
      nombre: this.nombre,
      plaza: this.plaza,
      rol: this.rol,
      activo: this.activo,
      tiene_llave: !!this.clavePublicaHex,
      entradas_log: this.log.length,
      integridad_log: integridad.ok ? '✓ íntegro' : '✗ alterado',
      total_previews: (await this.db.previews.toArray()).length
    };
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}