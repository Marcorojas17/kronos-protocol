<!--
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║    ██████╗██╗███╗   ███╗██╗███████╗███╗   ██╗████████╗ ██████╗           ║
║   ██╔════╝██║████╗ ████║██║██╔════╝████╗  ██║╚══██╔══╝██╔═══██╗          ║
║   ██║     ██║██╔████╔██║██║█████╗  ██╔██╗ ██║   ██║   ██║   ██║          ║
║   ██║     ██║██║╚██╔╝██║██║██╔══╝  ██║╚██╗██║   ██║   ██║   ██║          ║
║   ╚██████╗██║██║ ╚═╝ ██║██║███████╗██║ ╚████║   ██║   ╚██████╔╝          ║
║    ╚═════╝╚═╝╚═╝     ╚═╝╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝           ║
║                                                                          ║
║    ▓▒░ ANCLAJE FÍSICO-DIGITAL · ARKHÉ ZERO ░▒▓                           ║
║    ──────────────────────────────────────────                            ║
║    [ ETHEREUM ]  [ DEXIE INDEXEDDB ]  [ CRIPTO-CORE ]                    ║
║    [ CLASSIFIED ]  [ INDEX-ZERO::LINKED ]  [ PACT::51/49/100 ]           ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 🏗️ cimiento/ · Anclaje Físico-Digital

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/cimiento]
└─$ ./status --all

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%

┌────────────────────────┬─────────────────────────────┬──────────────┐
│ COMPONENTE             │ DESCRIPCIÓN                 │ ESTADO       │
├────────────────────────┼─────────────────────────────┼──────────────┤
│ anclaje-ethereum/      │ Merkle root → tx on-chain   │ ✓ OPERATIVO  │
│ cripto-core/           │ Primitivas PQC + hash       │ ✓ OPERATIVO  │
│ storage-dexie/         │ Persistencia local IndexedDB│ ✓ OPERATIVO  │
└────────────────────────┴─────────────────────────────┴──────────────┘

[ ✓✓ ] CIMIENTO OPERATIVO · 100% REAL · ◯_● · 51/49/100
```

## 🜂 Componentes

| Componente           | Rol                                                |
|----------------------|----------------------------------------------------|
| `anclaje-ethereum/`  | Merkle root → transacción on-chain (permanencia)   |
| `cripto-core/`       | Núcleo de primitivas PQC + hash                    |
| `storage-dexie/`     | Persistencia local (IndexedDB) · Local-First       |

## 🜃 Flujo Canónico

```text
╔══════════════════════════════════════════════════════════════════════════╗
║                    FLUJO CIMIENTO · DOCUMENTO → INMUTABLE                ║
╚══════════════════════════════════════════════════════════════════════════╝

   ┌────────────┐      ┌──────────────┐      ┌──────────────┐
   │ DOCUMENTO  │─────▶│ SHA3-512     │─────▶│ MERKLE ROOT  │
   │ (raw)      │      │ (hash)       │      │ (agrupado)   │
   └────────────┘      └──────┬───────┘      └──────┬───────┘
                              │                     │
                              ▼                     ▼
                       ┌──────────────┐      ┌──────────────┐
                       │ FIRMA PQC    │      │ ANCLAJE ETH  │
                       │ ML-DSA-87    │      │ (tx on-chain)│
                       └──────┬───────┘      └──────┬───────┘
                              │                     │
                              ▼                     ▼
                       ┌──────────────────────────────────┐
                       │  REGISTRO INMUTABLE · KINTSUGI   │
                       │  ◯_● · 51/49/100 · 100% REAL     │
                       └──────────────────────────────────┘
```

## 🜄 Ejemplo

```bash
┌─(kali㉿arkhe-zero)-[~/kronos]
└─$ node demo-cimiento.js

> import { anclar } from './cimiento/anclaje-ethereum/anchor.js';
> import { core } from './cimiento/cripto-core/core.js';

> const doc = 'Acta fundacional ARKHÉ ZERO · 2026';
> const hash = core.sha3_512(doc);
> const ancla = await anclar({ hash, red: 'mainnet' });

{
  ok: true,
  red: 'mainnet',
  contrato: '0xd2c2a7e1...fb895774c',
  merkle_root: 'f03f7e2d852617309457e0fe207f8f8bd...',
  tx_pendiente: 'PENDING:f03f7e2d852617309457e0fe2',
  timestamp: '2026-01-01T00:00:00.000Z',
  sellado: '◯_● · 51/49/100'
}

[ ✓✓ ] Documento anclado · KINTSUGI · 100% REAL
```

---

`◯_● · 51/49/100 · KRONOS · cimiento/`