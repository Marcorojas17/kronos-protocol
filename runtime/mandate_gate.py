#!/usr/bin/env python3
"""◯_● Mandate Gate · verifica que cada acción de agente esté autorizada."""
import os, sys, json, hashlib, fcntl
from datetime import datetime, timezone
from pathlib import Path

ARKHE = Path.home() / "arkhe-zero"
RUNTIME = ARKHE / "runtime"
MANDATOS = RUNTIME / "mandatos.json"
LOG_AUDIT = ARKHE / "logs" / "mandate_audit.log"
LOG_AUDIT.parent.mkdir(parents=True, exist_ok=True)

def cargar_mandatos():
    if not MANDATOS.exists():
        raise FileNotFoundError(f"Mandatos no encontrados: {MANDATOS}")
    return json.loads(MANDATOS.read_text(encoding="utf-8"))

def auditar(agente, accion, permitido, razon):
    ts = datetime.now(timezone.utc).isoformat()
    linea = f"[{ts}] [{agente}] [{accion}] {'✅ PERMITIDO' if permitido else '❌ DENEGADO'} · {razon}\n"
    try:
        with open(LOG_AUDIT, "a") as f:
            fcntl.flock(f, fcntl.LOCK_EX)
            f.write(linea)
            fcntl.flock(f, fcntl.LOCK_UN)
    except Exception:
        pass
    return linea.strip()

def verificar(agente, accion):
    """Devuelve (permitido: bool, razon: str)."""
    try:
        m = cargar_mandatos()
    except Exception as e:
        auditar(agente, accion, False, f"error cargando mandatos: {e}")
        return False, f"error cargando mandatos: {e}"

    info = m.get("agentes", {}).get(agente)
    if not info:
        razon = f"agente '{agente}' no tiene mandato"
        auditar(agente, accion, False, razon)
        return False, razon

    if accion in info.get("acciones_prohibidas", []):
        razon = f"acción '{accion}' está prohibida para {agente}"
        auditar(agente, accion, False, razon)
        return False, razon

    if accion in info.get("acciones_permitidas", []):
        if info.get("requiere_aprobacion_humana"):
            razon = f"acción '{accion}' requiere aprobación humana"
            auditar(agente, accion, False, razon)
            return False, razon
        razon = f"acción '{accion}' permitida (nivel {info.get('nivel_autonomia')})"
        auditar(agente, accion, True, razon)
        return True, razon

    razon = f"acción '{accion}' no está en la lista de {agente}"
    auditar(agente, accion, False, razon)
    return False, razon

def stats():
    """Muestra resumen del log de auditoría."""
    if not LOG_AUDIT.exists():
        print("Sin actividad auditada aún.")
        return
    lineas = LOG_AUDIT.read_text().splitlines()
    permitidas = sum(1 for l in lineas if "✅ PERMITIDO" in l)
    denegadas = sum(1 for l in lineas if "❌ DENEGADO" in l)
    print(f"═══ AUDITORÍA MANDATE GATE ═══")
    print(f"Total: {len(lineas)} eventos")
    print(f"✅ Permitidos: {permitidas}")
    print(f"❌ Denegados:  {denegadas}")
    print(f"📄 Log: {LOG_AUDIT}")
    print()
    print("Últimos 10 eventos:")
    for l in lineas[-10:]:
        print(f"  {l}")

if __name__ == "__main__":
    if len(sys.argv) >= 3:
        agente, accion = sys.argv[1], sys.argv[2]
        permitido, razon = verificar(agente, accion)
        print(f"{'✅ PERMITIDO' if permitido else '❌ DENEGADO'} · {agente} → {accion}")
        print(f"   {razon}")
        sys.exit(0 if permitido else 1)
    elif len(sys.argv) == 2 and sys.argv[1] == "stats":
        stats()
    else:
        print("Uso:")
        print("  mandate_gate.py <agente> <accion>   · verifica permiso")
        print("  mandate_gate.py stats                · resumen de auditoría")
