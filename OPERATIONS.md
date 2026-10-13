# Operaciones

## Estado del servicio

Comando: curl -s https://TU-DOMINIO/health

Respuesta: {"status": "ok", "version": "1.0.0", "algorithms": ["Ed25519", "ML-DSA-65"]}

## Despliegue

Deploy normal: git push origin main (Railway redeploya en 2-3 min).

Rollback: Railway dashboard → Deployments → deploy anterior → Redeploy.

## Incidentes comunes

### El servicio no responde

1. Verificar estado del deploy en Railway
2. Si dice Crashed, ver logs
3. Si dice Active pero no responde, revisar PORT

### /verify devuelve 500

1. Ver logs del deploy
2. Buscar Traceback
3. Causa común: import faltante en requirements.txt

### /verify devuelve 429

1. Incrementar KRONOS_RATE_CAPACITY a 60-100
2. Redeploy

### /verify devuelve 504

1. Incrementar KRONOS_VERIFY_TIMEOUT a 5.0

### Se filtró KRONOS_ADMIN_KEY

1. Generar nueva llave
2. Actualizar en Railway Variables
3. Redeploy automático
4. Rotar cada 90 días

## Backups

Semanal: descargar audit.jsonl desde Railway.
Mensual: snapshot de configuración.

## Contacto

Marco Antonio Rojas Valdovinos
contacto@kronos3hash.online

## Advertencia

KRONOS no tiene SLA. Sin soporte 24/7.
