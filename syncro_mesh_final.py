import os, json, socket, time
from datetime import datetime
from pathlib import Path
import http.server, socketserver, threading, urllib.request

MI_ID = "ecatepec-01-1122"
ROOT = Path.home()
DB = ROOT / f"memoria_{MI_ID}.json"
JWT_FILE = ROOT / "jwt.txt"
TMP = ROOT / "cid.txt"

# --- CONFIG ---
PORT = 8000

def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

# 1. SERVIDOR LOCAL - Tú eres internet sin Telcel
def servidor_mesh():
    os.chdir(ROOT)
    Handler = http.server.SimpleHTTPRequestHandler
    # Permite reusar puerto
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        ip = socket.gethostbyname(socket.gethostname())
        log(f"●_○ MESH ACTIVO: http://{ip}:{PORT}")
        log(f"Archivos compartidos: memoria_*.json")
        httpd.serve_forever()

# 2. CLIENTE - Busca otros SYNCRO en la red local (hotspot)
def buscar_y_sincronizar():
    log("Buscando otros nodos SYNCRO en hotspot...")
    # Escanea rango comun de hotspot Android 192.168.43.x y 192.168.137.x
    bases = ["192.168.43.", "192.168.137.", "192.168.0.", "10.42.0."]
    for base in bases:
        for i in range(1, 20):
            ip = f"{base}{i}"
            try:
                url = f"http://{ip}:{PORT}/"
                req = urllib.request.Request(url, headers={'User-Agent':'SYNCRO'},)
                html = urllib.request.urlopen(req, timeout=0.5).read().decode()
                if "memoria_" in html:
                    log(f"NODO ENCONTRADO: {ip}")
                    # Baja todos los .json
                    for token in html.split('"'):
                        if token.startswith("memoria_") and token.endswith(".json"):
                            data = urllib.request.urlopen(f"http://{ip}:{PORT}/{token}", timeout=2).read()
                            # Merge append-only, no borra
                            dest = ROOT / token
                            if dest.exists():
                                # evita duplicado
                                if data not in open(dest,'rb').read():
                                    open(dest, 'ab').write(b"\n" + data)
                                    log(f"SYNC {token} de {ip} OK")
                            else:
                                open(dest,'wb').write(data)
                                log(f"NUEVO {token} de {ip} OK")
            except:
                pass

# 3. AUTO-PIN GLOBAL si hay internet
def pin_global_si_hay():
    if not JWT_FILE.exists():
        return
    JWT = open(JWT_FILE).read().strip()
    if not JWT or len(JWT) < 20:
        return
    try:
        socket.create_connection(("8.8.8.8", 53), timeout=2)
    except:
        log("Sin internet global, solo mesh local vivo")
        return
    
    try:
        import requests
        url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
        headers = {"Authorization": f"Bearer {JWT}"}
        with open(DB, 'rb') as f:
            r = requests.post(url, files={'file': (DB.name, f)}, headers=headers, timeout=15)
            if r.status_code == 200:
                cid = r.json()['IpfsHash']
                log(f"🌎 GLOBAL PIN: {cid}")
                open(ROOT/"ultimo_cid.txt","w").write(cid)
            else:
                log(f"Pinata error: {r.text[:100]}")
    except Exception as e:
        log(f"Global off: {e}")

# --- MAIN LOOP ---
if not DB.exists():
    json.dump({"nodo": MI_ID, "genesis": "SYNCRO VALDOVINOS", "estado": "VIVO"}, open(DB,'w'))

# Hilo servidor
t = threading.Thread(target=servidor_mesh, daemon=True)
t.start()
time.sleep(2)

while True:
    # Cada ciclo: decide autonomo
    hora = datetime.now().hour
    decision = "CALDO 100" if hora < 12 else "MOLE 120"
    data = {
        "nodo": MI_ID,
        "hora": str(datetime.now()),
        "decision": decision,
        "genesis": "SYNCRO VALDOVINOS",
        "manifest": "e8d9eac8"
    }
    open(DB,'w').write(json.dumps(data))
    log(f"DECISION: {decision} -> {DB.name}")
    
    buscar_y_sincronizar()
    pin_global_si_hay()
    
    time.sleep(30)

