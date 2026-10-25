#!/usr/bin/env python3
# batch_sign_v5.py · Firma Humana en Lote (51%) · Nodo YHDRYH-92CE
import glob, json, hashlib, getpass, os
from datetime import datetime, timezone

def firmar_lote():
    print("🜂 Buscando manifiestos PROVISIONALES para firma en lote...")
    
    # Buscar todos los manifiestos v5
    manifiestos = glob.glob("*.manifest_v5.json")
    pendientes = []
    
    for m in manifiestos:
        with open(m, "r") as f:
            data = json.load(f)
            if data.get("estado") == "PROVISIONAL_PENDIENTE_FIRMA_HUMANA":
                pendientes.append((m, data))
                
    if not pendientes:
        print("✓ No hay manifiestos pendientes de firma. El enjambre está al día.")
        return

    print(f"⚠️  Se encontraron {len(pendientes)} manifiestos esperando tu firma (51%).")
    clave_humana = getpass.getpass("Ingresa tu Clave Soberana para firmarlos todos: ")
    
    firmados = 0
    for nombre, manifest in pendientes:
        sha_original = manifest.get("sha256_original")
        sello_314 = manifest.get("proteccion_shaddai_314", {}).get("sello_segulah_final", "")
        sello_goetia = manifest.get("matriz_goetia_72", {}).get("hash_goetia_final", "")
        sello_enoc = manifest.get("sello_maestro_absoluto", "")
        
        # Para snapshots de red, no hay sello 314 directo, así que adaptamos el payload
        if not sello_314:
            payload = f"{clave_humana}|{sha_original}|{sello_enoc}"
        else:
            payload = f"{clave_humana}|{sha_original}|{sello_314}|{sello_goetia}|{sello_enoc}"

        firma_hash = hashlib.sha3_512(payload.encode()).hexdigest()
        
        manifest["firma_humana_51"] = firma_hash
        manifest["estado"] = "VALIDADO_51_49_100_ABSOLUTO"
        manifest["timestamp_firma"] = datetime.now(timezone.utc).isoformat()
        
        with open(nombre, "w") as f:
            json.dump(manifest, f, indent=2)
            
        print(f"  ✓ Firmado: {nombre}")
        firmados += 1

    print(f"\n◯_● {firmados} manifiestos VALIDADOS con éxito. El Pacto 51/49/100 está sellado.")

if __name__ == "__main__":
    firmar_lote()
