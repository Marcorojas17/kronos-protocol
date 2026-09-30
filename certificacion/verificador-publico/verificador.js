// ────────────────────────────────────────────────────────────
// VERIFICADOR PÚBLICO · Legado Humano–IA · v1.0
// Verifica la integridad de archivos contra un manifest SHA-256
// ────────────────────────────────────────────────────────────

export class VerificadorManifest {
  constructor() {
    this.version = "1.0";
    this.manifest = null;
    this.resultados = [];
  }

  static async _sha256Hex(bytes) {
    const buf = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(buf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // ── Cargar manifest desde JSON string ─────────────────────
  cargarManifest(jsonString) {
    try {
      const m = JSON.parse(jsonString);
      if (!m.archivos || !Array.isArray(m.archivos)) {
        throw new Error("El manifest no tiene la estructura esperada.");
      }
      if (!m.hash_raiz) {
        throw new Error("El manifest no tiene hash_raiz.");
      }
      this.manifest = m;
      return { ok: true, total: m.archivos.length, hash_raiz: m.hash_raiz };
    } catch (e) {
      return { ok: false, razon: e.message };
    }
  }

  // ── Verificar un archivo ──────────────────────────────────
  async verificarArchivo(file) {
    if (!this.manifest) {
      throw new Error("No hay manifest cargado.");
    }

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const hashActual = await VerificadorManifest._sha256Hex(bytes);

    const entrada = this.manifest.archivos.find((a) => a.archivo === file.name);
    if (!entrada) {
      const r = {
        archivo: file.name,
        estado: "desconocido",
        razon: "Archivo no está en el manifest",
        hash_actual: hashActual,
      };
      this.resultados.push(r);
      return r;
    }

    const ok = hashActual === entrada.hash;
    const r = {
      archivo: file.name,
      estado: ok ? "verificado" : "alterado",
      hash_esperado: entrada.hash,
      hash_actual: hashActual,
      bytes: file.size,
    };
    this.resultados.push(r);
    return r;
  }

  // ── Verificar múltiples archivos ──────────────────────────
  async verificarVarios(files) {
    this.resultados = [];
    for (const file of files) {
      await this.verificarArchivo(file);
    }
    return this.resumen();
  }

  // ── Resumen de la verificación ────────────────────────────
  resumen() {
    const verificados = this.resultados.filter(
      (r) => r.estado === "verificado",
    ).length;
    const alterados = this.resultados.filter(
      (r) => r.estado === "alterado",
    ).length;
    const desconocidos = this.resultados.filter(
      (r) => r.estado === "desconocido",
    ).length;
    const total = this.resultados.length;

    return {
      total,
      verificados,
      alterados,
      desconocidos,
      ok: alterados === 0 && desconocidos === 0 && total > 0,
      resultados: this.resultados.slice(),
    };
  }

  // ── Verificar integridad del manifest en sí ───────────────
  async verificarHashRaiz() {
    if (!this.manifest) throw new Error("No hay manifest cargado.");

    const concatenado = this.manifest.archivos
      .slice()
      .sort((a, b) => a.archivo.localeCompare(b.archivo))
      .map((e) => `${e.archivo}:${e.hash}`)
      .join("\n");

    const hashRecalculado = await VerificadorManifest._sha256Hex(
      new TextEncoder().encode(concatenado),
    );

    return {
      ok: hashRecalculado === this.manifest.hash_raiz,
      hash_esperado: this.manifest.hash_raiz,
      hash_recalculado: hashRecalculado,
    };
  }

  limpiar() {
    this.manifest = null;
    this.resultados = [];
  }
}
