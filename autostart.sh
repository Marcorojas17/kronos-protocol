#!/bin/bash
# ARKHÉ ZERO · Autostart
echo "◯_● Iniciando ARKHÉ ZERO..."

# 1. Servidor web en background
cd ~/arkhe-zero/index
pkill -f "http.server" 2>/dev/null
nohup python3 -m http.server 8080 > ~/arkhe-zero/logs/server.log 2>&1 &
echo "  [✓] Servidor en localhost:8080"

# 2. Radar de amenazas
IP=$(ip route | grep default | awk '{print $3}' | head -1)
if [ -n "$IP" ]; then
    echo "  [✓] Gateway detectado: $IP"
fi

# 3. Mensaje de bienvenida
echo ""
echo "  ◯_● Sistema listo. Escribe 'arkhe' para el menú."
echo "  ◯_● URL: http://localhost:8080/arkhe-zero.html"
echo ""

# 4. Lanzar menú principal
~/arkhe-zero/arkhe
