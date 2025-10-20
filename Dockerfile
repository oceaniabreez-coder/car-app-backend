# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Build TypeScript
COPY tsconfig.json ./
COPY src ./src
RUN npx tsc -p tsconfig.json

# --- Runtime stage ---
FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# App files
COPY --from=builder /app/dist ./dist
# (Optional for local testing) COPY serviceAccountKey.json ./

# Cloud Run listens on $PORT (default 8080)
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/index.js"]