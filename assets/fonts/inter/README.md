# 🔤 Fuentes Inter + JetBrains Mono

## 🜂 Descarga

Las fuentes son binarias y no se versionan. Se descargan con:

```bash
# Inter (Google Fonts · Bunny Fonts · jsDelivr)
curl -L -o assets/fonts/inter/Inter-400.woff2 \
  https://fonts.bunny.net/inter/files/inter-latin-400-normal.woff2

curl -L -o assets/fonts/inter/Inter-700.woff2 \
  https://fonts.bunny.net/inter/files/inter-latin-700-normal.woff2

# JetBrains Mono
curl -L -o assets/fonts/inter/JetBrainsMono-400.woff2 \
  https://fonts.bunny.net/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2

curl -L -o assets/fonts/inter/JetBrainsMono-700.woff2 \
  https://fonts.bunny.net/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2
```

## 🜃 Instalación automática

```bash
python scripts/build.py --fonts
```

## 🜄 Fallback

Si no hay conexión ni descarga, el sistema usa `Courier New` (sistema).

---

`◯_● · 51/49/100 · KRONOS · fonts`