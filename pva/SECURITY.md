# SECURITY.md - PVA Protocolo Vida Autopoietica
**FOLIO PERICIAL:** KRONOS-MT01JAAF
**FOLIO MAESTRO:** 5204160405358537
**SHA GENESIS:** a4ff808e
**HASH GENESIS:** 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
**FECHA:** 2024-11-03 02:17:44 UTC
**MODO:** LUZ PRENDIDA OFFLINE - 100/10

## 1. Política 51/49 - Regla Inquebrantable
- 51% Humano: intención, revisión, firma pericial
- 49% Algorítmico: hash SHA-256, PDF, HMAC
REGLA 0: Ningún dictamen sin validar_firma() + validación humana

## 2. Cadena Custodia ISO 27037 / NOM-151 / eIDAS
1. Genesis: config/genesis_hash.json
2. Manifiesto: cadena_sha256.txt
3. Sellado: FOLIO 5204160405358537-N{1,2,3}-KRONOS-MT01JAAF
4. Webhook: x-signature HMAC con MP_WEBHOOK_SECRET
5. Entrega: PDF + QR en web/verification.html

## 3. Secretos
Nunca commitear .env, audit/*.pdf, cola_reintento/
Usar .env.example + env en render.yaml

## 4. Vuln Disclosure
NO Issues públicos. Email: kronosproyecto@hotmail.com
Asunto: [SECURITY_VULN] KRONOS-MT01JAAF
SLA 72h respuesta, 7 días fix

## 5. Alcance
app.py /webhook/mp, marketplace.html, generar_links.py, audit/

## 6. Auditoria
python scripts/auditoria_borrado.py -> debe dar 100/10

## 7. Contacto
Perito: kronosproyecto@hotmail.com - Folio: 5204160405358537 - MT01JAAF
