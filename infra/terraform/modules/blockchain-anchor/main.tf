# ═══════════════════════════════════════════════════════════════════════════
#  ▓▒░ TERRAFORM · BLOCKCHAIN ANCHOR · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
#  ─────────────────────────────────────────────────────────────────────────
#  NODO: YHDRYH-92CE · Almacenamiento permanente de Merkle roots
# ═══════════════════════════════════════════════════════════════════════════

variable "name"        { type = string }
variable "environment" { type = string }
variable "rpc_url"     { type = string, default = "" }

# Bucket S3 para almacenar Merkle roots y pruebas históricas
resource "aws_s3_bucket" "merkle_proofs" {
  bucket = "${var.name}-merkle-proofs"

  tags = {
    Name    = "${var.name}-merkle"
    Seal    = "◯_●-51-49-100"
    Nodo    = "YHDRYH-92CE"
    Uso     = "Merkle-roots + pruebas históricas"
  }
}

resource "aws_s3_bucket_versioning" "merkle_proofs" {
  bucket = aws_s3_bucket.merkle_proofs.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "merkle_proofs" {
  bucket = aws_s3_bucket.merkle_proofs.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

output "bucket_name" {
  value       = aws_s3_bucket.merkle_proofs.bucket
  description = "Bucket S3 para pruebas Merkle"
}

# ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE