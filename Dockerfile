# ================================
# 1️⃣ Build Stage (Node.js + TypeScript)
# ================================
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Fake DB URL ONLY for build (Railway) - Railway will inject the correct DATABASE_URL aftr the build stage
ARG DATABASE_URL="postgresql://user:pass@localhost:5432/db"
ENV DATABASE_URL=$DATABASE_URL

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Copy Prisma client into dist (so it exists at runtime) - Make direction before copying !!
RUN mkdir -p dist/generated/prisma \
    && cp -r src/generated/prisma/* dist/generated/prisma/


# ================================
# 2️⃣ Run Stage (Smaller image)
# ================================
FROM node:20

WORKDIR /app

# Copy only needed files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose app port
EXPOSE 3500

# Default command
CMD ["node", "dist/server.js"]
