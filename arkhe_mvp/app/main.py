from fastapi import FastAPI, Header, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
import hashlib
import uuid
from datetime import datetime, timezone

app = FastAPI(
    title="ARKHÉ ZERO MVP - SECURE", 
    description="Sistema de procedencia con Ciberdefensa 51/49"
)

# ==========================================
# 1. BÓVEDA DE LLAVES Y VERIFICACIÓN DE IDENTIDAD
# ==========================================
VALID_API_KEYS = {
    "***REMOVED-COMPROMETIDA-2026-10-25***": "marcorojas17", 
    "***REMOVED-COMPROMETIDA-2026-10-25***": "marcorojas17"
}

def verify_api_key(x_api_key: str = Header(...)) -> str:
    if x_api_key not in VALID_API_KEYS:
        # 401 Unauthorized: La llave no es válida
        raise HTTPException(status_code=401, detail="401 UNAUTHORIZED - API Key inválida. Pacto 51/49 violado.")
    return VALID_API_KEYS[x_api_key]

# ==========================================
# 2. MODELOS DE DATOS
# ==========================================
db_artifacts = {}

class ArtifactCreate(BaseModel):
    owner: str
    content: str
    human_author: str
    ai_agent: Optional[str] = "Enjambre-ARKHE"
    timestamp: Optional[str] = None

class Artifact(BaseModel):
    id: str
    owner: str
    version: int
    hash: str
    timestamp: str
    human_author: str
    ai_agent: Optional[str] = None
    status: str
    approved_by: Optional[str] = None

# ==========================================
# 3. ENDPOINTS
# ==========================================
@app.get("/")
def read_root():
    return {"status": "ARKHÉ ZERO MVP SECURE Online", "version": "0.2.0"}

@app.post("/artifacts")
def create_artifact_secure(
    data: ArtifactCreate, 
    verified_owner: str = Depends(verify_api_key),
    x_api_key: str = Header(...)
):
    # VALIDACIÓN 51/49 (Prevención de Suplantación)
    if data.owner != verified_owner:
        raise HTTPException(
            status_code=403, 
            detail=f"403 FORBIDDEN - Owner '{data.owner}' no coincide con identidad verificada '{verified_owner}'. Suplantación detectada."
        )
    
    if data.human_author != verified_owner and data.human_author != "Marco Antonio Rojas Valdovinos":
        raise HTTPException(
            status_code=403, 
            detail=f"403 - human_author debe ser '{verified_owner}', no '{data.human_author}'"
        )

    # Cálculo del Hash Determinista
    ts = data.timestamp or datetime.now(timezone.utc).isoformat()
    payload = f"{data.content}|{ts}|{data.human_author}|51/49"
    hash_sha = hashlib.sha256(payload.encode()).hexdigest()
    
    artifact_id = str(uuid.uuid4())
    artifact = {
        "id": artifact_id,
        "owner": verified_owner, # Forzado al verificado, no al que manda el cliente
        "version": 1,
        "hash": hash_sha,
        "timestamp": ts,
        "human_author": data.human_author,
        "ai_agent": data.ai_agent,
        "status": "draft",
        "api_key_used": x_api_key[:8] + "***", # Registro de auditoría
        "pact_verified": "51/49/100"
    }
    db_artifacts[artifact_id] = artifact
    return {"message": "Artefacto creado - Identidad verificada", "artifact": artifact}

@app.get("/artifacts/{artifact_id}/provenance")
def get_provenance(artifact_id: str):
    if artifact_id not in db_artifacts:
        raise HTTPException(status_code=404, detail="Artefacto no encontrado")
    return db_artifacts[artifact_id]

@app.post("/artifacts/{artifact_id}/approve")
def approve_artifact(artifact_id: str, verified_owner: str = Depends(verify_api_key)):
    if artifact_id not in db_artifacts:
        raise HTTPException(status_code=404, detail="Artefacto no encontrado")
    
    artifact = db_artifacts[artifact_id]
    
    # Solo el dueño del artefacto puede aprobarlo
    if artifact["owner"] != verified_owner:
        raise HTTPException(status_code=403, detail="403 - Solo el creador puede aprobar este artefacto.")
        
    artifact["status"] = "approved"
    artifact["approved_by"] = verified_owner
    return {"message": f"Artefacto aprobado exitosamente por {verified_owner}", "artifact": artifact}
