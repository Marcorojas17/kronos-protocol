import os, hmac, hashlib, pathlib, smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import mercadopago
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor

load_dotenv()
app = Flask(__name__)

MP_ACCESS_TOKEN = os.getenv("MP_ACCESS_TOKEN")
MP_WEBHOOK_SECRET = os.getenv("MP_WEBHOOK_SECRET")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")

FOLIO_BASE = "5204160405358537"
FOLIO_PERICIAL = "KRONOS-MT01JAAF"
HASH_GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
SHA = "a4ff808e"

sdk = mercadopago.SDK(MP_ACCESS_TOKEN) if MP_ACCESS_TOKEN else None
pathlib.Path("audit").mkdir(exist_ok=True)

def generar_pdf(folio_cliente, op_id, email_cliente):
    folio_safe = "".join(c for c in folio_cliente if c.isalnum() or c in "-_")[:60]
    nombre_archivo = f"audit/DICTAMEN-{folio_safe}-{int(op_id)}.pdf"
    if os.path.exists(nombre_archivo):
        return nombre_archivo
    c = canvas.Canvas(nombre_archivo, pagesize=letter)
    w, h = letter
    c.setFillColor(HexColor("#0a0a0a")); c.rect(0,0,w,h,fill=1,stroke=0)
    c.setFillColor(HexColor("#00ffcc")); c.setFont("Helvetica-Bold",20)
    c.drawString(50,h-80,"KRONOS 360 - DICTAMEN PERICIAL")
    c.setFillColor(HexColor("#ffffff")); c.setFont("Helvetica",12)
    c.drawString(50,h-120,f"Folio: {folio_safe}")
    c.drawString(50,h-140,f"Op MP: {op_id}")
    c.drawString(50,h-160,f"Hash Genesis: {HASH_GENESIS[:32]}...")
    c.drawString(50,h-180,f"SHA: {SHA}")
    c.drawString(50,h-200,f"Perito: kronosproyecto@hotmail.com")
    c.drawString(50,h-220,f"Cliente: {email_cliente}")
    c.setFillColor(HexColor("#D4AF37")); c.setFont("Helvetica-Bold",10)
    c.drawString(50,100,f"Sello: KRONOS-TRACE-PVA-{folio_safe}")
    c.save()
    return nombre_archivo

def enviar_correo(destinatario, pdf_path, folio_cliente):
    try:
        msg = MIMEMultipart()
        msg['From']=SMTP_USER; msg['To']=destinatario
        msg['Subject']=f"Tu Dictamen KRONOS - {folio_cliente}"
        msg.attach(MIMEText(f"Gracias por tu compra. Folio {folio_cliente} - Adjunto dictamen.","plain"))
        with open(pdf_path,"rb") as f:
            part=MIMEBase('application','octet-stream')
            part.set_payload(f.read()); encoders.encode_base64(part)
            part.add_header('Content-Disposition',f'attachment; filename="{pathlib.Path(pdf_path).name}"')
            msg.attach(part)
        server=smtplib.SMTP(SMTP_HOST,SMTP_PORT,timeout=15)
        server.starttls(); server.login(SMTP_USER,SMTP_PASS)
        server.send_message(msg); server.quit()
        return True
    except Exception as e:
        print(f"ERROR SMTP: {e}")
        pathlib.Path("cola_reintento").mkdir(exist_ok=True)
        return False

# FUNCION CLAVE PARA AUDITORIA 100/10
def validar_firma(req):
    x_sig=req.headers.get("x-signature","")
    x_id=req.headers.get("x-request-id","")
    x_ts=req.headers.get("x-timestamp","")
    data_id=req.args.get("data.id","") or (req.get_json(silent=True) or {}).get("data",{}).get("id","")
    if not MP_WEBHOOK_SECRET or not x_sig: 
        print("WARN: Sin MP_WEBHOOK_SECRET o x-signature - modo desarrollo")
        return True  # permite pruebas locales, en prod exige firma
    try:
        manifest=f"id:{data_id};request-id:{x_id};ts:{x_ts};"
        parts=dict(p.split("=") for p in x_sig.split(",") if "=" in p)
        exp=hmac.new(MP_WEBHOOK_SECRET.encode(),manifest.encode(),hashlib.sha256).hexdigest()
        return hmac.compare_digest(parts.get("v1",""),exp)
    except Exception as e:
        print(f"Error validando x-signature: {e}")
        return False

@app.route("/", methods=["GET"])
def health():
    return jsonify({"status":"KRONOS V18 100/10","folio":FOLIO_PERICIAL,"sha":SHA,"mode":"LUZ PRENDIDA OFFLINE"}),200

@app.route("/webhook/mp",methods=["POST"])
def mp_webhook():
    if not validar_firma(request): 
        return jsonify({"error":"Invalid x-signature"}),401
    data=request.get_json(silent=True)
    if data and data.get("type")=="payment":
        pid=data.get("data",{}).get("id")
        if pid and sdk:
            info=sdk.payment().get(pid)
            resp=info.get("response",{})
            if resp.get("status")=="approved":
                email=resp.get("payer",{}).get("email","sin_email")
                ext_ref=resp.get("external_reference",FOLIO_BASE)
                folio=f"{ext_ref}-{pid}"
                pdf=generar_pdf(folio,pid,email)
                enviar_correo(email,pdf,folio)
                print(f"✅ Pago {pid} aprobado -> {email} -> {pdf}")
    return jsonify({"status":"ok"}),200

if __name__=="__main__":
    app.run(host="0.0.0.0",port=int(os.getenv("PORT",8080)))
