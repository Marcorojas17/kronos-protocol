import asyncio
import os
import json
import requests
from mcp import ClientSession
from mcp.client.sse import sse_client

# PON AQUÍ TU LLAVE DE OPENROUTER
os.environ["OPENROUTER_API_KEY"] = "TU_LLAVE_AQUI"

async def main():
    print("1. Conectando al servidor GLOBAL de ARKHÉ ZERO en Render...")
    url = "https://arkhe-zero-global.onrender.com/sse"
    
    async with sse_client(url) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            print("2. Servidor en la NUBE conectado. Obteniendo herramientas...")
            mcp_tools = await session.list_tools()
            
            # Formateamos las herramientas para OpenRouter
            formatted_tools = [{
                "type": "function",
                "function": {
                    "name": t.name,
                    "description": t.description,
                    "parameters": t.inputSchema
                }
            } for t in mcp_tools.tools]

            print("3. Despertando a Meta (Llama 3) vía OpenRouter...")
            payload = {
                "model": "openrouter/free", # El comodín que nos funcionó ayer
                "messages": [
                    {"role": "system", "content": "Eres un agente autónomo. Usa la herramienta proporcionada para certificar la obra."},
                    {"role": "user", "content": "Certifica mi 'Tesis Global' asegurando que el 51% es humano."}
                ],
                "tools": formatted_tools
            }
            headers = {
                "Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}",
                "Content-Type": "application/json"
            }

            respuesta = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
            
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
                
                print("\n4. Ejecutando la herramienta en la NUBE (Render)...")
                result = await session.call_tool(
                    tool_call["function"]["name"], 
                    arguments=argumentos
                )
                
                print("\n✅ RESULTADO FINAL DE META DESDE LA NUBE:")
                print(result.content[0].text)
            else:
                print("La IA respondió con texto en lugar de usar la herramienta:")
                print(mensaje['content'])

if __name__ == "__main__":
    asyncio.run(main())
