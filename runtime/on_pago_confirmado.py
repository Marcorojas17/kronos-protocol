#!/usr/bin/env python3
"""◯_● Hook ejecutado por webhook cuando MercadoPago confirma pago."""
import sys, json, pathlib
sys.path.insert(0, str(pathlib.Path.home() / "arkhe-zero" / "runtime"))
from emisor_licencias import emitir

# Mapeo de niveles de producto → uso permitido y vigencia
PRODUCTOS = {
    "1": {"uso": "consulta", "vigencia": 365},
    "2": {"uso": "uso_comercial_individual", "vigencia": 365},
    "3": {"uso": "uso_comercial_ilimitado", "vigencia": 3650},  # 10 años
}

def procesar_pago(pago):
    """Recibe dict de MercadoPago y emite licencia."""
    mp_id = pago.get("id")
    monto = pago.get("transaction_amount", 0)
    nivel = str(pago.get("metadata", {}).get("nivel", "1"))
    titular = pago.get("payer", {}).get("email", "anonimo")
    obra = pago.get("description", "ARKHÉ ZERO · Licencia")

    prod = PRODUCTOS.get(nivel, PRODUCTOS["1"])
    resultado = emitir(
        obra=obra,
        titular=titular,
        uso=prod["uso"],
        monto=monto,
        mp_payment_id=str(mp_id),
        vigencia_dias=prod["vigencia"],
    )
    return resultado

if __name__ == "__main__":
    # Prueba local
    pago_demo = {
        "id": "MP-DEMO-001",
        "transaction_amount": 199.00,
        "description": "ARKHÉ ZERO · Nivel 3",
        "metadata": {"nivel": "3"},
        "payer": {"email": "demo@ejemplo.com"},
    }
    r = procesar_pago(pago_demo)
    print(json.dumps(r, indent=2, ensure_ascii=False))
