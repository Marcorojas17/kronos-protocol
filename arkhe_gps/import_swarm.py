#!/usr/bin/env python3
# import_swarm.py · IMPORTADOR Y VERIFICADOR DE ENJAMBRE (Corregido)
import sys, os, json, hashlib, subprocess, zipfile, tempfile

def verificar_swarm(arkhe_file):
    print(f"🜃 Verificando paquete de enjambre: {arkhe_file}")
    
    sig_file = f"{arkhe_file}.sig"
    if not os.path.exists(sig_file):
        sys.exit("✗ FALLO: El paquete no tiene firma del agente.")
    
    # 1. Preparar el archivo de "allowed_signers" correctamente
    with open(".agent/agent_identity.pub", "r") as f:
        parts = f.read().strip().split()
    
    with open("allowed_signers", "w") as f:
        f.write(f"YHDRYH-92CE@arkhe-agent {parts[0]} {parts[1]}\n")
    
    # 2. Verificar la firma pasando el archivo por STDIN
    try:
        with open(arkhe_file, 'rb') as f_in:
            result = subprocess.run(
                ["ssh-keygen", "-Y", "verify", "-f", "allowed_signers", "-I", "YHDRYH-92CE@arkhe-agent", "-n", "file", "-s", sig_file],
                stdin=f_in,
                capture_output=True,
                text=True,
                check=True
            )
        print("✓ Firma del Agente (Ed25519) VERIFICADA.")
    except subprocess.CalledProcessError as e:
        sys.exit(f"✗ FALLO DE FIRMA: El paquete no fue firmado por el agente legítimo.\n{e.stderr}")

    # 3. Extraer y verificar Merkle Root
    with tempfile.TemporaryDirectory() as tmpdir:
        with zipfile.ZipFile(arkhe_file, 'r') as z:
            z.extractall(tmpdir)
        
        with open(os.path.join(tmpdir, "swarm_manifest.json"), "r") as f:
            swarm_manifest = json.load(f)
            
        hashes = []
        for m in swarm_manifest["archivos"]:
            m_path = os.path.join(tmpdir, m)
            if not os.path.exists(m_path):
                sys.exit(f"✗ FALLO: Falta el manifiesto {m} en el paquete.")
            with open(m_path, "rb") as f:
                hashes.append(hashlib.sha256(f.read()).hexdigest())
        
        merkle_calculado = hashlib.sha256("".join(hashes).encode()).hexdigest()
        
        if merkle_calculado != swarm_manifest["merkle_root"]:
            sys.exit("✗ FALLO: El Merkle Root no coincide. El paquete fue alterado.")
        
        print(f"✓ Merkle Root verificado: {merkle_calculado[:16]}...")
        print(f"✓ El enjambre contiene {swarm_manifest['total_manifiestos']} manifiestos válidos.")
        print("◯_● PAQUETE .arkhe ACEPTADO. El enjambre es auténtico.")

if __name__ == "__main__":
    verificar_swarm(sys.argv[1])
