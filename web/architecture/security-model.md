# 🔐 Security Model · ARKHÉ ZERO

```bash
┌─(kali㉿arkhe-zero)-[~/docs/architecture]
└─$ ./architecture --security

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%

╔══════════════════════════════════════════════════════════════════════════╗
║  MODELO DE SEGURIDAD · 6 PILARES                                         ║
╠══════════════════════════════════════════════════════════════════════════╣
║  [1] Zero-Trust                                                          ║
║  [2] Post-Quantum                                                        ║
║  [3] HSM-First                                                           ║
║  [4] Local-First                                                         ║
║  [5] Fail-Safe                                                           ║
║  [6] Separación de poderes                                               ║
╚══════════════════════════════════════════════════════════════════════════╝
```

## 🜂 Los 6 pilares

### 1 · Zero-Trust

Nada es confiable por defecto. Todo se verifica.

### 2 · Post-Quantum

FIPS 203/204/205 como base. Resistencia al ataque de Shor.

### 3 · HSM-First

Las claves privadas nunca salen del hardware. PKCS#11 · CloudHSM · YubiHSM.

### 4 · Local-First

Los datos viven primero con el humano. La nube testifica, no posee.

### 5 · Fail-Safe

En duda: HALT. Sin firma humana, no hay acción.

### 6 · Separación de poderes

Quien implementa no audita. Quien firma no verifica.

## 🜃 Amenazas cubiertas

| Amenaza | Mitigación |
|---------|-----------|
| Ataque de Shor | PQC FIPS 203/204/205 |
| Downgrade | Centinela anti-downgrade |
| Man-in-the-middle | Firma híbrida Ed25519+ML-DSA-87 |
| Corrupción de datos | SHA3-512 + Merkle root |
| Borrado no autorizado | Lex Prima 1.3 · superposición |
| Suplantación | Firma PQC + fingerprint |
| Fuga de claves | HSM (claves nunca salen) |

---

`◯_● · 51/49/100 · ARCH · Security`