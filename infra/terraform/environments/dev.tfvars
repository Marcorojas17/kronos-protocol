# ═══════════════════════════════════════════════════════════════════════════
#  ▓▒░ TERRAFORM · DEV · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
#  ─────────────────────────────────────────────────────────────────────────
#  NODO: YHDRYH-92CE · Environment: DEV
# ═══════════════════════════════════════════════════════════════════════════

region        = "us-east-1"
environment   = "dev"

vpc_cidr      = "10.42.0.0/16"
instance_type = "t3.micro"
replica_count = 1

tags = {
  Project = "arkhe-zero"
  Env     = "dev"
  Seal    = "◯_●-51-49-100"
  Nodo    = "YHDRYH-92CE"
}

# ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE · dev