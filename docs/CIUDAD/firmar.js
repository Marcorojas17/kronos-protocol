// ────────────────────────────────────────────────────────────
// FIRMADOR FUNDACIONAL · Legado Humano–IA · v1.0
// Firma los 7 documentos fundacionales con Ed25519
// Calcula Merkle Root · Guarda acta · Exporta JSON
// Autor: Marco Antonio Rojas Valdovinos · Toluca, México · 2026
// Dependencias: CriptoCore (core.js) + Dexie + WebCrypto
// ────────────────────────────────────────────────────────────

export class FirmadorFundacional {
  constructor(core) {
    if (!core || !core.inicializado) {
      throw new Error('CriptoCore debe estar inicializado antes de firmar.');
    }
    this.core = core;
    this.documentosProcesados = [];
    this.acta = null;
    this.VERSION_PROTOCOLO = '0.1';
    this.VERSION_FIRMADOR = '1.0';
  }

  // ── Utilidades internas ──────────────────────────────────
  static async _sha256Hex(bytes) {
    const buf = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(buf)]
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  static _textoABytes(texto) {
    return new TextEncoder().encode(texto);
  }

  static _bytesToHex(bytes) {
    return [...new Uint8Array(bytes)]
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // ── Carga de documento desde URL ─────────────────────────
  async cargarDocumento(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`No se pudo cargar ${url} (status ${res.status}).`);
    }
    return await res.text();
  }

  // ── Extracción de artículos por regex ────────────────────
  // Soporta estos formatos:
  //   ### Artículo 1 · Título
  //   ## 1 · Título
  //   ### N · Título
  extraerArticulos(texto) {
    const regex = /^#{2,4}\s+(?:Artículo\s+)?(\d+)\s*(?:[·:]\s*(.+?))?\s*$/gm;
    const matches = [];
    let m;

    while ((m = regex.exec(texto)) !== null) {
      matches.push({
        numero: parseInt(m[1], 10),
        titulo: (m[2] || '').trim(),
        inicio: m.index,
        fin: null
      });
    }

    // Asignar el fin de cada artículo (inicio del siguiente)
    for (let i = 0; i < matches.length - 1; i++) {
      matches[i].fin = matches[i + 1].inicio;
    }
    if (matches.length > 0) {
      matches[matches.length - 1].fin = texto.length;
    }

    // Extraer el texto de cada artículo
    return matches.map(a => ({
      numero: a.numero,
      titulo: a.titulo,
      texto: texto.slice(a.inicio, a.fin).trim()
    }));
  }

  // ── Procesar un documento ────────────────────────────────
  async procesarDocumento(nombre, url) {
    const texto = await this.cargarDocumento(url);

    // Hash del documento completo
    const hashDocumento = await FirmadorFundacional._sha256Hex(
      FirmadorFundacional._textoABytes(texto)
    );

    // Extraer artículos
    let articulos = this.extraerArticulos(texto);

    // Fallback: si hay menos de 3 artículos detectados, tratar
    // el documento como una sola unidad
    if (articulos.length < 3) {
      articulos = [{
        numero: 0,
        titulo: '(documento completo)',
        texto
      }];
    }

    // Calcular hash individual por artículo
    const articulosConHash = [];
    for (const a of articulos) {
      const hashArticulo = await FirmadorFundacional._sha256Hex(
        FirmadorFundacional._textoABytes(a.texto)
      );
      articulosConHash.push({
        numero: a.numero,
        titulo: a.titulo,
        hash: hashArticulo,
        tamano_bytes: FirmadorFundacional._textoABytes(a.texto).length
      });
    }

    return {
      nombre,
      url,
      hash_documento: hashDocumento,
      tamano_bytes: FirmadorFundacional._textoABytes(texto).length,
      total_articulos: articulosConHash.length,
      articulos: articulosConHash
    };
  }

  // ── Construcción de Merkle Root ──────────────────────────
  // Algoritmo: concatenar hex[i] + hex[i+1], hashear.
  // Si el nivel tiene número impar, se duplica el último.
  async calcularMerkleRoot(hashes) {
    if (!Array.isArray(hashes) || hashes.length === 0) {
      throw new Error('Se necesita al menos un hash para construir el árbol.');
    }

    let nivel = [...hashes];
    const niveles = [nivel.slice()];

    while (nivel.length > 1) {
      // Duplicar último si es impar
      if (nivel.length % 2 === 1) {
        nivel = [...nivel, nivel[nivel.length - 1]];
      }
      const siguiente = [];
      for (let i = 0; i < nivel.length; i += 2) {
        const par = nivel[i] + nivel[i + 1];
        const hashPar = await FirmadorFundacional._sha256Hex(
          FirmadorFundacional._textoABytes(par)
        );
        siguiente.push(hashPar);
      }
      niveles.push(siguiente.slice());
      nivel = siguiente;
    }

    return {
      merkle_root: nivel[0],
      total_hojas: hashes.length,
      niveles: niveles.length
    };
  }

  // ── Firma del Merkle Root con la llave del fundador ──────
  async firmarMerkleRoot(merkleRoot) {
    if (!this.core.clavePrivEd) {
      throw new Error('El fundador no tiene llave privada Ed25519.');
    }

    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      FirmadorFundacional._textoABytes(merkleRoot)
    );

    return {
      firma_ed25519: FirmadorFundacional._bytesToHex(firmaBuf),
      firmante_clave_publica: this.core.clavePublicaHex,
      algoritmo_firma: 'Ed25519',
      mensaje_firmado: 'merkle_root_hex'
    };
  }

  // ── Verificar una firma contra una clave pública ─────────
  async verificarFirma(merkleRoot, firmaHex, clavePublicaHex) {
    try {
      const pubBytes = FirmadorFundacional._hexToBytes(clavePublicaHex);
      const pubKey = await crypto.subtle.importKey(
        'raw', pubBytes, { name: 'Ed25519' }, false, ['verify']
      );
      const firmaBytes = FirmadorFundacional._hexToBytes(firmaHex);
      const ok = await crypto.subtle.verify(
        'Ed25519',
        pubKey,
        firmaBytes,
        FirmadorFundacional._textoABytes(merkleRoot)
      );
      return { valido: ok };
    } catch (e) {
      return { valido: false, razon: e.message };
    }
  }

  static _hexToBytes(hex) {
    const h = hex.replace(/^0x/, '');
    if (h.length === 0) return new Uint8Array(0);
    if (h.length % 2 !== 0) throw new Error('Hex inválido: longitud impar.');
    return new Uint8Array(h.match(/.{1,2}/g).map(b => parseInt(b, 16)));
  }

  // ── Generar acta fundacional completa ────────────────────
  async generarActa(documentos, callbackProgreso = null) {
    const base = './';
    const docRefs = documentos || [
      { nombre: 'Constitución', url: `${base}CONSTITUCION.md` },
      { nombre: 'Carta de Derechos', url: `${base}DERECHOS.md` },
      { nombre: 'Código de Convivencia', url: `${base}CONVIVENCIA.md` },
      { nombre: 'Registro de Ciudadanía', url: `${base}CIUDADANOS.md` },
      { nombre: 'Visión Económica', url: `${base}MONEDA.md` },
      { nombre: 'Auditoría IA', url: `${base}AUDITORIA-IA.md` },
      { nombre: 'Guía para Auditores', url: `${base}GUIA-AUDITOR.md` }
    ];

    this.documentosProcesados = [];
    const todosLosHashes = [];

    for (let i = 0; i < docRefs.length; i++) {
      const doc = docRefs[i];
      if (callbackProgreso) {
        callbackProgreso({
          fase: 'documento',
          indice: i + 1,
          total: docRefs.length,
          nombre: doc.nombre
        });
      }

      const procesado = await this.procesarDocumento(doc.nombre, doc.url);
      this.documentosProcesados.push(procesado);
      todosLosHashes.push(procesado.hash_documento);
    }

    if (callbackProgreso) {
      callbackProgreso({ fase: 'merkle', mensaje: 'Calculando Merkle Root...' });
    }

    // Merkle Root de los hashes de documentos completos
    const merkleDocs = await this.calcularMerkleRoot(todosLosHashes);

    // Merkle Root de TODOS los artículos individuales (todos los documentos)
    const todosLosArticulos = this.documentosProcesados
      .flatMap(d => d.articulos.map(a => a.hash));
    const merkleArticulos = await this.calcularMerkleRoot(todosLosArticulos);

    if (callbackProgreso) {
      callbackProgreso({ fase: 'firma', mensaje: 'Firmando Merkle Root...' });
    }

    // Firmar
    const firma = await this.firmarMerkleRoot(merkleArticulos.merkle_root);

    // Timestamp
    const timestamp = new Date().toISOString();

    // Acta final
    this.acta = {
      meta: 'KRONOS_ACTA_FUNDACIONAL',
      protocolo: 'LEGADO-HUMANO-IA',
      version_protocolo: this.VERSION_PROTOCOLO,
      version_firmador: this.VERSION_FIRMADOR,
      tipo: 'FIRMA_DOCUMENTOS_FUNDACIONALES',
      timestamp,
      fundador: {
        nombre: 'Marco Antonio Rojas Valdovinos',
        email: 'marco.a.rojas.v@hotmail.com',
        clave_publica_hex: this.core.clavePublicaHex,
        algoritmo: 'Ed25519'
      },
      documentos: this.documentosProcesados.map(d => ({
        nombre: d.nombre,
        url: d.url,
        hash_documento: d.hash_documento,
        tamano_bytes: d.tamano_bytes,
        total_articulos: d.total_articulos,
        articulos: d.articulos
      })),
      merkle: {
        merkle_root_articulos: merkleArticulos.merkle_root,
        total_hojas_articulos: merkleArticulos.total_hojas,
        niveles_articulos: merkleArticulos.niveles,
        merkle_root_documentos: merkleDocs.merkle_root,
        total_hojas_documentos: merkleDocs.total_hojas
      },
      firma,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519',
      algoritmo_merkle: 'concatenación_hex + SHA-256 (duplicación de impar)',
      instruccion_verificacion: [
        '1. Recalcular SHA-256 de cada documento listado.',
        '2. Comparar con hash_documento declarado.',
        '3. Reconstruir Merkle Root de los hashes.',
        '4. Verificar firma Ed25519 contra clave pública del fundador.'
      ]
    };

    if (callbackProgreso) {
      callbackProgreso({ fase: 'completo', acta: this.acta });
    }

    return this.acta;
  }

  // ── Exportar acta como Blob descargable ──────────────────
  exportarActaComoBlob() {
    if (!this.acta) throw new Error('No hay acta generada.');
    const json = JSON.stringify(this.acta, null, 2);
    return new Blob([json], { type: 'application/json' });
  }

  // ── Descargar acta en navegador ──────────────────────────
  descargarActa(nombreArchivo = null) {
    if (typeof document === 'undefined') {
      throw new Error('descargarActa solo funciona en navegador.');
    }
    const blob = this.exportarActaComoBlob();
    const filename = nombreArchivo ||
      `kronos-acta-fundacional-${Date.now()}.json`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return filename;
  }

  // ── Verificar un acta completa ───────────────────────────
  async verificarActa(acta) {
    if (!acta || acta.meta !== 'KRONOS_ACTA_FUNDACIONAL') {
      return { valida: false, razon: 'No es un acta fundacional.' };
    }

    // 1. Verificar firma del Merkle Root
    const firmaOk = await this.verificarFirma(
      acta.merkle.merkle_root_articulos,
      acta.firma.firma_ed25519,
      acta.firma.firmante_clave_publica
    );

    if (!firmaOk.valido) {
      return { valida: false, razon: 'Firma del Merkle Root inválida.' };
    }

    // 2. Reconstruir Merkle Root desde los hashes declarados
    const todosLosHashes = acta.documentos
      .flatMap(d => d.articulos.map(a => a.hash));
    const merkleRecalculado = await this.calcularMerkleRoot(todosLosHashes);

    if (merkleRecalculado.merkle_root !== acta.merkle.merkle_root_articulos) {
      return {
        valida: false,
        razon: 'Merkle Root recalculado no coincide con el declarado.'
      };
    }

    return {
      valida: true,
      mensaje: 'Acta válida. Firma y Merkle Root coinciden.',
      firmante: acta.fundador.nombre,
      total_documentos: acta.documentos.length,
      total_articulos: merkleRecalculado.total_hojas
    };
  }
}