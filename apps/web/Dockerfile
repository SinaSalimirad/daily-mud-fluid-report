# Stage 1: build environment
FROM oven/bun:1.4.4-debian AS build

WORKDIR /app

# Copy workspace manifests
COPY package.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json

# Copy npm configuration
COPY .npmrc ./

# Install all dependencies required for building
RUN bun install --frozen-lockfile --verbose

# Copy source code
COPY apps/web ./apps/web

# Build the API
RUN bun run web:build

# Stage 2: Production runtime environment
FROM oven/bun:1.4.4-debian AS production

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=build --chown=bun:bun /app/apps/web/.next/standalone ./
COPY --from=build --chown=bun:bun /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=bun:bun /app/apps/web/public ./apps/web/public

USER bun

EXPOSE 3000/tcp

CMD ["bun", "apps/web/server.js"]
