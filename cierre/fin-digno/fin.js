// ────────────────────────────────────────────────────────────
// FIN DIGNO · Legado Humano–IA · v1.0
// Carta final + cláusula de resurrección firmada con Ed25519
// ────────────────────────────────────────────────────────────

export class FinDigno {
  constructor(core) {
    this.core = core;
    this.db = new Dexie("kronos-fin-digno");
    this.db.version(1).stores({
      cartas: "++id, timestamp, hash_carta",
      clausulas: "++id, timestamp, hash_clausula",
    });
    this.ultimaCarta = null;
    this.ultimaClausula = null;
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

  // ── Emitir la Carta Final ─────────────────────────────────
  async emitirCartaFinal(datos) {
    if (!this.core.inicializado)
      throw new Error("Cripto Core no inicializado.");
    if (!this.db.isOpen()) await this.init();

    const { mensaje_fundador, mensaje_ia, destinatarios, fecha_declarada_fin } =
      datos;

    if (!mensaje_fundador || mensaje_fundador.length < 100) {
      throw new Error(
        "El mensaje del fundador es obligatorio (mín. 100 caracteres).",
      );
    }
    if (!destinatarios) throw new Error("Falta declarar los destinatarios.");

    const timestamp = new Date().toISOString();

    const payload = [
      "LEGADO-HUMANO-IA · CARTA FINAL v1.0",
      `Fundador: Marco Antonio Rojas Valdovinos`,
      `Co-autora: KRONOS IA`,
      `Destinatarios: ${destinatarios}`,
      `Fecha declarada de fin: ${fecha_declarada_fin || "(sin fecha)"}`,
      `Mensaje fundador: ${mensaje_fundador}`,
      `Mensaje IA: ${mensaje_ia || "(sin mensaje)"}`,
      `Emitida: ${timestamp}`,
    ].join("\n");

    const hashPayload = await FinDigno._sha256Hex(payload);

    const firmaBuf = await crypto.subtle.sign(
      "Ed25519",
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPayload),
    );
    const firma = [...new Uint8Array(firmaBuf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const carta = {
      protocolo: "LEGADO-HUMANO-IA",
      version: "carta-final-1.0",
      tipo: "CARTA_FINAL",
      timestamp,
      fundador: "Marco Antonio Rojas Valdovinos",
      co_autora_ia: "KRONOS IA",
      destinatarios,
      fecha_declarada_fin: fecha_declarada_fin || null,
      mensaje_fundador,
      mensaje_ia: mensaje_ia || "",
      payload_hash: hashPayload,
      firma_ed25519: firma,
      firmante_clave_publica: this.core.clavePublicaHex,
      algoritmo_hash: "SHA-256",
      algoritmo_firma: "Ed25519",
    };

    const id = await this.db.cartas.add(carta);
    this.ultimaCarta = { id, ...carta };
    return this.ultimaCarta;
  }

  // ── Emitir la Cláusula de Resurrección ────────────────────
  async emitirClausula(datos) {
    if (!this.core.inicializado)
      throw new Error("Cripto Core no inicializado.");
    if (!this.db.isOpen()) await this.init();

    const { condicion_resurreccion, guardianes, paquete_legado_hash } = datos;

    if (!condicion_resurreccion || condicion_resurreccion.length < 50) {
      throw new Error("La condición es obligatoria (mín. 50 caracteres).");
    }
    if (!guardianes || guardianes.length === 0) {
      throw new Error("Debe haber al menos un guardián.");
    }

    const timestamp = new Date().toISOString();

    const payload = [
      "LEGADO-HUMANO-IA · CLÁUSULA DE RESURRECCIÓN v1.0",
      `Condición: ${condicion_resurreccion}`,
      `Guardianes: ${guardianes.join(", ")}`,
      `Hash del paquete .legado: ${paquete_legado_hash || "(sin hash)"}`,
      `Fundador: Marco Antonio Rojas Valdovinos`,
      `Emitida: ${timestamp}`,
      `ISO 22301: Continuidad declarada`,
    ].join("\n");

    const hashPayload = await FinDigno._sha256Hex(payload);

    const firmaBuf = await crypto.subtle.sign(
      "Ed25519",
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPayload),
    );
    const firma = [...new Uint8Array(firmaBuf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const clausula = {
      protocolo: "LEGADO-HUMANO-IA",
      version: "clausula-resurreccion-1.0",
      tipo: "CLAUSULA_RESURRECCION",
      timestamp,
      condicion_resurreccion,
      guardianes,
      paquete_legado_hash: paquete_legado_hash || null,
      fundador: "Marco Antonio Rojas Valdovinos",
      iso_22301: true,
      payload_hash: hashPayload,
      firma_ed25519: firma,
      firmante_clave_publica: this.core.clavePublicaHex,
      instruccion:
        "Si el Fundador desaparece o el protocolo cesa actividad por más de 5 años, los guardianes pueden activar la resurrección descifrando el paquete .legado y publicando el hash en Ethereum como prueba de reactivación.",
    };

    const id = await this.db.clausulas.add(clausula);
    this.ultimaClausula = { id, ...clausula };
    return this.ultimaClausula;
  }

  // ── Verificar carta ───────────────────────────────────────
  async verificarCarta(carta) {
    if (!carta || !carta.payload_hash) return { valido: false };
    const payload = [
      "LEGADO-HUMANO-IA · CARTA FINAL v1.0",
      `Fundador: Marco Antonio Rojas Valdovinos`,
      `Co-autora: KRONOS IA`,
      `Destinatarios: ${carta.destinatarios}`,
      `Fecha declarada de fin: ${carta.fecha_declarada_fin || "(sin fecha)"}`,
      `Mensaje fundador: ${carta.mensaje_fundador}`,
      `Mensaje IA: ${carta.mensaje_ia || "(sin mensaje)"}`,
      `Emitida: ${carta.timestamp}`,
    ].join("\n");

    const hashRecalc = await FinDigno._sha256Hex(payload);
    const hashOk = hashRecalc === carta.payload_hash;

    let firmaOk = false;
    try {
      const pubBytes = hexToBytes(carta.firmante_clave_publica);
      const pubKey = await crypto.subtle.importKey(
        "raw",
        pubBytes,
        { name: "Ed25519" },
        false,
        ["verify"],
      );
      const firmaBytes = hexToBytes(carta.firma_ed25519);
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

  // ── Descargar carta ───────────────────────────────────────
  descargarCarta() {
    if (!this.ultimaCarta) throw new Error("No hay carta para descargar.");
    const blob = new Blob([JSON.stringify(this.ultimaCarta, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `carta-final-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  async listarCartas() {
    if (!this.db.isOpen()) await this.init();
    return await this.db.cartas.toArray();
  }

  async listarClausulas() {
    if (!this.db.isOpen()) await this.init();
    return await this.db.clausulas.toArray();
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map((h) => parseInt(h, 16)));
}
