<!--
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║    ██████╗███████╗██████╗ ████████╗██╗███████╗██╗ ██████╗ █████╗         ║
║   ██╔════╝██╔════╝██╔══██╗╚══██╔══╝██║██╔════╝██║██╔════╝██╔══██╗        ║
║   ██║     █████╗  ██████╔╝   ██║   ██║█████╗  ██║██║     ███████║        ║
║   ██║     ██╔══╝  ██╔══██╗   ██║   ██║██╔══╝  ██║██║     ██╔══██║        ║
║   ╚██████╗███████╗██║  ██║   ██║   ██║██║     ██║╚██████╗██║  ██║        ║
║    ╚═════╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝        ║
║                                                                          ║
║    ▓▒░ EMISIÓN DE CERTIFICADOS · CAPA 3 · ARKHÉ ZERO ░▒▓                 ║
║    ─────────────────────────────────────────────────────                 ║
║    [ ANCLAJE ]  [ EMISOR ]  [ NOTARIO ]  [ TSA ]  [ VERIFICADOR ]        ║
║    [ CLASSIFIED ]  [ INDEX-ZERO::LINKED ]  [ PACT::51/49/100 ]           ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 📜 certificacion/ · Emisión de Certificados

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/certificacion]
└─$ ./pipeline --status

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%

╔══════════════════════════════════════════════════════════════════════════╗
║  MÓDULO                       · DESCRIPCIÓN              · ESTADO        ║
╠══════════════════════════════════════════════════════════════════════════╣
║  anclaje-manifest/            · Merkle root → Ethereum  · ✓ ACTIVO       ║
║  emisor-certificados/         · Emisión VC 2.0           · ✓ ACTIVO       ║
║  manifest-integridad/         · Hash + firma             · ✓ ACTIVO       ║
║  notario-kronos/              · Notario técnico          · ✓ ACTIVO       ║
║  sello-tiempo/                · TSA RFC 3161             · ✓ ACTIVO       ║
║  verificador-publico/         · Verificación abierta     · ✓ ACTIVO       ║
╚══════════════════════════════════════════════════════════════════════════╝

[ ✓✓ ] PIPELINE DE CERTIFICACIÓN · 6/6 módulos · ◯_● · 51/49/100
```

> *"Un certificado que no se puede verificar sin permiso, no es un certificado. Es un favor."*

## 🜂 Arquitectura del Pipeline

```text
╔══════════════════════════════════════════════════════════════════════════╗
║                    PIPELINE DE CERTIFICACIÓN · ARKHÉ                     ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║   [ Documento ]                                                          ║
║         │                                                                ║
║         ▼                                                                ║
║   ┌──────────────────┐                                                   ║
║   │ manifest-integr. │  SHA3-512 + firma ML-DSA-87                       ║
║   └────────┬─────────┘                                                   ║
║            │                                                             ║
║            ▼                                                             ║
║   ┌──────────────────┐                                                   ║
║   │ sello-tiempo     │  RFC 3161 · Firmaprofesional QTSA                 ║
║   └────────┬─────────┘                                                   ║
║            │                                                             ║
║            ▼                                                             ║
║   ┌──────────────────┐                                                   ║
║   │ notario-kronos   │  Acto notarial + ledger proof                     ║
║   └────────┬─────────┘                                                   ║
║            │                                                             ║
║            ▼                                                             ║
║   ┌──────────────────┐                                                   ║
║   │ emisor-VC        │  Verifiable Credential 2.0                        ║
║   └────────┬─────────┘                                                   ║
║            │                                                             ║
║            ▼                                                             ║
║   ┌──────────────────┐                                                   ║
║   │ anclaje-manifest │  Merkle root → Ethereum mainnet                   ║
║   └────────┬─────────┘                                                   ║
║            │                                                             ║
║            ▼                                                             ║
║   ┌──────────────────┐                                                   ║
║   │ verificador-púb. │  Cualquiera puede auditar                         ║
║   └──────────────────┘                                                   ║
║                                                                          ║
║   ◯_● · 51/49/100 · 100% REAL                                            ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

## 🜃 Ejemplo End-to-End

```bash
┌─(kali㉿arkhe-zero)-[~/kronos]
└─$ node demo-certificar.js

> import { construirManifiesto } from './provenance/c2pa/manifest-builder.js';
> import { sellarTiempo } from './provenance/timestamping/rfc3161-client.js';
> import { notarizar } from './certificacion/notario-kronos/notario.js';
> import { emitirVC } from './certificacion/emisor-certificados/certificados.js';
> import { anclar } from './cimiento/anclaje-ethereum/anchor.js';

> const doc = 'Acta fundacional ARKHÉ ZERO · 2026';

> const manifiesto = await construirManifiesto({ titulo: 'Acta', autor: 'Marco...', obra: doc });
> const tsa = await sellarTiempo({ manifiesto });
> const notarial = await notarizar({ manifiesto, tsa });
> const vc = await emitirVC({ manifiesto, tsa, notarial });
> const ancla = await anclar({ hash: manifiesto.hash });

[ ✓✓ ] CERTIFICADO EMITIDO
       hash       : f03f7e2d852617309457e0fe207f8f8bd...
       TSA        : Firmaprofesional QTSA
       Ethereum   : 0xd2c2a7e1...fb895774c
       VC         : did:arkhe:2607146379465
       sello      : ◯_● · 51/49/100
```

---

`◯_● · 51/49/100 · KRONOS · certificacion/`