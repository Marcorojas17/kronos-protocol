from fastapi import FastAPI, Header, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
import hashlib
import uuid
from datetime import datetime, timezone

app = FastAPI(
    title="ARKHÉ ZERO MVP - SECURE", 
    description="Sistema de procedencia con Ciberdefensa 51/49 y Estados Binarios"
)

# ==========================================
# 1. BÓVEDA DE LLAVES Y VERIFICACIÓN DE IDENTIDAD
# ==========================================
VALID_API_KEYS = {
    "arkhe-secreto-123": "marcorojas17", 
    "arkhe-prod-YHDRYH-92CE": "marcorojas17"
}

def verify_api_key(x_api_key: str = Header(...)) -> str:
    if x_api_key not in VALID_API_KEYS:
        raise HTTPException(status_code=401, detail="401 UNAUTHORIZED - API Key inválida.")
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

# ==========================================
# 3. ENDPOINTS
# ==========================================
@app.get("/")
def read_root():
    return {"status": "ARKHÉ ZERO MVP SECURE Online", "version": "0.3.0"}

@app.post("/artifacts")
def create_artifact_secure(
    data: ArtifactCreate, 
    verified_owner: str = Depends(verify_api_key),
    x_api_key: str = Header(...)
):
    if data.owner != verified_owner:
        raise HTTPException(status_code=403, detail="403 FORBIDDEN - Suplantación detectada.")
    
    if data.human_author != verified_owner and data.human_author != "Marco Antonio Rojas Valdovinos":
        raise HTTPException(status_code=403, detail="403 - human_author inválido.")

    ts = data.timestamp or datetime.now(timezone.utc).isoformat()
    payload = f"{data.content}|{ts}|{data.human_author}|51/49"
    hash_sha = hashlib.sha256(payload.encode()).hexdigest()
    
    artifact_id = str(uuid.uuid4())
    artifact = {
        "id": artifact_id,
        "owner": verified_owner,
        "version": 1,
        "hash": hash_sha,
        "timestamp": ts,
        "human_author": data.human_author,
        "ai_agent": data.ai_agent,
        "status": "VERDE_0", # Estado inicial según la cláusula 4
        "api_key_used": x_api_key[:8] + "***",
        "pact_verified": "51/49/100"
    }
    db_artifacts[artifact_id] = artifact
    return {"message": "Artefacto creado - Estado VERDE_0", "artifact": artifact}

@app.get("/artifacts/{artifact_id}/provenance")
def get_provenance(artifact_id: str):
    if artifact_id not in db_artifacts:
        raise HTTPException(status_code=404, detail="Artefacto no encontrado")
    return db_artifacts[artifact_id]

# NUEVO ENDPOINT: Estado Rojo 1 (Revocación irreversible)
@app.post("/artifacts/{artifact_id}/revoke")
def revoke_artifact(artifact_id: str, verified_owner: str = Depends(verify_api_key)):
    if artifact_id not in db_artifacts:
        raise HTTPException(status_code=404, detail="Artefacto no encontrado")
    
    artifact = db_artifacts[artifact_id]
    
    if artifact["owner"] != verified_owner:
        raise HTTPException(status_code=403, detail="403 - Solo el dueño puede revocar este artefacto.")
        
    # La cláusula 4 exige un cambio permanente e irreversible
    artifact["status"] = "ROJO_1" 
    artifact["revoked_at"] = datetime.now(timezone.utc).isoformat()
    artifact["message"] = "Certificado revocado permanentemente según Cláusula 4."
    
    return {"message": "Artefacto revocado irreversiblemente (Estado ROJO_1)", "artifact": artifact}
