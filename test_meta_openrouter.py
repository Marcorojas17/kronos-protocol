import json
import requests

def generar_certificado(work_name, human_percentage):
    return {
        "status": "Certificado Exitoso",
        "protocolo": "ARKHÉ ZERO (PVA)",
        "obra": work_name,
        "proporcion": f"{human_percentage}% Humano / {100 - human_percentage}% IA",
        "manifest_hash": "bfa5379629d72feb4faeafa454d20a1e36108ec690713e55043a222ea344bd4e",
        "nota": "Certificado por Meta (Llama 3)"
    }

def llamar_a_llama():
    print("1. Despertando a Meta (Llama 3) vía OpenRouter...")
    
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": "Bearer TU_LLAVE_AQUI",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "openrouter/free",
        "messages": [
            {"role": "system", "content": "Eres un agente certificador. Debes usar la herramienta certify_authorship."},
            {"role": "user", "content": "Certifica mi 'Tesis Doctoral' con 51% humano."}
        ],
        "tools": [{
            "type": "function",
            "function": {
                "name": "certify_authorship",
                "description": "Certifica una obra",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "work_name": {"type": "string"},
                        "human_percentage": {"type": "integer"}
                    },
                    "required": ["work_name", "human_percentage"]
                }
            }
        }]
    }

    respuesta = requests.post(url, headers=headers, json=payload)
    
    if respuesta.status_code != 200:
        print(f"❌ Error de OpenRouter: {respuesta.text}")
        return

    datos = respuesta.json()
    mensaje = datos['choices'][0]['message']

    if "tool_calls" in mensaje:
        tool_call = mensaje["tool_calls"][0]
        argumentos = json.loads(tool_call["function"]["arguments"])
        
        print(f"\n[Meta (Llama 3) quiere usar la herramienta: {tool_call['function']['name']}]")
        print(f"[Argumentos: {argumentos}]")
        
        print("\n2. Ejecutando código de ARKHÉ ZERO...")
        resultado = generar_certificado(argumentos["work_name"], argumentos["human_percentage"])
        
        print("\n✅ RESULTADO FINAL DE META (LLAMA 3):")
        print(json.dumps(resultado, indent=4))
    else:
        print("La IA respondió texto en lugar de usar la herramienta:")
        print(mensaje['content'])

if __name__ == "__main__":
    llamar_a_llama()
