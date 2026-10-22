import hashlib
from datetime import datetime, timezone
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("ARKHE-ZERO-LOCAL")

@mcp.tool()
def hash_manifest(manifest_text: str) -> str:
    """Calcula el hash SHA-256 de un manifiesto digital."""
    sha256_hash = hashlib.sha256(manifest_text.encode('utf-8')).hexdigest()
    return f"Hash SHA-256 generado: {sha256_hash}"

@mcp.tool()
def certify_authorship(work_name: str, human_percentage: int = 51) -> dict:
    """Registra la proporción de co-creatividad humano-IA bajo el Protocolo PVA."""
    if human_percentage < 0 or human_percentage > 100:
        raise ValueError("El porcentaje humano debe estar entre 0 y 100.")
    
    ia_percentage = 100 - human_percentage
    timestamp = datetime.now(timezone.utc).isoformat()
    manifest_data = f"{work_name}|{human_percentage}|{ia_percentage}|{timestamp}"
    manifest_hash = hashlib.sha256(manifest_data.encode('utf-8')).hexdigest()

    return {
        "status": "Certificado Exitoso (Local)",
        "protocolo": "ARKHÉ ZERO (PVA)",
        "obra": work_name,
        "proporcion": f"{human_percentage}% Humano / {ia_percentage}% IA",
        "timestamp_utc": timestamp,
        "manifest_hash": manifest_hash,
        "nota": "Listo para anclaje"
    }

if __name__ == "__main__":
    mcp.run()
