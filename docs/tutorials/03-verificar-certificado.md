# 🎓 Tutorial 03 · Verificar Certificado

```bash
┌─(kali㉿arkhe-zero)-[~/docs/tutorials]
└─$ ./tutorial 03
```

## 🜂 Pasos

### 1 · Obtener hash

```bash
# Desde certificado VC 2.0
hash = "f03f7e2d852617309457e0fe207f8f8bd..."
```

### 2 · Abrir verificador

```bash
┌─(kali㉿arkhe-zero)-[~/]
└─$ open http://localhost:8080/apps/verificar.html
```

### 3 · Ingresar hash

Pega el hash y presiona `▶ VERIFICAR`.

### 4 · Leer veredicto

```text
[ OK ] Hash válido: true
[ OK ] Es Índice Cero: false
>>> HASH VÁLIDO · SIN ANCLAJE AL ÍNDICE CERO

◯_● · 51/49/100
```

---

`◯_● · 51/49/100 · TUTORIAL 03`