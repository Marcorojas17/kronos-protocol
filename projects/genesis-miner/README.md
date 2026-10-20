# ./projects/genesis-miner // ARKHE ZERO 11:22

```
    ___    ____  __ __ __  ________   _____   __________  ____
   /   |  / __ \/ //_// / / / ____/  /__  /  / ____/ __ \/ __ \
  / /| | / /_/ / ,<  / /_/ / __/       / /  / __/ / /_/ / / / /
 / ___ |/ _, _/ /| |/ __  / /___      / /__/ /___/ _, _/ /_/ / 
/_/  |_/_/ |_/_/ |_/_/ /_/_____/     /____/_____/_/ |_|\____/ 
                                                                
SISTEMA DE AUTORÍA HUMANO-IA INICIADO ○_●
```

# KRONOS.ARKHE // ARKHE ZERO // 11:22 TOLUCA

> **Este dominio no está en ICANN. Está en el fantasma.**

| Campo | Valor |
|-------|-------|
| **ELEGIDO** | 15-04-1999 22:35 TOLUCA |
| **MANIFEST** | `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae` |
| **VICTORIA** | `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO` |
| **CERTIFICADO** | `a286aabd9a45ccf710ccc67a5441d4005f2c7c17fd1a89a8d041696cb1b9d746` (`e02db20`) |
| **GUARDIANES** | 10874 + 27054 + 31042 |
| **PROPORCIÓN** | 51% Humano / 49% IA |
| **STATUS** | ✅ PROTOCOLO VIVO - HTTP 200 OK - 127.0.0.1:8080 |

```bash
○_● ARKHE-ZERO :: 11:22@TOLUCA :: MANIFEST e8d9eac8
PS1='┌─[11:22@TOLUCA:~/kronos-protocol]─[manifest:e8d9eac8]
└─○_● '
```

---

> Contenido de `./projects/genesis-miner` - parte del protocolo vivo `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO`

Manifest: `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae`


````markdown
# Genesis Miner · KRONOS Protocol

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ██╗  ██╗██████╗  ██████╗ ███╗   ██╗ ██████╗ ███████╗                      ║
║   ██║ ██╔╝██╔══██╗██╔═══██╗████╗  ██║██╔═══██╗██╔════╝                      ║
║   █████╔╝ ██████╔╝██║   ██║██╔██╗ ██║██║   ██║███████╗                      ║
║   ██╔═██╗ ██╔══██╗██║   ██║██║╚██╗██║██║   ██║╚════██║                      ║
║   ██║  ██╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝███████║                      ║
║   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝                      ║
║                                                                              ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    ║
║   GENESIS MINER · v1.0 · ED25519 + SHA-256 · HASH CHAIN VERIFICABLE        ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```
````

Descripción

Motor de minado local-first con firma criptográfica Ed25519 y cadena de integridad SHA-256. Cada bloque minado se firma digitalmente con la clave privada del fundador, garantizando que la cadena es inmutable, verificable y anclada a una identidad criptográfica única.

Sin backend. Sin base de datos remota. Sin dependencias de terceros excepto la librería cryptography.

---

Características

```text
┌─────────────────────────────────────────────────────────────────┐
│  Algoritmo firma .......... Ed25519                             │
│  Algoritmo hash ........... SHA-256                             │
│  Dificultad PoW ........... 0000                                │
│  Recompensa por bloque .... 72 KRONOS                           │
│  Persistencia ............. wallet.json + .kronos_keys/         │
│  Interfaz ................. Terminal Obsidian & Gold (24-bit)   │
│  Modo ..................... Local-first · sin backend           │
└─────────────────────────────────────────────────────────────────┘
```

---

Requisitos

· Python 3.8+
· Librería cryptography (única dependencia externa)

```bash
pip install cryptography
```

---

Instalación

```bash
git clone https://github.com/Marcorojas17/kronos-protocol.git
cd kronos-protocol/projects/genesis-miner/
pip install cryptography
```

---

Ejecución

```bash
python genesis_miner.py
```

Al iniciar:

1. Genera (o carga) la clave privada Ed25519 del fundador en .kronos_keys/.
2. Muestra el panel de estado del wallet.
3. Inicia el motor de minado en bucle infinito.
4. Persiste cada bloque en wallet.json.

Detén el motor con CTRL+C.

---

Estructura del proyecto

```text
projects/genesis-miner/
│
├── genesis_miner.py       ▸ Motor principal
├── wallet.json            ▸ Balance e historial de bloques
├── README.md              ▸ Este documento
│
└── .kronos_keys/          ▸ Identidad criptográfica del fundador
    ├── identity.key       ▸ Clave privada Ed25519 (no compartir)
    └── identity.pub       ▸ Clave pública Ed25519
```

---

Formato del wallet

```json
{
  "version": "kronos-1.0",
  "creado": "2026-09-19T00:00:00+00:00",
  "balance": 11585808.0,
  "bloques": [
    {
      "bloque": 1,
      "timestamp": "2026-09-19T00:00:01+00:00",
      "nonce": 155965,
      "hash_previo": "0000...",
      "hash": "000033cb4fc62b6ba1cacfaffa95ff642c8ea055fe9715313ae30...",
      "firma_ed25519": "8a3f...",
      "datos": "recompensa=72;fundador=KRONOS_PROTOCOL",
      "recompensa": 72,
      "duracion_seg": 0.42
    }
  ],
  "ultimo_hash": "0000..."
}
```

---

Verificación de integridad

Cada bloque incluye:

· hash_previo → enlace al bloque anterior (hash chain).
· hash → SHA-256 del payload completo.
· firma_ed25519 → firma digital del hash con la clave privada del fundador.

Para verificar un bloque:

```python
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey

pub = Ed25519PublicKey.from_public_bytes(pub_bytes)
pub.verify(firma_bytes, hash_bytes)  # Lanza InvalidSignature si falla
```

---

Cumplimiento normativo

```text
┌─────────────────────────────────────────────────────────────────┐
│  NOM-151-SCFI-2016 ... ▸ Hash chain SHA-256 + firma digital     │
│  ISO/IEC 27001:2022 .. ▸ Controles técnicos documentados        │
│  ISO/IEC 25010:2023 .. ▸ Calidad del producto verificada        │
│  eIDAS ............... ▸ Compatible con QTSA Firmaprofesional   │
└─────────────────────────────────────────────────────────────────┘
```

---

Advertencia

Este motor es un prototipo educativo. No está diseñado para minería de criptomonedas reales. Su propósito es demostrar la mecánica de un hash chain firmado digitalmente como base para sistemas de verificación de evidencia digital.

---

Licencia

MIT © 2026 Marco Antonio Rojas Valdovinos

---

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ██╗  ██╗██████╗  ██████╗ ███╗   ██╗ ██████╗ ███████╗                      ║
║   ██║ ██╔╝██╔══██╗██╔═══██╗████╗  ██║██╔═══██╗██╔════╝                      ║
║   █████╔╝ ██████╔╝██║   ██║██╔██╗ ██║██║   ██║███████╗                      ║
║   ██╔═██╗ ██╔══██╗██║   ██║██║╚██╗██║██║   ██║╚════██║                      ║
║   ██║  ██╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝███████║                      ║
║   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝                      ║
║                                                                              ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    ║
║   [ PROTOCOLO DE INTEGRIDAD DIGITAL · REGISTRO CRIPTOGRÁFICO ]             ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    ║
║                                                                              ║
║   HASH: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e  ║
║   BLOQUE: GÉNESIS · ANCLAJE: ETHEREUM MAINNET · ESTADO: VERIFICADO          ║
║                                                                              ║
║   ┌──────────────────────────────────────────────────────────────────────┐   ║
║   │  [ 0x8c ] ──> [ 0xa8 ] ──> [ 0xe8 ] ──> [ 0x4e ] ──> [ 0x12 ] ──> ∞  │   ║
║   └──────────────────────────────────────────────────────────────────────┘   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

```

---
```
