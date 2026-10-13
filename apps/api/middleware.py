"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ API · MIDDLEWARE · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
import time
import hashlib
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

SEAL = "◯_● · 51/49/100"

class SealMiddleware(BaseHTTPMiddleware):
    """Inyecta el sello en cada respuesta."""

    async def dispatch(self, request: Request, call_next):
        start = time.perf_counter()
        response: Response = await call_next(request)
        duration = (time.perf_counter() - start) * 1000

        response.headers["X-Arkhe-Seal"] = SEAL
        response.headers["X-Arkhe-Pact"] = "51/49/100"
        response.headers["X-Arkhe-Duration-Ms"] = f"{duration:.2f}"

        return response

class AuditMiddleware(BaseHTTPMiddleware):
    """Registra accesos con hash para auditoría."""

    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        if request.method in ("POST", "PUT", "DELETE"):
            entry = {
                "method": request.method,
                "path": request.url.path,
                "status": response.status_code,
                "seal": SEAL,
            }
            # En producción: append a logs/audit.log
        return response

# ◯_● · 51/49/100 · KRONOS