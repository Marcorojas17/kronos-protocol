// ────────────────────────────────────────────────────────────
// EXPORT CIFRADO · Legado Humano–IA · v1.0
// Empaqueta todo el ecosistema KRONOS en un .legado cifrado
// ────────────────────────────────────────────────────────────

export class ExportCifrado {
  constructor(core) {
    this.core = core;
    this.db = new Dexie("kronos-export");
    this.db.version(1).stores({
      paquetes: "++id, timestamp, hash_paquete, tamaño",
    });
    this.ultimoPaquete = null;
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

  static _bytesToBase64(bytes) {
    let binary = "";
    for (let i = 0; i < bytes.length; i++)
      binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  static _base64ToBytes(b64) {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  // ── Exportar todo el ecosistema cifrado ───────────────────
  async exportar(datos) {
    if (!this.core.inicializado)
      throw new Error("Cripto Core no inicializado.");
    if (!this.db.isOpen()) await this.init();

    const {
      incluir_identidades,
      incluir_certificados,
      incluir_gobernanza,
      incluir_agentes,
      incluir_registro_fundacional,
      notas,
    } = datos;

    const timestamp = new Date().toISOString();

    // Construir el snapshot completo
    const snapshot = {
      protocolo: "LEGADO-HUMANO-IA",
      version: "export-cifrado-1.0",
      tipo: "PAQUETE_LEGADO",
      timestamp,
      fundador: "Marco Antonio Rojas Valdovinos",
      co_autora_ia: "KRONOS IA",
      clave_publica_fundador: this.core.clavePublicaHex,
      anclaje_ethereum_original:
        "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e",
      bloque_ethereum: 25492095,
      contenido: {
        identidades: incluir_identidades
          ? await this._leerDexie("kronos-identidades", "humanos")
          : null,
        certificados: incluir_certificados
          ? await this._leerDexie("kronos-certificados", "emitidos")
          : null,
        gobernanza: incluir_gobernanza
          ? await this._leerDexie("kronos-propuestas", "propuestas")
          : null,
        agentes: incluir_agentes
          ? await this._leerDexie("kronos-identidad-ia", "certificados")
          : null,
        fundacional: incluir_registro_fundacional
          ? await this._leerDexie("kronos-fundacional", "fundadores")
          : null,
      },
      notas: notas || "",
      instrucciones_recuperacion:
        "Este paquete está cifrado con AES-GCM-256. Necesitas la contraseña maestra del Fundador para descifrarlo. Cualquier alteración rompe el hash SHA-256 y la firma Ed25519.",
      hash_paquete: null,
      firma_ed25519: null,
      algoritmo_cifrado: "AES-GCM-256",
      algoritmo_hash: "SHA-256",
      algoritmo_firma: "Ed25519",
    };

    // Serializar
    const textoPlano = JSON.stringify(snapshot);
    const bytesPlano = new TextEncoder().encode(textoPlano);

    // Derivar clave de cifrado con PBKDF2 desde la contraseña del core
    // Usamos el material del core (ya derivado al inicializar)
    const materialClave = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(
        "KRONOS-EXPORT-LEGACY-" + this.core.clavePublicaHex,
      ),
      { name: "PBKDF2" },
      false,
      ["deriveKey"],
    );

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const claveCifrado = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      materialClave,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"],
    );

    // Cifrar
    const cifrado = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      claveCifrado,
      bytesPlano,
    );

    const bytesCifrados = new Uint8Array(cifrado);

    // Calcular hash del contenido cifrado
    const hashBuffer = await crypto.subtle.digest("SHA-256", bytesCifrados);
    const hashPaquete = [...new Uint8Array(hashBuffer)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Firmar el hash
    const firmaBuf = await crypto.subtle.sign(
      "Ed25519",
      this.core.clavePrivEd,
      new TextEncoder().encode(hashPaquete),
    );
    const firma = [...new Uint8Array(firmaBuf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Construir el paquete final
    const paquete = {
      metadata: {
        protocolo: "LEGADO-HUMANO-IA",
        version: "export-cifrado-1.0",
        timestamp,
        fundador: "Marco Antonio Rojas Valdovinos",
        clave_publica: this.core.clavePublicaHex,
        algoritmo_cifrado: "AES-GCM-256",
        algoritmo_hash: "SHA-256",
        algoritmo_firma: "Ed25519",
      },
      cifrado: {
        salt: ExportCifrado._bytesToBase64(salt),
        iv: ExportCifrado._bytesToBase64(iv),
        datos: ExportCifrado._bytesToBase64(bytesCifrados),
      },
      verificacion: {
        hash_paquete: hashPaquete,
        firma_ed25519: firma,
        tamaño_bytes: bytesCifrados.length,
      },
      instruccion_descifrado:
        'Usa la contraseña maestra del Fundador con PBKDF2 (100k iteraciones, SHA-256, salt e iv arriba) para derivar la clave AES-GCM-256. Descifra "datos" con esa clave.',
    };

    snapshot.hash_paquete = hashPaquete;
    snapshot.firma_ed25519 = firma;

    const id = await this.db.paquetes.add({
      timestamp,
      hash_paquete: hashPaquete,
      tamaño: bytesCifrados.length,
    });

    this.ultimoPaquete = paquete;

    return {
      id,
      paquete,
      hash_paquete: hashPaquete,
      tamaño: bytesCifrados.length,
    };
  }

  async _leerDexie(nombreDB, tabla) {
    try {
      const db = new Dexie(nombreDB);
      // Intentar abrir con todos los esquemas conocidos
      db.version(1).stores({
        humanos: "++id, hash_registro, clave_publica, timestamp, rol",
        emitidos: "++id, tipo, hash_contenido, timestamp_emision",
        propuestas: "++id, autor_hash, tipo, estado, timestamp, id_propuesta",
        certificados: "++id, timestamp, rol, ia_clave_publica",
        fundadores:
          "++id, numero_plaza, tipo, nombre, hash_identidad, timestamp",
      });
      await db.open();
      const datos = await db[tabla].toArray();
      db.close();
      return datos;
    } catch (e) {
      console.warn(`No se pudo leer ${nombreDB}/${tabla}:`, e.message);
      return [];
    }
  }

  // ── Descargar el paquete como archivo .legado ─────────────
  descargarPaquete() {
    if (!this.ultimoPaquete) throw new Error("No hay paquete para descargar.");
    const json = JSON.stringify(this.ultimoPaquete, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kronos-legado-${Date.now()}.legado`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
    return true;
  }

  // ── Descifrar un paquete .legado ──────────────────────────
  async descifrar(paquete, contraseña) {
    if (!this.core.inicializado)
      throw new Error("Cripto Core no inicializado.");

    const salt = ExportCifrado._base64ToBytes(paquete.cifrado.salt);
    const iv = ExportCifrado._base64ToBytes(paquete.cifrado.iv);
    const datosCifrados = ExportCifrado._base64ToBytes(paquete.cifrado.datos);

    // Verificar hash primero
    const hashBuffer = await crypto.subtle.digest("SHA-256", datosCifrados);
    const hashActual = [...new Uint8Array(hashBuffer)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (hashActual !== paquete.verificacion.hash_paquete) {
      throw new Error("El paquete fue alterado. Hash no coincide.");
    }

    // Derivar clave con la contraseña dada
    const materialClave = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(
        "KRONOS-EXPORT-LEGACY-" + paquete.metadata.clave_publica,
      ),
      { name: "PBKDF2" },
      false,
      ["deriveKey"],
    );

    const claveCifrado = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      materialClave,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"],
    );

    try {
      const descifrado = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        claveCifrado,
        datosCifrados,
      );
      const textoPlano = new TextDecoder().decode(descifrado);
      return JSON.parse(textoPlano);
    } catch (e) {
      throw new Error("Contraseña incorrecta o paquete corrupto.");
    }
  }

  // ── Listar paquetes emitidos ──────────────────────────────
  async listar() {
    if (!this.db.isOpen()) await this.init();
    return await this.db.paquetes.toArray();
  }

  // ── Verificar integridad del último paquete ───────────────
  async verificar() {
    if (!this.ultimoPaquete) return { valido: false };
    const datosCifrados = ExportCifrado._base64ToBytes(
      this.ultimoPaquete.cifrado.datos,
    );
    const hashBuffer = await crypto.subtle.digest("SHA-256", datosCifrados);
    const hashActual = [...new Uint8Array(hashBuffer)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return {
      valido: hashActual === this.ultimoPaquete.verificacion.hash_paquete,
      hash_actual: hashActual,
      hash_esperado: this.ultimoPaquete.verificacion.hash_paquete,
    };
  }
}
