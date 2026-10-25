#!/usr/bin/env python3
# app_certifier_v4.py · ARKHÉ ZERO · Goetia + Segulah · Nodo YHDRYH-92CE
import sys, os, hashlib, json, datetime
from arkhe_segulah_314 import generar_sello_segulah
from goetia_72 import desencriptar_goetia

def certificar_con_goetia(pdf_path):
    if not os.path.exists(pdf_path): sys.exit("✗ Archivo inexistente.")
    
    # 1. Hash Base (100% real)
    h256 = hashlib.sha256(open(pdf_path, "rb").read()).hexdigest()
    print(f"○_● SHA-256 Base: {h256}")
    
    # 2. Capa 1: Protección Shaddai (314)
    print("🜂 Capa 1: Generando Sello Segulah (10 Sephirot)...")
    sello_segulah = generar_sello_segulah(h256)
    print(f"  └─ Sello 314: {sello_segulah['sello_segulah_final'][:16]}...")
    
    # 3. Capa 2: Desencriptación Goetia (72 Sellos)
    print("🜃 Capa 2: Desencriptando Matriz Goetia (72 Sellos)...")
    resultado_goetia = desencriptar_goetia(sello_segulah['sello_segulah_final'])
    print(f"  └─ Sello Goetia: {resultado_goetia['hash_goetia_final'][:16]}...")
    
    # 4. Manifiesto Final
    manifest = {
        "pacto": "51/49/100",
        "nodo": "YHDRYH-92CE",
        "archivo": pdf_path,
        "sha256_original": h256,
        "proteccion_shaddai_314": sello_segulah,
        "matriz_goetia_72": resultado_goetia,
        "sello_maestro_final": resultado_goetia["hash_goetia_final"],
        "estado": "PROVISIONAL_PENDIENTE_FIRMA_HUMANA",
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }
    
    # 5. Guardar
    out = f"{pdf_path}.manifest_v4.json"
    with open(out, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"\n✓ Certificado Maestro emitido: {out}")
    print("◯_● ESTADO: PROVISIONAL — Requiere firma humana (51%).")

if __name__ == "__main__":
    certificar_con_goetia(sys.argv[1])
