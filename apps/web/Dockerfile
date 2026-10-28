# re-write the dockerfile 

FROM oven/bun:1.4.0-debian AS builder

WORKDIR /app

COPY package.json ./

COPY apps/web/package.json ./apps/web/package.json
COPY apps/api/package.json ./apps/api/package.json
COPY packages/shared/schemas/package.json ./packages/shared/schemas/package.json
COPY packages/shared/constants/package.json ./packages/shared/constants/package.json

RUN bun install --frozen-lockfile

# Copy Frontend source code 
COPY apps/web ./apps/web
COPY packages ./packages

RUN bun run build:web

FROM oven/bun:1.4.0-debian AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=bun:bun /app/apps/web/.next/standalone ./
COPY --from=builder --chown=bun:bun /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=bun:bun /app/apps/web/public ./apps/web/public

USER bun

EXPOSE 3000/tcp

CMD ["bun", "apps/web/server.js"]