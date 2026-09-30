# Verificador oficial KRONOS

> Este documento define **cuál es el único verificador autorizado** para
> validar registros KRONOS, KÓDICE y kronos360. Cualquier otro archivo
> que se presente como verificador y no coincida con el hash de este
> documento **es falso**.

---

## Qué es

`02-VERIFICADOR/verificador.html` es el único archivo autorizado para
verificar registros KRONOS, KÓDICE y kronos360 **offline, sin servidor,
sin pedir permiso a nadie**.

Es un archivo HTML autocontenido de ~30 KB. Corre en cualquier navegador
moderno. No requiere instalación. No requiere conexión a internet.

---

## Identificación

| Campo                      | Valor                                                              |
| -------------------------- | ------------------------------------------------------------------ |
| Archivo                    | `02-VERIFICADOR/verificador.html`                                  |
| Versión                    | v0.3                                                               |
| SHA-256 del archivo        | `PENDIENTE_DE_CALCULAR`                                            |
| Firma Ed25519 del Fundador | `PENDIENTE_DE_FIRMAR`                                              |
| Fecha de publicación       | `PENDIENTE`                                                        |
| Clave pública Fundador     | `fd2fb1e9f198f5fa08ec6391b67730e3d997826c40cd7652dd5774aa5e744977` |

---

## Regla de uso

1. **Cuando alguien te entregue un verificador**, abrilo.
2. Arriba de todo debe mostrar:
   - `SHA-256 esperado: <hash>`
   - `Firma Fundador: <firma>`
3. **Compará ese hash con el de este documento.**
4. Si **coincide** → el verificador es auténtico. Usalo.
5. Si **no coincide** → es falso. **No lo uses.** Reportalo al Fundador.

---

## Cómo calcular el hash

Desde cualquier terminal (Linux, macOS, iSH):

```sh
sha256sum 02-VERIFICADOR/verificador.html
```
