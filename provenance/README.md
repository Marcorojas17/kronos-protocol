<!--
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║    ██████╗ ██████╗  ██████╗ ██╗   ██╗███████╗███╗   ██╗ █████╗          ║
║   ██╔══██╗██╔══██╗██╔═══██╗██║   ██║██╔════╝████╗  ██║██╔══██╗         ║
║   ██████╔╝██████╔╝██║   ██║██║   ██║█████╗  ██╔██╗ ██║███████║         ║
║   ██╔═══╝ ██╔══██╗██║   ██║╚██╗ ██╔╝██╔══╝  ██║╚██╗██║██╔══██║         ║
║   ██║     ██║  ██║╚██████╔╝ ╚████╔╝ ███████╗██║ ╚████║██║  ██║         ║
║   ╚═╝     ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝         ║
║                                                                          ║
║    ▓▒░ TRAZABILIDAD Y ATRIBUCIÓN · ARKHÉ ZERO ░▒▓                        ║
║    ──────────────────────────────────────────────                        ║
║    [ C2PA ]  [ RFC 3161 TSA ]  [ WATERMARK ]  [ FINGERPRINT ]            ║
║    [ CLASSIFIED ]  [ INDEX-ZERO::LINKED ]  [ PACT::51/49/100 ]           ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 📜 provenance/ · Trazabilidad y Atribución

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/provenance]
└─$ ./audit --chain=full

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%

┌──────────────────────────────┬─────────────────────────────┬──────────┐
│ MÓDULO                       │ DESCRIPCIÓN                 │ ESTADO   │
├──────────────────────────────┼─────────────────────────────┼──────────┤
│ c2pa/manifest-builder        │ C2PA 2.1 compliant          │ ✓ ACTIVE │
│ timestamping/rfc3161-client  │ TSA Firmaprofesional QTSA   │ ✓ ACTIVE │
│ watermarking/invisible       │ marca robusta               │ ✓ ACTIVE │
│ fingerprinting/perceptual    │ pHash + embedding neuronal  │ ✓ ACTIVE │
└──────────────────────────────┴─────────────────────────────┴──────────┘

[ ✓✓ ] CADENA DE PROVENANCE · 100% VERIFICABLE · ◯_● · 51/49/100
```

## 🜂 Capas de la Cadena

```text
╔══════════════════════════════════════════════════════════════════════════╗
║                         PROVENANCE CHAIN                                 ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║    [1] CAPTURA      → documento original + metadatos                     ║
║         │                                                                ║
║         ▼                                                                ║
║    [2] C2PA         → manifiesto firmado (creative-work + actions)       ║
║         │                                                                ║
║         ▼                                                                ║
║    [3] WATERMARK    → marca invisible + visible                          ║
║         │                                                                ║
║         ▼                                                                ║
║    [4] FINGERPRINT  → pHash + embedding neuronal                         ║
║         │                                                                ║
║         ▼                                                                ║
║    [5] TSA          → sello de tiempo RFC 3161                           ║
║         │                                                                ║
║         ▼                                                                ║
║    [6] BLOCKCHAIN   → anclaje Merkle root a Ethereum                     ║
║         │                                                                ║
║         ▼                                                                ║
║    [7] NOTARIZACIÓN → ledger proof + notary API                          ║
║                                                                          ║
║    ◯_● · 51/49/100 · CADENA ÍNTEGRA                                      ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

## 🜃 Módulos

| Módulo                    | Rol                                          |
|---------------------------|----------------------------------------------|
| `c2pa/`                   | Manifiesto C2PA + claims + validación firma  |
| `watermarking/`           | Marca de agua robusta (invisible + visible)  |
| `fingerprinting/`         | Huella perceptual (pHash + neural)           |
| `timestamping/`           | Sello de tiempo RFC 3161 + anclaje on-chain  |
| `notarization/`           | Notario KRONOS + ledger proof                |

## 🜄 Ejemplo

```bash
┌─(kali㉿arkhe-zero)-[~/kronos]
└─$ node demo-provenance.js

> import { construirManifiesto } from './provenance/c2pa/manifest-builder.js';
> import { sellarTiempo } from './provenance/timestamping/rfc3161-client.js';

> const manifiesto = await construirManifiesto({
>   titulo: 'Acta fundacional ARKHÉ ZERO',
>   autor: 'Marco Antonio Rojas Valdovinos',
>   obra: 'acta-fundacional-2026.pdf',
> });

> const sello = await sellarTiempo({ manifiesto });

manifiesto: f03f7e2d852617309457e0fe207f8f8bd...
TSA:        Firmaprofesional QTSA
sellado:    ◯_● · 51/49/100

[ ✓✓ ] CADENA DE PROVENANCE · 100% VERIFICABLE
```

---

`◯_● · 51/49/100 · KRONOS · provenance/`