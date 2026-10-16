# 🌈 Theming System

```bash
┌─(kali㉿arkhe-zero)-[~/docs/architecture]
└─$ ./architecture --theming

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%
```

## 🜂 Los 5 temas canónicos

| Tema | Uso | Color principal |
|------|-----|-----------------|
| `terminal-amber` | Hub default | #ffb000 |
| `terminal-gold` | KINTSUGI · manifiesto | #d4af37 |
| `terminal-green` | Verificar · éxito | #00ff9f |
| `terminal-cyan` | Firmar · nuevo | #00d4ff |
| `terminal-red` | 404 · HALT | #ff3b3b |

## 🜃 Uso

```html
<body data-page="verificar" data-theme="terminal-green">
```

```css
[data-theme="terminal-green"] {
  --accent: #00ff9f;
  --accent-2: #00d4ff;
}
```

## 🜄 CSS Custom Properties

```css
:root {
  /* Paleta base */
  --gold:   #d4af37;
  --amber:  #ffb000;
  --green:  #00ff9f;
  --cyan:   #00d4ff;
  --red:    #ff3b3b;
  --purple: #b47aff;

  /* Fondo */
  --bg-0: #0a0a0a;
  --bg-1: #111111;
  --bg-2: #1a1a1a;

  /* Texto */
  --fg-0: #e8e8e8;
  --fg-1: #b0b0b0;
  --fg-2: #707070;

  /* Bordes */
  --border: #2a2a2a;

  /* Tipografía */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  --font-serif: 'Inter', 'Georgia', serif;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

## 🜁 Cambio de tema dinámico

```javascript
// theme-switcher.js
export function setTema(tema) {
  document.body.dataset.theme = tema;
  localStorage.setItem('arkhe-theme', tema);
}
```

---

`◯_● · 51/49/100 · ARCH · Theming`