# Para correr esto: 1. Instala Ollama (ollama.com) 2. Ejecuta: ollama run llama3
import asyncio
import json
import ollama
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def main():
    server_params = StdioServerParameters(command="python3", args=["arkhe_server.py"])
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            mcp_tools = await session.list_tools()
            
            # Formatear herramientas para Llama
            tools_for_llama = [{"type": "function", "function": {"name": t.name, "description": t.description, "parameters": t.inputSchema}} for t in mcp_tools.tools]

            response = ollama.chat(
                model='llama3',
                messages=[{'role': 'user', 'content': 'Usa la herramienta para certificar mi tesis al 51%'}],
                tools=tools_for_llama
            )
            
            tool_call = response['message']['tool_calls'][0]
            result = await session.call_tool(tool_call['function']['name'], arguments=tool_call['function']['arguments'])
            print("Resultado de Llama:", result.content[0].text)
            
asyncio.run(main())
