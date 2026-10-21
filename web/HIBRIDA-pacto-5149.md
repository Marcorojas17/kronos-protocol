# Firma Híbrida del Pacto 51/49 · ARKHÉ ZERO

## Documento firmado

- Archivo: `pacto-5149-canonico.txt`
- Tamaño: 172 bytes
- SHA-256: `9922176adc57c40c102d83d6927e2a8a41fb11a56538e60a935a4474401b941a`
- SHA3-512: `1455e7940e4ff2e47edf66ce35440a7e21b73eed8ca14199f994e286a7f5c4a68208fbcd8d7e0981d4b639441941540f0f6a2f86146426546fe158cfef86e392`

## Firma 1 · Ed25519 (clásica)

- Archivo: `pacto-5149-canonico.sig`
- Tamaño: 64 bytes
- Algoritmo: Ed25519 (EdDSA)
- Llave pública: verificación con `fundador-v3.pub`
- Anclaje: Bitcoin tx `34842cc1...` y `ae0ce809...`
- Verificación: `Signature Verified Successfully`

## Firma 2 · ML-DSA-65 (post-cuántica)

- Archivo: `pacto-5149-canonico.mldsa65.sig`
- Tamaño: 3309 bytes
- Algoritmo: ML-DSA-65 (NIST FIPS 204)
- Librería: dilithium-py 1.5.1
- Llave pública: `07-LLAVES/POST-QUANTUM/fundador-mldsa65.pub` (1952 bytes)
- Verificación: OK
- Anclaje: pendiente OTS

## Propósito de la firma híbrida

Doble blindaje criptográfico:

1. Ed25519 → compatible universalmente, verificable con OpenSSL
2. ML-DSA-65 → resistente a ataques de computación cuántica

Cualquier verificador futuro puede comprobar:

- La firma Ed25519 (rápida, amplia compatibilidad)
- La firma ML-DSA-65 (robusta ante amenaza cuántica)

Si una falla por obsolescencia, la otra permanece válida.

## Cómo verificar

Firma Ed25519:
openssl pkeyutl -verify -rawin -pubin \
-inkey fundador-v3.pub \
-in pacto-5149-canonico.txt \
-sigfile pacto-5149-canonico.sig

Firma ML-DSA-65:
from dilithium_py.ml_dsa import ML_DSA_65
pk = open("fundador-mldsa65.pub", "rb").read()
msg = open("pacto-5149-canonico.txt", "rb").read()
sig = open("pacto-5149-canonico.mldsa65.sig", "rb").read()
assert ML_DSA_65.verify(pk, msg, sig)

---

`◯_● · 51/49/100 · Nodo YHDRYH-92CE · 2026-10-15`
