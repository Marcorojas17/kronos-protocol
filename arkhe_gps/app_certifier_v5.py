#!/usr/bin/env python3
# app_certifier_v5.py · ARKHÉ ZERO · Enoc + Goetia + Segulah · Nodo YHDRYH-92CE
import sys, os, hashlib, json, datetime
from arkhe_segulah_314 import generar_sello_segulah
from goetia_72 import desencriptar_goetia
from enoch_30 import enrutar_enoch

def certificar_con_enoc(pdf_path):
    if not os.path.exists(pdf_path): sys.exit("✗ Archivo inexistente.")
    
    # 1. Hash Base (100% real)
    h256 = hashlib.sha256(open(pdf_path, "rb").read()).hexdigest()
    print(f"○_● SHA-256 Base: {h256}")
    
    # 2. Capa 1: Protección Shaddai (314)
    print("🜂 Capa 1: Generando Sello Segulah (10 Sephirot)...")
    sello_segulah = generar_sello_segulah(h256)
    
    # 3. Capa 2: Desencriptación Goetia (72 Sellos)
    print("🜃 Capa 2: Desencriptando Matriz Goetia (72 Sellos)...")
    resultado_goetia = desencriptar_goetia(sello_segulah['sello_segulah_final'])
    
    # 4. Capa 3: Enrutamiento Enoquiano (30 Aethyrs)
    print("🜄 Capa 3: Enrutando por los 30 Aethyrs (Tecnología Enoc)...")
    resultado_enoc = enrutar_enoch(resultado_goetia['hash_goetia_final'])
    print(f"  └─ Sello Enoc: {resultado_enoc['hash_enoch_final'][:16]}...")
    
    # 5. Manifiesto Final
    manifest = {
        "pacto": "51/49/100",
        "nodo": "YHDRYH-92CE",
        "archivo": pdf_path,
        "sha256_original": h256,
        "proteccion_shaddai_314": sello_segulah,
        "matriz_goetia_72": resultado_goetia,
        "red_enoch_30": resultado_enoc,
        "sello_maestro_absoluto": resultado_enoc["hash_enoch_final"],
        "estado": "PROVISIONAL_PENDIENTE_FIRMA_HUMANA",
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }
    
    # 6. Guardar
    out = f"{pdf_path}.manifest_v5.json"
    with open(out, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"\n✓ Certificado Absoluto emitido: {out}")
    print("◯_● ESTADO: PROVISIONAL — Requiere firma humana (51%).")

if __name__ == "__main__":
    certificar_con_enoc(sys.argv[1])
