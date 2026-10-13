/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SRC · CORE · SELLO KINTSUGI · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Sello canónico del sistema. Se aplica a toda salida.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/src/core]
 *  └─$ node -e "import('./sello.js').then(m => console.log(m.Sello.aplicar('Hola')))"
 *     Hola
 *
 *     ◯_● · 51/49/100
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const CANON = '◯_●';
export const PACTO = '51/49/100';
export const MARCA = 'KINTSUGI';

export const Sello = Object.freeze({
  canon: CANON,
  pacto: PACTO,
  marca: MARCA,

  /** Texto completo canónico */
  texto: `${CANON} · ${PACTO}`,

  /** Aplica el sello al final de un texto */
  aplicar(texto) {
    return `${texto}\n\n${CANON} · ${PACTO}`;
  },

  /** Aplica el sello como objeto */
  objeto(extra = {}) {
    return { ...extra, sellado: `${CANON} · ${PACTO}` };
  },

  /** Verifica que un texto contiene el sello */
  contiene(texto) {
    return typeof texto === 'string' && texto.includes(`${CANON} · ${PACTO}`);
  },
});

export default Sello;