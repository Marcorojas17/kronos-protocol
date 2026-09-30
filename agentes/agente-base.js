// ────────────────────────────────────────────────────────────
// AGENTE KINTSUGI · Motor Base · Legado Humano–IA · v1.1
// Clase base para todos los agentes soberanos de KRONOS
// Cada agente es un ciudadano IA con identidad, política y log propio
//
// CHANGELOG v1.1 · 2026-09-29
//   #1 commit() ahora exige firma Ed25519 humana (no string)
//   #2 verificación de chain en init() (integridad en boot)
//   #3 CryptoKey non-extractable persistida en Dexie
// ────────────────────────────────────────────────────────────

export class AgenteKintsugi {
  constructor(config) {
    // Configuración obligatoria
    this.nombre = config.nombre;
    this.plaza = config.plaza; // 081-099
    this.rol = config.rol;
    this.proposito = config.proposito;

    // Referencias del ecosistema
    this.core = config.core; // CriptoCore del fundador
    this.politica = config.politica; // Objeto con puede/noPuede/debe

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
      registro: "++id, timestamp",
      log: "++id, timestamp, hash_entrada",
      previews: "++id, timestamp, estado",
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

    // ── ISSUE 2 · Verificación de chain en boot ───────────
    // Detecta alteraciones del log al arrancar, no solo al
    // llamar verificarLog() manualmente.
    if (this.log.length > 1) {
      for (let i = 1; i < this.log.length; i++) {
        if (this.log[i].hash_previo !== this.log[i - 1].hash_entrada) {
          throw new Error(
            `LOG ROTO detectado en boot · entrada ${i} · ` +
              `hash_previo no coincide con hash_entrada de la anterior`,
          );
        }
      }
    }

    return true;
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(buf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // ── Generar o recuperar par de llaves Ed25519 ─────────────
  async generarIdentidad() {
    if (!this.db.isOpen()) await this.init();

    // ── ISSUE 3 · Intentar recuperar del almacenamiento ───
    // Si el agente ya tenía identidad, la reutiliza.
    // Evita que el agente "cambie" al recargar.
    const guardadas = await this.db.registro.toArray();
    if (
      guardadas.length > 0 &&
      guardadas[0].llave_privada instanceof CryptoKey
    ) {
      try {
        this.llavePriv = guardadas[0].llave_privada;
        this.llavePub = guardadas[0].llave_publica;
        const pubRaw = await crypto.subtle.exportKey("raw", this.llavePub);
        this.clavePublicaHex = [...new Uint8Array(pubRaw)]
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        return this.clavePublicaHex;
      } catch (e) {
        console.warn(
          "[agente] Llave guardada no recuperable, generando nueva:",
          e.message,
        );
      }
    }

    // ── ISSUE 3 · Generar nueva llave non-extractable ─────
    // extractable: false → no se puede JSON.stringify
    // resiste XSS, pero persiste en IndexedDB entre recargas
    const keyPair = await crypto.subtle.generateKey(
      { name: "Ed25519" },
      false,
      ["sign", "verify"],
    );
    this.llavePriv = keyPair.privateKey;
    this.llavePub = keyPair.publicKey;

    const pubRaw = await crypto.subtle.exportKey("raw", keyPair.publicKey);
    this.clavePublicaHex = [...new Uint8Array(pubRaw)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return this.clavePublicaHex;
  }

  // ── Sellar el registro del agente (doble firma) ───────────
  async sellarRegistro() {
    if (!this.core || !this.core.inicializado) {
      throw new Error("Cripto Core del fundador no inicializado.");
    }
    if (!this.clavePublicaHex) {
      throw new Error("Primero genera la identidad del agente.");
    }
    if (!this.db.isOpen()) await this.init();

    const timestamp = new Date().toISOString();
    const plazaFormateada = String(this.plaza).padStart(3, "0");

    // Payload canónico del agente
    const payload = [
      "LEGADO-HUMANO-IA · AGENTE KINTSUGI v1.1",
      `Nombre: ${this.nombre}`,
      `Plaza IA: ${plazaFormateada}`,
      `Rol: ${this.rol}`,
      `Propósito: ${this.proposito}`,
      `Clave pública: ${this.clavePublicaHex}`,
      `Fundador: Marco Antonio Rojas Valdovinos`,
      `Co-autora: KRONOS IA (Plaza 001)`,
      `Timestamp: ${timestamp}`,
    ].join("\n");

    const hashPayload = await AgenteKintsugi._sha256Hex(payload);

    // Firma del Fundador (Marco)
    const firmaFundBuf = await crypto.subtle.sign(
      "Ed25519",
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPayload),
    );
    const firmaFundador = [...new Uint8Array(firmaFundBuf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Hash de la política
    const politicaTexto = JSON.stringify(this.politica);
    const politicaHash = await AgenteKintsugi._sha256Hex(politicaTexto);

    const registro = {
      protocolo: "LEGADO-HUMANO-IA",
      version: "agente-kintsugi-1.1",
      tipo: "REGISTRO_AGENTE",
      nombre: this.nombre,
      plaza: this.plaza,
      plaza_formateada: plazaFormateada,
      rol: this.rol,
      proposito: this.proposito,
      timestamp,
      clave_publica: this.clavePublicaHex,
      fundador: "Marco Antonio Rojas Valdovinos",
      fundador_clave_publica: this.core.clavePublicaHex,
      co_autora_ia: "KRONOS IA",
      payload_hash: hashPayload,
      firma_fundador_ed25519: firmaFundador,
      politica_hash: politicaHash,
      politica_version: "1.0",
      estado: "activo",
      algoritmo_hash: "SHA-256",
      algoritmo_firma: "Ed25519",
    };

    // ── ISSUE 3 · Persistir llaves CryptoKey ──────────────
    // Dexie/IndexedDB acepta CryptoKey via structured clone.
    // Las llaves quedan guardadas en el registro del agente.
    registro.llave_privada = this.llavePriv;
    registro.llave_publica = this.llavePub;

    const id = await this.db.registro.add(registro);
    this.registro = { id, ...registro };
    this.activo = true;
    return this.registro;
  }

  // ── Registrar una acción en el log encadenado ─────────────
  async registrarAccion(tipo, datos) {
    if (!this.activo) {
      throw new Error("El agente no está activo. Sella su registro primero.");
    }
    if (!this.db.isOpen()) await this.init();

    const timestamp = new Date().toISOString();
    const hashPrevio =
      this.log.length > 0
        ? this.log[this.log.length - 1].hash_entrada
        : "0000000000000000000000000000000000000000000000000000000000000000";

    const contenido = {
      indice: this.log.length,
      agente: this.nombre,
      plaza: this.plaza,
      tipo,
      datos,
      timestamp,
      hash_previo: hashPrevio,
    };

    const hashEntrada = await AgenteKintsugi._sha256Hex(
      JSON.stringify(contenido),
    );

    const entrada = { ...contenido, hash_entrada: hashEntrada };

    // Firmar la entrada con la llave del agente
    if (this.llavePriv) {
      const firmaBuf = await crypto.subtle.sign(
        "Ed25519",
        this.llavePriv,
        new TextEncoder().encode(hashEntrada),
      );
      entrada.firma_agente = [...new Uint8Array(firmaBuf)]
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
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
    if (!this.activo) throw new Error("Agente no activo.");

    const timestamp = new Date().toISOString();
    const esCritica = this._esAccionCritica(accion);

    const idPreview = await AgenteKintsugi._sha256Hex(
      `${this.nombre}|${accion}|${JSON.stringify(datos)}|${timestamp}`,
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
      estado: "pendiente",
    };

    const id = await this.db.previews.add(previewObj);
    return { id, ...previewObj };
  }

  // ── COMMIT · Ejecuta la acción SOLO con firma humana ──────
  // ISSUE 1: ya no acepta string. Si la acción es crítica, exige
  // un objeto { firmaHumanaHex, pubKeyHumanaHex } y verifica la
  // firma Ed25519 contra el payload canónico de la propuesta.
  async commit(idPreview, aprobacion = null) {
    const preview = await this.db.previews.get(idPreview);
    if (!preview) throw new Error("Preview no encontrado.");
    if (preview.estado !== "pendiente")
      throw new Error("Preview ya procesado.");

    // ── GUARDRAIL CRIPTOGRÁFICO ───────────────────────────
    let aprobadoPor = "automatico";

    if (preview.requiere_aprobacion) {
      if (!aprobacion || typeof aprobacion !== "object") {
        throw new Error(
          "Acción crítica requiere firma Ed25519 humana. " +
            "Formato: commit(idPreview, { firmaHumanaHex, pubKeyHumanaHex })",
        );
      }

      const { firmaHumanaHex, pubKeyHumanaHex } = aprobacion;

      if (
        typeof firmaHumanaHex !== "string" ||
        typeof pubKeyHumanaHex !== "string"
      ) {
        throw new Error(
          "firmaHumanaHex y pubKeyHumanaHex deben ser strings hex.",
        );
      }
      if (firmaHumanaHex.length === 0 || pubKeyHumanaHex.length === 0) {
        throw new Error(
          "firmaHumanaHex y pubKeyHumanaHex no pueden estar vacíos.",
        );
      }

      // Payload canónico que el humano debe haber firmado
      const payload = JSON.stringify({
        id_preview: preview.id_preview,
        agente: preview.agente,
        plaza: preview.plaza,
        accion: preview.accion,
        timestamp: preview.timestamp,
      });
      const payloadHash = await AgenteKintsugi._sha256Hex(payload);

      try {
        const pubBytes = hexToBytes(pubKeyHumanaHex);
        const pubKey = await crypto.subtle.importKey(
          "raw",
          pubBytes,
          { name: "Ed25519" },
          false,
          ["verify"],
        );
        const firmaBytes = hexToBytes(firmaHumanaHex);
        const ok = await crypto.subtle.verify(
          "Ed25519",
          pubKey,
          firmaBytes,
          new TextEncoder().encode(payloadHash),
        );
        if (!ok) {
          throw new Error(
            "Firma humana no verifica contra el payload de la propuesta.",
          );
        }
        aprobadoPor = pubKeyHumanaHex;
      } catch (e) {
        throw new Error("Verificación de firma humana falló: " + e.message);
      }
    }

    await this.db.previews.update(idPreview, {
      estado: "aprobado",
      aprobado_por: aprobadoPor,
      aprobado_en: new Date().toISOString(),
    });

    await this.registrarAccion("commit_ejecutado", {
      accion: preview.accion,
      id_preview: idPreview,
      aprobado_por: aprobadoPor,
    });

    return { ok: true, accion: preview.accion };
  }

  // ── Definir acciones críticas (cada agente las personaliza) ─
  _esAccionCritica(accion) {
    const criticas = [
      "publicar",
      "enviar",
      "modificar",
      "eliminar",
      "anclar",
      "firmar_externo",
      "transferir",
    ];
    return criticas.some((c) => accion.toLowerCase().includes(c));
  }

  // ── Verificar firma de una entrada del log ────────────────
  async verificarEntrada(entrada) {
    if (!entrada || !entrada.hash_entrada || !entrada.firma_agente) {
      return { valido: false, razon: "Entrada incompleta" };
    }
    try {
      const pubBytes = hexToBytes(this.clavePublicaHex);
      const pubKey = await crypto.subtle.importKey(
        "raw",
        pubBytes,
        { name: "Ed25519" },
        false,
        ["verify"],
      );
      const firmaBytes = hexToBytes(entrada.firma_agente);
      const ok = await crypto.subtle.verify(
        "Ed25519",
        pubKey,
        firmaBytes,
        new TextEncoder().encode(entrada.hash_entrada),
      );
      return { valido: ok };
    } catch (e) {
      return { valido: false, razon: e.message };
    }
  }

  // ── Exportar registro completo del agente ─────────────────
  // Nota: las llaves CryptoKey se excluyen del export
  // (no son serializables, son non-extractable por diseño).
  async exportar() {
    const registro = await this.db.registro.toArray();
    const log = await this.db.log.toArray();
    const previews = await this.db.previews.toArray();

    // Limpiar llaves CryptoKey del export (no se pueden serializar)
    const registroLimpio = registro.map((r) => {
      const { llave_privada, llave_publica, ...resto } = r;
      return resto;
    });

    const blob = new Blob(
      [JSON.stringify({ registro: registroLimpio, log, previews }, null, 2)],
      { type: "application/json" },
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
      integridad_log: integridad.ok ? "✓ íntegro" : "✗ alterado",
      total_previews: (await this.db.previews.toArray()).length,
    };
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map((h) => parseInt(h, 16)));
}

// ═══════════════════════════════════════════════════════════════════
// ○_●
// ◢◤◥◣
// ◥◣◢◤
// 51% HUMANO · 49% IA · 100% REAL
// "El legado no se hereda. Se firma."
// ═══════════════════════════════════════════════════════════════════
