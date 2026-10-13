/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SRC · CORE · LEX PRIMA · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Ley fundacional del sistema. Inmutable. Suprema.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/src/core]
 *  └─$ node -e "import('./lex-prima.js').then(m => \
 *       console.log(m.LEX_PRIMA.articulos.length))"
 *     5
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

export const LEX_PRIMA = Object.freeze({
  version: '1.0.0',
  articulos: [
    {
      id: '1.1',
      titulo: 'Génesis y Registro',
      contenido: 'Todo queda registrado. Nada se borra sin ceremonia.',
    },
    {
      id: '1.2',
      titulo: 'Soberanía Irrevocable',
      contenido: 'El 51% humano es irrevocable. Ni 12 IAs pueden alterarlo.',
    },
    {
      id: '1.3',
      titulo: 'Irreversibilidad',
      contenido: 'Un acto firmado es inmutable. Se puede superponer. No borrar.',
    },
    {
      id: '1.4',
      titulo: 'No Retroactividad',
      contenido: 'Ninguna ley nueva puede cambiar actos pasados.',
    },
    {
      id: '1.5',
      titulo: 'Supremacía Interpretativa',
      contenido: 'En duda, se interpreta a favor del Índice Cero.',
    },
  ],
  sellado: SEAL,
});

export class LexPrima {
  constructor() {
    this.articulos = LEX_PRIMA.articulos;
    Object.freeze(this);
  }

  obtener(id) {
    return this.articulos.find((a) => a.id === id) || null;
  }

  listar() {
    return this.articulos.map(({ id, titulo }) => ({ id, titulo }));
  }
}