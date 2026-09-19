/* ============================================================
   KRONOS PROTOCOL · crypto-handler.js v3
   Certificado auto-verificable sin terminal
   ============================================================ */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'kronos_folios_v1';

  // ---------- SHA-256 ----------
  async function sha256(texto) {
    const enc = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // ---------- Base64 ----------
  function b64encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  // ---------- Folio ----------
  function generarFolio() {
    const year = new Date().getFullYear();
    const rand = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    return `KR-${year}-${rand()}-${rand()}`;
  }

  // ---------- Payload canónico ----------
  function payloadCanonico(r) {
    return [r.folio, r.titulo, r.autor, r.tipo, r.licencia,
            r.descripcion || '', r.contenido || '', r.timestamp].join('|');
  }

  // ---------- Storage ----------
  function getFolios() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }
  function setFolios(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
  function guardarFolio(folio) {
    const list = getFolios(); list.unshift(folio); setFolios(list); return folio;
  }
  function buscarFolio(query) {
    if (!query) return null;
    const q = query.trim().toUpperCase();
    return getFolios().find(f =>
      f.folio.toUpperCase() === q || f.hash.toLowerCase() === q.toLowerCase()
    ) || null;
  }

  // ---------- Crear registro ----------
  async function crearRegistro({ titulo, autor, tipo, licencia, descripcion, contenido }) {
    const folio = generarFolio();
    const timestamp = new Date().toISOString();
    const base = { folio, titulo, autor, tipo, licencia, descripcion: descripcion || '', contenido: contenido || '', timestamp };
    const payload = payloadCanonico(base);
    const hash = await sha256(payload);
    const registro = {
      folio, hash, payload, titulo, autor, tipo, licencia,
      descripcion: base.descripcion, contenido: base.contenido, timestamp,
      verificaciones: 0, version: 'KRONOS-CERT-v3', algoritmo: 'SHA-256'
    };
    guardarFolio(registro);
    return registro;
  }

  function registrarVerificacion(folioId) {
    const list = getFolios();
    const idx = list.findIndex(f => f.folio === folioId);
    if (idx >= 0) {
      list[idx].verificaciones = (list[idx].verificaciones || 0) + 1;
      setFolios(list);
    }
  }

  async function verificarRegistroOffline(registro) {
    const payload = registro.payload || payloadCanonico(registro);
    const recalculado = await sha256(payload);
    return { ok: recalculado === registro.hash, esperado: registro.hash, recalculado, payload };
  }

  // ---------- Construir objeto recibo (compartido) ----------
  function construirRecibo(registro) {
    const payload = registro.payload || payloadCanonico(registro);
    return {
      version: registro.version || 'KRONOS-CERT-v3',
      folio: registro.folio,
      algoritmo: registro.algoritmo || 'SHA-256',
      hash: registro.hash,
      payload: payload,
      timestamp: registro.timestamp,
      metadatos: {
        titulo: registro.titulo,
        autor: registro.autor,
        tipo: registro.tipo,
        licencia: registro.licencia,
        descripcion: registro.descripcion || ''
      },
      trazabilidad: {
        safe_creative: '2607086319439',
        qtsa: 'Firmaprofesional B02 (eIDAS)',
        horizonte: '2099',
        url_verificacion: 'https://marcorojas17.github.io/kronos-protocol/verificar-certificado.html'
      }
    };
  }

  // ---------- Certificado .txt ----------
  function descargarCertificado(registro) {
    const recibo = construirRecibo(registro);
    const b64 = b64encode(JSON.stringify(recibo));
    const sep = '─'.repeat(62);

    const lineas = [
      '╔══════════════════════════════════════════════════════════════╗',
      '║       CERTIFICADO DE REGISTRO · KRONOS PROTOCOL              ║',
      '║       Máxima seguridad · Trazabilidad · Offline              ║',
      '╚══════════════════════════════════════════════════════════════╝',
      '',
      '▶ IDENTIFICACIÓN',
      `  Folio:            ${registro.folio}`,
      `  Algoritmo:        SHA-256`,
      `  Versión:          ${registro.version || 'KRONOS-CERT-v3'}`,
      `  Fecha de emisión: ${registro.timestamp}`,
      '',
      '▶ AUTORÍA',
      `  Autor:            ${registro.autor}`,
      `  Título:           ${registro.titulo}`,
      `  Tipo:             ${registro.tipo}`,
      `  Licencia:         ${registro.licencia}`,
      '',
      '▶ INTEGRIDAD CRIPTOGRÁFICA',
      `  Hash del payload: ${registro.hash}`,
      '',
      '▶ VERIFICACIÓN SIN TERMINAL (SOLO NAVEGADOR)',
      '  1. Abre esta URL:',
      '     https://marcorojas17.github.io/kronos-protocol/verificar-certificado.html',
      '  2. Arrastra ESTE archivo .txt al recuadro punteado.',
      '  3. La página te dirá al instante si el certificado es auténtico.',
      '',
      '  La verificación es 100% local: tu archivo no se sube a ningún servidor.',
      '',
      '▶ TRAZABILIDAD EXTERNA',
      '  Safe Creative:    2607086319439',
      '  QTSA:             Firmaprofesional B02 (eIDAS)',
      '  Horizonte:        2099',
      '',
      '▶ BLOQUE TÉCNICO (NO MODIFICAR)',
      '  Este bloque permite la verificación automática por la web.',
      '  Contiene el recibo JSON codificado en Base64.',
      '',
      '─────BEGIN-KRONOS-JSON─────',
      b64,
      '─────END-KRONOS-JSON─────',
      '',
      '──────────────────────────────────────────────────────────────',
      'KRONOS PROTOCOL · v3.0 · Horizonte 2099',
      '© 2026 Marco Antonio Rojas Valdovinos',
      '──────────────────────────────────────────────────────────────'
    ].join('\n');

    const blob = new Blob([lineas], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KRONOS-${registro.folio}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // ---------- Recibo .json ----------
  function descargarReciboJSON(registro) {
    const recibo = construirRecibo(registro);
    recibo.verificacion = {
      instrucciones: 'Abre https://marcorojas17.github.io/kronos-protocol/verificar-certificado.html y arrastra este archivo.',
      sin_internet: true,
      sin_terminal: true
    };
    const blob = new Blob([JSON.stringify(recibo, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KRONOS-${registro.folio}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // ---------- Exportar todo ----------
  function exportarJSON() {
    const data = JSON.stringify(getFolios(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kronos-folios-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // ---------- API ----------
  global.KronosCrypto = {
    sha256, generarFolio, payloadCanonico,
    getFolios, guardarFolio, buscarFolio,
    crearRegistro, registrarVerificacion, verificarRegistroOffline,
    descargarCertificado, descargarReciboJSON, exportarJSON
  };

  console.log('[Kronos] crypto-handler.js v3 cargado');
})(window);