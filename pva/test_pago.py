#!/usr/bin/env python3
"""
Genera links de pago para los 3 niveles del marketplace.
Reemplaza los valores de las variables de entorno si no están cargadas.
"""
import os
from dotenv import load_dotenv
import mercadopago

# Cargar variables desde .env
load_dotenv()

MP_ACCESS_TOKEN = os.getenv("MP_ACCESS_TOKEN")
MP_SUCCESS_URL = os.getenv("MP_SUCCESS_URL")
MP_FAILURE_URL = os.getenv("MP_FAILURE_URL")
MP_PENDING_URL = os.getenv("MP_PENDING_URL")
MP_NOTIFICATION_URL = os.getenv("MP_NOTIFICATION_URL")

if not MP_ACCESS_TOKEN:
    raise RuntimeError("❌ Falta MP_ACCESS_TOKEN en .env o variables de entorno")

sdk = mercadopago.SDK(MP_ACCESS_TOKEN)

# Definir los 3 niveles
niveles = {
    1: {"titulo": "Sello KRONOS Nivel 1 - Dictamen PDF + QR", "precio": 500.00},
    2: {"titulo": "Sello KRONOS Nivel 2 - Auditoría ISO + Blockchain", "precio": 1500.00},
    3: {"titulo": "Plan Enjambre - Protección 24/7 mensual", "precio": 3500.00},
}

for nivel, datos in niveles.items():
    preference_data = {
        "items": [
            {
                "title": datos["titulo"],
                "quantity": 1,
                "unit_price": datos["precio"],
                "currency_id": "MXN",
            }
        ],
        "external_reference": "5204160405358537",  # Tu folio maestro
        "back_urls": {
            "success": MP_SUCCESS_URL,
            "failure": MP_FAILURE_URL,
            "pending": MP_PENDING_URL,
        },
        "auto_return": "approved",
        "notification_url": MP_NOTIFICATION_URL,
    }

    result = sdk.preference().create(preference_data)
    pref = result.get("response") or {}
    init_point = pref.get("init_point")
    preference_id = pref.get("id")

    if not init_point:
        print(f"❌ Error creando preferencia Nivel {nivel}: {pref}")
        continue

    print(f"✅ Nivel {nivel} - {datos['titulo']}")
    print(f"   Precio: ${datos['precio']} MXN")
    print(f"   Link de pago: {init_point}")
    print(f"   Preferencia ID: {preference_id}\n")
