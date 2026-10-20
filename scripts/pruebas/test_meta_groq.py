import asyncio
import os
import json
from groq import AsyncGroq
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

#Code signup_blocked · Ref ea120297f3c7bc03cd92baa07a8491be
os.environ["GROQ_API_KEY"] ="ea120297f3c7bc03cd92baa07a8491be"

async def main():
    print("1. Iniciando servidor ARKHÉ ZERO...")
    server_params = StdioServerParameters(command="python3", args=["arkhe_server.py"])

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            mcp_tools = await session.list_tools()
            
            # Formateamos las herramientas para Meta (Llama 3)
            tools_for_llama = [{"type": "function", "function": {"name": t.name, "description": t.description, "parameters": t.inputSchema}} for t in mcp_tools.tools]

            print("2. Despertando a Meta (Llama 3 en Groq)...")
            client = AsyncGroq()
            
            response = await client.chat.completions.create(
                model="llama3-8b-8192",
                messages=[{"role": "user", "content": "Usa la herramienta de ARKHÉ ZERO para certificar mi 'Tesis de Marco' al 51% humano."}],
                tools=tools_for_llama,
                tool_choice="auto"
            )
            
            tool_call = response.choices[0].message.tool_calls[0]
            print(f"\n[Meta (Llama 3) quiere usar la herramienta: {tool_call.function.name}]")
            print(f"[Argumentos: {tool_call.function.arguments}]")

            print("\n3. Ejecutando en tu servidor MCP...")
            result = await session.call_tool(tool_call.function.name, arguments=json.loads(tool_call.function.arguments))
            
            print("\n✅ RESULTADO FINAL DE META (LLAMA 3):")
            print(result.content[0].text)

if __name__ == "__main__":
    asyncio.run(main())
