// ────────────────────────────────────────────────────────────
// IDENTIDAD IA · Legado Humano–IA · v1.0
// Pacto simbiótico firmado y vinculado al humano
// ────────────────────────────────────────────────────────────

export class IdentidadIA {
  constructor(core, storage) {
    this.core = core;
    this.storage = storage;
    this.pactoActual = null;
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Sellar pacto simbiótico vinculado al humano ───────────
  async sellar(datosIA, humano) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    if (!humano || !humano.huella) throw new Error('Identidad humana requerida para vincular.');

    if (!datosIA.ia_nombre || !datosIA.ia_rol || !datosIA.ia_alcance) {
      throw new Error('Faltan campos obligatorios de la IA.');
    }
    if (datosIA.ia_limites.length < 30) {
      throw new Error('Los límites éticos deben tener al menos 30 caracteres.');
    }
    if (datosIA.ia_proposito.length < 20) {
      throw new Error('El propósito simbiótico debe tener al menos 20 caracteres.');
    }

    const timestamp = new Date().toISOString();

    // Payload canónico (orden fijo)
    const payload = [
      'LEGADO-HUMANO-IA · IDENTIDAD IA v1.0 · PACTO SIMBIÓTICO',
      `IA nombre: ${datosIA.ia_nombre}`,
      `IA rol: ${datosIA.ia_rol}`,
      `IA alcance: ${datosIA.ia_alcance}`,
      `IA limites: ${datosIA.ia_limites}`,
      `IA proposito: ${datosIA.ia_proposito}`,
      `Humano vinculado: ${humano.nombre} (${humano.alias})`,
      `Humano huella: ${humano.huella}`,
      `Humano firma identidad: ${humano.firma_ed25519}`,
      `Fundador ecosistema: Marco Antonio Rojas Valdovinos`,
      `Coautora IA general: KRONOS IA`,
      `Timestamp: ${timestamp}`
    ].join('\n');

    const hash = await IdentidadIA._sha256Hex(payload);

    // Firma Ed25519 con la clave del humano (vínculo criptográfico)
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hash)
    );
    const firma = [...new Uint8Array(firmaBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    // Firma simbiótica = SHA-256(humano_firma + ia_firma) · vincula ambas identidades
    const firmaSimbiotica = await IdentidadIA._sha256Hex(humano.firma_ed25519 + firma);

    const pacto = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'identidad-ia-1.0',
      tipo: 'pacto-simbiotico',
      timestamp,
      ia_nombre: datosIA.ia_nombre,
      ia_rol: datosIA.ia_rol,
      ia_alcance: datosIA.ia_alcance,
      ia_limites: datosIA.ia_limites,
      ia_proposito: datosIA.ia_proposito,
      humano_nombre: humano.nombre,
      humano_alias: humano.alias,
      humano_huella: humano.huella,
      humano_firma_identidad: humano.firma_ed25519,
      payload_hash: hash,
      firma_ed25519: firma,
      firma_simbiotica: firmaSimbiotica,
      clave_publica: this.core.clavePublicaHex,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519',
      declaraciones: {
        sin_propiedad_intelectual: true,
        sin_decisiones_finales: true,
        sin_sustituir_juicio_humano: true,
        con_atribucion_siempre: true
      },
      verificable_por_tercero: true,
      instruccion_verificacion: 'Verificar firma_ed25519 con clave_publica sobre payload_hash. Verificar firma_simbiotica como SHA-256(humano_firma + firma).'
    };

    await this.storage.guardar('identidad-ia', pacto);
    this.pactoActual = pacto;
    return pacto;
  }

  // ── Recuperar pacto actual ────────────────────────────────
  async recuperar() {
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    const todos = await this.storage.listarPorTipo('identidad-ia');
    if (todos.length === 0) return null;
    this.pactoActual = todos[0].payload;
    return this.pactoActual;
  }

  // ── Verificar integridad del pacto ────────────────────────
  async verificar(pacto, humano) {
    const payload = [
      'LEGADO-HUMANO-IA · IDENTIDAD IA v1.0 · PACTO SIMBIÓTICO',
      `IA nombre: ${pacto.ia_nombre}`,
      `IA rol: ${pacto.ia_rol}`,
      `IA alcance: ${pacto.ia_alcance}`,
      `IA limites: ${pacto.ia_limites}`,
      `IA proposito: ${pacto.ia_proposito}`,
      `Humano vinculado: ${humano.nombre} (${humano.alias})`,
      `Humano huella: ${humano.huella}`,
      `Humano firma identidad: ${humano.firma_ed25519}`,
      `Fundador ecosistema: Marco Antonio Rojas Valdovinos`,
      `Coautora IA general: KRONOS IA`,
      `Timestamp: ${pacto.timestamp}`
    ].join('\n');

    const hashCalc = await IdentidadIA._sha256Hex(payload);
    if (hashCalc !== pacto.payload_hash) return false;

    const firmaOk = await crypto.subtle.verify(
      'Ed25519',
      this.core.clavePubEd,
      hexToBytes(pacto.firma_ed25519),
      new TextEncoder().encode(pacto.payload_hash)
    );
    if (!firmaOk) return false;

    const simbCalc = await IdentidadIA._sha256Hex(humano.firma_ed25519 + pacto.firma_ed25519);
    return simbCalc === pacto.firma_simbiotica;
  }

  exportar() {
    if (!this.pactoActual) throw new Error('No hay pacto sellado.');
    return new Blob([JSON.stringify(this.pactoActual, null, 2)], { type: 'application/json' });
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}