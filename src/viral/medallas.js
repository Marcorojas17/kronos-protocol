/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SRC · VIRAL · MEDALLAS · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Otorga medallas por hitos virales y de contribución.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

export const MEDALLAS = Object.freeze([
  { id: 'primer-firma',      nombre: 'Primera Firma',         requisito: '1 obra firmada' },
  { id: 'decima-obra',       nombre: 'Décima Obra',           requisito: '10 obras firmadas' },
  { id: 'centesima-obra',    nombre: 'Centésima Obra',        requisito: '100 obras firmadas' },
  { id: 'primer-ahijado',    nombre: 'Padrino',               requisito: '1 ahijado iniciado' },
  { id: 'decimo-ahijado',    nombre: 'Mentor',                requisito: '10 ahijados' },
  { id: 'primer-nodo',       nombre: 'Fundador de Nodo',      requisito: '1 nodo fundado' },
  { id: 'kintsugi',          nombre: 'KINTSUGI',              requisito: 'Reparación ejemplar' },
  { id: 'chispa',            nombre: 'Chispa',                requisito: 'Aporte técnico significativo' },
  { id: 'cronista',          nombre: 'Cronista',              requisito: 'Documentación ejemplar' },
  { id: 'auditor',           nombre: 'Auditor',               requisito: 'Detección de fraude' },
  { id: 'conector',          nombre: 'Conector',              requisito: '5+ nuevos miembros traídos' },
]);

/**
 * Otorga una medalla a un miembro.
 *
 * @param {object} opciones
 * @param {string} opciones.miembro
 * @param {string} opciones.medalla_id
 * @returns {object}
 */
export function otorgarMedalla({ miembro, medalla_id }) {
  const medalla = MEDALLAS.find((m) => m.id === medalla_id);
  if (!medalla) throw new Error(`[ XX ] Medalla desconocida: ${medalla_id}`);

  return {
    ok: true,
    miembro,
    medalla: medalla.nombre,
    requisito: medalla.requisito,
    otorgada_en: new Date().toISOString(),
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'viral-medallas',
  medallas: MEDALLAS,
  seal: SEAL,
};