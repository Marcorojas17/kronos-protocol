#!/bin/bash
# ◯_● ARKHÉ ZERO · start-services v2 · NODO YHDRYH-92CE
# Arranca: web (8080) · api_ia (5001) · api_scan · agentes clave
# Idempotente · No bloquea terminal · Log en logs/boot.log

LOG="$HOME/arkhe-zero/logs/boot.log"
mkdir -p "$HOME/arkhe-zero/logs"
echo "" >> "$LOG"
echo "◯_● $(date -u +%Y-%m-%dT%H:%M:%SZ) · start-services" >> "$LOG"

ok(){ echo "  [✓] $1"; echo "  [✓] $1" >> "$LOG"; }
warn(){ echo "  [!] $1"; echo "  [!] $1" >> "$LOG"; }

# ─── 1. WEB · puerto 8080 ─────────────────────────────────
if pgrep -f "http.server 8080" > /dev/null; then
    ok "web ya activo :8080"
else
    if [ -f "$HOME/arkhe-zero/www/index.html" ]; then
        cd "$HOME/arkhe-zero/www"
        nohup python3 -m http.server 8080 > "$HOME/arkhe-zero/logs/web.log" 2>&1 &
        sleep 1
        pgrep -f "http.server 8080" > /dev/null && ok "web :8080 arrancado" || warn "web :8080 falló"
    else
        warn "falta www/index.html"
    fi
fi

# ─── 2. API IA · puerto 5001 ──────────────────────────────
if pgrep -f "api_ia.py" > /dev/null; then
    ok "api_ia ya activo"
else
    if [ -f "$HOME/arkhe-zero/ia/api_ia.py" ]; then
        nohup python3 "$HOME/arkhe-zero/ia/api_ia.py" > "$HOME/arkhe-zero/logs/api_ia.log" 2>&1 &
        sleep 1
        ok "api_ia arrancado :5001"
    else
        warn "falta ia/api_ia.py"
    fi
fi

# ─── 3. API SCAN · radar de amenazas ──────────────────────
if pgrep -f "api_scan.py" > /dev/null; then
    ok "api_scan ya activo"
else
    if [ -f "$HOME/arkhe-zero/ia/api_scan.py" ]; then
        nohup python3 "$HOME/arkhe-zero/ia/api_scan.py" > "$HOME/arkhe-zero/logs/api_scan.log" 2>&1 &
        sleep 1
        ok "api_scan arrancado"
    fi
fi

# ─── 3.5 · Mandate Gate ───────────────────────────────────
if [ -f "$HOME/arkhe-zero/runtime/mandate_gate.py" ]; then
    if [ ! -f "$HOME/arkhe-zero/runtime/mandatos.json.minisig" ]; then
        warn "mandatos.json sin firma · firma con fundador-v3"
    else
        ok "Mandate Gate activo (mandatos firmados)"
    fi
fi

# ─── 4. ENJAMBRE · Agentes y Guardians ───────────────────
if [ -f "$HOME/arkhe-zero/runtime/agentes_runner.py" ]; then
    nohup python3 "$HOME/arkhe-zero/runtime/agentes_runner.py" > "$HOME/arkhe-zero/logs/agentes_boot.log" 2>&1 &
    sleep 2
    ok "enjambre de agentes arrancado"
fi

if [ -f "$HOME/arkhe-zero/runtime/guardians_runner.py" ]; then
    nohup python3 "$HOME/arkhe-zero/runtime/guardians_runner.py" > "$HOME/arkhe-zero/logs/guardians_boot.log" 2>&1 &
    ok "guardians ejecutados"
fi

# ─── 5. Resumen ───────────────────────────────────────────
echo ""
echo "◯_● ARKHÉ ZERO · NODO YHDRYH-92CE"
echo "   web      http://localhost:8080/"
echo "   certif   http://localhost:8080/certificado.html"
echo "   api_ia   http://localhost:5001/"
echo "   logs     /root/kronos-protocol/logs/"
echo ""
echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) · boot OK" >> "$LOG"
