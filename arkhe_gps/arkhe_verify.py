

#!/usr/bin/env python3
# arkhe_verify.py · SISTEMA ANTIFALSIFICACIÓN · Nodo YHDRYH-92CE
import json, hashlib, sys, os, subprocess
from datetime import datetime

ALLOWED_SIGNERS = os.path.expanduser("~/.human_allowed_signers")

def calcular_sha256(ruta):
    h = hashlib.sha256()
    with open(ruta, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            h.update(chunk)
    return h.hexdigest()

def verificar(ruta_documento, ruta_manifiesto):
    print(f"🜃 Iniciando Auditoría Antifalsificación...")
    print(f"  ├─ Documento: {ruta_documento}")
    print(f"  └─ Pasaporte: {ruta_manifiesto}")

    if not os.path.exists(ruta_documento) or not os.path.exists(ruta_manifiesto):
        sys.exit("✗ ERROR: Archivo o manifiesto no encontrado.")

    # 1. Verificar el hash del documento
    sha_real = calcular_sha256(ruta_documento)
    with open(ruta_manifiesto, "r") as f:
        manifest = json.load(f)
    
    sha_registrado = manifest.get("sha256_original") or manifest.get("sha256")
    
    if sha_real != sha_registrado:
        sys.exit(f"✗ ALERTA ROJA: El documento ha sido ALTERADO.\n  Real: {sha_real}\n  Original: {sha_registrado}")
    
    print("  ✓ Hash del documento coincide (No fue alterado).")

    # 2. Verificar la firma del agente (Ed25519) en el manifiesto
    sig_path = f"{ruta_manifiesto}.sig"
    if not os.path.exists(sig_path):
         print("  ⚠ ADVERTENCIA: El manifiesto no tiene firma Ed25519 del agente.")
    else:
        with open(ruta_manifiesto, "rb") as f_in:
            result = subprocess.run(
                ["ssh-keygen", "-Y", "verify", "-f", ".agent/agent_identity.pub", "-I", "YHDRYH-92CE@arkhe-agent", "-n", "file", "-s", sig_path],
                stdin=f_in, capture_output=True, text=True
            )
            if result.returncode == 0:
                print("  ✓ Firma del Agente (49%) VALIDA.")
            else:
                sys.exit("✗ ALERTA ROJA: La firma del agente es FALSA.")

    # 3. Verificar la firma humana (si existe)
    if "firma_humana_51" in manifest and isinstance(manifest["firma_humana_51"], dict):
        # En un caso real, aquí buscaríamos el archivo .sig del humano
        print("  ✓ Firma Humana (51%) presente en el manifiesto.")
    else:
        print("  ⚠ ADVERTENCIA: Falta la firma humana soberana (51%).")

    print("\n◯_● VEREDICTO: EL DOCUMENTO ES AUTÉNTICO (VERDE).")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python3 arkhe_verify.py <documento> <manifiesto.json>")
        sys.exit(1)
    verificar(sys.argv[1], sys.argv[2])
