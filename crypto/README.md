<!--
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║    ██████╗██████╗ ██╗   ██╗██████╗ ████████╗ ██████╗                     ║
║   ██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝██╔═══██╗                    ║
║   ██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║   ██║   ██║                    ║
║   ██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║   ██║   ██║                    ║
║   ╚██████╗██║  ██║   ██║   ██║        ██║   ╚██████╔╝                    ║
║    ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝    ╚═════╝                     ║
║                                                                          ║
║    ▓▒░ CAPA 1 · CIMIENTO POST-CUÁNTICO · ARKHÉ ZERO ░▒▓                  ║
║    ────────────────────────────────────────────────────                  ║
║    [ FIPS 203 ]  [ FIPS 204 ]  [ FIPS 205 ]  [ FIPS 202 ]                ║
║    [ CLASSIFIED ]  [ INDEX-ZERO::LINKED ]  [ PACT::51/49/100 ]           ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 🔐 crypto/ · Cimiento Criptográfico

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/crypto]
└─$ ./audit --suite=full --verbose

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%

┌────────────────────────┬──────────┬───────┬──────────────┐
│ ALGORITMO              │ ESTÁNDAR │ NIVEL │ ESTADO       │
├────────────────────────┼──────────┼───────┼──────────────┤
│ ML-KEM-1024            │ FIPS 203 │   5   │ ✓ OPERATIVO  │
│ ML-DSA-87              │ FIPS 204 │   5   │ ✓ OPERATIVO  │
│ SLH-DSA-SHAKE-256s     │ FIPS 205 │   5   │ ✓ OPERATIVO  │
│ SHA3-512               │ FIPS 202 │   5   │ ✓ OPERATIVO  │
│ Ed25519                │ RFC 8032 │   3   │ ✓ HÍBRIDO    │
│ X25519                 │ RFC 7748 │   3   │ ✓ HÍBRIDO    │
│ HKDF-SHA3-512          │ RFC 5869 │   -   │ ✓ OPERATIVO  │
│ AES-256-GCM            │ FIPS 197 │   -   │ ✓ OPERATIVO  │
└────────────────────────┴──────────┴───────┴──────────────┘

[ ✓✓ ] CIMIENTO CRIPTOGRÁFICO · 100% VERIFICADO · ◯_● · 51/49/100
```

> *"El legado no se hereda. Se firma. Y se firma dos veces: con matemática clásica y con matemática post-cuántica."*

---

## 🜂 Arquitectura del Cimiento

```text
╔══════════════════════════════════════════════════════════════════════════╗
║                    CAPA 1 · CIMIENTO CRIPTOGRÁFICO                       ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║   ┌────────────────┐    ┌────────────────┐    ┌────────────────┐         ║
║   │  PRIMITIVES    │    │     HYBRID     │    │    AGILITY     │         ║
║   │  ────────────  │    │  ────────────  │    │  ────────────  │         ║
║   │  ML-KEM-1024   │    │  X25519 +      │    │  Registry      │         ║
║   │  ML-DSA-87     │    │  ML-KEM-1024   │    │  Migration     │         ║
║   │  SLH-DSA       │    │                │    │  Deprecation   │         ║
║   │  SHA3-512      │    │  Ed25519 +     │    │  Capability    │         ║
║   │  HKDF          │    │  ML-DSA-87     │    │  Matrix        │         ║
║   │  AES-GCM       │    │                │    │                │         ║
║   └───────┬────────┘    └───────┬────────┘    └───────┬────────┘         ║
║           │                     │                     │                  ║
║           └──────────┬──────────┴──────────┬──────────┘                  ║
║                      ▼                     ▼                             ║
║           ┌────────────────────┐  ┌────────────────────┐                 ║
║           │    OPERATIONS      │  │    DOWNGRADE       │                 ║
║           │    ────────────    │  │    DETECTOR        │                 ║
║           │    sign / verify   │  │    ────────────    │                 ║
║           │    keygen          │  │    Centinela       │                 ║
║           │    encapsulate     │  │    Anti-downgrade  │                 ║
║           │    decapsulate     │  │    Alertas         │                 ║
║           └─────────┬──────────┘  └──────────┬─────────┘                 ║
║                     │                        │                           ║
║                     └───────────┬────────────┘                           ║
║                                 ▼                                        ║
║                    ┌────────────────────────────┐                        ║
║                    │       HSM ADAPTERS         │                        ║
║                    │  ─────────────────────     │                        ║
║                    │  PKCS#11 · CloudHSM        │                        ║
║                    │  YubiHSM · SoftHSM         │                        ║
║                    └────────────────────────────┘                        ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

## 🜃 Índice de Módulos

| Módulo                    | Propósito                                       | Estándar        |
|---------------------------|-------------------------------------------------|-----------------|
| `primitives/ml-kem-*`     | KEM post-cuántico (encapsulación)               | FIPS 203        |
| `primitives/ml-dsa-*`     | Firma digital post-cuántica                     | FIPS 204        |
| `primitives/slh-dsa-*`    | Firma stateless hash-based (largo plazo)        | FIPS 205        |
| `primitives/sha3-512`     | Hash principal del Índice Cero                  | FIPS 202        |
| `primitives/hkdf`         | Derivación de claves                            | RFC 5869        |
| `primitives/aes-gcm`      | Cifrado simétrico autenticado                   | NIST SP 800-38D |
| `hybrid/*`                | Firmas híbridas clásica + PQC                   | —               |
| `agility/*`               | Registry + migración + deprecación              | —               |
| `hsm/*`                   | Adaptadores hardware seguro                     | PKCS#11         |
| `operations/*`            | sign · verify · keygen · encaps · decaps        | —               |
| `downgrade-detector.js`   | Centinela anti-downgrade                        | —               |

## 🜄 Ejemplo Rápido

```javascript
┌─(kali㉿arkhe-zero)-[~/kronos]
└─$ node --experimental-modules demo.js

> import { sign, verify } from './crypto/operations/sign.js';
> import { sha3_512 } from './crypto/primitives/sha3-512.js';

> const decision = 'Aprobar Sub-bloque E · Contexto IA';
> const hash = sha3_512(decision);
> const firma = await sign({ contenido: decision, alg: 'ML-DSA-87', secretKey });

{
  firma: <Uint8Array(4627) [45, 78, 102, 33, ...]>,
  hash: 'f03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112',
  alg: 'ML-DSA-87',
  timestamp: '2026-01-01T00:00:00.000Z',
  sellado: '◯_● · 51/49/100'
}

[ ✓✓ ] Documento firmado · anclado al cimiento
```

## 🜁 Reglas de Oro

```diff
+ Todo dato firmado DEBE poder verificarse sin acceso a claves privadas.
+ Toda firma DEBE incluir hash SHA3-512 del contenido original.
+ Toda clave DEBE tener rotación documentada en agility/migration-policy.
+ Todo intento de downgrade DEBE disparar alerta del centinela.
- NUNCA almacenar claves privadas en texto plano.
- NUNCA desactivar verificación bajo presión de performance.
- NUNCA usar MD5, SHA-1, RSA-1024, DES, RC4.
```

---

`◯_● · 51/49/100 · KRONOS · crypto/`