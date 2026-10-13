#!/usr/bin/env python3
import os
from dotenv import load_dotenv
import mercadopago

load_dotenv()

MP_ACCESS_TOKEN = os.getenv("MP_ACCESS_TOKEN")
MP_SUCCESS_URL = os.getenv("MP_SUCCESS_URL")
MP_FAILURE_URL = os.getenv("MP_FAILURE_URL")
MP_PENDING_URL = os.getenv("MP_PENDING_URL")
MP_NOTIFICATION_URL = os.getenv("MP_NOTIFICATION_URL")

if not MP_ACCESS_TOKEN:
    raise RuntimeError("Falta MP_ACCESS_TOKEN en .env")

sdk = mercadopago.SDK(MP_ACCESS_TOKEN)

niveles = {
    1: {"titulo": "Sello KRONOS Nivel 1 - Dictamen PDF + QR", "precio": 1.00},
    2: {"titulo": "Sello KRONOS Nivel 2 - Auditoría ISO + Blockchain", "precio": 2.00},
}

for nivel, datos in niveles.items():
    preference_data = {
        "items": [{
            "title": datos["titulo"],
            "quantity": 1,
            "unit_price": datos["precio"],
            "currency_id": "MXN"
        }],
        "external_reference": "5204160405358537",
        "back_urls": {
            "success": MP_SUCCESS_URL,
            "failure": MP_FAILURE_URL,
            "pending": MP_PENDING_URL
        },
        "auto_return": "approved",
        "notification_url": MP_NOTIFICATION_URL
    }

    result = sdk.preference().create(preference_data)
    pref = result.get("response") or {}
    init_point = pref.get("init_point")
    pref_id = pref.get("id")

    print(f"Nivel {nivel} - {datos['titulo']} - ${datos['precio']} MXN")
    print(f"Link: {init_point}")
    print(f"Preference ID: {pref_id}\n")
