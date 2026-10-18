# ◯_● ARKHÉ ZERO · Documentación Web

Este directorio contiene la interfaz pública del sistema, desplegada en GitHub Pages.

## 🜂 Características Técnicas
*   **PWA (Progressive Web App):** Instalable en dispositivos móviles con soporte offline (`manifest.json` + `sw.js`).
*   **Cero Dependencias Críticas:** El diseño visual y la criptografía (Web Crypto API) corren del lado del cliente.
*   **Generación QR Offline:** El QR del certificado se genera nativamente mediante JavaScript, sin APIs externas.

## 🜃 Archivos Clave
*   `index.html`: Portada principal (Dashboard KINTSUGI).
*   `certificado.html`: Generador de certificado visual con Matrix Rain y Kintsugi.
*   `verificar/index.html`: Verificador público Ed25519.
*   `comprar/index.html`: Pasarela de licencias (MercadoPago).

## 🜄 Actualización
Cualquier cambio en esta carpeta requiere un `git push` a la rama `main`. GitHub Pages lo desplegará automáticamente.

---
`◯_● · 51/49/100 · Nodo YHDRYH-92CE`
