/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ PROVENANCE · WATERMARKING · VISIBLE · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Marca visible con sello ◯_● · 51/49/100 y hash de contenido.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

/**
 * Genera una marca visible canónica.
 *
 * @param {object} opciones
 * @param {string} opciones.autor
 * @param {string} opciones.hash
 * @param {string} [opciones.posicion='bottom-right']
 * @returns {object}
 */
export function generarMarcaVisible({ autor, hash, posicion = 'bottom-right' }) {
  const texto = `◯_● ${autor} · ${hash.slice(0, 16)} · ${SEAL}`;

  return {
    ok: true,
    tipo: 'visible',
    texto,
    posicion,
    opacidad: 0.85,
    estilo: {
      color: '#d4af37',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '11px',
      textShadow: '0 0 4px rgba(0,0,0,0.8)',
    },
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'watermark-visible',
  seal: SEAL,
};