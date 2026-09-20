// ────────────────────────────────────────────────────────────
// EVIDENCE OS · Legado Humano–IA · v1.0
// Paquetes .evidence verificables · NOM-151-SCFI-2016
// ────────────────────────────────────────────────────────────

const DOMINIO_HMAC = 'LEGADO-HUMANO-IA-EVIDENCE-v1.0';

export class EvidenceOS {
  constructor(core, storage) {
    this.core = core;
    this.storage = storage;
    this.paqueteActual = null;
  }

  static async _sha256Hex(bytes) {
    const buf = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static async _hmacSha256(keyBytes, dataBytes) {
    const key = await crypto.subtle.importKey(
      'raw', keyBytes,
      { name: 'HMAC', hash: 'SHA-256' },
      false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, dataBytes);
    return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Sellar paquete .evidence ──────────────────────────────
  async sellar(datos) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    if (!datos.humano) throw new Error('Identidad humana requerida.');
    if (!datos.pactoIA) throw new Error('Pacto IA requerido.');
    if (!datos.contenidoBytes || datos.contenidoBytes.length === 0) {
      throw new Error('Contenido vacío.');
    }

    const timestamp = new Date().toISOString();

    // 1. Hash SHA-256 del contenido binario
    const hashSha256 = await EvidenceOS._sha256Hex(datos.contenidoBytes);

    // 2. ID único de evidencia
    const idRaw = await EvidenceOS._sha256Hex(
      new TextEncoder().encode(hashSha256 + timestamp + datos.humano.huella)
    );
    const idEvidencia = 'EV-' + idRaw.slice(0, 16).toUpperCase();

    // 3. HMAC-SHA256 del hash usando la clave pública del humano como clave
    const hmacSha256 = await EvidenceOS._hmacSha256(
      hexToBytes(datos.humano.huella).slice(0, 32),
      hexToBytes(hashSha256)
    );

    // 4. Payload canónico para firma Ed25519
    const payloadCanonico = [
      'LEGADO-HUMANO-IA · EVIDENCE v1.0',
      `ID: ${idEvidencia}`,
      `Timestamp: ${timestamp}`,
      `Archivo: ${datos.nombreArchivo}`,
      `Tipo MIME: ${datos.tipoMime}`,
      `Tamaño: ${datos.contenidoBytes.length} bytes`,
      `Tipo evidencia: ${datos.tipo}`,
      `Hash SHA-256: ${hashSha256}`,
      `HMAC: ${hmacSha256}`,
      `Declaración: ${datos.declaracion}`,
      `Notas: ${datos.notas || '(sin notas)'}`,
      `Firmante: ${datos.humano.nombre} (${datos.humano.alias})`,
      `Firmante huella: ${datos.humano.huella}`,
      `IA co-autora: ${datos.pactoIA.ia_nombre}`
    ].join('\n');

    const payloadHash = await EvidenceOS._sha256Hex(
      new TextEncoder().encode(payloadCanonico)
    );

    // 5. Firma Ed25519 con la clave del humano
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(payloadHash)
    );
    const firma = [...new Uint8Array(firmaBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    // 6. Sello temporal NOM-151 (simulado localmente; puede anclarse on-chain)
    const selloTemporal = {
      tipo: 'NOM-151-SCFI-2016',
      fecha: timestamp,
      emisor: 'LEGADO-HUMANO-IA',
      qtsa: 'Firmaprofesional B02',
      hash_sellado: payloadHash,
      metodo: 'local-first · verificable por anclaje posterior'
    };

    // 7. Paquete completo
    const paquete = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'evidence-1.0',
      tipo: 'paquete-evidence',
      id_evidencia: idEvidencia,
      timestamp,
      nombre_archivo: datos.nombreArchivo,
      tipo_mime: datos.tipoMime,
      tamano_bytes: datos.contenidoBytes.length,
      tipo_evidencia: datos.tipo,
      hash_sha256: hashSha256,
      hmac_sha256: hmacSha256,
      payload_hash: payloadHash,
      firma_ed25519: firma,
      sello_temporal: selloTemporal,
      firmante_nombre: datos.humano.nombre,
      firmante_alias: datos.humano.alias,
      firmante_huella: datos.humano.huella,
      ia_coautora: datos.pactoIA.ia_nombre,
      declaracion: datos.declaracion,
      notas: datos.notas || null,
      clave_publica: this.core.clavePublicaHex,
      algoritmo_hash: 'SHA-256',
      algoritmo_hmac: 'HMAC-SHA256',
      algoritmo_firma: 'Ed25519',
      norma: 'NOM-151-SCFI-2016',
      verificable_por_tercero: true,
      instruccion_verificacion: 'SHA-256(content) → hash_sha256. HMAC-SHA256(huella[0:32], hash_sha256) → hmac_sha256. SHA-256(payload canónico) → payload_hash. Verificar firma_ed25519 con clave_publica sobre payload_hash.'
    };

    // 8. Persistir cifrado
    await this.storage.guardar('evidence', {
      id_evidencia: idEvidencia,
      ...paquete
    });

    this.paqueteActual = paquete;
    return paquete;
  }

  // ── Verificar paquete ─────────────────────────────────────
  async verificar(paquete) {
    if (!paquete || paquete.tipo !== 'paquete-evidence') {
      throw new Error('No es un paquete .evidence válido.');
    }

    // 1. Reconstruir payload canónico
    const payloadCanonico = [
      'LEGADO-HUMANO-IA · EVIDENCE v1.0',
      `ID: ${paquete.id_evidencia}`,
      `Timestamp: ${paquete.timestamp}`,
      `Archivo: ${paquete.nombre_archivo}`,
      `Tipo MIME: ${paquete.tipo_mime}`,
      `Tamaño: ${paquete.tamano_bytes} bytes`,
      `Tipo evidencia: ${paquete.tipo_evidencia}`,
      `Hash SHA-256: ${paquete.hash_sha256}`,
      `HMAC: ${paquete.hmac_sha256}`,
      `Declaración: ${paquete.declaracion}`,
      `Notas: ${paquete.notas || '(sin notas)'}`,
      `Firmante: ${paquete.firmante_nombre} (${paquete.firmante_alias})`,
      `Firmante huella: ${paquete.firmante_huella}`,
      `IA co-autora: ${paquete.ia_coautora}`
    ].join('\n');

    const payloadHashCalc = await EvidenceOS._sha256Hex(
      new TextEncoder().encode(payloadCanonico)
    );

    if (payloadHashCalc !== paquete.payload_hash) return false;

    // 2. Verificar firma Ed25519
    const pubKey = await crypto.subtle.importKey(
      'raw',
      hexToBytes(paquete.clave_publica),
      { name: 'Ed25519' },
      false,
      ['verify']
    );

    const firmaOk = await crypto.subtle.verify(
      'Ed25519',
      pubKey,
      hexToBytes(paquete.firma_ed25519),
      new TextEncoder().encode(paquete.payload_hash)
    );

    return firmaOk;
  }

  // ── Verificar contra contenido original ───────────────────
  async verificarConContenido(paquete, contenidoBytes) {
    const hashCalc = await EvidenceOS._sha256Hex(contenidoBytes);
    return hashCalc === paquete.hash_sha256;
  }

  // ── Exportar como Blob .evidence ──────────────────────────
  exportarEvidence(paquete) {
    return new Blob([JSON.stringify(paquete, null, 2)], {
      type: 'application/octet-stream'
    });
  }

  // ── Recuperar paquete por ID ──────────────────────────────
  async recuperar(idEvidencia) {
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    const todos = await this.storage.listarPorTipo('evidence');
    return todos.find(p => p.payload?.id_evidencia === idEvidencia) || null;
  }

  // ── Listar todos los paquetes ─────────────────────────────
  async listar() {
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    return await this.storage.listarPorTipo('evidence');
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}