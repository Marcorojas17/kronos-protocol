#!/bin/bash
# ARKHÉ ZERO · AUTO-ARRANQUE · Debian UserLAnd
# NODO YHDRYH-92CE · SCDR-001 · ◯_● · 51/49/100

GREEN='\033[0;32m'; GOLD='\033[0;33m'; RED='\033[0;31m'; CYAN='\033[0;36m'; NC='\033[0m'

echo ""
echo -e "${GOLD}◯_● ARKHÉ ZERO · Arrancando servicios...${NC}"
echo ""

# ─── 1. CRON ────────────────────────────────────────────────────────────────
echo -e "${CYAN}[1/3]${NC} Verificando cron..."

if pgrep -x cron > /dev/null 2>&1; then
    echo -e "  ${GREEN}[✓]${NC} cron ya activo (PID: $(pgrep -x cron))"
else
    # Intentar arrancar cron sin sudo (si userland tiene permiso)
    sudo cron 2>/dev/null &
    sleep 1
    if pgrep -x cron > /dev/null 2>&1; then
        echo -e "  ${GREEN}[✓]${NC} cron iniciado (PID: $(pgrep -x cron))"
    else
        echo -e "  ${GOLD}[!]${NC} cron no disponible (se requiere sudo)"
    fi
fi

# ─── 2. SERVIDOR WEB ────────────────────────────────────────────────────────
echo -e "${CYAN}[2/3]${NC} Iniciando servidor web..."

if pgrep -f "http.server" > /dev/null 2>&1; then
    echo -e "  ${GREEN}[✓]${NC} Servidor ya activo"
else
    mkdir -p "$HOME/arkhe-zero/index"
    mkdir -p "$HOME/arkhe-zero/logs"
    
    if [ -f "$HOME/arkhe-zero/index/arkhe-zero.html" ]; then
        cd "$HOME/arkhe-zero/index"
        nohup python3 -m http.server 8080 > "$HOME/arkhe-zero/logs/server.log" 2>&1 &
        sleep 2
        if pgrep -f "http.server" > /dev/null 2>&1; then
            echo -e "  ${GREEN}[✓]${NC} Servidor web en http://localhost:8080"
        else
            echo -e "  ${RED}[✗]${NC} Servidor no arrancó"
        fi
    else
        echo -e "  ${GOLD}[!]${NC} Falta arkhe-zero.html en ~/arkhe-zero/index/"
    fi
fi

# ─── 3. VERIFICACIÓN ────────────────────────────────────────────────────────
echo -e "${CYAN}[3/3]${NC} Verificando sistema..."

[ -x "$HOME/arkhe-zero/auto-backup.sh" ] && \
    echo -e "  ${GREEN}[✓]${NC} auto-backup.sh listo" || \
    echo -e "  ${RED}[✗]${NC} auto-backup.sh no es ejecutable"

[ -d "$HOME/arkhe-backups" ] && \
    echo -e "  ${GREEN}[✓]${NC} ~/arkhe-backups/ listo" || \
    echo -e "  ${GOLD}[!]${NC} ~/arkhe-backups/ no existe"

echo ""
echo -e "${GOLD}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GOLD}  ◯_● ARKHÉ ZERO · NODO YHDRYH-92CE · SCDR-001${NC}"
echo -e "${GOLD}═══════════════════════════════════════════════════════════${NC}"
echo ""
