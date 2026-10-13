/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CORE · ATRIBUCIÓN · RIGHTS MANAGER · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Gestiona derechos de autoría y licencias.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

export const LICENCIAS = [
  { id: 'LGU',      nombre: 'Licencia Global Única',   uso: 'comercial', requiere_permiso: true },
  { id: 'LGU-EDU',  nombre: 'LGU Educativa',           uso: 'educativo', requiere_permiso: false },
  { id: 'LGU-PERS', nombre: 'LGU Personal',            uso: 'personal',  requiere_permiso: false },
];

/**
 * Registra derechos sobre una obra.
 *
 * @param {object} opciones
 * @param {string} opciones.obra
 * @param {string} opciones.licencia
 * @param {string} opciones.titular
 * @returns {object}
 */
export function registrarDerechos({ obra, licencia, titular }) {
  const lic = LICENCIAS.find((l) => l.id === licencia);
  if (!lic) throw new Error(`[ XX ] Licencia desconocida: ${licencia}`);

  return {
    ok: true,
    obra,
    licencia: lic.id,
    titular,
    requiere_permiso: lic.requiere_permiso,
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };
}

export const meta = {
  rol: 'rights-manager',
  licencias: LICENCIAS,
  seal: SEAL,
};