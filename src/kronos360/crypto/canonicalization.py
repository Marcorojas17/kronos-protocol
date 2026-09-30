"""Canonicalizacion determinista de JSON segun RFC 8785 (JCS)."""

from __future__ import annotations

import rfc8785


def canonicalize(obj: dict) -> bytes:
    """Devuelve la representacion canonica de obj como bytes UTF-8."""
    return rfc8785.dumps(obj)
