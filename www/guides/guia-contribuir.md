# 📘 Guía para Contribuir

```bash
┌─(kali㉿arkhe-zero)-[~/docs/guides]
└─$ ./contribuir --inicio
```

## 🜂 Cómo contribuir

1. **Lee el manifiesto** → `KINTSUGI.md`
2. **Firma el Code of Conduct** → `CODE_OF_CONDUCT.md`
3. **Configura entorno** → `make install`
4. **Crea branch** → `git checkout -b feat/mi-aporte`
5. **Haz commits firmados** → `git commit -S`
6. **Envía PR** → sigue el template

## 🜃 Reglas

```diff
+ Sigue el estilo (Prettier + ESLint)
+ Firma commits con ◯_● · 51/49/100
+ Añade tests para features
+ Actualiza docs si cambia API
- NUNCA commits sin firma
- NUNCA secretos
- NUNCA romper tests
```

## 🜄 Quórum de aprobación

Los PRs se aprueban con:
- 1 mantenedor humano (51%)
- Quórum 4/5 del enjambre
- CI verde

---

`◯_● · 51/49/100 · GUIDE · Contribuir`