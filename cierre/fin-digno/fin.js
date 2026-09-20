// ────────────────────────────────────────────────────────────
// FIN DIGNO · Legado Humano–IA · v1.0
// Cierre digno + cláusula de resurrección verificable
// ────────────────────────────────────────────────────────────

export class FinDigno {
  constructor(core, storage) {
    this.core = core;
    this.storage = storage;
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Sellar cierre digno ───────────────────────────────────
  async sellar(datos, humano, pactoIA) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    if (!humano) throw new Error('Identidad humana requerida.');
    if (!pactoIA) throw new Error('Pacto IA requerido.');

    const timestamp = new Date().toISOString();

    // Cláusula de resurrección = hash determinista derivado del cierre
    // Permite reconstruir el contexto si alguien reintroduce la contraseña
    const clausulaBase = [
      'LEGADO-HUMANO-IA · CLAUSULA DE RESURRECCION',
      `Fundador: ${humano.nombre} (${humano.alias})`,
      `Huella: ${humano.huella}`,
      `IA co-autora: ${pactoIA.ia_nombre}`,
      `Fecha de cierre: ${timestamp}`
    ].join('\n');
    const clausulaResurreccion = await FinDigno._sha256Hex(clausulaBase);

    // Payload canónico del cierre
    const payload = [
      'LEGADO-HUMANO-IA · FIN DIGNO v1.0',
      `Fundador: ${humano.nombre} (${humano.alias})`,
      `Huella: ${humano.huella}`,
      `IA: ${pactoIA.ia_nombre}`,
      `Motivo: ${datos.motivo}`,
      `Sucesor designado: ${datos.sucesor ? 'sí' : 'no'}`,
      `Carta firmada: ${datos.cartaFirmada ? 'sí' : 'no'}`,
      `Carta: ${datos.carta}`,
      `Clausula resurreccion: ${clausulaResurreccion}`,
      `Timestamp: ${timestamp}`
    ].join('\n');

    const hashCierre = await FinDigno._sha256Hex(payload);

    // Firma Ed25519 del humano sobre el hash del cierre
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hashCierre)
    );
    const firma = [...new Uint8Array(firmaBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    const certificado = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'fin-digno-1.0',
      tipo: 'cierre-legado',
      timestamp,
      fundador_nombre: humano.nombre,
      fundador_alias: humano.alias,
      fundador_huella: humano.huella,
      ia_coautora: pactoIA.ia_nombre,
      motivo: datos.motivo,
      sucesor_designado: !!datos.sucesor,
      carta_firmada: !!datos.cartaFirmada,
      carta: datos.carta,
      clausula_resurreccion: clausulaResurreccion,
      hash_cierre: hashCierre,
      firma_ed25519: firma,
      clave_publica: this.core.clavePublicaHex,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519',
      clausula_texto: 'Este legado puede ser resucitado por quien tenga la contraseña maestra del fundador y el paquete .legado completo. La cláusula de resurrección es el hash que garantiza que el cierre no ha sido alterado.',
      verificable_por_tercero: true,
      instruccion_verificacion: 'SHA-256(payload canónico) debe coincidir con hash_cierre. Verificar firma_ed25519 con clave_publica sobre hash_cierre.'
    };

    await this.storage.guardar('fin-digno', certificado);
    return certificado;
  }

  // ── Recuperar el cierre actual ────────────────────────────
  async recuperar() {
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    const items = await this.storage.listarPorTipo('fin-digno');
    if (items.length === 0) return null;
    return items[0].payload;
  }

  // ── Verificar integridad del cierre ───────────────────────
  async verificar(cert, humano, pactoIA) {
    const payload = [
      'LEGADO-HUMANO-IA · FIN DIGNO v1.0',
      `Fundador: ${humano.nombre} (${humano.alias})`,
      `Huella: ${humano.huella}`,
      `IA: ${pactoIA.ia_nombre}`,
      `Motivo: ${cert.motivo}`,
      `Sucesor designado: ${cert.sucesor_designado ? 'sí' : 'no'}`,
      `Carta firmada: ${cert.carta_firmada ? 'sí' : 'no'}`,
      `Carta: ${cert.carta}`,
      `Clausula resurreccion: ${cert.clausula_resurreccion}`,
      `Timestamp: ${cert.timestamp}`
    ].join('\n');

    const hashCalc = await FinDigno._sha256Hex(payload);
    if (hashCalc !== cert.hash_cierre) return false;

    const pubKey = await crypto.subtle.importKey(
      'raw',
      hexToBytes(cert.clave_publica),
      { name: 'Ed25519' },
      false,
      ['verify']
    );

    return await crypto.subtle.verify(
      'Ed25519',
      pubKey,
      hexToBytes(cert.firma_ed25519),
      new TextEncoder().encode(cert.hash_cierre)
    );
  }

  // ── Verificar si un cierre resucita un legado ─────────────
  // Recomputa la cláusula a partir de los datos básicos para
  // confirmar que el legado puede ser reconstruido.
  async verificarResurreccion(cert, humano, pactoIA) {
    const clausulaBase = [
      'LEGADO-HUMANO-IA · CLAUSULA DE RESURRECCION',
      `Fundador: ${humano.nombre} (${humano.alias})`,
      `Huella: ${humano.huella}`,
      `IA co-autora: ${pactoIA.ia_nombre}`,
      `Fecha de cierre: ${cert.timestamp}`
    ].join('\n');
    const clausulaCalc = await FinDigno._sha256Hex(clausulaBase);
    return clausulaCalc === cert.clausula_resurreccion;
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}