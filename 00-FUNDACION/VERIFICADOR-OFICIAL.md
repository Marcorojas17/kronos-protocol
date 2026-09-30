# Verificador oficial KRONOS

## Qué es

`03-VERIFICADOR/verificador.html` es el único archivo autorizado para
verificar registros KRONOS, KÓDICE y kronos360 offline.

Cualquier otro archivo que se presente como "verificador" y no coincida
con el hash de este documento, **es falso**.

## Identificación

| Campo | Valor |
|---|---|
| Archivo | `03-VERIFICADOR/verificador.html` |
| Versión | v0.3 |
| SHA-256 del archivo | `PENDIENTE_DE_CALCULAR` |
| Firma Ed25519 del Fundador | `PENDIENTE_DE_FIRMAR` |
| Fecha de publicación | `PENDIENTE` |

## Regla de uso

1. Cuando alguien te entregue un verificador, abrilo.
2. Arriba de todo debe mostrar:
   - `SHA-256 esperado: <hash>`
   - `Firma Fundador: <firma>`
3. Compará ese hash con el publicado en este documento.
4. Si **coincide** → el verificador es auténtico.
5. Si **no coincide** → es falso. **No lo uses.** Reportalo.

## Cómo se calcula el hash

```bash
sha256sum 02-VERIFICADOR/verificador.html