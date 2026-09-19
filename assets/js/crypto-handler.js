/* ============================================================
   KRONOS PROTOCOL · crypto-handler.js
   Hashing SHA-256, generación de folios y certificados
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

  // ---------- Folio ----------
  function generarFolio() {
    const year = new Date().getFullYear();
    const rand = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    return `KR-${year}-${rand()}-${rand()}`;
  }

  // ---------- Storage ----------
  function getFolios() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }
  function setFolios(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
  function guardarFolio(folio) {
    const list = getFolios();
    list.unshift(folio);
    setFolios(list);
    return folio;
  }
  function buscarFolio(query) {
    if (!query) return null;
    const q = query.trim().toUpperCase();
    return getFolios().find(f =>
      f.folio.toUpperCase() === q ||
      f.hash.toLowerCase() === q.toLowerCase()
    ) || null;
  }

  // ---------- Crear registro ----------
  async function crearRegistro({ titulo, autor, tipo, licencia, descripcion, contenido }) {
    const folio = generarFolio();
    const timestamp = new Date().toISOString();
    const payload = JSON.stringify({ folio, titulo, autor, tipo, licencia, descripcion, contenido, timestamp });
    const hash = await sha256(payload);
    const registro = {
      folio, hash, titulo, autor, tipo, licencia,
      descripcion: descripcion || '',
      timestamp,
      verificaciones: 0
    };
    guardarFolio(registro);
    return registro;
  }

  // ---------- Verificación ----------
  function registrarVerificacion(folioId) {
    const list = getFolios();
    const idx = list.findIndex(f => f.folio === folioId);
    if (idx >= 0) {
      list[idx].verificaciones = (list[idx].verificaciones || 0) + 1;
      setFolios(list);
    }
  }

  // ---------- Certificado descargable ----------
  function descargarCertificado(registro) {
    const lineas = [
      '╔══════════════════════════════════════════════════════════╗',
      '║        CERTIFICADO DE REGISTRO · KRONOS PROTOCOL         ║',
      '╚══════════════════════════════════════════════════════════╝',
      '',
      `Folio:        ${registro.folio}`,
      `Hash SHA-256: ${registro.hash}`,
      `Título:       ${registro.titulo}`,
      `Autor:        ${registro.autor}`,
      `Tipo:         ${registro.tipo}`,
      `Licencia:     ${registro.licencia}`,
      `Fecha:        ${registro.timestamp}`,
      '',
      'Descripción:',
      registro.descripcion || '(sin descripción)',
      '',
      '──────────────────────────────────────────────────────────',
      'Verificable en: verify.html',
      'Safe Creative:  2607086319439',
      'Horizonte:      2099',
      'Licencia obra:  CC BY-NC-ND 4.0',
      '──────────────────────────────────────────────────────────'
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

  // ---------- Exportar ----------
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

  // ---------- API pública ----------
  global.KronosCrypto = {
    sha256, generarFolio, getFolios, guardarFolio, buscarFolio,
    crearRegistro, registrarVerificacion, descargarCertificado, exportarJSON
  };
})(window);