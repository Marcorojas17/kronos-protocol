// ────────────────────────────────────────────────────────────
// KRONOS PROTOCOL · Capa 6 · Exportación de Auditoría
// Paquete cifrado + firmado · Para entrega a auditores técnicos
// Autor: Marco Antonio Rojas Valdovinos · Toluca, México · 2026
// Dependencias: CERO (WebCrypto API nativa)
// ────────────────────────────────────────────────────────────

export class KronosExportVault {
  constructor(core = null) {
    this.core = core;                       // CriptoCore (para firma del exportador)
    this.SALT_LENGTH = 16;
    this.IV_LENGTH = 12;
    this.PBKDF2_ITERATIONS = 600000;        // NIST SP 800-132 (2026)
    this.PROTOCOL_VERSION = "0.1";          // alineado con estado real del repo
  }

  // ── Utilidades internas ──────────────────────────────────
  static async _sha256Hex(bytes) {
    const buf = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(buf)]
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  static _hexToBytes(hex) {
    const h = hex.replace(/^0x/, "");
    return new Uint8Array(h.match(/.{1,2}/g).map(b => parseInt(b, 16)));
  }

  static _bytesToHex(bytes) {
    return [...new Uint8Array(bytes)]
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // ── Derivación de llave (PBKDF2 → AES-GCM-256) ───────────
  async _deriveKey(password, salt) {
    const enc = new TextEncoder();
    const baseKey = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    return await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: this.PBKDF2_ITERATIONS,
        hash: "SHA-256"
      },
      baseKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  // ── Construcción del payload común ───────────────────────
  _buildAuditPayload(agentChain, agentPublicKeyHex, agentName) {
    return {
      meta: "KRONOS_AUDIT_PACKAGE",
      protocol_version: this.PROTOCOL_VERSION,
      generated_at: new Date().toISOString(),
      agent: {
        name: agentName,
        public_key_hex: agentPublicKeyHex,
        algorithm: "Ed25519",
        hash_algorithm: "SHA-256"
      },
      chain: {
        total_blocks: agentChain.length,
        blocks: agentChain
      }
    };
  }

  // ── Firma del paquete con la llave del exportador ────────
  async _signPackage(payloadBytes) {
    if (!this.core || !this.core.inicializado || !this.core.clavePrivEd) {
      return null;   // sin firma si no hay core disponible
    }
    const hashHex = await KronosExportVault._sha256Hex(payloadBytes);
    const firmaBuf = await crypto.subtle.sign(
      "Ed25519",
      this.core.clavePrivEd,
      new TextEncoder().encode(hashHex)
    );
    return {
      firmante_clave_publica: this.core.clavePublicaHex || null,
      hash_payload: hashHex,
      firma_ed25519: KronosExportVault._bytesToHex(firmaBuf)
    };
  }

  // ══════════════════════════════════════════════════════════
  //  MÉTODO 1 · Exportación en texto plano (para auditoría local)
  // ══════════════════════════════════════════════════════════
  async exportPlainAuditPackage(agentChain, agentPublicKeyHex, agentName = "Agente") {
    const payload = this._buildAuditPayload(agentChain, agentPublicKeyHex, agentName);
    const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
    const sello = await this._signPackage(payloadBytes);

    const finalDoc = {
      meta: "KRONOS_AUDIT_PACKAGE_PLAIN",
      protocol_version: this.PROTOCOL_VERSION,
      encrypted: false,
      payload,
      sello_exportador: sello
    };

    const blob = new Blob(
      [JSON.stringify(finalDoc, null, 2)],
      { type: "application/json" }
    );
    return { blob, filename: `kronos-auditoria-plana-${Date.now()}.json` };
  }

  // ══════════════════════════════════════════════════════════
  //  MÉTODO 2 · Exportación cifrada (para transporte seguro)
  // ══════════════════════════════════════════════════════════
  async exportEncryptedAuditPackage(
    agentChain,
    agentPublicKeyHex,
    agentName,
    masterPassword
  ) {
    if (typeof masterPassword !== "string" || masterPassword.length < 12) {
      throw new Error("Contraseña maestra mínima: 12 caracteres.");
    }

    // 1. Construir payload completo (incluye llave pública del agente)
    const payload = this._buildAuditPayload(agentChain, agentPublicKeyHex, agentName);
    const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));

    // 2. Sello del exportador ANTES de cifrar (queda dentro del sobre cifrado)
    const selloExportador = await this._signPackage(payloadBytes);

    // 3. Generar salt + IV aleatorios
    const salt = crypto.getRandomValues(new Uint8Array(this.SALT_LENGTH));
    const iv = crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));

    // 4. Derivar llave y cifrar
    const aesKey = await this._deriveKey(masterPassword, salt);
    const ciphertext = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      aesKey,
      payloadBytes
    );

    // 5. Hash del ciphertext (para detección de alteración del sobre)
    const ciphertextHex = KronosExportVault._bytesToHex(ciphertext);
    const ciphertextHash = await KronosExportVault._sha256Hex(
      new TextEncoder().encode(ciphertextHex)
    );

    // 6. Sobre cifrado con TODA la metadata criptográfica declarada
    const sobre = {
      meta: "KRONOS_AUDIT_PACKAGE_ENCRYPTED",
      protocol_version: this.PROTOCOL_VERSION,
      encrypted: true,
      generated_at: new Date().toISOString(),

      // Algoritmos declarados (para verificación futura)
      kdf: {
        name: "PBKDF2",
        hash: "SHA-256",
        iterations: this.PBKDF2_ITERATIONS,
        salt_hex: KronosExportVault._bytesToHex(salt)
      },
      cipher: {
        name: "AES-GCM",
        length: 256,
        iv_hex: KronosExportVault._bytesToHex(iv)
      },

      // Sello del exportador (fuera del sobre cifrado, para verificar antes de descifrar)
      sello_exportador: selloExportador,

      // Hash del ciphertext (integridad del sobre)
      ciphertext_hash_sha256: ciphertextHash,

      // Ciphertext
      ciphertext_hex: ciphertextHex
    };

    const blob = new Blob(
      [JSON.stringify(sobre, null, 2)],
      { type: "application/json" }
    );
    return { blob, filename: `kronos-auditoria-cifrada-${Date.now()}.json` };
  }

  // ══════════════════════════════════════════════════════════
  //  MÉTODO 3 · Importar y descifrar paquete (para el auditor)
  // ══════════════════════════════════════════════════════════
  async importEncryptedAuditPackage(sobreJson, masterPassword) {
    const sobre = typeof sobreJson === "string" ? JSON.parse(sobreJson) : sobreJson;

    if (sobre.meta !== "KRONOS_AUDIT_PACKAGE_ENCRYPTED") {
      throw new Error("El archivo no es un paquete cifrado de KRONOS.");
    }

    // 1. Verificar integridad del sobre
    const ciphertextCalc = await KronosExportVault._sha256Hex(
      new TextEncoder().encode(sobre.ciphertext_hex)
    );
    if (ciphertextCalc !== sobre.ciphertext_hash_sha256) {
      throw new Error("El ciphertext fue alterado. Hash no coincide.");
    }

    // 2. Reconstruir salt + IV
    const salt = KronosExportVault._hexToBytes(sobre.kdf.salt_hex);
    const iv = KronosExportVault._hexToBytes(sobre.cipher.iv_hex);

    // 3. Reconstruir llave y descifrar
    const aesKey = await this._deriveKey(masterPassword, salt);
    const ciphertextBytes = KronosExportVault._hexToBytes(sobre.ciphertext_hex);

    let plaintextBytes;
    try {
      plaintextBytes = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        aesKey,
        ciphertextBytes
      );
    } catch (e) {
      throw new Error("Contraseña incorrecta o paquete corrupto.");
    }

    // 4. Parsear payload
    const payload = JSON.parse(new TextDecoder().decode(plaintextBytes));

    // 5. Verificar sello del exportador (si existe)
    let selloValido = null;
    if (sobre.sello_exportador && sobre.sello_exportador.firma_ed25519) {
      selloValido = await this.verifyExportadorSeal(payload, sobre.sello_exportador);
    }

    return {
      payload,
      sello_exportador: sobre.sello_exportador,
      sello_valido: selloValido
    };
  }

  // ══════════════════════════════════════════════════════════
  //  MÉTODO 4 · Verificar sello del exportador
  // ══════════════════════════════════════════════════════════
  async verifyExportadorSeal(payload, sello) {
    if (!sello || !sello.firma_ed25519 || !sello.firmante_clave_publica) {
      return { valido: false, razon: "Sello incompleto" };
    }
    try {
      const pubBytes = KronosExportVault._hexToBytes(sello.firmante_clave_publica);
      const pubKey = await crypto.subtle.importKey(
        "raw",
        pubBytes,
        { name: "Ed25519" },
        false,
        ["verify"]
      );

      const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
      const hashHex = await KronosExportVault._sha256Hex(payloadBytes);

      if (hashHex !== sello.hash_payload) {
        return { valido: false, razon: "Hash del payload no coincide" };
      }

      const firmaBytes = KronosExportVault._hexToBytes(sello.firma_ed25519);
      const ok = await crypto.subtle.verify(
        "Ed25519",
        pubKey,
        firmaBytes,
        new TextEncoder().encode(hashHex)
      );
      return { valido: ok };
    } catch (e) {
      return { valido: false, razon: e.message };
    }
  }

  // ══════════════════════════════════════════════════════════
  //  MÉTODO 5 · Descargar blob (para usar desde HTML)
  // ══════════════════════════════════════════════════════════
  static downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}