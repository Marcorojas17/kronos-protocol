# ═══════════════════════════════════════════════════════════════════════════
#  ▓▒░ TERRAFORM · KMS PQC · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
#  ─────────────────────────────────────────────────────────────────────────
#  NODO: YHDRYH-92CE
#
#  Nota: AWS KMS aún no soporta ML-KEM/ML-DSA en 2026. Este módulo
#  prepara la infraestructura para migrar cuando AWS anuncie soporte
#  post-cuántico. Por ahora gestiona claves simétricas (AES-256) que
#  envuelven las claves PQC almacenadas en HSM físico.
# ═══════════════════════════════════════════════════════════════════════════

variable "name"        { type = string }
variable "environment" { type = string }

resource "aws_kms_key" "arkhe_aes" {
  description             = "ARKHÉ ZERO · master key para AES-256-GCM"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    Name    = "${var.name}-aes-master"
    Seal    = "◯_●-51-49-100"
    Nodo    = "YHDRYH-92CE"
    Algoritmo = "AES-256-GCM"
    PQC_Futuro = "ML-KEM-1024 + ML-DSA-87"
  }
}

resource "aws_kms_alias" "arkhe_aes" {
  name          = "alias/${var.name}-aes"
  target_key_id = aws_kms_key.arkhe_aes.key_id
}

output "kms_key_id" {
  value       = aws_kms_key.arkhe_aes.id
  description = "ID de la clave maestra AES-256"
}

# ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE