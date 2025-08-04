# Multi-stage Dockerfile for Astro ecommerce store
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat curl
COPY package.json bun.lock* ./
# Install Bun for faster package management
RUN npm install -g bun
RUN bun install --frozen-lockfile

# Development stage
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 4321
ENV NODE_ENV=development
CMD ["npm", "run", "dev", "--", "--host"]

# Build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 astro && \
    adduser --system --uid 1001 astro

COPY --from=builder --chown=astro:astro /app/dist ./dist
COPY --from=builder --chown=astro:astro /app/package.json ./package.json

USER astro

EXPOSE 4321

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4321/ || exit 1

# Use astro preview for production-like serving
CMD ["npx", "astro", "preview", "--host", "0.0.0.0", "--port", "4321"]
