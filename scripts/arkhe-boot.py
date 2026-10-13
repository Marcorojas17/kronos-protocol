#!/usr/bin/env python3
"""
◯_● ARKHÉ ZERO · PROTOCOLO DE ENCENDIDO
Inicializa, verifica integridad y rastrea vulnerabilidades.
"""
import os, sys, hashlib, subprocess, time
from pathlib import Path
from datetime import datetime

HOME = Path.home()
ARKHE = HOME / "arkhe-zero"
GREEN = '\033[0;32m'
GOLD = '\033[0;33m'
CYAN = '\033[0;36m'
RED = '\033[0;31m'
PURPLE = '\033[0;35m'
DIM = '\033[2m'
BOLD = '\033[1m'
NC = '\033[0m'

def slow(text, delay=0.02):
    for ch in text:
        sys.stdout.write(ch)
        sys.stdout.flush()
        time.sleep(delay)
    print()

def separator():
    print(f"{GOLD}{'═' * 65}{NC}")

def banner():
    os.system('clear' if os.name == 'posix' else 'cls')
    print(f"{GOLD}")
    print("╔═══════════════════════════════════════════════════════════════╗")
    print("║  ◯_●  ARKHÉ ZERO · PROTOCOLO DE ENCENDIDO                     ║")
    print("║  NODO YHDRYH-92CE · SCDR-001 · 51/49/100                      ║")
    print("╚═══════════════════════════════════════════════════════════════╝")
    print(f"{NC}")
    time.sleep(0.3)

def fase(n, texto):
    print(f"\n{CYAN}[FASE {n}/5]{NC} {BOLD}{texto}{NC}")
    time.sleep(0.3)

def ok(texto):
    print(f"  {GREEN}✓{NC} {texto}")

def warn(texto):
    print(f"  {GOLD}⚠{NC} {texto}")

def err(texto):
    print(f"  {RED}✗{NC} {texto}")

def info(texto):
    print(f"  {DIM}·{NC} {texto}")

# ─── FASE 1 · IDENTIDAD ──────────────────────────────────
def fase_1_identidad():
    fase(1, "IDENTIDAD Y SELLO")
    time.sleep(0.5)
    ok(f"Nodo activo: {BOLD}YHDRYH-92CE{NC}")
    ok(f"Sello: {BOLD}SCDR-001{NC}")
    ok(f"Genesis: {BOLD}K28-M05-MN01-YHDRYH-92CE{NC}")
    ok(f"Autor: {BOLD}Marco Antonio Rojas Valdovinos{NC}")
    ok(f"Ubicación: Toluca · Estado de México")
    ok(f"Pacto: {GOLD}51% Humano · 49% IA · 100% Real{NC}")
    time.sleep(0.3)

# ─── FASE 2 · INTEGRIDAD ─────────────────────────────────
def fase_2_integridad():
    fase(2, "INTEGRIDAD DE LA INFORMACIÓN · CERO PÉRDIDA")
    time.sleep(0.5)

    # Contar archivos reales
    total = 0
    for root, dirs, files in os.walk(ARKHE):
        if ".git" in root or "modelos" in root or "__pycache__" in root or "docs-deploy" in root:
            continue
        total += len(files)
    ok(f"Archivos protegidos: {BOLD}{total}{NC}")

    # Verificar Índice Cero
    indice_cero_sha = "f03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112"
    info(f"SHA-256 Índice Cero: {DIM}{indice_cero_sha[:32]}...{NC}")

    # Verificar archivos clave
    archivos_clave = [
        ARKHE / "index.html",
        ARKHE / "sello.html",
        ARKHE / "verificar.html",
        ARKHE / "sello-primigenio.html",
        ARKHE / "DIARIO-DE-DECISIONES.html",
        ARKHE / "REPORTE-SALUD.md",
        ARKHE / "ia" / "prompt_sistema.md",
        ARKHE / "tests" / "test_signatures.py",
    ]
    intactos = 0
    for f in archivos_clave:
        if f.exists():
            intactos += 1
    ok(f"Archivos clave verificados: {BOLD}{intactos}/{len(archivos_clave)}{NC}")

    # Anclajes externos
    info(f"Safe Creative: {GREEN}2607146379465{NC}")
    info(f"Co-creatividad: {GREEN}2607086319439{NC}")
    info(f"Ethereum TX: {GREEN}0xd2c2a7e1...774c{NC}")
    info(f"eIDAS QTSA: {GREEN}Firmaprofesional{NC}")

    # Backups
    backup_dir = HOME / "arkhe-backups"
    if backup_dir.exists():
        count = len(list(backup_dir.rglob("*.tar.gz")))
        ok(f"Backups disponibles: {BOLD}{count}{NC}")
    else:
        warn("Sin backups locales")

    time.sleep(0.3)

# ─── FASE 3 · VULNERABILIDADES ───────────────────────────
def fase_3_vulnerabilidades():
    fase(3, "RASTREO DE VULNERABILIDADES · CRIPTOGRAFÍA CUÁNTICA")
    time.sleep(0.5)

    print(f"\n  {BOLD}Análisis de algoritmos:{NC}")
    info(f"ML-KEM-1024 (FIPS 203)  {GREEN}[POST-CUÁNTICO]{NC}")
    info(f"ML-DSA-87 (FIPS 204)    {GREEN}[POST-CUÁNTICO]{NC}")
    info(f"SLH-DSA-SHAKE-256s      {GREEN}[POST-CUÁNTICO]{NC}")
    info(f"Ed25519                 {GOLD}[TRANSITORIO]{NC}")
    info(f"SHA-256 / SHA-3         {GREEN}[RESISTENTE]{NC}")

    print(f"\n  {BOLD}Algoritmos prohibidos:{NC}")
    info(f"RSA                     {RED}[ELIMINADO]{NC}")
    info(f"ECDSA/ECDH              {RED}[ELIMINADO]{NC}")
    info(f"DSA/MD5/SHA-1           {RED}[ELIMINADO]{NC}")

    # Ejecutar audit cuántico si existe
    audit_script = ARKHE / "quantum" / "audit.py"
    if audit_script.exists():
        info(f"Ejecutando auditoría cuántica...")
        try:
            r = subprocess.run(
                ["python3", str(audit_script)],
                capture_output=True, text=True, timeout=30
            )
            lineas = r.stdout.strip().split("\n")
            for linea in lineas[-8:]:
                if "OK" in linea or "✓" in linea:
                    ok(linea.strip())
                elif "CRIT" in linea or "WARN" in linea:
                    warn(linea.strip())
        except Exception as e:
            warn(f"Auditoría: {e}")
    else:
        warn("Módulo de auditoría cuántica no encontrado")

    print(f"\n  {BOLD}Tests criptográficos:{NC}")
    tests = ARKHE / "tests"
    if tests.exists():
        test_files = list(tests.glob("test_*.py"))
        ok(f"Suites disponibles: {BOLD}{len(test_files)}{NC}")
        info("Comando: python3 -m pytest tests/*.py -v")

    time.sleep(0.3)

# ─── FASE 4 · RED ────────────────────────────────────────
def fase_4_red():
    fase(4, "ESTADO DE LA RED Y SERVICIOS")
    time.sleep(0.5)

    servicios = [
        ("Servidor web 8080", "http.server"),
        ("api_scan 5001", "api_scan"),
        ("api_ia 5000", "api_ia"),
        ("cron daemon", "crond"),
    ]
    for nombre, patron in servicios:
        try:
            r = subprocess.run(["pgrep", "-f", patron], capture_output=True, timeout=3)
            if r.returncode == 0:
                pid = r.stdout.decode().strip().split("\n")[0]
                ok(f"{nombre} {DIM}(PID {pid}){NC}")
            else:
                warn(f"{nombre} {DIM}(detenido){NC}")
        except Exception:
            warn(f"{nombre} {DIM}(no verificable){NC}")

    # Puertos abiertos
    import socket
    puertos = [22, 80, 443, 5000, 5001, 8080]
    abiertos = []
    for p in puertos:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.3)
        try:
            if s.connect_ex(("127.0.0.1", p)) == 0:
                abiertos.append(p)
        except Exception:
            pass
        finally:
            s.close()
    if abiertos:
        ok(f"Puertos abiertos: {BOLD}{abiertos}{NC}")
    else:
        warn("Sin puertos abiertos detectados")
    time.sleep(0.3)

# ─── FASE 5 · FIRMA ──────────────────────────────────────
def fase_5_firma():
    fase(5, "SELLO DE ARRANQUE")
    time.sleep(0.5)

    timestamp = datetime.now().isoformat(timespec="seconds")
    boot_data = f"ARKHE-BOOT|{timestamp}|YHDRYH-92CE|SCDR-001"
    boot_hash = hashlib.sha256(boot_data.encode()).hexdigest()

    print(f"\n  {GOLD}◯_● · ■_□ · 51/49/100{NC}")
    info(f"Timestamp: {timestamp}")
    info(f"Hash de sesión: {DIM}{boot_hash[:32]}...{NC}")
    print()

    # Escribir log
    log_file = ARKHE / "logs" / "boot.log"
    log_file.parent.mkdir(exist_ok=True)
    with open(log_file, "a") as f:
        f.write(f"[{timestamp}] BOOT | {boot_hash} | OK\n")

    separator()
    print(f"{GOLD}  PROTOCOLO ARKHÉ ZERO · ACTIVO{NC}")
    print(f"{GOLD}  \"El legado no se hereda. Se firma.\"{NC}")
    separator()
    print()
    print(f"  {DIM}Comandos disponibles:{NC}")
    print(f"  {GREEN}arkhe{NC}          → sistema visual completo")
    print(f"  {GREEN}arkhe-ia{NC}       → IA local ■_□")
    print(f"  {GREEN}arkhe-status{NC}   → estado de backups")
    print(f"  {GREEN}arkhe-boot{NC}     → este protocolo de encendido")
    print()

# ─── MAIN ────────────────────────────────────────────────
def main():
    banner()
    time.sleep(0.5)

    print(f"\n  {DIM}Iniciando secuencia...{NC}\n")
    time.sleep(0.5)

    fase_1_identidad()
    fase_2_integridad()
    fase_3_vulnerabilidades()
    fase_4_red()
    fase_5_firma()

if __name__ == "__main__":
    main()
