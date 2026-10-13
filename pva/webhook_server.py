import os
import hmac
import hashlib
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import mercadopago

load_dotenv()

app = Flask(__name__)

# Configuración desde .env (NUNCA hardcodeado)
MP_ACCESS_TOKEN = os.getenv("MP_ACCESS_TOKEN")
MP_WEBHOOK_SECRET = os.getenv("MP_WEBHOOK_SECRET")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
FOLIO_BASE = "5204160405358537"
HASH_GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"

# Instancia de Mercado Pago
sdk = mercadopago.SDK(MP_ACCESS_TOKEN)

# --- Generación de PDF (con ReportLab) ---
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor

def generar_pdf(folio_cliente, op_id, email_cliente):
    nombre_archivo = f"audit/DICTAMEN-{folio_cliente}-{op_id}.pdf"
    c = canvas.Canvas(nombre_archivo, pagesize=letter)
    w, h = letter
    c.setFillColor(HexColor("#0a0a0a"))
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(HexColor("#00ffcc"))
    c.setFont("Helvetica-Bold", 20)
    c.drawString(50, h - 80, "KRONOS 360 - DICTAMEN PERICIAL")
    c.setFillColor(HexColor("#ffffff"))
    c.setFont("Helvetica", 12)
    c.drawString(50, h - 120, f"Folio: {folio_cliente}")
    c.drawString(50, h - 140, f"Operación MP: {op_id}")
    c.drawString(50, h - 160, f"Hash Génesis: {HASH_GENESIS}")
    c.drawString(50, h - 180, f"Perito: kronosproyecto@hotmail.com")
    c.drawString(50, h - 200, f"Cliente: {email_cliente}")
    c.drawString(50, h - 220, "SafeCreative: 2607146379465")
    c.setFillColor(HexColor("#D4AF37"))
    c.setFont("Helvetica-Bold", 10)
    c.drawString(50, 100, f"Sello: KRONOS-TRACE-PVA-{folio_cliente}")
    c.save()
    return nombre_archivo

# --- Envío de correo ---
def enviar_correo(destinatario, pdf_path, folio_cliente):
    msg = MIMEMultipart()
    msg['From'] = SMTP_USER
    msg['To'] = destinatario
    msg['Subject'] = f"Tu Dictamen KRONOS - Folio {folio_cliente}"
    body = "Gracias por tu compra. Adjunto tu dictamen pericial."
    msg.attach(MIMEText(body, 'plain'))
    with open(pdf_path, "rb") as f:
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(f.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename="{pdf_path.split("/")[-1]}"')
        msg.attach(part)
    server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
    server.starttls()
    server.login(SMTP_USER, SMTP_PASS)
    server.send_message(msg)
    server.quit()

# --- Validación de firma ---
def validar_firma(request):
    x_signature = request.headers.get("x-signature", "")
    x_request_id = request.headers.get("x-request-id", "")
    x_timestamp = request.headers.get("x-timestamp", "")
    data_id = request.args.get("data.id", "")
    if not MP_WEBHOOK_SECRET or not x_signature:
        return False
    manifest = f"id:{data_id};request-id:{x_request_id};ts:{x_timestamp};"
    signature_parts = dict(item.split("=") for item in x_signature.split(","))
    expected = hmac.new(MP_WEBHOOK_SECRET.encode(), manifest.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(signature_parts.get("v1", ""), expected)

# --- Webhook principal ---
@app.route("/webhook/mp", methods=["POST"])
def mp_webhook():
    if not validar_firma(request):
        return jsonify({"error": "Invalid signature"}), 401
    data = request.get_json()
    if data and data.get("type") == "payment":
        payment_id = data["data"]["id"]
        payment_info = sdk.payment().get(payment_id)
        status = payment_info["response"]["status"]
        if status == "approved":
            email_cliente = payment_info["response"]["payer"]["email"]
            op_id = payment_id
            folio_cliente = f"{FOLIO_BASE}-{op_id}"
            pdf_path = generar_pdf(folio_cliente, op_id, email_cliente)
            enviar_correo(email_cliente, pdf_path, folio_cliente)
            print(f"💰 Pago {payment_id} aprobado. PDF enviado a {email_cliente}")
    return jsonify({"status": "ok"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8080)))
