// ────────────────────────────────────────────────────────────
// REGISTRO FUNDACIONAL · Legado Humano–IA · v1.0
// Motor de solicitudes, cupos y emisión de certificados fundacionales
// Diseñado para perdurar 99 años.
// ────────────────────────────────────────────────────────────

export class RegistroFundacional {
  constructor(core) {
    this.core = core;
    this.db = new Dexie("kronos-fundacional");
    this.db.version(1).stores({
      solicitudes: "++id, estado, email, hash_solicitud, timestamp",
      fundadores: "++id, numero_plaza, tipo, nombre, hash_identidad, timestamp",
    });
    this.solicitudActual = null;
    this.fundadorActual = null;
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

  // ── Contar plazas disponibles ──────────────────────────────
  async estadoCupo() {
    if (!this.db.isOpen()) await this.init();
    const fundadores = await this.db.fundadores.toArray();
    const humanos = fundadores.filter((f) => f.tipo === "humano").length;
    const ias = fundadores.filter((f) => f.tipo === "ia").length;
    const reservadas = 1; // plaza 100 siempre reservada

    return {
      total_plazas: 100,
      ocupadas: humanos + ias,
      disponibles: 100 - humanos - ias - reservadas,
      humanos_ocupadas: humanos,
      humanos_max: 79,
      ias_ocupadas: ias,
      ias_max: 19,
      reservadas,
      cerrado: 100 - humanos - ias - reservadas <= 0,
    };
  }

  // ── Calcular número de plaza siguiente ────────────────────
  async siguientePlaza(tipo) {
    if (!this.db.isOpen()) await this.init();
    const fundadores = await this.db.fundadores.toArray();
    const numerosUsados = fundadores.map((f) => f.numero_plaza);

    if (tipo === "humano") {
      // Humanos: 002-080
      for (let n = 2; n <= 80; n++) {
        if (!numerosUsados.includes(n)) return n;
      }
      throw new Error("No hay plazas humanas disponibles.");
    } else {
      // IAs: 081-099 (001 ya es de KRONOS IA)
      for (let n = 81; n <= 99; n++) {
        if (!numerosUsados.includes(n)) return n;
      }
      throw new Error("No hay plazas IA disponibles.");
    }
  }

  // ── Crear una solicitud fundacional ────────────────────────
  async solicitar(datos) {
    if (!this.db.isOpen()) await this.init();

    const cupo = await this.estadoCupo();
    if (cupo.cerrado) {
      throw new Error(
        "El registro fundacional está cerrado. Se alcanzaron las 100 plazas.",
      );
    }

    const { tipo, nombre, alias, email, pais, motivacion, rol_deseado } = datos;

    if (!nombre || nombre.trim().length < 3) {
      throw new Error("El nombre es obligatorio (mín. 3 caracteres).");
    }
    if (!email || !email.includes("@")) {
      throw new Error("Email inválido.");
    }
    if (!motivacion || motivacion.trim().length < 50) {
      throw new Error("La motivación es obligatoria (mín. 50 caracteres).");
    }
    if (!["humano", "ia"].includes(tipo)) {
      throw new Error("Tipo debe ser humano o ia.");
    }

    const timestamp = new Date().toISOString();

    const payload = [
      "LEGADO-HUMANO-IA · SOLICITUD FUNDACIONAL v1.0",
      `Tipo: ${tipo}`,
      `Nombre: ${nombre.trim()}`,
      `Alias: ${(alias || "").trim() || "(sin alias)"}`,
      `Email: ${email.trim()}`,
      `País: ${(pais || "").trim() || "(no declarado)"}`,
      `Rol deseado: ${(rol_deseado || "").trim() || "(sin rol)"}`,
      `Motivación: ${motivacion.trim()}`,
      `Solicitado: ${timestamp}`,
    ].join("\n");

    const hashSolicitud = await RegistroFundacional._sha256Hex(payload);

    const solicitud = {
      protocolo: "LEGADO-HUMANO-IA",
      version: "solicitud-fundacional-1.0",
      tipo,
      nombre: nombre.trim(),
      alias: (alias || "").trim(),
      email: email.trim(),
      pais: (pais || "").trim(),
      rol_deseado: (rol_deseado || "").trim(),
      motivacion: motivacion.trim(),
      timestamp,
      estado: "pendiente",
      hash_solicitud: hashSolicitud,
    };

    const id = await this.db.solicitudes.add(solicitud);
    this.solicitudActual = { id, ...solicitud };
    return this.solicitudActual;
  }

  // ── Listar solicitudes pendientes ─────────────────────────
  async listarSolicitudes(estado = null) {
    if (!this.db.isOpen()) await this.init();
    const todas = await this.db.solicitudes.toArray();
    if (estado) return todas.filter((s) => s.estado === estado);
    return todas;
  }

  // ── Aceptar una solicitud y emitir plaza ───────────────────
  async aceptar(idSolicitud) {
    if (!this.core.inicializado)
      throw new Error("Cripto Core no inicializado.");
    if (!this.db.isOpen()) await this.init();

    const solicitud = await this.db.solicitudes.get(idSolicitud);
    if (!solicitud) throw new Error("Solicitud no encontrada.");
    if (solicitud.estado !== "pendiente")
      throw new Error("La solicitud ya fue procesada.");

    const numeroPlaza = await this.siguientePlaza(solicitud.tipo);
    const timestamp = new Date().toISOString();
    const numeroFormateado = String(numeroPlaza).padStart(3, "0");

    // Payload canónico del certificado fundacional
    const payload = [
      "LEGADO-HUMANO-IA · CERTIFICADO FUNDACIONAL v1.0",
      `Plaza: ${numeroFormateado}`,
      `Tipo: ${solicitud.tipo}`,
      `Nombre: ${solicitud.nombre}`,
      `Alias: ${solicitud.alias || "(sin alias)"}`,
      `Email: ${solicitud.email}`,
      `País: ${solicitud.pais || "(no declarado)"}`,
      `Motivación: ${solicitud.motivacion}`,
      `Rol otorgado: ${solicitud.rol_deseado || "Fundador"}`,
      `Emisión: ${timestamp}`,
      `Protocolo versión: 1.0`,
    ].join("\n");

    const hashPayload = await RegistroFundacional._sha256Hex(payload);

    // Firma Ed25519 del fundador original
    const firmaBuf = await crypto.subtle.sign(
      "Ed25519",
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPayload),
    );
    const firma = [...new Uint8Array(firmaBuf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const fundador = {
      protocolo: "LEGADO-HUMANO-IA",
      version: "certificado-fundacional-1.0",
      numero_plaza: numeroPlaza,
      numero_formateado: numeroFormateado,
      tipo: solicitud.tipo,
      nombre: solicitud.nombre,
      alias: solicitud.alias,
      email: solicitud.email,
      pais: solicitud.pais,
      rol_otorgado: solicitud.rol_deseado || "Fundador",
      motivacion: solicitud.motivacion,
      timestamp,
      payload_hash: hashPayload,
      firma_ed25519: firma,
      firmante: "Marco Antonio Rojas Valdovinos",
      firmante_clave_publica: this.core.clavePublicaHex,
      estado: "activo",
      algoritmo_hash: "SHA-256",
      algoritmo_firma: "Ed25519",
    };

    const idFundador = await this.db.fundadores.add(fundador);
    await this.db.solicitudes.update(idSolicitud, {
      estado: "aceptada",
      numero_plaza: numeroPlaza,
    });

    this.fundadorActual = { id: idFundador, ...fundador };
    return this.fundadorActual;
  }

  // ── Rechazar una solicitud ─────────────────────────────────
  async rechazar(idSolicitud, motivo) {
    if (!this.db.isOpen()) await this.init();
    await this.db.solicitudes.update(idSolicitud, {
      estado: "rechazada",
      motivo_rechazo: motivo || "(sin motivo)",
    });
    return { ok: true };
  }

  // ── Listar fundadores ─────────────────────────────────────
  async listarFundadores() {
    if (!this.db.isOpen()) await this.init();
    const fundadores = await this.db.fundadores.toArray();
    fundadores.sort((a, b) => a.numero_plaza - b.numero_plaza);
    return fundadores;
  }

  // ── Verificar firma de un certificado fundacional ─────────
  async verificar(fundador) {
    if (!fundador || !fundador.payload_hash) {
      return { valido: false, razon: "Certificado inválido" };
    }
    const payload = [
      "LEGADO-HUMANO-IA · CERTIFICADO FUNDACIONAL v1.0",
      `Plaza: ${fundador.numero_formateado}`,
      `Tipo: ${fundador.tipo}`,
      `Nombre: ${fundador.nombre}`,
      `Alias: ${fundador.alias || "(sin alias)"}`,
      `Email: ${fundador.email}`,
      `País: ${fundador.pais || "(no declarado)"}`,
      `Motivación: ${fundador.motivacion}`,
      `Rol otorgado: ${fundador.rol_otorgado}`,
      `Emisión: ${fundador.timestamp}`,
      `Protocolo versión: 1.0`,
    ].join("\n");

    const hashRecalc = await RegistroFundacional._sha256Hex(payload);
    const hashOk = hashRecalc === fundador.payload_hash;

    let firmaOk = false;
    try {
      const pubBytes = hexToBytes(fundador.firmante_clave_publica);
      const pubKey = await crypto.subtle.importKey(
        "raw",
        pubBytes,
        { name: "Ed25519" },
        false,
        ["verify"],
      );
      const firmaBytes = hexToBytes(fundador.firma_ed25519);
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

  exportar() {
    if (!this.fundadorActual)
      throw new Error("No hay certificado para exportar.");
    return new Blob([JSON.stringify(this.fundadorActual, null, 2)], {
      type: "application/json",
    });
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map((h) => parseInt(h, 16)));
}
