#!/bin/bash

# Content Analyzer Backend Docker Compose Setup

set -e

echo "🚀 Starting Content Analyzer Backend with databases..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Build the application first
echo "📦 Building the application..."
cd ..
npx nx build content-analyzer-backend --prod
cd content-analyzer-backend

# Start services
echo "🐳 Starting Docker services..."
docker-compose up --build -d

echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo "🔍 Checking service status..."
docker-compose ps

# Show logs
echo "📜 Showing recent logs..."
docker-compose logs --tail=50

echo "✅ Services started successfully!"
echo ""
echo "🌐 Services available at:"
echo "  - API: http://localhost:${PORT:-54321}/api"
echo "  - MongoDB: mongodb://localhost:${MONGO_CLIENT_PORT:-9005}"
echo "  - PostgreSQL: postgresql://localhost:5432/content_analyzer"
echo "  - Redis: redis://localhost:6379"
echo "  - Mongo Express: http://localhost:8081 (admin/admin123)"
echo "  - pgAdmin: http://localhost:8080 (admin@admin.com/admin123)"
echo ""
echo "🛑 To stop services: docker-compose down"
echo "🗑️  To remove all data: docker-compose down -v"
