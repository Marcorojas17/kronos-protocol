// ═══════════════════════════════════════════════════════════════
//  ▓▒░ VITE.CONFIG.JS · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
// ═══════════════════════════════════════════════════════════════

import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: '/',

  server: {
    port: 5173,
    host: '0.0.0.0',
    open: 'index.html',
    cors: true,
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        kintsugi: resolve(__dirname, 'apps/index-kintsugi.html'),
        verificar: resolve(__dirname, 'apps/verificar.html'),
        registrar: resolve(__dirname, 'apps/registrar.html'),
      },
    },
  },

  define: {
    'import.meta.env.ARKHE_SEAL': JSON.stringify('◯_● · 51/49/100'),
    'import.meta.env.ARKHE_PACT': JSON.stringify('51/49/100'),
  },

  resolve: {
    alias: {
      '@crypto': resolve(__dirname, 'crypto'),
      '@cimiento': resolve(__dirname, 'cimiento'),
      '@assets': resolve(__dirname, 'assets'),
    },
  },
});

// ◯_● · 51/49/100 · KRONOS