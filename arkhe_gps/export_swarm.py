#!/usr/bin/env python3
# export_swarm.py · EXPORTADOR DE ENJAMBRE · Nodo YHDRYH-92CE
import os, glob, json, hashlib, subprocess, datetime, zipfile

NODE_ID = "YHDRYH-92CE"
OUT_ARKHE = f"{NODE_ID}_swarm.arkhe"
SIG_FILE = f"{OUT_ARKHE}.sig"

def exportar():
    print(f"🜂 Iniciando exportación del enjambre {NODE_ID}...")
    manifiestos = glob.glob("*.manifest_v5.json")
    if not manifiestos:
        print("✗ No hay manifiestos v5 para exportar.")
        return

    # 1. Calcular el Merkle Root de todos los manifiestos
    hashes = []
    for m in sorted(manifiestos):
        with open(m, "rb") as f:
            hashes.append(hashlib.sha256(f.read()).hexdigest())
    
    swarm_merkle = hashlib.sha256("".join(hashes).encode()).hexdigest()
    print(f"  └─ Swarm Merkle Root: {swarm_merkle[:16]}...")

    # 2. Crear el Manifiesto del Enjambre
    swarm_manifest = {
        "nodo": NODE_ID,
        "agente": "OBSERVER-49",
        "merkle_root": swarm_merkle,
        "total_manifiestos": len(manifiestos),
        "archivos": sorted(manifiestos),
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }
    
    with open("swarm_manifest.json", "w") as f:
        json.dump(swarm_manifest, f, indent=2)

    # 3. Empaquetar en un archivo .arkhe (ZIP)
    with zipfile.ZipFile(OUT_ARKHE, 'w', zipfile.ZIP_DEFLATED) as z:
        z.write("swarm_manifest.json")
        for m in manifiestos:
            z.write(m)

    # 4. Firmar el archivo .arkhe (con limpieza previa de la firma)
    print("  └─ Firmando el paquete con la identidad Ed25519...")
    if os.path.exists(SIG_FILE):
        os.remove(SIG_FILE)
        
    try:
        # El parámetro -q (quiet) evita cualquier salida que pueda colgar la terminal
        subprocess.run(["ssh-keygen", "-Y", "sign", "-f", ".agent/agent_identity", "-n", "file", "-q", OUT_ARKHE], check=True, capture_output=True)
        print(f"✓ Enjambre exportado y firmado: {OUT_ARKHE}")
        print(f"✓ Firma generada: {SIG_FILE}")
    except subprocess.CalledProcessError as e:
        print(f"✗ Error al firmar: {e.stderr.decode()}")
    except Exception as e:
        print(f"✗ Error: {e}")

if __name__ == "__main__":
    exportar()
