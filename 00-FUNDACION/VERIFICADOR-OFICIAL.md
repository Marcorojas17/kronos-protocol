# Verificador oficial KRONOS

> Este documento define **cuál es el único verificador autorizado** para
> validar registros KRONOS, KÓDICE y kronos360. Cualquier otro archivo
> que se presente como verificador y no coincida con el hash de este
> documento **es falso**.

---

## Identificación

| Campo | Valor |
|---|---|
| Archivo | `02-VERIFICADOR/verificador.html` |
| Versión | v0.3 |
| SHA-256 del archivo | `b01baf1ccc19ac0d5a47bec4ab8e2bdc0b0e0e7ce1d6ffff829a061622e0fa33` |
| Fecha de cálculo | 2026-09-30 |
| Clave pública Fundador | `fd2fb1e9f198f5fa08ec6391b67730e3d997826c40cd7652dd5774aa5e744977` |
| Firma Ed25519 del hash | `PENDIENTE_DE_FIRMAR` |

---

## Regla de uso

1. Cuando alguien te entregue un verificador, abrilo.
2. Arriba debe mostrar:
   - `SHA-256 esperado: b01baf1ccc19ac0d5a47bec4ab8e2bdc0b0e0e7ce1d6ffff829a061622e0fa33`
   - `Firma Fundador: PENDIENTE_DE_FIRMAR`
3. **Compará ese hash con el de este documento.**
4. Si coincide → el verificador es auténtico.
5. Si no coincide → es falso. **No lo uses.** Reportalo.

---

## Cómo verificar el hash

Desde cualquier terminal:

```sh
sha256sum 02-VERIFICADOR/verificador.html