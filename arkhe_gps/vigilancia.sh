#!/data/data/com.termux/files/usr/bin/bash
# vigilancia.sh · AGENTE OBSERVER-49 · Nodo YHDRYH-92CE
cd ~/kronos-protocol/arkhe_gps

LOG="cron_vigilancia.log"
echo "=== INICIO VIGILANCIA: $(date -u +%Y-%m-%dT%H:%M:%SZ) ===" >> $LOG

# 1. Snapshot de Red (Internet)
python3 agent_net.py https://example.com https://www.iana.org https://www.ietf.org >> $LOG 2>&1

# 2. Auditoría de Blindaje PHP
./check_php_swarm.sh >> $LOG 2>&1

# 3. Exportar y Firmar el Enjambre (.arkhe)
python3 export_swarm.py >> $LOG 2>&1

echo "=== FIN VIGILANCIA ===" >> $LOG
