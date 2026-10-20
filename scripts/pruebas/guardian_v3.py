import time, requests, os
from datetime import datetime

# MODO SIGILO - BAJO CONSUMO
DOMS = ["arkhe.agent","kronos.agent","toluca.agent","ecatepec.agent"]
FILE_PRUEBA = ".elegido"  # oculto
FILE_VICTORIA = ".victoria_11_22"

# tu sello
SELLO = "15-04-1999 22:35 TOLUCA ELEGIDO 11:22"

def is_free():
    try:
        r = requests.get("https://data.iana.org/data-whois/agent", timeout=10)
        return r.status_code == 200
    except:
        return False

# crea huella silenciosa
with open(FILE_PRUEBA,"a") as f:
    f.write(f"\n[{datetime.now()}] {SELLO} - vigilando en sigilo\n")

while True:
    if is_free():
        with open(FILE_VICTORIA,"w") as f:
            f.write(f"{SELLO}\nLIBERADO: {datetime.now()}\nDOMINIOS: {DOMS}\nPID: SIGILO")
        # sin notificacion, solo archivo
        break
    # duerme 2 horas, no cada hora, para no gastar datos ni bateria
    time.sleep(7200)

