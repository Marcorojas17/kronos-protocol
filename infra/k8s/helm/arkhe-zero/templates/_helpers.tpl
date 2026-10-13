{{/*
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ HELM · HELPERS · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE
═══════════════════════════════════════════════════════════════════════════
*/}}

{{- define "arkhe-zero.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "arkhe-zero.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{- define "arkhe-zero.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "arkhe-zero.labels" -}}
helm.sh/chart: {{ include "arkhe-zero.chart" . }}
{{ include "arkhe-zero.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
arkhe.zero/seal: "◯_● · 51/49/100"
arkhe.zero/pact: "51/49/100"
arkhe.zero/nodo: "YHDRYH-92CE"
arkhe.zero/genesis: "K28-M05-MN01-YHDRYH-92CE"
{{- end }}

{{- define "arkhe-zero.selectorLabels" -}}
app.kubernetes.io/name: {{ include "arkhe-zero.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

# ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE