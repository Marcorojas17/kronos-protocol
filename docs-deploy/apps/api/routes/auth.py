"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ API · ROUTES · AUTH · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
from fastapi import APIRouter, HTTPException
from ..schemas import AuthRequest, AuthResponse, SEAL

router = APIRouter()

@router.post("/verify", response_model=AuthResponse)
async def verify_signature(payload: AuthRequest) -> AuthResponse:
    """Verifica una firma híbrida Ed25519 + ML-DSA-87."""
    if not payload.firma or not payload.public_key:
        raise HTTPException(status_code=400, detail="Firma y public_key requeridos")
    # En producción: verificación real con @noble/curves + @noble/post-quantum
    return AuthResponse(
        ok=True,
        token=None,
        sellado=SEAL,
    )

@router.post("/token", response_model=AuthResponse)
async def issue_token(payload: AuthRequest) -> AuthResponse:
    """Emite un token temporal tras verificar identidad."""
    raise HTTPException(status_code=501, detail="Not implemented yet · roadmap 2027")

# ◯_● · 51/49/100 · KRONOS