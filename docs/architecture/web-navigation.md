# 🗺️ Web Navigation

```bash
┌─(kali㉿arkhe-zero)-[~/docs/architecture]
└─$ ./architecture --navigation

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%
```

## 🜂 Sistema de navegación

```text
╔══════════════════════════════════════════════════════════════════════════╗
║                    NAV SYSTEM · AUTO-INYECTABLE                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║   Cada página incluye:                                                   ║
║   <script type="module" src="../assets/js/nav-system.js"></script>      ║
║                                                                          ║
║   El script:                                                             ║
║   1. Detecta page activa (data-active)                                   ║
║   2. Inyecta HTML del nav                                                ║
║   3. Ajusta rutas relativas                                              ║
║   4. Marca link activo                                                   ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

## 🜃 Links canónicos

```javascript
const LINKS = [
  { id: 'hub',         label: 'HUB',       href: '../index.html' },
  { id: 'kintsugi',    label: 'KINTSUGI',  href: 'kintsugi.html' },
  { id: 'manifiesto',  label: 'MANIFIESTO',href: 'manifiesto.html' },
  { id: 'verificar',   label: 'VERIFICAR', href: 'verificar.html' },
  { id: 'registrar',   label: 'REGISTRAR', href: 'registrar.html' },
  { id: 'governance',  label: 'GOBIERNO',  href: 'governance.html' },
  { id: 'agentes',     label: 'AGENTES',   href: 'agentes.html' },
  { id: 'crypto',      label: 'CRYPTO',    href: 'crypto.html' },
  { id: 'provenance',  label: 'PROVENANCE',href: 'provenance.html' },
];
```

## 🜄 Convención de rutas

- Root: `../index.html`
- Dentro de apps/: `verificar.html`
- Desde apps/ hacia assets: `../assets/...`

---

`◯_● · 51/49/100 · ARCH · Navigation`