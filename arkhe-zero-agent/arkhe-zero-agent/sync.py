import json, os, socket

def hay_internet():
    try:
        socket.create_connection(("8.8.8.8", 53), timeout=2)
        return True
    except:
        return False

DB = "memoria_local.json"
if not os.path.exists(DB):
    print("Nada que subir")
    exit()

if hay_internet():
    print("SI hay internet - SUBIENDO...")
    with open(DB) as f:
        data = json.load(f)
    # Aqui subirias a tu servidor / Firebase / tu .agent
    print(f"Subiendo {len(data)} decisiones a la nube ARKHE")
    # Simula subida
    # requests.post("https://tu-server.com/agent", json=data)
    # Si sube bien, borra local o marca como subido
    print("SYNC OK - 11:22")
else:
    print("NO hay internet - sigue vivo offline, guardando local")
