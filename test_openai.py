# Requiere: pip install openai y tu OPENAI_API_KEY
import asyncio
import os
import json
from openai import AsyncOpenAI
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def main():
    server_params = StdioServerParameters(command="python3", args=["arkhe_server.py"])
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            mcp_tools = await session.list_tools()
            
            tools_for_openai = [{"type": "function", "function": {"name": t.name, "description": t.description, "parameters": t.inputSchema}} for t in mcp_tools.tools]
            
            client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
            response = await client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": "Certifica mi tesis"}],
                tools=tools_for_openai
            )
            
            tool_call = response.choices[0].message.tool_calls[0]
            result = await session.call_tool(tool_call.function.name, arguments=json.loads(tool_call.function.arguments))
            print("Resultado de OpenAI:", result.content[0].text)

asyncio.run(main())
