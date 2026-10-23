from fastapi import FastAPI, HTTPException, Security, Depends
from fastapi.security import APIKeyHeader
from pydantic import BaseModel
from typing import Optional
import hashlib
import uuid
from datetime import datetime, timezone

app = FastAPI(title="ARKHÉ ZERO MVP", description="Sistema de procedencia, memoria y control humano-IA")

# ==========================================
# CONFIGURACIÓN DE LA LLAVE (API KEY)
# ==========================================
# Esta es la llave que le darás a la IA o al cliente
API_KEY_SECRET = "arkhe-secreto-123"
API_KEY_NAME = "X-API-Key"

# Le decimos a FastAPI que busque la llave en los Headers de la petición
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

# Función que verifica si la llave es correcta
def verificar_llave(api_key: str = Security(api_key_header)):
    if api_key == API_KEY_SECRET:
        return api_key
    raise HTTPException(
        status_code=403, 
        detail="Acceso denegado. Llave de API (API Key) inválida o ausente."
    )

# ==========================================
# LÓGICA DEL NEGOCIO
# ==========================================
db_artifacts = {}

class Artifact(BaseModel):
    id: str
    owner: str
    version: int
    hash: str
    timestamp: str
    human_author: str
    ai_agent: Optional[str] = None
    status: str = "draft"
    approved_by: Optional[str] = None

class ArtifactCreate(BaseModel):
    owner: str
    content: str
    human_author: str
    ai_agent: Optional[str] = None

@app.get("/")
def read_root():
    return {"status": "ARKHÉ ZERO MVP Online", "version": "0.1.0"}

# AQUÍ APLICAMOS LA LLAVE: Añadimos "dependencies=[Depends(verificar_llave)]"
@app.post("/artifacts", dependencies=[Depends(verificar_llave)])
def create_artifact(payload: ArtifactCreate):
    file_hash = hashlib.sha256(payload.content.encode()).hexdigest()
    artifact_id = str(uuid.uuid4())
    new_artifact = Artifact(
        id=artifact_id,
        owner=payload.owner,
        version=1,
        hash=file_hash,
        timestamp=datetime.now(timezone.utc).isoformat(),
        human_author=payload.human_author,
        ai_agent=payload.ai_agent,
        status="draft"
    )
    db_artifacts[artifact_id] = new_artifact
    return {"message": "Artefacto creado", "artifact": new_artifact}

@app.get("/artifacts/{artifact_id}/provenance", dependencies=[Depends(verificar_llave)])
def get_provenance(artifact_id: str):
    if artifact_id not in db_artifacts:
        raise HTTPException(status_code=404, detail="Artefacto no encontrado")
    return db_artifacts[artifact_id]

@app.post("/artifacts/{artifact_id}/approve", dependencies=[Depends(verificar_llave)])
def approve_artifact(artifact_id: str, approver_name: str):
    if artifact_id not in db_artifacts:
        raise HTTPException(status_code=404, detail="Artefacto no encontrado")
    artifact = db_artifacts[artifact_id]
    artifact.status = "approved"
    artifact.approved_by = approver_name
    return {"message": f"Artefacto aprobado por {approver_name}", "artifact": artifact}
