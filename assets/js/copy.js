/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ COPY.JS · ARKHÉ ZERO · ◯_● ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

export async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return { ok: true, sellado: SEAL };
  } catch (err) {
    return { ok: false, error: err.message, sellado: SEAL };
  }
}

export function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const target = document.querySelector(btn.dataset.copy);
      if (!target) return;
      const r = await copiar(target.textContent);
      btn.textContent = r.ok ? '✓ COPIADO' : '✗ ERROR';
      setTimeout(() => {
        btn.textContent = btn.dataset.originalLabel || '📋 COPIAR';
      }, 1500);
    });
  });
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initCopyButtons);
}