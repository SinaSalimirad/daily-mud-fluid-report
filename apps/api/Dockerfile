# Stage 1: build environment
FROM oven/bun:1.4.4-debian AS build

WORKDIR /app

# Copy workspace manifests
COPY package.json ./
COPY apps/api/package.json ./apps/api/package.json

# Copy npm configuration
COPY .npmrc ./

# Install production dependencies
RUN bun install --frozen-lockfile --production --verbose

# Copy source code
COPY apps/api ./apps/api

# Build the API
RUN bun run api:build

# Stage 2: Production runtime environment
FROM oven/bun:1.4.4-debian AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy compiled API
COPY --from=build --chown=bun:bun /app/apps/api/dist ./dist

USER bun

EXPOSE 4000/tcp

CMD [ "bun", "run", "./dist/index.js" ]
