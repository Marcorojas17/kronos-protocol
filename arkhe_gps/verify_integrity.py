#!/usr/bin/env python3
import json, hashlib, sys

def verificar(path, clave_humana):
    with open(path, "r") as f: m = json.load(f)
    
    # Reconstruimos el payload original exacto
    sha_original = m.get("sha256_original")
    sello_314 = m.get("proteccion_shaddai_314", {}).get("sello_segulah_final")
    sello_goetia = m.get("matriz_goetia_72", {}).get("hash_goetia_final")
    sello_enoc = m.get("sello_maestro_absoluto")
    
    payload = f"{clave_humana}|{sha_original}|{sello_314}|{sello_goetia}|{sello_enoc}"
    firma_esperada = hashlib.sha3_512(payload.encode()).hexdigest()
    firma_real = m.get("firma_humana_51")
    
    print(f"Firma esperada: {firma_esperada[:16]}...")
    print(f"Firma en disco: {firma_real[:16]}...")
    
    if firma_esperada == firma_real:
        print("✓ INTEGRIDAD VERIFICADA. El documento es auténtico.")
    else:
        print("✗ ALERTA: EL DOCUMENTO HA SIDO ALTERADO. LA FIRMA NO COINCIDE.")

if __name__ == "__main__":
    import getpass
    clave = getpass.getpass("Clave Soberana para verificar: ")
    verificar(sys.argv[1], clave)
