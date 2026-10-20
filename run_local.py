import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def main():
    print("🚀 1. Iniciando el Servidor ARKHÉ ZERO (Local)...")
    # Configuramos el servidor para que corra localmente
    server_params = StdioServerParameters(
        command="python3",
        args=["arkhe_server.py"]
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            print("✅ 2. Servidor conectado y escuchando.\n")

            # Ejecutamos la certificación
            print("⏳ 3. Solicitando certificación para la 'Tesis Doctoral' al 51%...")
            result = await session.call_tool(
                "certify_authorship",
                arguments={
                    "work_name": "Tesis Doctoral ARKHÉ ZERO",
                    "human_percentage": 51
                }
            )
            
            print("\n🎉 ¡RESULTADO FINAL DE LA INFRAESTRUCTURA LOCAL!")
            print("--------------------------------------------------")
            print(result.content[0].text)
            print("--------------------------------------------------")

if __name__ == "__main__":
    asyncio.run(main())
