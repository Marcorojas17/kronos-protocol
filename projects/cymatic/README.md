<!-- ═══════════════════════════════════════════════════════════════════════ -->
<!-- CYMATIC STUDIO · README · v19 · 16 Septiembre 2026                     -->
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ██████╗██╗   ██╗███╗   ███╗ █████╗ ████████╗██╗ ██████╗                ▓ ║
║ ▓  ██╔════╝╚██╗ ██╔╝████╗ ████║██╔══██╗╚══██╔══╝██║██╔════╝                ▓ ║
║ ▓  ██║      ╚████╔╝ ██╔████╔██║███████║   ██║   ██║██║                     ▓ ║
║ ▓  ██║       ╚██╔╝  ██║╚██╔╝██║██╔══██║   ██║   ██║██║                     ▓ ║
║ ▓  ╚██████╗   ██║   ██║ ╚═╝ ██║██║  ██║   ██║   ██║╚██████╗                ▓ ║
║ ▓   ╚═════╝   ╚═╝   ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝                ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ▓ ║
║ ▓   S T U D I O   ·   v 1 9   ·   W E B G L 2                               ║
║ ▓   v i s u a l i z a c i ó n   d e   a u d i o   r e a c t i v a            ║
║ ▓   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ▓ ║
║ ▓                                                                          ▓ ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

**Motor de visualización de audio reactivo. Convierte una frecuencia en geometría procedural en tiempo real, 100% en el navegador.**

```text
[ RENDER ]  WebGL2 + GLSL         [ AUDIO ]  Web Audio API
[ GEO   ]   5 procedurales        [ PUERTO ]  sin backend
[ EXPORT ]  PNG + WebM            [ LOCAL  ]  100% client-side
```

---

```text
┌─[ 01 ]──────────────────────────────────────────────── QUÉ HACE ─┐
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

```text
MICRÓFONO / AUDIO FILE
       │
       ▼
FFT ANALYSER (Web Audio API)
       │
       ▼
SHADER GLSL (vertex + fragment)
       │
       ▼
16,000 PARTÍCULAS EN GPU
       │
       ▼
GEOMETRÍA PROCEDURAL REACTIVA
       │
       ▼
CANVAS 3D + BLOOM
       │
       ▼
PNG · WEBM · FULLSCREEN
```

---

```text
┌─[ 02 ]─────────────────────────────────────── QUÉ INCLUYE ─┐
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

| Componente | Detalle |
|------------|---------|
| 🎛️ **5 modos** | Chladni · Toroide · Metatrón · Flor de Vida · Merkaba |
| 🎨 **5 paletas** | Cyan · Aurum · Neon · Esmeralda · Nebula |
| 🎙️ **Entrada de audio** | Micrófono en vivo · Sintetizador · Drag & drop MP3/WAV |
| 📊 **Análisis FFT** | 32 barras reactivas en tiempo real |
| 💥 **Efectos** | Bloom · Onda de choque (tecla C) · Cristales interactivos (Espacio) |
| ⏺️ **Exportación** | Grabación WebM (60fps) · 30 fotogramas PNG |
| 💾 **Presets** | Guardado local de configuraciones |
| ⌨️ **Teclado** | 1-5 modos · C onda · Espacio cristal |

---

```text
┌─[ 03 ]──────────────────────────────────────── LÍMITES ─┐
│                                                           │
└───────────────────────────────────────────────────────────┘
```

```text
┌────────────────────────────────────┬────────────────────────────────────┐
│  ✅ ESTE PROYECTO SÍ               │  ❌ ESTE PROYECTO NO               │
├────────────────────────────────────┼────────────────────────────────────┤
│  Renderiza geometría procedural    │  No detecta voz humana.            │
│  reactiva al audio.                │                                    │
├────────────────────────────────────┼────────────────────────────────────┤
│  Usa shaders GLSL personalizados   │  No es "quantum" ni "neural".      │
│  en WebGL2.                        │                                    │
├────────────────────────────────────┼────────────────────────────────────┤
│  Analiza espectro FFT en tiempo    │  No usa WebGPU ni WebAssembly.     │
│  real.                             │                                    │
├────────────────────────────────────┼────────────────────────────────────┤
│  Genera desplazamiento procedural  │  No simula fluidos con Navier-     │
│  tipo fluido sobre partículas.     │  Stokes.                           │
├────────────────────────────────────┼────────────────────────────────────┤
│  Exporta PNG y WebM.               │  No es IA generativa.              │
└────────────────────────────────────┴────────────────────────────────────┘
```

```text
> CAUTION: La cimática visual muestra patrones geométricos producidos por
> frecuencias. NO es un sistema biométrico ni un método de detección de
> voz humana.
```

---

```text
┌─[ 04 ]─────────────────────────────────────────── STACK ─┐
│                                                            │
└────────────────────────────────────────────────────────────┘
```

| Capa | Tecnología |
|------|-----------|
| **Render 3D** | Three.js r128 (WebGL2) |
| **Shaders** | GLSL ES 3.00 · vertex + fragment personalizados |
| **Post-procesado** | EffectComposer + UnrealBloomPass |
| **Audio** | Web Audio API nativa · AnalyserNode · BiquadFilter |
| **Geometría** | 16,000 partículas · atributos multi-target |
| **Exportación** | `canvas.captureStream()` + `MediaRecorder` (VP9) |
| **Persistencia** | localStorage para presets |
| **Build** | HTML único · sin build step |
| **Dependencias** | Three.js + OrbitControls + EffectComposer (CDN) |

---

```text
┌─[ 05 ]───────────────────────────────── CÓMO CORRER ─┐
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Opción 1 · Abrir directamente

```bash
git clone https://github.com/Marcorojas17/kronos-protocol.git
cd kronos-protocol/projects/cymatic
# Abrir index.html en Chrome, Edge o Firefox moderno
```

### Opción 2 · Servidor local

```bash
python3 -m http.server 8000
# Abrir http://localhost:8000
```

### Requisitos

- Navegador con WebGL2: Chrome 90+, Firefox 88+, Safari 14+, Edge moderno
- Permiso de micrófono (opcional, para modo micrófono)
- GPU con aceleración por hardware activa

---

```text
┌─[ 06 ]─────────────────────────────────── CONTROLES ─┐
│                                                       │
└───────────────────────────────────────────────────────┘
```

| Acción | Resultado |
|--------|-----------|
| Click **🎤 Micrófono** | Activa entrada de audio en vivo |
| Click **♪ Sintetizador** | Activa sintetizador aditivo interno |
| Arrastrar MP3/WAV | Carga archivo de audio local |
| Tecla **1-5** | Cambia modo geométrico |
| Tecla **C** | Dispara onda de choque |
| Tecla **Espacio** | Genera cristal interactivo |
| **Sliders** | Ajustan frecuencia cimática · densidad · bloom |
| **🎬 Grabar Video** | Inicia/detiene grabación WebM |
| **📸 Frames** | Exporta 30 fotogramas PNG |
| **⛶ Pantalla** | Modo pantalla completa |
| **💾 Preset** | Guarda configuración actual |

---

```text
┌─[ 07 ]─────────────────────────────── ESTRUCTURA ─┐
│                                                     │
└─────────────────────────────────────────────────────┘
```

```text
cymatic/
├── index.html          ← Motor completo (HTML + CSS + JS inline)
├── README.md           ← Este archivo
└── assets/             ← Recursos opcionales (si existen)
```

El proyecto es un **único archivo HTML autocontenido**. No requiere build, ni bundler, ni dependencias locales.

---

```text
┌─[ 08 ]──────────────────────────────────── ESTADO ─┐
│                                                     │
└─────────────────────────────────────────────────────┘
```

```text
  Render WebGL2 ................ ████████████████████ 100%
  Shaders GLSL ................. ████████████████████ 100%
  Análisis FFT ................. ████████████████████ 100%
  5 geometrías ................. ████████████████████ 100%
  5 paletas .................... ████████████████████ 100%
  Exportación PNG .............. ████████████████████ 100%
  Grabación WebM ............... ████████████████████ 100%
  Presets locales .............. ████████████████████ 100%
  Documentación ................ ████████████████████ 100%
```

**v19 · funcional · sin claims comerciales activos**

---

```text
┌─[ 09 ]─────────────────────────────────── LICENCIA ─┐
│                                                      │
└──────────────────────────────────────────────────────┘
```

```text
  Código          ──▶  MIT
  Uso comercial   ──▶  Permitido con atribución
  Marca           ──▶  "CYMATIC STUDIO" · uso libre
```

---

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓                                                                          ▓ ║
║ ▓   [ CYMATIC STUDIO · v19 · WebGL2 ]                                     ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ▸ 16,000 partículas                                                   ▓ ║
║ ▓   ▸ 5 geometrías procedurales                                           ▓ ║
║ ▓   ▸ 5 paletas                                                           ▓ ║
║ ▓   ▸ Exportación PNG + WebM                                              ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   root@cymatic:~# ./render --status                                      ▓ ║
║ ▓   [████████████████████████████████████████] READY                     ▓ ║
║ ▓   ✓ Demo funcional                                                      ▓ ║
║ ▓   ✓ Sin backend                                                         ▓ ║
║ ▓   ✓ Sin claims inflados                                                 ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   root@cymatic:~# _                                                      ▓ ║
║ ▓                                                                          ▓ ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

<!-- FIN DEL DOCUMENTO · CYMATIC STUDIO · v19 -->