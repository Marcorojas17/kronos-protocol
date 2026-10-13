#!/usr/bin/env python3
import sys, subprocess
from pathlib import Path

BASE = Path.home() / "arkhe-zero" / "testimonio"
SELLOS = BASE / "sellos"
PY = sys.executable

def run(script, *args):
    return subprocess.run([PY, str(BASE / script), *args],
                          capture_output=True, text=True)

def main():
    if len(sys.argv) < 3:
        print("uso: arkhe-sellar.py <archivo> <autor>")
        sys.exit(2)
    archivo, autor = sys.argv[1], sys.argv[2]

    print("")
    print("═══ ARKHÉ ZERO · sellando ═══")
    print("")

    # 1. Sellar
    print("[1/3] SHA-3 · sellando")
    r = run("sellar.py", archivo, autor)
    print(r.stdout)
    if r.returncode != 0:
        print(r.stderr); sys.exit(1)

    sid = None
    for line in r.stdout.splitlines():
        if line.startswith("sello_id"):
            sid = line.split(":", 1)[1].strip()
    if not sid:
        print("no se pudo leer sello_id"); sys.exit(1)

    # 2. Anclar
    print("[2/3] OpenTimestamps · anclando")
    commit = str(SELLOS / (sid + ".commit"))
    r = run("ots-http.py", commit)
    print(r.stdout or r.stderr)

    # 2.5 Envolver el .ots con el header correcto
    run("reconstruir-ots.py")

    # 3. Firmar con el MISMO id
    print("[3/3] ML-DSA-87 · firmando")
    r = run("firmar.py", "sign", archivo, autor, sid)
    print(r.stdout or r.stderr)

    # 4. Generar certificado automáticamente
    print("[✓] Generando certificado HTML...")
    r = run("certificado.py", sid)
    print(r.stdout or r.stderr)

    print("")
    print("═══ ✓ SELLO COMPLETO ═══")
    print("  sello_id:    " + sid)
    print("  certificado: " + str(SELLOS / (sid + ".certificado.html")))
    print("  Bitcoin confirmará en 6–24h")
    print("")

if __name__ == "__main__":
    main()
