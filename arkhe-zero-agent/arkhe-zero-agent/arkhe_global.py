import json, os, hashlib, socket
from datetime import datetime

# 1. IDENTIDAD GLOBAL INFALSIFICABLE
def crear_id_global(nombre):
    base = f"ARKHE_ZERO_11:22_{nombre}_{datetime.now()}"
    return hashlib.sha256(base.encode()).hexdigest()[:12]

MI_ID = crear_id_global("ecatepec-nodo-01")
print(f"Mi nodo global: {MI_ID}")

# 2. MEMORIA LOCAL + GLOBAL
LOCAL_DB = f"memoria_{MI_ID}.json"
GLOBAL_DB = "arkhe_global.json"

def guardar(datos):
    # Guarda local siempre
    historial = []
    if os.path.exists(LOCAL_DB):
        with open(LOCAL_DB) as f:
            historial = json.load(f)
    registro = {
        "nodo": MI_ID,
        "id_global": crear_id_global(str(datos)),
        "timestamp": str(datetime.now()),
        "datos": datos,
        "huella_arkhe": "11:22"
    }
    historial.append(registro)
    with open(LOCAL_DB, "w") as f:
        json.dump(historial, f, indent=2)
    print(f"✓ Guardado local: {datos}")

    # Intenta global
    if hay_internet():
        sync_global(registro)
    else:
        print("→ Offline, queda en cola para global")

def hay_internet():
    try:
        socket.create_connection(("8.8.8.8", 53), timeout=1)
        return True
    except:
        return False

def sync_global(registro):
    # Esto es tu blockchain ligero global
    global_data = []
    if os.path.exists(GLOBAL_DB):
        with open(GLOBAL_DB) as f:
            global_data = json.load(f)
    global_data.append(registro)
    with open(GLOBAL_DB, "w") as f:
        json.dump(global_data, f, indent=2)
    print(f"🌎 SYNC GLOBAL: {registro['datos']}")

# PRUEBA
guardar({"venta": "caldo", "precio": 100, "clima": "frio"})
guardar({"venta": "mole", "precio": 120, "clima": "calor"})

# Cuando tengas 100 nodos, este archivo es el mapa de hambre de Mexico
if os.path.exists(GLOBAL_DB):
    print("\n--- MAPA GLOBAL ARKHE ---")
    print(open(GLOBAL_DB).read()[:500])
