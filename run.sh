#!/bin/bash


set -x

# Terminal Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${CYAN}🚀 Starting Monorepo Development Environment...${NC}"

# 1. Configure Backend (NestJS + Prisma)
echo -e "${CYAN}📦 Configuring Backend (NestJS)...${NC}"
cd backend
npm install

# --- PRISMA SETUP ---
echo -e "${CYAN}🔄 Generating Prisma Client and applying migrations...${NC}"
# Generates the client (required after npm install)
npx prisma generate
# Applies pending migrations or creates the DB if it doesn't exist
npx prisma migrate dev --name init --skip-generate
# --------------------

cd ..

# 2. Configure Frontend (Vite)
echo -e "${CYAN}📦 Configuring Frontend (Vite)...${NC}"
cd frontend
npm install
cd ..

echo -e "${GREEN}✅ Installation and Database are ready.${NC}"

# 3. Launch Services
echo -e "${CYAN}🔥 Launching services...${NC}"

# This ensures all background processes are killed when the script exits (Ctrl+C)
trap "kill 0" EXIT

# Start Backend in background
cd backend && npm run start:dev &

# Start Frontend in background
cd frontend && npm run dev &

# Keep the script running to see the logs
wait