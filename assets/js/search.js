/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SEARCH.JS · ARKHÉ ZERO · ◯_● ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

export const PAGINAS = [
  { titulo: 'KINTSUGI',            url: 'kintsugi.html',            tags: ['manifiesto', 'alma'] },
  { titulo: 'Verificar',           url: 'verificar.html',           tags: ['hash', 'auditoría'] },
  { titulo: 'Registrar',           url: 'registrar.html',           tags: ['firmar', 'obra'] },
  { titulo: 'Gobernanza',          url: 'governance.html',          tags: ['quórum', 'voto'] },
  { titulo: 'Agentes',             url: 'agentes.html',             tags: ['enjambre', 'ia'] },
  { titulo: 'Crypto',              url: 'crypto.html',              tags: ['pqc', 'fips'] },
  { titulo: 'Provenance',          url: 'provenance.html',          tags: ['c2pa', 'tsa'] },
  { titulo: 'Tesis',               url: 'tesis.html',               tags: ['filosofía'] },
  { titulo: 'Roadmap',             url: 'roadmap.html',             tags: ['2026', '2030'] },
  { titulo: 'Glosario',            url: 'glossary.html',            tags: ['términos'] },
];

export function buscar(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PAGINAS.filter((p) =>
    p.titulo.toLowerCase().includes(q) ||
    p.tags.some((t) => t.includes(q))
  );
}

export function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  input.addEventListener('input', (e) => {
    const r = buscar(e.target.value);
    results.innerHTML = r.length
      ? r.map((p) => `<a href="${p.url}">${p.titulo}</a>`).join('')
      : '<em>Sin resultados · ◯_●</em>';
  });
}