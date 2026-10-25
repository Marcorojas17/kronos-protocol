import json, os
from datetime import datetime

DB = "memoria_local.json"

def guardar_decision(decision):
    # Guarda local, no necesita internet
    datos = []
    if os.path.exists(DB):
        with open(DB) as f:
            datos = json.load(f)
    datos.append({"hora": str(datetime.now()), "decision": decision})
    with open(DB, "w") as f:
        json.dump(datos, f, indent=2)
    print(f"Guardado OFFLINE: {decision}")

def decidir_offline(contexto):
    # Tu cerebro sin internet
    if contexto.get("hace_frio"):
        return "OFRECER_CALDO"
    return "VENDER_120"

# PRUEBA SIN INTERNET
d = decidir_offline({"hace_frio": True})
guardar_decision(d)
print("Memoria local:", open(DB).read())
