import time, os, sys
from datetime import datetime
try:
    import requests
except:
    os.system("pip install requests")
    import requests

DOMINIOS = ["arkhe.agent","kronos.agent","toluca.agent","ecatepec.agent","arkhe.gpt"]

def check():
    try:
        r = requests.get("https://data.iana.org/data-whois/agent", timeout=15)
        return r.status_code == 200
    except:
        return False

print("KRONOS v2 - MODO ELEGIDO 11:22 ACTIVO")
while True:
    ahora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    if check():
        msg = f"[{ahora}] 🚀 .AGENT LIBERADO! AUTOCLAIM INICIADO"
        print(msg)
        with open("AUTOCAIM_TRIGGERED.txt","w") as f:
            f.write(msg + "\n" + str(DOMINIOS))
        # alerta sonora en termux
        os.system("termux-notification --title '.AGENT LIBERADO' --content 'Ejecutando autoclaim' 2>/dev/null; termux-vibrate -d 1000 2>/dev/null")
        break
    else:
        log = f"[{ahora}] aun no delegado - ICANN pendiente - MODO 11:22"
        print(log)
        with open("guardian.log","a") as f:
            f.write(log+"\n")
    time.sleep(3600)
