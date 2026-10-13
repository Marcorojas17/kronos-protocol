import os
import mercadopago

# Cargar credenciales desde variables de entorno (NUNCA hardcodear)
ACCESS_TOKEN = os.getenv("MERCADO_PAGO_ACCESS_TOKEN", "TU_ACCESS_TOKEN_AQUI")

sdk = mercadopago.SDK(ACCESS_TOKEN)

def crear_preferencia_pago(titulo, precio_mxn, cantidad=1):
    """
    Crea una preferencia de pago y devuelve la URL de checkout (init_point).
    """
    preference_data = {
        "items": [
            {
                "title": titulo,
                "quantity": cantidad,
                "unit_price": precio_mxn,
                "currency_id": "MXN"
            }
        ],
        "external_reference": "FOLIO_5204160405358537",
        "back_urls": {
            "success": "https://marcorojas17.github.io/PVA-Protocolo-Vida-Autopoietica-/web/marketplace.html",
            "failure": "https://marcorojas17.github.io/PVA-Protocolo-Vida-Autopoietica-/web/marketplace.html",
            "pending": "https://marcorojas17.github.io/PVA-Protocolo-Vida-Autopoietica-/web/marketplace.html"
        },
        "auto_return": "approved",
        "notification_url": "https://tu-servidor.com/webhooks/mercadopago"
    }

    result = sdk.preference().create(preference_data)
    preference = result["response"]

    return preference.get("init_point", None)
