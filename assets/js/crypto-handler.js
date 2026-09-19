/* ============================================================
   KRONOS PROTOCOL · crypto-handler.js v4
   Descarga robusta multi-método + certificado ASCII premium
   ============================================================ */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'kronos_folios_v1';

  /* ============================================================
     SHA-256
     ============================================================ */
  async function sha256(texto) {
    const enc = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /* ============================================================
     Base64 (soporta UTF-8)
     ============================================================ */
  function b64encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  /* ============================================================
     DESCARGA ROBUSTA · 4 métodos en cascada
     ============================================================ */
  async function descargarArchivo(contenido, nombre, mime) {
    // MÉTODO 1: Blob + createObjectURL + a.download (el estándar)
    try {
      const blob = new Blob([contenido], { type: mime + ';charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = nombre;
      a.style.display = 'none';
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      // No revocar inmediatamente: algunos navegadores lo necesitan vivo un instante
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 1500);
      return { ok: true, metodo: 'blob' };
    } catch (e1) {
      console.warn('[Kronos] Método 1 (blob) falló:', e1);
    }

    // MÉTODO 2: Data URI
    try {
      const dataUri = 'data:' + mime + ';charset=utf-8;base64,' + b64encode(contenido);
      const a = document.createElement('a');
      a.href = dataUri;
      a.download = nombre;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return { ok: true, metodo: 'data-uri' };
    } catch (e2) {
      console.warn('[Kronos] Método 2 (data-uri) falló:', e2);
    }

    // MÉTODO 3: Web Share API (móviles modernos)
    try {
      if (navigator.canShare) {
        const file = new File([contenido], nombre, { type: mime });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: nombre,
            text: 'Certificado Kronos Protocol'
          });
          return { ok: true, metodo: 'share' };
        }
      }
    } catch (e3) {
      console.warn('[Kronos] Método 3 (share) falló:', e3);
    }

    // MÉTODO 4: Abrir en ventana nueva (fallback final)
    try {
      const blob = new Blob([contenido], { type: mime + ';charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const win = window.open(url, '_blank');
      if (win) {
        return { ok: true, metodo: 'nueva-ventana' };
      }
    } catch (e4) {
      console.warn('[Kronos] Método 4 (nueva ventana) falló:', e4);
    }

    return { ok: false, error: 'Todos los métodos de descarga fallaron' };
  }

  /* ============================================================
     Folio
     ============================================================ */
  function generarFolio() {
    const year = new Date().getFullYear();
    const rand = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    return `KR-${year}-${rand()}-${rand()}`;
  }

  /* ============================================================
     Payload canónico
     ============================================================ */
  function payloadCanonico(r) {
    return [
      r.folio, r.titulo, r.autor, r.tipo, r.licencia,
      r.descripcion || '', r.contenido || '', r.timestamp
    ].join('|');
  }

  /* ============================================================
     Storage
     ============================================================ */
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

  /* ============================================================
     Crear registro
     ============================================================ */
  async function crearRegistro({ titulo, autor, tipo, licencia, descripcion, contenido }) {
    const folio = generarFolio();
    const timestamp = new Date().toISOString();
    const base = {
      folio, titulo, autor, tipo, licencia,
      descripcion: descripcion || '', contenido: contenido || '', timestamp
    };
    const payload = payloadCanonico(base);
    const hash = await sha256(payload);
    const registro = {
      folio, hash, payload, titulo, autor, tipo, licencia,
      descripcion: base.descripcion, contenido: base.contenido, timestamp,
      verificaciones: 0, version: 'KRONOS-CERT-v4', algoritmo: 'SHA-256'
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

  /* ============================================================
     Construir objeto recibo (compartido entre TXT y JSON)
     ============================================================ */
  function construirRecibo(registro) {
    const payload = registro.payload || payloadCanonico(registro);
    return {
      version: registro.version || 'KRONOS-CERT-v4',
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

  /* ============================================================
     Helper: fecha legible
     ============================================================ */
  function fechaLegible(iso) {
    try {
      return new Date(iso).toLocaleString('es-MX', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    } catch { return iso; }
  }

  /* ============================================================
     CERTIFICADO TXT · formato ASCII premium
     ============================================================ */
  function construirCertificadoTXT(registro) {
    const recibo = construirRecibo(registro);
    const b64 = b64encode(JSON.stringify(recibo));
    const sep = '─'.repeat(74);
    const pad = ' ';

    // Helper para línea de caja
    const boxLine = (content) => {
      const c = '  ' + content;
      return '║' + c.padEnd(74) + '║';
    };

    const lineas = [
      '',
      '╔' + '═'.repeat(74) + '╗',
      '║' + ' '.repeat(74) + '║',
      boxLine('██╗  ██╗██████╗  ██████╗ ███╗   ██╗ ██████╗ ███████╗'),
      boxLine('██║ ██╔╝██╔══██╗██╔═══██╗████╗  ██║██╔═══██╗██╔════╝'),
      boxLine('█████╔╝ ██████╔╝██║   ██║██╔██╗ ██║██║   ██║███████╗'),
      boxLine('██╔═██╗ ██╔══██╗██║   ██║██║╚██╗██║██║   ██║╚════██║'),
      boxLine('██║  ██╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝███████║'),
      boxLine('╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝'),
      '║' + ' '.repeat(74) + '║',
      boxLine('C E R T I F I C A D O   D E   R E G I S T R O'),
      boxLine('Protocolo · ○_● · MMXXVI'),
      '║' + ' '.repeat(74) + '║',
      '╚' + '═'.repeat(74) + '╝',
      '',
      'Documento de prueba de autoría verificable. Registro de obra digital',
      'con sellado criptográfico SHA-256. Verificable sin terminal, sin consola,',
      'sin conexión a internet.',
      '',
      'Estado: EMITIDO · ÍNTEGRO · TRAZABLE',
      '',
      sep,
      '',
      '┌─[ 00 ]────────────────────────────────────────────────── IDENTIDAD ─┐',
      '│                                                                       │',
      `│  · Folio          ${registro.folio.padEnd(48)}│`,
      `│  · Algoritmo      SHA-256                                             │`,
      `│  · Versión        ${(registro.version || 'KRONOS-CERT-v4').padEnd(48)}│`,
      `│  · Emitido        ${fechaLegible(registro.timestamp).padEnd(48)}│`,
      `│  · Autor          ${registro.autor.padEnd(48)}│`,
      `│  · Título         ${registro.titulo.substring(0, 48).padEnd(48)}│`,
      `│  · Tipo           ${registro.tipo.padEnd(48)}│`,
      `│  · Licencia       ${registro.licencia.padEnd(48)}│`,
      '│                                                                       │',
      '└───────────────────────────────────────────────────────────────────────┘',
      '',
      sep,
      '',
      '┌─[ 01 ]─────────────────────────────────── HUELLA CRIPTOGRÁFICA ─┐',
      '│                                                                   │',
      '│  El siguiente hash SHA-256 (64 caracteres hexadecimales)          │',
      '│  representa la huella digital única de este registro.             │',
      '│                                                                   │',
      '│  ┌─────────────────────────────────────────────────────────────┐  │',
      `│  │ ${registro.hash.substring(0, 59).padEnd(59)} │  │`,
      `│  │ ${(registro.hash.substring(59) || '').padEnd(59)} │  │`,
      '│  └─────────────────────────────────────────────────────────────┘  │',
      '│                                                                   │',
      '│  Cualquier modificación del contenido alterará este hash.         │',
      '│                                                                   │',
      '└───────────────────────────────────────────────────────────────────┘',
      '',
      sep,
      '',
      '┌─[ 02 ]─────────────────────────────────────── PAYLOAD CANÓNICO ─┐',
      '│                                                                   │',
      '│  Cadena exacta que fue hasheada. Copia esta línea completa       │',
      '│  y aplícale SHA-256 con cualquier herramienta de tu confianza.    │',
      '│                                                                   │',
      '┌─────BEGIN-PAYLOAD─────────────────────────────────────────────────┐',
      registro.payload,
      '└─────END-PAYLOAD───────────────────────────────────────────────────┘',
      '│                                                                   │',
      '└───────────────────────────────────────────────────────────────────┘',
      '',
      sep,
      '',
      '┌─[ 03 ]─────────────────────────── VERIFICACIÓN SIN TERMINAL ─┐',
      '│                                                               │',
      '│  Método oficial (recomendado):                                │',
      '│                                                               │',
      '│    1. Abre esta URL en tu navegador:                          │',
      '│       https://marcorojas17.github.io/kronos-protocol/        │',
      '│       verificar-certificado.html                              │',
      '│                                                               │',
      '│    2. Arrastra ESTE archivo .txt al recuadro punteado.        │',
      '│                                                               │',
      '│    3. La página te dirá al instante si el certificado         │',
      '│       es auténtico (✓ verde) o fue alterado (✗ rojo).         │',
      '│                                                               │',
      '│  · La verificación es 100% local                              │',
      '│  · Tu archivo no se sube a ningún servidor                    │',
      '│  · No necesitas internet después de cargar la página          │',
      '│  · No necesitas instalar nada                                 │',
      '│                                                               │',
      '└───────────────────────────────────────────────────────────────┘',
      '',
      sep,
      '',
      '┌─[ 04 ]─────────────────────────────────────── TRAZABILIDAD ─┐',
      '│                                                              │',
      '│  · Safe Creative     2607086319439                           │',
      '│  · QTSA              Firmaprofesional B02 (eIDAS)            │',
      '│  · Anclaje           Ethereum Mainnet                        │',
      '│  · Horizonte         2099                                    │',
      '│  · Licencia obra     CC BY-NC-ND 4.0                         │',
      '│                                                              │',
      '└──────────────────────────────────────────────────────────────┘',
      '',
      sep,
      '',
      '┌─[ 05 ]───────────────────── BLOQUE TÉCNICO · NO MODIFICAR ─┐',
      '│                                                              │',
      '│  Recibo JSON codificado en Base64. Permite la verificación   │',
      '│  automática por la web sin necesidad de parsear el texto.    │',
      '│                                                              │',
      '┌─────BEGIN-KRONOS-JSON────────────────────────────────────────┐',
      b64,
      '└─────END-KRONOS-JSON──────────────────────────────────────────┘',
      '│                                                              │',
      '└──────────────────────────────────────────────────────────────┘',
      '',
      sep,
      '',
      '╔' + '═'.repeat(74) + '╗',
      '║' + ' '.repeat(74) + '║',
      boxLine('KRONOS PROTOCOL · ○_● · MMXXVI'),
      '║' + ' '.repeat(74) + '║',
      boxLine('La integridad es el único legado que'),
      boxLine('la eternidad no puede corromper.'),
      '║' + ' '.repeat(74) + '║',
      boxLine('© 2026 Marco Antonio Rojas Valdovinos'),
      '║' + ' '.repeat(74) + '║',
      '╚' + '═'.repeat(74) + '╝',
      '',
      '<!-- KRONOS CERTIFICATE · v4 · ' + registro.folio + ' -->',
      ''
    ];

    return lineas.join('\n');
  }

  /* ============================================================
     Descargar certificado .txt
     ============================================================ */
  async function descargarCertificado(registro) {
    const contenido = construirCertificadoTXT(registro);
    const nombre = `KRONOS-${registro.folio}.txt`;
    const res = await descargarArchivo(contenido, nombre, 'text/plain');
    if (!res.ok) {
      console.error('[Kronos] No se pudo descargar el certificado TXT');
      alert('No se pudo descargar el certificado. Intenta desde otro navegador.');
    }
    return res;
  }

  /* ============================================================
     Descargar recibo .json
     ============================================================ */
  async function descargarReciboJSON(registro) {
    const recibo = construirRecibo(registro);
    recibo.verificacion = {
      instrucciones: 'Abre https://marcorojas17.github.io/kronos-protocol/verificar-certificado.html y arrastra este archivo.',
      sin_internet: true,
      sin_terminal: true,
      sin_consola: true
    };
    const contenido = JSON.stringify(recibo, null, 2);
    const nombre = `KRONOS-${registro.folio}.json`;
    const res = await descargarArchivo(contenido, nombre, 'application/json');
    if (!res.ok) {
      console.error('[Kronos] No se pudo descargar el recibo JSON');
      alert('No se pudo descargar el recibo JSON. Intenta desde otro navegador.');
    }
    return res;
  }

  /* ============================================================
     Exportar todos los folios
     ============================================================ */
  async function exportarJSON() {
    const contenido = JSON.stringify(getFolios(), null, 2);
    const nombre = `kronos-folios-${Date.now()}.json`;
    return await descargarArchivo(contenido, nombre, 'application/json');
  }

  /* ============================================================
     API pública
     ============================================================ */
  global.KronosCrypto = {
    sha256, generarFolio, payloadCanonico,
    getFolios, guardarFolio, buscarFolio,
    crearRegistro, registrarVerificacion, verificarRegistroOffline,
    descargarCertificado, descargarReciboJSON, exportarJSON,
    construirCertificadoTXT, construirRecibo,
    descargarArchivo // expuesto por si lo necesitas en otros módulos
  };

  console.log('[Kronos] crypto-handler.js v4 cargado · descarga robusta');
})(window);