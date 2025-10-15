FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY content-analyzer-backend/package*.json ./content-analyzer-backend/

# Install dependencies
RUN npm ci --only=production

# Copy built application
COPY dist/content-analyzer-backend ./

# Copy assets
COPY content-analyzer-backend/src/assets ./assets

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE ${PORT:-54321}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${PORT:-54321}/api || exit 1

# Start application
CMD ["node", "main.js"]
