// ────────────────────────────────────────────────────────────
// VOTACIÓN · Legado Humano–IA · v1.0
// Motor de votos firmados con Ed25519
// ────────────────────────────────────────────────────────────

export class Votacion {
  constructor(core) {
    this.core = core;
    this.db = new Dexie("kronos-votacion");
    this.db.version(1).stores({
      votos: "++id, id_propuesta, votante_hash, timestamp",
    });
    this.votoActual = null;
  }

  async init() {
    if (!this.db.isOpen()) await this.db.open();
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(buf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // ── Verificar si ya votó ───────────────────────────────────
  async yaVoto(idPropuesta, votanteHash) {
    if (!this.db.isOpen()) await this.init();
    const votos = await this.db.votos
      .where("id_propuesta")
      .equals(idPropuesta)
      .and((v) => v.votante_hash === votanteHash)
      .toArray();
    return votos.length > 0;
  }

  // ── Emitir un voto firmado ─────────────────────────────────
  async votar(datos) {
    if (!this.core.inicializado)
      throw new Error("Cripto Core no inicializado.");
    if (!this.db.isOpen()) await this.init();

    const {
      id_propuesta,
      opcion_elegida,
      votante_hash,
      votante_nombre,
      votante_rol,
    } = datos;

    if (!id_propuesta) throw new Error("ID de propuesta requerido.");
    if (!opcion_elegida) throw new Error("Debes elegir una opción.");
    if (!votante_hash || !votante_nombre)
      throw new Error("Votante no identificado.");

    const ya = await this.yaVoto(id_propuesta, votante_hash);
    if (ya)
      throw new Error("Esta identidad ya emitió su voto en esta propuesta.");

    const timestamp = new Date().toISOString();

    const payload = [
      "LEGADO-HUMANO-IA · VOTO v1.0",
      `Propuesta: ${id_propuesta}`,
      `Opción elegida: ${opcion_elegida}`,
      `Votante: ${votante_nombre}`,
      `Votante hash: ${votante_hash}`,
      `Rol: ${votante_rol || "(sin rol)"}`,
      `Timestamp: ${timestamp}`,
    ].join("\n");

    const hashPayload = await Votacion._sha256Hex(payload);

    const firmaBuf = await crypto.subtle.sign(
      "Ed25519",
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPayload),
    );
    const firma = [...new Uint8Array(firmaBuf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const voto = {
      protocolo: "LEGADO-HUMANO-IA",
      version: "voto-1.0",
      tipo: "VOTO",
      id_propuesta,
      opcion_elegida,
      votante_hash,
      votante_nombre,
      votante_rol: votante_rol || "(sin rol)",
      timestamp,
      payload_hash: hashPayload,
      firma_ed25519: firma,
      firmante_clave_publica: this.core.clavePublicaHex,
      algoritmo_hash: "SHA-256",
      algoritmo_firma: "Ed25519",
    };

    const id = await this.db.votos.add(voto);
    this.votoActual = { id, ...voto };
    return this.votoActual;
  }

  // ── Obtener todos los votos de una propuesta ───────────────
  async votosDe(idPropuesta) {
    if (!this.db.isOpen()) await this.init();
    return await this.db.votos
      .where("id_propuesta")
      .equals(idPropuesta)
      .toArray();
  }

  // ── Verificar la firma de un voto ──────────────────────────
  async verificar(voto) {
    if (!voto || !voto.payload_hash) {
      return { valido: false, razon: "Voto inválido" };
    }

    const payload = [
      "LEGADO-HUMANO-IA · VOTO v1.0",
      `Propuesta: ${voto.id_propuesta}`,
      `Opción elegida: ${voto.opcion_elegida}`,
      `Votante: ${voto.votante_nombre}`,
      `Votante hash: ${voto.votante_hash}`,
      `Rol: ${voto.votante_rol}`,
      `Timestamp: ${voto.timestamp}`,
    ].join("\n");

    const hashRecalc = await Votacion._sha256Hex(payload);
    const hashOk = hashRecalc === voto.payload_hash;

    let firmaOk = false;
    try {
      const pubBytes = hexToBytes(voto.firmante_clave_publica);
      const pubKey = await crypto.subtle.importKey(
        "raw",
        pubBytes,
        { name: "Ed25519" },
        false,
        ["verify"],
      );
      const firmaBytes = hexToBytes(voto.firma_ed25519);
      firmaOk = await crypto.subtle.verify(
        "Ed25519",
        pubKey,
        firmaBytes,
        new TextEncoder().encode(hashRecalc),
      );
    } catch (e) {
      firmaOk = false;
    }

    return { hashOk, firmaOk, valido: hashOk && firmaOk };
  }

  // ── Calcular resultados de una propuesta ───────────────────
  async resultados(idPropuesta, opciones) {
    if (!this.db.isOpen()) await this.init();
    const votos = await this.votosDe(idPropuesta);

    const conteo = {};
    for (const op of opciones) conteo[op] = 0;

    for (const v of votos) {
      if (conteo[v.opcion_elegida] !== undefined) {
        conteo[v.opcion_elegida]++;
      }
    }

    const total = votos.length;
    const ganadora = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0];

    return {
      total_votos: total,
      conteo,
      ganadora: ganadora ? ganadora[0] : null,
      votos_ganadora: ganadora ? ganadora[1] : 0,
      porcentaje_ganadora:
        total > 0 ? Math.round((ganadora[1] / total) * 100) : 0,
      votos: votos,
    };
  }

  // ── Listar todos los votos ─────────────────────────────────
  async listar() {
    if (!this.db.isOpen()) await this.init();
    return await this.db.votos.toArray();
  }

  exportar() {
    if (!this.votoActual) throw new Error("No hay voto para exportar.");
    return new Blob([JSON.stringify(this.votoActual, null, 2)], {
      type: "application/json",
    });
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map((h) => parseInt(h, 16)));
}
