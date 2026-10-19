import hashlib
import json
from datetime import datetime, timezone

def generar_certificado(archivo_original, porcentaje_humano=51):
    print(f"1. Leyendo tu archivo real: {archivo_original}...")
    
    try:
        with open(archivo_original, 'rb') as f:
            contenido = f.read()
    except FileNotFoundError:
        print(f"❌ Error: No se encontró el archivo {archivo_original} en esta carpeta.")
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
        "status": "Certificado Exitoso",
        "protocolo": "ARKHÉ ZERO (PVA)",
        "archivo_original": archivo_original,
        "hash_archivo_sha256": hash_archivo,
        "proporcion": f"{porcentaje_humano}% Humano / {porcentaje_ia}% IA",
        "timestamp_utc": timestamp,
        "manifest_hash": hash_manifiesto,
        "nota": "Listo para anclaje en Blockchain (Mainnet/Arbitrum)"
    }

    # 6. Guardamos el certificado en un archivo JSON
    archivo_salida = "CERTIFICADO-ARKHE.json"
    with open(archivo_salida, 'w', encoding='utf-8') as f:
        json.dump(certificado, f, indent=4)
        
    print("\n✅ ¡CERTIFICADO GENERADO CON ÉXITO!")
    print(json.dumps(certificado, indent=4))
    print(f"\nEl certificado se guardó en: {archivo_salida}")

if __name__ == "__main__":
    # Aquí llamamos a tu archivo TESIS.md que está en tu repositorio
    generar_certificado("TESIS.md")
