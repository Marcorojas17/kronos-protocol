# ═══════════════════════════════════════════════════════════════════════════
#  ▓▒░ TERRAFORM · PROD · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
#  ─────────────────────────────────────────────────────────────────────────
#  NODO: YHDRYH-92CE · Environment: PROD
#  Backups: REQUIRED · Retention: 365 días
# ═══════════════════════════════════════════════════════════════════════════

region        = "us-east-1"
environment   = "prod"

vpc_cidr      = "10.42.0.0/16"
instance_type = "t3.medium"
replica_count = 3

backup_enabled        = true
backup_retention_days = 365

tags = {
  Project = "arkhe-zero"
  Env     = "prod"
  Seal    = "◯_●-51-49-100"
  Nodo    = "YHDRYH-92CE"
  Backup  = "required"
  SLA     = "99.99%"
}

# ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE · prod