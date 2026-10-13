/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ ANALYTICS.JS · PRIVACY-FIRST · ARKHÉ ZERO · ◯_● ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';
export const ANALYTICS_ENABLED = false; // privacy-first · desactivado por defecto

export function track(evento) {
  if (!ANALYTICS_ENABLED) {
    console.debug(`[arkhe/analytics · disabled] ${evento}`);
    return;
  }
  // En producción: enviar a endpoint propio, sin cookies, sin IPs
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ evento, seal: SEAL, ts: Date.now() }),
  }).catch(() => {});
}

export function trackPageView() {
  track(`page-view: ${location.pathname}`);
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', trackPageView);
}