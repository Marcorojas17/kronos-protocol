<!--
╔══════════════════════════════════════════════════════════════════════════╗
║  ▓▒░ HSM SETUP · HARDWARE SECURITY MODULE · ARKHÉ ZERO ░▒▓               ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 🔐 Setup de HSM

## 🜂 Opciones de HSM

| Tipo             | Costo        | Uso                                |
|------------------|--------------|------------------------------------|
| **YubiHSM 2**    | ~$650 USD    | ⭐ Recomendado · portable · auditado |
| **CloudHSM** (AWS) | ~$1.45/hora | Producción · alta disponibilidad   |
| **SoftHSM**      | Gratis       | Desarrollo · testing               |
| **Ledger Nano**  | ~$80 USD     | Uso personal · backup              |
| **Trezor Model T** | ~$180 USD  | Uso personal · open source         |

## 🜃 Setup YubiHSM 2 (recomendado)

### 1 · Instalar herramientas

```bash
# macOS
brew install yubihsm-shell

# Linux
apt install yubihsm-shell
```

### 2 · Conectar y autenticar

```bash
yubihsm-shell
> connect
> session open 1 password
```

### 3 · Generar clave ML-DSA-87

```bash
> generate asymmetric 0 100 "ml-dsa-87-key-1" 1,2,3 sign-pkcs, sign-pss
```

### 4 · Exportar clave pública

```bash
> get object 100 public-key > ml-dsa-87-key-1.pub
```

### 5 · Registrar en 07-LLAVES/ATESTACIONES/

```bash
cp ml-dsa-87-key-1.pub ../07-LLAVES/ATESTACIONES/
```

## 🜄 Configuración del sistema

```env
# .env
HSM_ENABLED=true
HSM_TYPE=yubihsm
HSM_CONNECTOR=http://localhost:12345
HSM_AUTH_KEY_ID=1
HSM_PASSWORD=************
HSM_DEFAULT_KEY=ml-dsa-87-key-1
```

## 🜁 Verificación

```bash
┌─(kali㉿arkhe-zero)-[~/04_SEGURIDAD]
└─$ ./verify-hsm.sh

[ OK ] HSM conectado
[ OK ] Sesión autenticada
[ OK ] Clave ml-dsa-87-key-1 cargada
[ OK ] Firma de prueba válida
[ ✓✓ ] HSM OPERATIVO · ◯_● · 51/49/100
```

## 🜆 Reglas

```diff
+ Toda clave maestra DEBE vivir en HSM
+ Todo backup DEBE estar cifrado con Shamir 51/100
+ Toda rotación DEBE documentarse en LLAVE_QUEMADA_EVIDENCIA.md
+ Todo acceso DEBE quedar en audit.log
- NUNCA exportar clave privada del HSM
- NUNCA guardar PIN en texto plano
- NUNCA usar SoftHSM en producción
```

---

`◯_● · 51/49/100 · KRONOS · HSM-setup`