FROM node:22-slim

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Build for Smithery
RUN npx @smithery/cli build -o .smithery/index.cjs

# Remove dev dependencies to reduce image size
RUN npm ci --only=production && npm cache clean --force

# Expose the port that Smithery will use
EXPOSE 3000

# Start the server
CMD ["node", ".smithery/index.cjs"]