# ═══════════════════════════════════════════════════════════════════════════
#  ▓▒░ TERRAFORM · MONITORING · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
#  ─────────────────────────────────────────────────────────────────────────
#  NODO: YHDRYH-92CE · Logs + alertas + observabilidad
# ═══════════════════════════════════════════════════════════════════════════

variable "name"        { type = string }
variable "environment" { type = string }

resource "aws_cloudwatch_log_group" "arkhe" {
  name              = "/arkhe-zero/${var.environment}"
  retention_in_days = 90

  tags = {
    Name = "${var.name}-logs"
    Seal = "◯_●-51-49-100"
    Nodo = "YHDRYH-92CE"
  }
}

resource "aws_sns_topic" "alerts" {
  name = "${var.name}-alerts"

  tags = {
    Name = "${var.name}-alerts"
    Seal = "◯_●-51-49-100"
    Nodo = "YHDRYH-92CE"
  }
}

output "log_group"  { value = aws_cloudwatch_log_group.arkhe.name }
output "sns_topic"  { value = aws_sns_topic.alerts.arn }

# ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE