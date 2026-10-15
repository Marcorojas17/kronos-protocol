# Incidente de seguridad · 2026-10-15

## Resumen
Llave privada Ed25519 `firma/privada.pem` fue commiteada por error el
2026-10-12 en el commit `4dfc228` (Snapshot codigo · IA + agentes + HTML).

## Alcance
- **Tipo:** Llave Ed25519 privada real
- **Uso:** Scripts de demo (`agentes/tonal.py`, `quantum/audit.py`)
- **Protege:** Nada crítico
- **NO protege:** Pacto 51/49, Génesis K28, atestaciones de agentes

## Acciones tomadas
1. Removida del tracking de git (`git rm --cached`)
2. Añadida al `.gitignore`
3. Rotada: nueva llave en `~/.arkhe-private/firma/`
4. Documentado en este archivo

## Estado
- [x] Llave removida del working tree
- [x] Nueva llave generada
- [ ] Actualizar scripts que usaban la llave vieja
- [ ] Commit y push
- [ ] (Opcional) Limpiar historial de git con git filter-repo

## Lección
Antes de commitear, verificar con:
    git status --short | grep -E "\.key|\.pem|privada|secret"

Autor: Marco Antonio Rojas Valdovinos · Nodo YHDRYH-92CE
