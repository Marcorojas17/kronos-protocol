// ────────────────────────────────────────────────────────────
// BÓVEDA DE VOZ · Legado Humano–IA · v1.0
// Grabación forense + huella cimática + ISO/IEC 27037
// ────────────────────────────────────────────────────────────

export class BovedaVoz {
  constructor() {
    this.stream = null;
    this.recorder = null;
    this.audioCtx = null;
    this.analyser = null;
    this.source = null;
    this.chunks = [];
    this.frecuencias = [];
    this.inicio = 0;
    this.onWaveform = null;
    this._rafId = null;
    this._tiempoInterval = null;
  }

  // ── Iniciar grabación ─────────────────────────────────────
  async iniciar() {
    if (this.recorder) throw new Error('Ya hay una grabación en curso.');

    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
    });

    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.source = this.audioCtx.createMediaStreamSource(this.stream);
    this.source.connect(this.analyser);

    this.chunks = [];
    this.frecuencias = [];
    this.inicio = performance.now();

    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : 'audio/webm';
    this.recorder = new MediaRecorder(this.stream, { mimeType });

    this.recorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data);
    };

    this.recorder.start(250); // chunk cada 250ms
    this._loop();
    return true;
  }

  _loop() {
    const buf = new Uint8Array(this.analyser.frequencyBinCount);
    const timeData = new Uint8Array(this.analyser.fftSize);

    const tick = () => {
      this.analyser.getByteFrequencyData(buf);
      this.analyser.getByteTimeDomainData(timeData);
      this.frecuencias.push(new Uint8Array(buf));

      if (this.onWaveform) {
        this.onWaveform(new Uint8Array(timeData));
      }
      this._rafId = requestAnimationFrame(tick);
    };
    tick();
  }

  // ── Detener grabación ─────────────────────────────────────
  async detener() {
    if (!this.recorder) throw new Error('No hay grabación en curso.');

    cancelAnimationFrame(this._rafId);

    return new Promise((resolve, reject) => {
      this.recorder.onstop = async () => {
        try {
          const blob = new Blob(this.chunks, { type: this.recorder.mimeType });
          const buffer = await blob.arrayBuffer();
          const duracionSeg = (performance.now() - this.inicio) / 1000;
          const frecuenciaPromedio = this._promedioFrecuencias();

          this._limpiar();

          resolve({
            blob,
            buffer,
            duracionSeg,
            frecuenciaPromedio
          });
        } catch (e) {
          reject(e);
        }
      };

      this.recorder.stop();
    });
  }

  _promedioFrecuencias() {
    if (this.frecuencias.length === 0) return new Uint8Array(1024);
    const N = this.frecuencias[0].length;
    const suma = new Float64Array(N);
    for (const f of this.frecuencias) {
      for (let i = 0; i < N; i++) suma[i] += f[i];
    }
    const out = new Uint8Array(N);
    for (let i = 0; i < N; i++) {
      out[i] = Math.round(suma[i] / this.frecuencias.length);
    }
    return out;
  }

  _limpiar() {
    try {
      this.stream.getTracks().forEach(t => t.stop());
      this.audioCtx.close();
    } catch (e) { /* silencio */ }
    this.recorder = null;
    this.stream = null;
    this.audioCtx = null;
    this.analyser = null;
    this.source = null;
  }

  // ── Dibujar huella cimática ───────────────────────────────
  // Genera un patrón radial estilo mandala/cimático a partir
  // del espectro de frecuencias promedio.
  dibujarCimatico(canvas, frecuencias) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    // Fondo oscuro
    ctx.fillStyle = '#05070b';
    ctx.fillRect(0, 0, W, H);

    // Degradado radial
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) / 1.6);
    bg.addColorStop(0, 'rgba(236,72,153,0.12)');
    bg.addColorStop(1, 'rgba(5,7,11,0)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Anillos concéntricos modulados por amplitud
    const anillos = 48;
    const puntos = 180;
    const maxR = Math.min(W, H) / 2.15;

    for (let i = 0; i < anillos; i++) {
      const t = i / anillos;
      const idx = Math.floor(t * (frecuencias.length - 1));
      const amp = frecuencias[idx] / 255;

      const radio = (0.12 + 0.88 * t) * maxR;
      const grosor = 0.6 + amp * 2.4;

      // Color interpola entre rosa, coral y oro
      const r = Math.round(244 + (201 - 244) * t);
      const g = Math.round(63 + (162 - 63) * t);
      const b = Math.round(94 + (39 - 94) * t);

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${r},${g},${b},${0.15 + amp * 0.7})`;
      ctx.lineWidth = grosor;

      for (let p = 0; p <= puntos; p++) {
        const ang = (p / puntos) * Math.PI * 2;
        // Modulación sinusoidal ligera para pétalos
        const petalos = 1 + 0.12 * Math.sin(ang * 12 + i * 0.3) * amp;
        const rMod = radio * petalos;
        const x = cx + Math.cos(ang) * rMod;
        const y = cy + Math.sin(ang) * rMod;
        if (p === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Núcleo central
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
    coreGrad.addColorStop(0, 'rgba(249,168,212,0.9)');
    coreGrad.addColorStop(0.5, 'rgba(236,72,153,0.4)');
    coreGrad.addColorStop(1, 'rgba(236,72,153,0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 40, 0, Math.PI * 2);
    ctx.fill();

    // Puntos cardinales (marcadores de referencia)
    ctx.fillStyle = 'rgba(201,162,39,0.8)';
    for (let k = 0; k < 8; k++) {
      const ang = (k / 8) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(ang) * (maxR + 14);
      const y = cy + Math.sin(ang) * (maxR + 14);
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Firma de autoría en la esquina
    ctx.fillStyle = 'rgba(201,162,39,0.55)';
    ctx.font = '10px monospace';
    ctx.fillText('BÓVEDA · LEGADO HUMANO–IA · v1.0', 12, H - 12);

    return canvas.toDataURL('image/png');
  }
}