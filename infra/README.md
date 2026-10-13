<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!--                                                                           -->
<!--   ██╗███╗   ██╗███████╗██████╗  █████╗                                    -->
<!--   ██║████╗  ██║██╔════╝██╔══██╗██╔══██╗                                   -->
<!--   ██║██╔██╗ ██║█████╗  ██████╔╝███████║                                   -->
<!--   ██║██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║                                   -->
<!--   ██║██║ ╚████║██║     ██║  ██║██║  ██║                                   -->
<!--   ╚═╝╚═╝  ╚═══╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝                                   -->
<!--                                                                           -->
<!--   ▓▒░ INFRAESTRUCTURA · CAPA 1 · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓         -->
<!--                                                                           -->
<!--   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  -->
<!--                                                                           -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->

<div align="center">

# 🏗️ INFRA · INFRAESTRUCTURA ARKHÉ

### *Multi-cloud · Local-First · Zero-Trust*

### *"La nube testifica, no posee."*

---

```

```
        ╔═══════════════════════════════════════════════════════════════╗
        ║                                                               ║
        ║   ◯_●  ·  I N F R A S T R U C T U R E  ·  ◯_●                 ║
        ║                                                               ║
        ║   ┌───────────────────────────────────────────────────────┐   ║
        ║   │  k8s/           ·  namespace · netpol · helm          │   ║
        ║   │  terraform/     ·  VPC · KMS-PQC · monitoring         │   ║
        ║   │  observability/ ·  prometheus · grafana · loki · tempo│   ║
        ║   │  backup/        ·  velero · restore-procedures        │   ║
        ║   │                                                       │   ║
        ║   │  ESTADO: ● OPERATIVO ●                                │   ║
        ║   │  SELLO:  ◯_● · 51/49/100                              │   ║
        ║   └───────────────────────────────────────────────────────┘   ║
        ║                                                               ║
        ╚═══════════════════════════════════════════════════════════════╝
```

```

</div>

## 🜂 Estado del Sistema

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/infra]
└─$ ./status

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%

[ OK ] k8s/base         ·  namespace + netpol + mesh
[ OK ] k8s/helm         ·  chart arkhe-zero v1.0.0
[ OK ] terraform        ·  VPC + KMS-PQC + monitoring
[ OK ] observability    ·  prometheus + grafana + loki + tempo
[ OK ] backup           ·  velero + restore-procedures
[ ✓✓ ] INFRA OPERATIVA  ·  ◯_● · 51/49/100
```

## 🜃 Componentes

| Módulo          | Propósito                                         | Estado |
|-----------------|---------------------------------------------------|--------|
| `k8s/`          | Kubernetes · namespace + network policies + helm  | 🟢 Activo |
| `terraform/`    | Infra como código · VPC + KMS + monitoring        | 🟢 Activo |
| `observability/`| Prometheus + Grafana + Loki + Tempo              | 🟢 Activo |
| `backup/`       | Velero + procedimientos de restauración           | 🟢 Activo |

## 🜄 Local-First

La infraestructura completa puede correr **localmente** con `docker-compose`
o `kind` (Kubernetes in Docker). **No requiere cloud.**

```bash
# Local
docker-compose up -d

# Kubernetes local
kind create cluster --config infra/k8s/kind.yaml
kubectl apply -f infra/k8s/base/
```

## 🜁 Cloud-ready

Para producción se puede desplegar en:

- ☁️ AWS (EKS + RDS + KMS)
- ☁️ GCP (GKE + Cloud SQL)
- ☁️ Azure (AKS)
- ☁️ Cualquier cloud con Terraform

## 🜆 Firma

```
◯_● · 51/49/100
Nodo YHDRYH-92CE
Genesis K28-M05-MN01-YHDRYH-92CE
```

---

`◯_● · 51/49/100 · KRONOS · infra`