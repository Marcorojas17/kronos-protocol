# Sucesión de Llaves Fundacionales · ARKHÉ ZERO

## fundador-v1

- Estado: Desconocido
- Ubicación: —
- Nota: probablemente nunca existió

## fundador-v2

- Creada: 2026-10-13
- Uso: Firma del Pacto 51/49, Génesis K28, 7 atestaciones de agentes
- Estado: 🟡 HISTÓRICA
- Exposición: estuvo en historial de git; removida 2026-10-15 con git filter-repo
- Anclajes Bitcoin vigentes:
  - Pacto: tx 34842cc1d4f8e3debdac8e633168833391cd53ad5dc40ed1b85720912aee4251
  - Pacto: tx ae0ce8093761c52d267308e0650cd5b21580ea76b48954ecd1357862fd6e5643
- Decisión: conservar como válida para documentos ya firmados
  (Bitcoin no se puede reescribir; las firmas ya son inmutables)

## fundador-v3

- Creada: 2026-10-15
- Uso: Firmas futuras a partir del 2026-10-15
- Estado: ✅ ACTIVA
- Ubicación privada: ~/.arkhe-private/fundador-v3.key (NUNCA en repo)
- Ubicación pública: 07-LLAVES/FUNDADOR-V3/fundador-v3.pub

## Política de uso

Toda nueva firma debe usar fundador-v3. Las firmas con fundador-v2
son válidas históricamente pero no se usarán para nuevos documentos.

## Reglas de protección

1. Toda llave privada vive en ~/.arkhe-private/ (nunca en repo)
2. .gitignore excluye *.key, *.pem, firmas privadas
3. Antes de cada commit: git status --short | grep -E "\.key$|\.pem$|privada"
4. Auditoría periódica: git log --all --diff-filter=A --name-only --pretty=format: | sort -u | grep -E "\.key$|\.pem$"

Autor: Marco Antonio Rojas Valdovinos · Nodo YHDRYH-92CE · 2026-10-15

## Llaves Post-Cuánticas (NIST FIPS 204)

### fundador-mldsa65

- Creada: 2026-10-15
- Algoritmo: ML-DSA-65 (Dilithium3, NIST FIPS 204)
- Tamaño clave pública: 1952 bytes
- Tamaño clave privada: 4032 bytes
- Tamaño firma: 3309 bytes
- Librería: dilithium-py 1.5.1 (Python puro)
- Estado: ✅ ACTIVA
- Ubicación privada: ~/.arkhe-private/post-quantum/fundador-mldsa65.key
- Ubicación pública: 07-LLAVES/POST-QUANTUM/fundador-mldsa65.pub

### Uso

- Firma híbrida: Ed25519 + ML-DSA-65 sobre el mismo documento
- Doble blindaje: compatibilidad universal + resistencia cuántica
- Documentado en: 07-LLAVES/ATESTACIONES/HIBRIDA-pacto-5149.md

### Verificación

    python3 -c "
    from dilithium_py.ml_dsa import ML_DSA_65
    pk = open('fundador-mldsa65.pub','rb').read()
    msg = open('pacto-5149-canonico.txt','rb').read()
    sig = open('pacto-5149-canonico.mldsa65.sig','rb').read()
    print('OK' if ML_DSA_65.verify(pk, msg, sig) else 'FALLO')
    "
