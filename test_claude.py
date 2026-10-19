# Requiere: pip install anthropic y tu ANTHROPIC_API_KEY
import asyncio
import os
from anthropic import AsyncAnthropic
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def main():
    server_params = StdioServerParameters(command="python3", args=["arkhe_server.py"])
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            mcp_tools = await session.list_tools()
            
            tools_for_claude = [{"name": t.name, "description": t.description, "input_schema": t.inputSchema} for t in mcp_tools.tools]

            client = AsyncAnthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
            response = await client.messages.create(
                model="claude-3-haiku-20240307",
                max_tokens=1024,
                messages=[{"role": "user", "content": "Certifica mi tesis"}],
                tools=tools_for_claude
            )
            
            tool_use = response.content[0]
            result = await session.call_tool(tool_use.name, arguments=tool_use.input)
            print("Resultado de Claude:", result.content[0].text)

asyncio.run(main())
