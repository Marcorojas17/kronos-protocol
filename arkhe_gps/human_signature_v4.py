#!/usr/bin/env python3
# human_signature_v4.py · Ceremonia de Firma Humana (51%) · Nodo YHDRYH-92CE
import json, hashlib, sys, getpass
from datetime import datetime, timezone

def firmar_manifiesto(manifest_path):
    print(f"🜂 Preparando ceremonia de firma para: {manifest_path}")
    with open(manifest_path, "r") as f:
        manifest = json.load(f)

    if manifest.get("estado") != "PROVISIONAL_PENDIENTE_FIRMA_HUMANA":
        sys.exit("✗ Error: El manifiesto no está en estado PROVISIONAL o ya fue firmado.")

    print("\n[REQUERIDO] Ingresa tu clave secreta de soberano (51%) para sellar el pacto.")
    clave_humana = getpass.getpass("Clave Soberana: ")
    
    # Extraemos las llaves correctas de la estructura v4
    sha_original = manifest.get("sha256_original")
    sello_314 = manifest.get("proteccion_shaddai_314", {}).get("sello_segulah_final")
    sello_maestro = manifest.get("sello_maestro_final")

    if not sha_original or not sello_314 or not sello_maestro:
        sys.exit("✗ Error: El manifiesto no contiene los sellos esperados (v4).")

    # El sello de firma humana abarca TODA la cadena: Humano + Original + 314 + 72
    firma_payload = f"{clave_humana}|{sha_original}|{sello_314}|{sello_maestro}"
    firma_hash = hashlib.sha3_512(firma_payload.encode()).hexdigest()

    # Actualizamos el manifiesto
    manifest["firma_humana_51"] = firma_hash
    manifest["estado"] = "VALIDADO_51_49_100"
    manifest["timestamp_firma"] = datetime.now(timezone.utc).isoformat()

    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)
    
    print(f"\n✓ CEREMONIA COMPLETADA.")
    print(f"✓ Firma Humana (51%) anclada: {firma_hash[:32]}...")
    print(f"◯_● ESTADO FINAL: {manifest['estado']}")

if __name__ == "__main__":
    firmar_manifiesto(sys.argv[1])
