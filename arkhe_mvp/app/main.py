from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import hashlib
import uuid
from datetime import datetime, timezone

app = FastAPI(title="ARKHÉ ZERO MVP", description="Sistema de procedencia, memoria y control humano-IA")

# Base de datos en memoria (Para el MVP. Luego se cambia a PostgreSQL)
db_artifacts = {}

# Modelo del Artefacto (Lo que propuso MobileGPT)
class Artifact(BaseModel):
    id: str
    owner: str
    version: int
    hash: str
    timestamp: str
    human_author: str
    ai_agent: Optional[str] = None
    status: str = "draft" # draft, reviewed, approved, revoked
    approved_by: Optional[str] = None

class ArtifactCreate(BaseModel):
    owner: str
    content: str
    human_author: str
    ai_agent: Optional[str] = None

@app.get("/")
def read_root():
    return {"status": "ARKHÉ ZERO MVP Online", "version": "0.1.0"}

# 1. Subir un documento (Genera Hash)
@app.post("/artifacts")
def create_artifact(payload: ArtifactCreate):
    # Calcular hash SHA-256
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

# 2. Obtener la procedencia (Provenance)
@app.get("/artifacts/{artifact_id}/provenance")
def get_provenance(artifact_id: str):
    if artifact_id not in db_artifacts:
        raise HTTPException(status_code=404, detail="Artefacto no encontrado")
    return db_artifacts[artifact_id]

# 3. Aprobación Humana (El 51%)
@app.post("/artifacts/{artifact_id}/approve")
def approve_artifact(artifact_id: str, approver_name: str):
    if artifact_id not in db_artifacts:
        raise HTTPException(status_code=404, detail="Artefacto no encontrado")
    
    artifact = db_artifacts[artifact_id]
    artifact.status = "approved"
    artifact.approved_by = approver_name
    
    return {"message": f"Artefacto aprobado por {approver_name}", "artifact": artifact}
