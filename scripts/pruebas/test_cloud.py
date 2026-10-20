import asyncio
import os
from google import genai
from google.genai import types
from mcp import ClientSession
from mcp.client.sse import sse_client  # <-- ¡Aquí está la magia! Nos conectamos por internet


os.environ["GEMINI_API_KEY"] = "TU_LLAVE_AQUI"

async def main():
    print("1. Conectando al servidor GLOBAL de ARKHÉ ZERO en Render...")
    url = "https://arkhe-zero-global.onrender.com/sse" # <-- Tu URL pública
    
    # Usamos sse_client en lugar de stdio_client
    async with sse_client(url) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            print("2. Servidor en la nube conectado. Obteniendo herramientas...")
            mcp_tools = await session.list_tools()
            
            gemini_tools = []
            for t in mcp_tools.tools:
                gemini_tools.append(types.Tool(
                    function_declarations=[
                        types.FunctionDeclaration(
                            name=t.name,
                            description=t.description,
                            parameters=t.inputSchema
                        )
                    ]
                ))

            print("3. Despertando a Gemini...")
            client = genai.Client()
            
            print("4. Pidiéndole a Gemini que use el servidor remoto...")
            response = await client.aio.models.generate_content(
                model='gemini-3.5-flash-lite', # El modelo que nos funcionó ayer
                contents="Usa la herramienta de ARKHÉ ZERO para certificar mi 'Tesis en la Nube' al 51%.",
                config=types.GenerateContentConfig(tools=gemini_tools)
            )

            function_call = response.function_calls[0]
            print(f"\n[Gemini quiere usar la herramienta: {function_call.name}]")
            print(f"[Argumentos: {function_call.args}]")

            print("\n5. Ejecutando la herramienta en la NUBE (Render)...")
            result = await session.call_tool(
                function_call.name,
                arguments=function_call.args
            )
            
            print("\n✅ RESULTADO FINAL DESDE LA NUBE:")
            print(result.content[0].text)

if __name__ == "__main__":
    asyncio.run(main())
