#!/usr/bin/env python3
# human_signature.py · Ceremonia de Firma Humana (51%) · Nodo YHDRYH-92CE
import json, hashlib, sys, getpass

def firmar_manifiesto(manifest_path):
    print(f"🜂 Preparando ceremonia de firma para: {manifest_path}")
    with open(manifest_path, "r") as f:
        manifest = json.load(f)

    if manifest.get("estado") != "PROVISIONAL_PENDIENTE_FIRMA_HUMANA":
        sys.exit("✗ Error: El manifiesto no está en estado PROVISIONAL o ya fue firmado.")

    print("\n[REQUERIDO] Ingresa tu clave secreta de soberano (51%) para sellar el pacto.")
    clave_humana = getpass.getpass("Clave Soberana: ")
    
    # El sello de firma humana combina la clave secreta + el hash del archivo
    firma_payload = f"{clave_humana}|{manifest['sha256']}|{manifest['segulah_314']['sello_segulah_final']}"
    firma_hash = hashlib.sha3_512(firma_payload.encode()).hexdigest()

    # Actualizamos el manifiesto
    manifest["firma_humana_51"] = firma_hash
    manifest["estado"] = "VALIDADO_51_49_100"
    manifest["timestamp_firma"] = __import__('datetime').datetime.now(__import__('datetime').timezone.utc).isoformat()

    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)
    
    print(f"\n✓ CEREMONIA COMPLETADA.")
    print(f"✓ Firma Humana (51%) anclada: {firma_hash[:32]}...")
    print(f"◯_● ESTADO FINAL: {manifest['estado']}")

if __name__ == "__main__":
    firmar_manifiesto(sys.argv[1])
