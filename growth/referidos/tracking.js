/* ═══════════════════════════════════════════════════════════════════════════ */
/*                                                                           */
/*   ▓▒░ TRACKING · REFERIDOS · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓          */
/*   ─────────────────────────────────────────────────────────────────────   */
/*   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  */
/*                                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ TRACKING DE REFERIDOS · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Sistema privacy-first de tracking de referidos.
 *  Sin cookies. Sin PII. Solo hashes cortos.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';
export const NODO = 'YHDRYH-92CE';
export const GENESIS = 'K28-M05-MN01-YHDRYH-92CE';

// ─── Generar código de referido (determinista) ─────────────────────
export function generarCodigo({ numeroFundador, hashPublico }) {
  const num = String(numeroFundador).padStart(4, '0');
  const hash = hashPublico.slice(0, 4).toUpperCase();
  return `◯_●-F${num}-${hash}`;
}

// ─── Parsear código ────────────────────────────────────────────────
export function parsearCodigo(codigo) {
  const match = codigo.match(/^◯_●-F(\d{4})-([A-F0-9]{4})$/);
  if (!match) return null;
  return {
    numeroFundador: parseInt(match[1], 10),
    hashCorto: match[2],
  };
}

// ─── Capturar referido en URL ──────────────────────────────────────
export function capturarReferido() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (!ref) return null;

  const parsed = parsearCodigo(ref);
  if (!parsed) return null;

  // Guardar en sessionStorage (no cookie, no persistent)
  sessionStorage.setItem('arkhe-ref', ref);
  sessionStorage.setItem('arkhe-ref-ts', Date.now().toString());

  return {
    ...parsed,
    codigo: ref,
    sellado: SEAL,
  };
}

// ─── Registrar referencia ──────────────────────────────────────────
export async function registrarReferencia({ codigo, nuevoMiembro }) {
  const parsed = parsearCodigo(codigo);
  if (!parsed) return { ok: false, error: 'Código inválido' };

  return {
    ok: true,
    referente: parsed,
    nuevoMiembro,
    fecha: new Date().toISOString(),
    hash: `sha3-512:PENDING-${Date.now()}`,
    sellado: SEAL,
    nodo: NODO,
    genesis: GENESIS,
  };
}

// ─── Auto-captura al cargar ────────────────────────────────────────
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const ref = capturarReferido();
    if (ref) {
      console.log(`[arkhe] Referido capturado: ${ref.codigo}`);
    }
  });
}

export const meta = {
  rol: 'referidos-tracking',
  seal: SEAL,
  nodo: NODO,
  genesis: GENESIS,
};

/* ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE */