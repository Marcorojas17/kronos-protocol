// ────────────────────────────────────────────────────────────
// EXPORT CIFRADO · Legado Humano–IA · v1.0
// Paquete .legado cifrado, firmado y restaurable · ISO 22301
// ────────────────────────────────────────────────────────────

const TIPOS_CANONICOS = [
  'identidad-humana', 'identidad-ia', 'roles-permisos',
  'evidence', 'event-bus', 'router-registro', 'ritual-ejecucion',
  'genesis', 'filosofia', 'autoria', 'manifiesto'
];

export class ExportCifrado {
  constructor(core, storage) {
    this.core = core;
    this.storage = storage;
  }

  static async _sha256Hex(bytes) {
    const buf = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Inventario rápido ─────────────────────────────────────
  async inventario() {
    const inv = {};
    for (const t of TIPOS_CANONICOS) {
      try {
        const items = await this.storage.listarPorTipo(t);
        if (items.length > 0) inv[t] = items.length;
      } catch (e) { /* silencio */ }
    }
    // Añadir tipos extra detectados
    try {
      const todas = await this.storage.db.registros.toArray();
      const tipos = new Set(todas.map(r => r.tipo));
      for (const t of tipos) {
        if (!TIPOS_CANONICOS.includes(t)) {
          const count = todas.filter(r => r.tipo === t).length;
          if (count > 0) inv[t] = count;
        }
      }
    } catch (e) { /* silencio */ }
    return inv;
  }

  // ── Recolectar todo el ecosistema ─────────────────────────
  async _recolectar() {
    const todos = await this.storage.db.registros.toArray();
    // Agrupar por tipo
    const porTipo = {};
    for (const r of todos) {
      if (!porTipo[r.tipo]) porTipo[r.tipo] = [];
      porTipo[r.tipo].push(r);
    }
    return { todos, porTipo };
  }

  // ── Exportar paquete .legado cifrado ──────────────────────
  async exportar(humano) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    if (!humano) throw new Error('Identidad humana requerida.');

    const { porTipo, todos } = await this._recolectar();
    const timestamp = new Date().toISOString();

    // Payload del ecosistema (se cifra entero)
    const payloadEcosistema = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'legado-package-1.0',
      timestamp,
      fundador: humano.nombre,
      fundador_alias: humano.alias,
      fundador_huella: humano.huella,
      total_registros: todos.length,
      tipos: Object.keys(porTipo),
      datos: porTipo
    };

    const payloadTexto = JSON.stringify(payloadEcosistema);
    const payloadBytes = new TextEncoder().encode(payloadTexto);

    // Cifrar con AES-GCM usando la clave del Cripto Core
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cipherBuf = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.core.claveAES,
      payloadBytes
    );

    const cipherHex = [...new Uint8Array(cipherBuf)].map(b => b.toString(16).padStart(2, '0')).join('');
    const ivHex = [...iv].map(b => b.toString(16).padStart(2, '0')).join('');

    // Hash del cipher para manifiesto
    const cipherHash = await ExportCifrado._sha256Hex(cipherBuf);

    // Manifiesto público (sin datos sensibles)
    const manifiestoBase = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'legado-manifiesto-1.0',
      tipo: 'manifiesto-legado',
      timestamp,
      fundador: humano.nombre,
      fundador_alias: humano.alias,
      fundador_huella: humano.huella,
      total_registros: todos.length,
      tipos: Object.keys(porTipo).map(t => ({ tipo: t, cantidad: porTipo[t].length })),
      cipher_hash: cipherHash,
      iv: ivHex,
      algoritmo_cifrado: 'AES-GCM-256',
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519',
      norma: 'ISO 22301:2019 · continuidad del legado',
      instruccion_restauracion: 'Cargar el archivo .legado en el módulo cierre/export-cifrado con la misma contraseña maestra.'
    };

    // Hash del manifiesto
    const manifiestoTexto = JSON.stringify(manifiestoBase);
    const manifiestoHash = await ExportCifrado._sha256Hex(
      new TextEncoder().encode(manifiestoTexto)
    );

    // Firma Ed25519 del hash del manifiesto
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(manifiestoHash)
    );
    const firma = [...new Uint8Array(firmaBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    const manifiesto = {
      ...manifiestoBase,
      manifiesto_hash: manifiestoHash,
      firma_ed25519: firma,
      clave_publica: this.core.clavePublicaHex
    };

    // Paquete final
    const paquete = {
      manifiesto,
      cipher: cipherHex,
      iv: ivHex
    };

    const blob = new Blob([JSON.stringify(paquete, null, 2)], {
      type: 'application/octet-stream'
    });

    return { blob, manifiesto };
  }

  // ── Exportar solo manifiesto (sin datos) ──────────────────
  async exportarManifiesto(humano) {
    const { blob } = await this.exportar(humano);
    const texto = await blob.text();
    const paquete = JSON.parse(texto);
    const soloManifiesto = new Blob(
      [JSON.stringify(paquete.manifiesto, null, 2)],
      { type: 'application/json' }
    );
    return soloManifiesto;
  }

  // ── Restaurar paquete ─────────────────────────────────────
  async restaurar(paquete, modo) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!paquete.manifiesto || !paquete.cipher || !paquete.iv) {
      throw new Error('Paquete .legado inválido: faltan campos.');
    }

    // 1. Verificar manifiesto
    const { firma_ed25519, manifiesto_hash, clave_publica, ...manifiestoBase } = paquete.manifiesto;
    const manifiestoTexto = JSON.stringify(manifiestoBase);
    const manifiestoHashCalc = await ExportCifrado._sha256Hex(
      new TextEncoder().encode(manifiestoTexto)
    );
    const manifiesto_ok = manifiestoHashCalc === manifiesto_hash;

    // 2. Verificar firma
    let firma_ok = false;
    try {
      const pubKey = await crypto.subtle.importKey(
        'raw',
        hexToBytes(clave_publica),
        { name: 'Ed25519' },
        false,
        ['verify']
      );
      firma_ok = await crypto.subtle.verify(
        'Ed25519',
        pubKey,
        hexToBytes(firma_ed25519),
        new TextEncoder().encode(manifiesto_hash)
      );
    } catch (e) { firma_ok = false; }

    // 3. Descifrar payload
    let payload = null;
    try {
      const iv = hexToBytes(paquete.iv);
      const cipher = hexToBytes(paquete.cipher);
      const plainBuf = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        this.core.claveAES,
        cipher
      );
      payload = JSON.parse(new TextDecoder().decode(plainBuf));
    } catch (e) {
      throw new Error('No se pudo descifrar. Verifica la contraseña maestra.');
    }

    // 4. Modo verificar: solo retornar resultados
    if (modo === 'verificar') {
      return {
        manifiesto_ok,
        firma_ok,
        importados: 0,
        tipos: Object.keys(payload.datos || {}).length,
        payload
      };
    }

    // 5. Modo reemplazar: borrar todos los registros
    if (modo === 'reemplazar') {
      await this.storage.db.registros.clear();
    }

    // 6. Importar registros
    let importados = 0;
    const tiposSet = new Set();
    for (const [tipo, items] of Object.entries(payload.datos || {})) {
      tiposSet.add(tipo);
      for (const item of items) {
        try {
          // Reasignar id para evitar colisiones
          const copia = { ...item };
          delete copia.id;
          await this.storage.db.registros.add(copia);
          importados++;
        } catch (e) { /* silencio si duplicado */ }
      }
    }

    return {
      manifiesto_ok,
      firma_ok,
      importados,
      tipos: tiposSet.size
    };
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}