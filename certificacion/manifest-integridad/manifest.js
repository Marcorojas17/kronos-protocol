// ────────────────────────────────────────────────────────────
// MANIFEST DE INTEGRIDAD · Legado Humano–IA · v1.0
// Genera huellas SHA-256 de archivos para verificación pública
// ────────────────────────────────────────────────────────────

export class ManifestIntegridad {
  constructor() {
    this.version = "1.0";
    this.entradas = [];
    this.manifestActual = null;
  }

  static async _sha256Hex(bytes) {
    const buf = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(buf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // ── Calcular hash de un texto (archivo como string) ────────
  async hashTexto(nombreArchivo, contenidoTexto) {
    const bytes = new TextEncoder().encode(contenidoTexto);
    const hash = await ManifestIntegridad._sha256Hex(bytes);
    return {
      archivo: nombreArchivo,
      hash: hash,
      bytes: bytes.length,
      timestamp: new Date().toISOString(),
    };
  }

  // ── Calcular hash de un Blob/File (descarga real) ──────────
  async hashArchivo(file) {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const hash = await ManifestIntegridad._sha256Hex(bytes);
    return {
      archivo: file.name,
      hash: hash,
      bytes: file.size,
      timestamp: new Date().toISOString(),
    };
  }

  // ── Agregar una entrada al manifest ────────────────────────
  agregarEntrada(entrada) {
    this.entradas.push(entrada);
    return entrada;
  }

  // ── Agregar múltiples entradas ─────────────────────────────
  agregarEntradas(lista) {
    for (const e of lista) this.entradas.push(e);
    return this.entradas.length;
  }

  // ── Construir el manifest final ────────────────────────────
  async construir() {
    if (this.entradas.length === 0) {
      throw new Error("El manifest está vacío. Agrega al menos un archivo.");
    }

    // Ordenar alfabéticamente para reproducibilidad
    this.entradas.sort((a, b) => a.archivo.localeCompare(b.archivo));

    // Calcular hash raíz del conjunto (Merkle simple)
    const concatenado = this.entradas
      .map((e) => `${e.archivo}:${e.hash}`)
      .join("\n");
    const hashRaiz = await ManifestIntegridad._sha256Hex(
      new TextEncoder().encode(concatenado),
    );

    this.manifestActual = {
      protocolo: "LEGADO-HUMANO-IA",
      version: "manifest-integridad-1.0",
      tipo: "MANIFEST",
      timestamp: new Date().toISOString(),
      total_archivos: this.entradas.length,
      algoritmo_hash: "SHA-256",
      hash_raiz: hashRaiz,
      archivos: this.entradas.map((e) => ({
        archivo: e.archivo,
        hash: e.hash,
        bytes: e.bytes,
      })),
      firmante: "Marco Antonio Rojas Valdovinos",
      co_autoria_ia: "KRONOS IA",
    };

    return this.manifestActual;
  }

  // ── Verificar un archivo contra el manifest ────────────────
  async verificar(nombreArchivo, contenidoTexto) {
    if (!this.manifestActual) {
      throw new Error("No hay manifest construido.");
    }

    const entrada = this.manifestActual.archivos.find(
      (a) => a.archivo === nombreArchivo,
    );
    if (!entrada) {
      return { ok: false, razon: "Archivo no está en el manifest" };
    }

    const bytes = new TextEncoder().encode(contenidoTexto);
    const hashActual = await ManifestIntegridad._sha256Hex(bytes);

    return {
      ok: hashActual === entrada.hash,
      archivo: nombreArchivo,
      hash_esperado: entrada.hash,
      hash_actual: hashActual,
    };
  }

  // ── Exportar manifest como JSON ────────────────────────────
  exportar() {
    if (!this.manifestActual) throw new Error("No hay manifest para exportar.");
    return new Blob([JSON.stringify(this.manifestActual, null, 2)], {
      type: "application/json",
    });
  }

  // ── Listar entradas actuales ───────────────────────────────
  listar() {
    return this.entradas;
  }

  // ── Limpiar el manifest ────────────────────────────────────
  limpiar() {
    this.entradas = [];
    this.manifestActual = null;
  }
}
