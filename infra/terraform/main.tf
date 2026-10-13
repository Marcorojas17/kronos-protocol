# ═══════════════════════════════════════════════════════════════
#  ▓▒░ TERRAFORM · MAIN · ARKHÉ ZERO · ◯_● ░▒▓
# ═══════════════════════════════════════════════════════════════

terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    # configurar bucket + key
    encrypt = true
  }
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Project     = "arkhe-zero"
      Seal        = "◯_●-51-49-100"
      Pact        = "51-49-100"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

# ─── VPC ────────────────────────────────────────────────────────
module "vpc" {
  source      = "./modules/vpc"
  name        = "arkhe-zero-${var.environment}"
  environment = var.environment
  cidr        = "10.42.0.0/16"
}

# ─── KMS PQC ────────────────────────────────────────────────────
module "kms_pqc" {
  source      = "./modules/kms-pqc"
  name        = "arkhe-zero-kms-${var.environment}"
  environment = var.environment
}

# ─── Monitoring ─────────────────────────────────────────────────
module "monitoring" {
  source      = "./modules/monitoring"
  name        = "arkhe-zero-monitoring"
  environment = var.environment
}

# ─── Variables ──────────────────────────────────────────────────
variable "region"      { default = "us-east-1" }
variable "environment" { default = "prod" }

output "seal" {
  value       = "◯_● · 51/49/100"
  description = "Sello KINTSUGI del sistema"
}

output "index_zero_sha256" {
  value       = "f03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112"
  description = "SHA-256 del Índice Cero"
}

# ◯_● · 51/49/100 · KRONOS