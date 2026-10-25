# goetia_72.py · MATRIZ CRIPTOGRÁFICA DE LOS 72 SELLOS · NODO YHDRYH-92CE
import hashlib

# Los 72 sellos con su atributo oculto (Elemento/Planeta) para el "Salt"
SELLOS = [
    ("Bael", "Fuego"), ("Agares", "Tierra"), ("Vassago", "Aire"), ("Samigina", "Agua"),
    ("Marbas", "Aire"), ("Valefor", "Fuego"), ("Amon", "Fuego"), ("Barbatos", "Agua"),
    ("Paimon", "Aire"), ("Buer", "Aire"), ("Gusion", "Agua"), ("Sitri", "Fuego"),
    ("Beleth", "Fuego"), ("Leraje", "Aire"), ("Eligos", "Fuego"), ("Zepar", "Fuego"),
    ("Botis", "Tierra"), ("Bathin", "Aire"), ("Sallos", "Agua"), ("Purson", "Aire"),
    ("Marax", "Tierra"), ("Ipos", "Aire"), ("Aim", "Fuego"), ("Naberius", "Aire"),
    ("Glasya-Labolas", "Fuego"), ("Bune", "Tierra"), ("Ronove", "Aire"), ("Berith", "Fuego"),
    ("Astaroth", "Aire"), ("Forneus", "Agua"), ("Foras", "Tierra"), ("Asmoday", "Fuego"),
    ("Gaap", "Fuego"), ("Furfur", "Aire"), ("Marchosias", "Fuego"), ("Stolas", "Aire"),
    ("Phenex", "Fuego"), ("Halphas", "Aire"), ("Malphas", "Aire"), ("Raum", "Aire"),
    ("Focalor", "Agua"), ("Sabnock", "Aire"), ("Vine", "Agua"), ("Bifrons", "Fuego"),
    ("Uvall", "Agua"), ("Haagenti", "Agua"), ("Caim", "Agua"), ("Murmur", "Tierra"),
    ("Orobas", "Aire"), ("Gremory", "Agua"), ("Ose", "Aire"), ("Amy", "Fuego"),
    ("Orias", "Aire"), ("Vapula", "Aire"), ("Zagan", "Tierra"), ("Volac", "Tierra"),
    ("Andras", "Fuego"), ("Haures", "Fuego"), ("Andrealphus", "Aire"), ("Cimejes", "Tierra"),
    ("Amdusias", "Aire"), ("Flauros", "Fuego"), ("Belial", "Tierra"), ("Decarabia", "Aire"),
    ("Seere", "Aire"), ("Dantalion", "Agua"), ("Andromalius", "Tierra"), 
    ("Bael", "Fuego"), ("Agares", "Tierra"), ("Vassago", "Aire"), ("Samigina", "Agua"),
    ("Marbas", "Aire"), ("Valefor", "Fuego"), ("Amon", "Fuego"), ("Barbatos", "Agua")
]

def desencriptar_goetia(hash_entrada: str) -> dict:
    """Aplica la matriz de los 72 sellos para transformar el hash."""
    nodo_actual = hash_entrada
    trayectoria = []
    
    # Iteramos sobre los 72 sellos como una red de 72 nodos
    for i, (nombre, elemento) in enumerate(SELLOS[:72], 1):
        # La "información oculta": el hash se mezcla con el nombre del sello y su elemento
        payload = f"{nodo_actual}|SELLO_{i}_{nombre}|{elemento}"
        nodo_actual = hashlib.sha3_512(payload.encode()).hexdigest()
        
        # Guardamos un rastro (fragmento) para la auditoría
        trayectoria.append(f"{i:02d}_{nombre[:3]}:{nodo_actual[:6]}")
        
    return {
        "hash_original": hash_entrada,
        "hash_goetia_final": nodo_actual,
        "trayectoria_72_nodos": trayectoria,
        "estado_oculto": "DESENCRIPTADO"
    }

if __name__ == "__main__":
    # Prueba rápida
    print(desencriptar_goetia("test123")["hash_goetia_final"])
