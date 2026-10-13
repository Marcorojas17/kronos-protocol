# ═══════════════════════════════════════════════════════════════════════════
#  ▓▒░ TERRAFORM · VPC · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
#  ─────────────────────────────────────────────────────────────────────────
#  NODO: YHDRYH-92CE · Red base para despliegue cloud
# ═══════════════════════════════════════════════════════════════════════════

variable "name"        { type = string }
variable "environment" { type = string }
variable "cidr"        { type = string }

resource "aws_vpc" "main" {
  cidr_block           = var.cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = var.name
    Environment = var.environment
    Project     = "arkhe-zero"
    Seal        = "◯_●-51-49-100"
    Nodo        = "YHDRYH-92CE"
    Genesis     = "K28-M05-MN01-YHDRYH-92CE"
  }
}

resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.cidr, 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true

  tags = {
    Name = "${var.name}-public-${count.index}"
    Tier = "public"
    Seal = "◯_●-51-49-100"
  }
}

resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.cidr, 8, count.index + 10)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "${var.name}-private-${count.index}"
    Tier = "private"
    Seal = "◯_●-51-49-100"
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}

output "vpc_id" {
  value       = aws_vpc.main.id
  description = "ID de la VPC ARKHÉ ZERO"
}

# ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE