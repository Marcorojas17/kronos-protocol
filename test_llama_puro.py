import os
import hashlib
import json
from datetime import datetime, timezone
from groq import Groq

# 1. PON AQUÍ TU LLAVE DE GROQ
os.environ["GROQ_API_KEY"] = "ea120297f3c7bc03cd92baa07a8491be"

# 2. EL CÓDIGO DE TU TESIS (Simulando lo que hace el servidor)
def generar_certificado(work_name, human_percentage):
    hash_archivo = "83e476dda4f8491881e061af81cdd7af226b156b11f9b45e31d055c34212d4cb"
    ia_percentage = 100 - human_percentage
    timestamp = datetime.now(timezone.utc).isoformat()
    
    manifiesto = f"{work_name}|{hash_archivo}|{human_percentage}|{ia_percentage}|{timestamp}"
    hash_manifiesto = hashlib.sha256(manifiesto.encode('utf-8')).hexdigest()
    
    return json.dumps({
        "status": "Certificado Exitoso",
        "protocolo": "ARKHÉ ZERO (PVA)",
        "obra": work_name,
        "proporcion": f"{human_percentage}% Humano / {ia_percentage}% IA",
        "timestamp_utc": timestamp,
        "manifest_hash": hash_manifiesto,
        "nota": "Listo para anclaje en Blockchain"
    }, indent=4)

print("1. Despertando a Meta (Llama 3 en Groq)...")
client = Groq()

print("2. Enviando instrucciones a Llama...")
chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "Eres un agente certificador de ARKHÉ ZERO. Debes usar la herramienta proporcionada."
        },
        {
            "role": "user",
            "content": "Usa la herramienta de ARKHÉ ZERO para certificar mi 'Tesis Doctoral' al 51% humano."
        }
    ],
    model="llama3-8b-8192",
    tools=[{
        "type": "function",
        "function": {
            "name": "certify_authorship",
            "description": "Certifica una obra con la regla 51/49",
            "parameters": {
                "type": "object",
                "properties": {
                    "work_name": {"type": "string", "description": "Nombre de la obra"},
                    "human_percentage": {"type": "integer", "description": "Porcentaje humano"}
                },
                "required": ["work_name", "human_percentage"]
            }
        }
    }],
    tool_choice="auto"
)

response_message = chat_completion.choices[0].message

if response_message.tool_calls:
    print("\n[Meta (Llama 3) quiere usar la herramienta: certify_authorship]")
    tool_call = response_message.tool_calls[0]
    args = json.loads(tool_call.function.arguments)
    print(f"[Argumentos: {args}]")
    
    print("\n3. Ejecutando el código de ARKHÉ ZERO...")
    resultado = generar_certificado(args["work_name"], args["human_percentage"])
    
    print("\n✅ RESULTADO FINAL DE META (LLAMA 3):")
    print(resultado)
else:
    print("Llama no quiso usar la herramienta. Dijo:", response_message.content)
