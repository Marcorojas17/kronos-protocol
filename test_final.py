import hashlib
import json
from datetime import datetime, timezone
import os

def generar_certificado(archivo_original, porcentaje_humano=51):
    print(f"1. Leyendo el archivo real de tu repositorio: {archivo_original}...")
    
    try:
        with open(archivo_original, 'rb') as f:
            contenido = f.read()
    except FileNotFoundError:
        print(f"❌ Error: No se encontró el archivo {archivo_original}.")
        return

    # 2. Calculamos la huella digital del archivo (El Genoma)
    hash_archivo = hashlib.sha256(contenido).hexdigest()
    print(f"   Hash del archivo generado: {hash_archivo[:16]}...")

    # 3. Aplicamos la regla 51/49
    porcentaje_ia = 100 - porcentaje_humano
    timestamp = datetime.now(timezone.utc).isoformat()
    
    # 4. Creamos el manifiesto simbiótico
    manifiesto = f"{archivo_original}|{hash_archivo}|{porcentaje_humano}|{porcentaje_ia}|{timestamp}"
    hash_manifiesto = hashlib.sha256(manifiesto.encode('utf-8')).hexdigest()

    # 5. Armamos el certificado final
    certificado = {
        "status": "Certificado Exitoso (Final)",
        "protocolo": "ARKHÉ ZERO (PVA)",
        "archivo_original": archivo_original,
        "hash_archivo_sha256": hash_archivo,
        "proporcion": f"{porcentaje_humano}% Humano / {porcentaje_ia}% IA",
        "timestamp_utc": timestamp,
        "manifest_hash": hash_manifiesto,
        "nota": "Listo para anclaje en Blockchain"
    }

    print("\n✅ ¡CERTIFICADO FINAL GENERADO CON ÉXITO!")
    print(json.dumps(certificado, indent=4))
    
    # Guardar el certificado
    with open("CERTIFICADO-FINAL.json", 'w', encoding='utf-8') as f:
        json.dump(certificado, f, indent=4)

if __name__ == "__main__":
    generar_certificado("README.md")
