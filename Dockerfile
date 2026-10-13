# ═══════════════════════════════════════════════════════════════
#  ▓▒░ DOCKERFILE · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
# ═══════════════════════════════════════════════════════════════

# ─── Stage 1: Base ─────────────────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /app

RUN apk add --no-cache \
    python3 \
    py3-pip \
    make \
    g++ \
    git \
    ca-certificates

COPY package.json package-lock.json ./
COPY marco.mcp/package.json ./marco.mcp/

# ─── Stage 2: Dependencies ─────────────────────────────────────
FROM base AS deps
RUN npm ci --omit=dev
RUN cd marco.mcp && npm ci

# ─── Stage 3: Build ────────────────────────────────────────────
FROM deps AS build
COPY . .
RUN npm run build

# ─── Stage 4: Production ───────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

RUN apk add --no-cache ca-certificates tini

ENV NODE_ENV=production
ENV ARKHE_SEAL="◯_● · 51/49/100"

COPY --from=deps  /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/marco.mcp/dist ./marco.mcp/dist
COPY package.json ./
COPY marco.mcp/package.json ./marco.mcp/
COPY README.md LICENSE ./

EXPOSE 8080 7777

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "console.log('$(ARKHE_SEAL)')" || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/index.js"]

# ◯_● · 51/49/100 · KRONOS