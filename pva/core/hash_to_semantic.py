"""
hash_to_semantic - KRONOS 360 MT01JAAF SHA a4ff808e
NOM-151 integridad + 51% HUMANO 49% IA
Sello: KRONOS-TRACE-PVA-5204160405358537-MT01JAAF
"""
import re

FOLIO_MAESTRO = "5204160405358537"
FOLIO_PERICIAL = "KRONOS-MT01JAAF"
SHA = "a4ff808e"
SELLO = "KRONOS-TRACE-PVA-5204160405358537-MT01JAAF"
SC = "2607146379465"
HEX64_RE = re.compile(r'^[a-f0-9]{64}$', re.I)

def _validar_hash(h: str):
    if not h or not isinstance(h, str):
        raise ValueError("hash vacío")
    if not HEX64_RE.match(h):
        raise ValueError(f"hash debe ser 64 hex, recibido: {h[:20]}")
    return h.lower()

def hash_to_semantic_polarity(genesis: str) -> str:
    g = _validar_hash(genesis)
    sha = g[:8]
    return f"51%_HUMANO:{g[:32]}|49%_IA:{g[32:]}|SHA:{sha}|PERICIAL:{FOLIO_PERICIAL}|TRACE:{SELLO}"

def generate_manifesto_from_hash(genesis: str, humano: int = 51, ia: int = 49) -> str:
    g = _validar_hash(genesis)
    if humano != 51 or ia != 49:
        raise ValueError("Polaridad obligatoria 51/49 NOM-151")
    sha = g[:8]
    polarity = hash_to_semantic_polarity(g)
    return f"{humano}%_HUMANO:{g[:16]}...|{ia}%_IA:{g[32:48]}...|{polarity}|FOLIO_MAESTRO:{FOLIO_MAESTRO}|FOLIO_PERICIAL:{FOLIO_PERICIAL}|SHA:{sha}|GENESIS:{g}|SELLO:{SELLO}|SC:{SC}|PERITO:kronosproyecto@hotmail.com|MT01JAAF:{FOLIO_PERICIAL}:{sha}"
