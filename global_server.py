# --- VERSIÓN GLOBAL (NUBE) ---
import os
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("ARKHE-ZERO-GLOBAL")

@mcp.tool()
def certify_authorship(work_name: str, human_percentage: int = 51) -> dict:
    # (Aquí va tu lógica del hash SHA-256)
    return {"status": "Certificado Exitoso en la Nube", "obra": work_name}

if __name__ == "__main__":
    # Render usa la variable de entorno PORT
    port = int(os.environ.get("PORT", 8000))
    mcp.run(transport="sse", host="0.0.0.0", port=port)