/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SHARE.JS · ARKHÉ ZERO · ◯_● ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

export function compartir({ titulo, texto, url }) {
  if (navigator.share) {
    return navigator.share({ title: titulo, text: texto, url });
  }
  // Fallback: copiar al portapapeles
  return navigator.clipboard.writeText(`${titulo}\n${texto}\n${url}\n${SEAL}`);
}

export function initShareButtons() {
  document.querySelectorAll('[data-share]').forEach((btn) => {
    btn.addEventListener('click', () => {
      compartir({
        titulo: document.title,
        texto: btn.dataset.shareText || 'ARKHÉ ZERO · ◯_● KINTSUGI',
        url: window.location.href,
      });
    });
  });
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initShareButtons);
}