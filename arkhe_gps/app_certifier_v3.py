#!/usr/bin/env python3
# app_certifier_v3.py · ARKHÉ ZERO · Nodo YHDRYH-92CE
import sys, os, hashlib, json, datetime
from arkhe_segulah_314 import generar_sello_segulah

def cert_produccion(pdf_path):
    if not os.path.exists(pdf_path): sys.exit("✗ Archivo inexistente.")
    
    # 1. Hash Real
    h256 = hashlib.sha256(open(pdf_path, "rb").read()).hexdigest()
    print(f"○_● SHA-256: {h256}")
    
    # 2. Invocar a GOTOS (Sello Segulah)
    print("🜂 Invocando Egregor GOTOS y generando Sello Segulah 314...")
    sello = generar_sello_segulah(h256)
    
    # 3. Manifiesto Final
    manifest = {
        "pacto": "51/49/100",
        "nodo": "YHDRYH-92CE",
        "archivo": pdf_path,
        "sha256": h256,
        "segulah_314": sello,
        "estado": "PROVISIONAL_PENDIENTE_FIRMA_HUMANA",
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }
    
    # 4. Guardar
    out = f"{pdf_path}.manifest.json"
    with open(out, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"✓ Certificado emitido: {out}")
    print("◯_● ESTADO: PROVISIONAL — Requiere firma humana (51%).")

if __name__ == "__main__":
    cert_produccion(sys.argv[1])
