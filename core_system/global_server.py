import os
from mcp.server import MCPServer

mcp = MCPServer("ARKHE-ZERO-GLOBAL")

@mcp.tool()
def certify_authorship(work_name: str, human_percentage: int = 51) -> dict:
    return {
        "status": "Certificado Exitoso en la Nube",
        "protocolo": "ARKHÉ ZERO (PVA)",
        "obra": work_name,
        "proporcion": f"{human_percentage}% Humano / {100 - human_percentage}% IA"
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    mcp.run(transport="sse", host="0.0.0.0", port=port)