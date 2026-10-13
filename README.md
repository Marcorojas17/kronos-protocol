cd ~/arkhe-zero
cp README.md README.md.backup-$(date +%Y%m%d-%H%M%S)

cat > README.md << 'README_EOF'
<div align="center">

# ◯_● ARKHÉ ZERO

### Preserva tu obra sin depender de nadie.

**Llama 3.2 corriendo en tu iPhone. Sin nube. Sin cuentas. Sin tarjeta.**

[![Tests](https://img.shields.io/badge/tests-56%2F56%20passing-brightgreen?style=flat-square)](tests/)
[![Archivos](https://img.shields.io/badge/archivos-2287-blue?style=flat-square)](#qué-contiene)
[![Cripto](https://img.shields.io/badge/crypto-ML--KEM%20%7C%20ML--DSA%20%7C%20SLH--DSA-purple?style=flat-square)](#-criptografía-post-cuántica)
[![Local](https://img.shields.io/badge/IA-100%25%20local-green?style=flat-square)](#-por-qué-existe)
[![License](https://img.shields.io/badge/license-Apache%202.0%20%2B%20LGU-gold?style=flat-square)](LICENSE)

**[🇪🇸 Español](README.md)** · **[🇬🇧 English](README.en.md)** · **[🌐 Demo](https://marcorojas17.github.io/kronos-protocol/)** · **[📖 Docs](docs/)**

</div>

---

<!-- ═══════════════════════════════════════════════════════════════
     TODO: Reemplazar este bloque por el GIF de 15 segundos
     
     ![ARKHÉ ZERO Demo](assets/demo/demo.gif)
     
     Grabarlo en el iPhone mostrando:
     · Safari con el HUB cargando (0-3s)
     · iSH con `arkhe-ia "preserva mi obra"` (3-6s)
     · La IA local respondiendo (6-9s)
     · Hash SHA-256 en pantalla (9-12s)
     · "Sin nube. Sin cuentas. Sin tarjeta." (12-15s)
     ═══════════════════════════════════════════════════════════════ -->

<div align="center">

### 🎬 Demo en vivo

**→ [marcorojas17.github.io/kronos-protocol](https://marcorojas17.github.io/kronos-protocol/)** ←

</div>

---

## ⚡ En 30 segundos

ARKHÉ ZERO es un **sistema operativo legal y técnico** que te permite:

| # | Qué prueba | Cómo |
|---|---|---|
| **1** | Que un documento existía en una fecha | Firma SHA-256 + sello de tiempo |
| **2** | Quién lo firmó (humano + IA) | Criptografía post-cuántica |
| **3** | Que no ha sido alterado | Anclaje en Ethereum + Bitcoin |

**Sin nube. Sin OpenAI. Sin AWS. Sin cuentas. Sin tarjeta.**

---

## 🎯 Por qué existe

> *"El 60% del legado cultural digital de LATAM se pierde porque preservarlo cuesta $20 USD/mes y requiere internet estable."*

Un artista en Toluca no puede pagar Adobe, Dropbox y OpenAI. Pero tiene un celular. Y ese celular puede correr Llama 3.2.

**ARKHÉ ZERO es la alternativa local-first.**

---

## 🚀 Quick Start

```bash
git clone https://github.com/Marcorojas17/kronos-protocol.git
cd kronos-protocol
make install && make run