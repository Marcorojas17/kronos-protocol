/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ DOCS-NAV.JS · ARKHÉ ZERO · ◯_● ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

export function initTocHighlight() {
  const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (!tocLinks.length) return;

  const sections = Array.from(tocLinks).map((link) =>
    document.querySelector(link.getAttribute('href'))
  ).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        tocLinks.forEach((l) => l.classList.remove('active'));
        const active = Array.from(tocLinks).find(
          (l) => l.getAttribute('href') === `#${entry.target.id}`
        );
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-80px 0px -70% 0px' });

  sections.forEach((s) => observer.observe(s));
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initTocHighlight);
}