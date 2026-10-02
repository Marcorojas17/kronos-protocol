KRONOS PROTOCOL · ESTADO: PRODUCCIÓN · AUDITADO
Versión: v1.0 · Fecha: 2026-10-01
Verificado por: Marco Antonio Rojas Valdovinos

# 📄 KRONOS · RESUMEN EJECUTIVO

Qué es: Protocolo de verificación criptográfica local-first.
Qué resuelve: Prueba quién originó una intención antes de que entrara al sistema.
Estado: Pipeline E2E funcionando. 0 clientes pagando.

---

## 1. El problema

Todo el internet guarda QUÉ pasó y CUÁNDO pasó. Nada guarda QUIÉN decidió que algo importaba, ANTES de que entrara a un sistema.

Eso rompe la cadena de origen. En ventas inmobiliarias, en salud, en autoría de ideas, en cualquier disputa donde el primero importa.

---

## 2. La solución

Un agente captura el origen con un HTML de 23 KB. Lo firma con Ed25519. Genera dos archivos: boleto.json y boleto.png. La empresa verifica offline. Resultado: ✓ VERIFICADO.

Sin servidor. Sin nube. Sin permiso de nadie.

---

## 3. Cómo se verifica

1. El agente abre capturar-origen.html en el navegador.
2. Firma el origen con su llave privada Ed25519.
3. La empresa carga boleto.json en verificador-empresa.html.
4. El verificador valida 5 criterios: hash, firma, pubkey, estado del agente, timestamp en periodo.
5. Devuelve uno de 4 estados: ✓ VERIFICADO, ✗ ALTERADO, ⚠ NO AUTORIZADO, ⚠ FUERA PERIODO.

---

## 4. Estado real

Funciona: pipeline E2E, 6 agentes Python en Actions, Ed25519, SHA-256, AES-GCM-256, backup cifrado, anclaje Ethereum.

No funciona: 0 clientes, 0 pesos, 6 Kintsugi sin motor, gobernanza sin usuarios.

Próximo paso: emitir el primer certificado real y probarlo con un caso documentado.

---

## 5. Prueba en 2 minutos

Cualquiera con Brave puede:
1. Abrir marcorojas17.github.io/kronos-protocol/08-HERRAMIENTAS/capturar-origen.html.
2. Firmar un origen de prueba.
3. Verificar el boleto.json resultante en verificador-empresa.html.
4. Confirmar el resultado sin acceso a ningún backend.

---

○_● · ◢◤◥◣ · ◥◣◢◤
51% HUMANO · 49% IA · 100% REAL
"El legado no se hereda. Se firma."