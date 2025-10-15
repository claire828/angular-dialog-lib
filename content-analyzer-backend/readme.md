# Content Analyzer Backend

Express.js API server with MongoDB, PostgreSQL, and Redis support.

## Quick Start

### Using Docker (Recommended)

```bash
# Start all services (API + databases)
./start.sh

# Or manually
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean all data
docker-compose down -v

# Development Mode
# Install dependencies (from project root)
npm install

# Start databases only
docker-compose up mongo postgres redis -d

# Run server locally
npm run content-analyzer-backend


```

# Content Analyzer Project Documentation

## Project Overview

A full-stack content analysis application built with Angular 19 frontend and Express.js backend, featuring MongoDB, PostgreSQL, and Redis for comprehensive data management.

## Architecture

```
content-analyzer/               # Angular 19 Frontend
├── src/app/
│   ├── models/                # TypeScript interfaces
│   ├── services/              # Angular services with NgRx signals
│   └── components/            # Angular components
│
content-analyzer-backend/       # Express.js Backend
├── src/
│   ├── webserver/             # Express server setup
│   └── main.ts                # Application entry point
├── mongo-init/                # MongoDB initialization
├── postgres-init/             # PostgreSQL initialization
└── docker-compose.yml         # Multi-database setup
│
libs/core-ui-kit/              # Shared UI Components
└── src/buttons/               # Reusable button components
```

## Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Installation

```bash
# Clone and install dependencies
git clone <repository>
cd side-projects
npm install
```

### Development Setup

#### Option 1: Full Docker Setup (Recommended)

```bash
# Start all services (backend + databases)
cd content-analyzer-backend
./start.sh

# Or manually
docker-compose up -d

# Start frontend
npm run content-analyzer
```

#### Option 2: Local Development

```bash
# Start databases only
cd content-analyzer-backend
docker-compose up mongo postgres redis -d

# Start backend locally
npm run content-analyzer-backend

# Start frontend
npm run content-analyzer
```

### Available Scripts

```bash
# Frontend Applications
npm run content-analyzer          # Port 4306
npm run skeleton                  # Port 4300
npm run todolist                  # Port 4305

# Backend Services
npm run content-analyzer-backend  # Port 54321

# Development Tools
npm run storybook                # Port 6006
npm run graph                    # Nx dependency graph
npm run lint                     # ESLint
npm run format                   # Prettier
```

## Database Configuration

### Environment Variables

```bash
# Backend Configuration
PORT=54321
DB_URI=mongodb://mongo:27017
DB_NAME=mydatabase
MONGO_CLIENT_PORT=9005
```

### MongoDB Schema

```javascript
// Content Items Collection
{
  _id: "1",
  title: "Latest AI Technology Explained",
  source: "Youtube Channel",
  date: "2025-06-28",
  summary: "This video details the latest advancements in AI technology",
  tags: ["AI", "Technology"],
  url: "https://youtube.com/watch?v=123",
  thumbnail: "https://picsum.photos/300/200?random=1",
  createdAt: Date,
  updatedAt: Date
}

// Sources Collection
{
  _id: "1",
  name: "Youtube Channel",
  type: "youtube",
  url: "https://youtube.com/tech",
  createdAt: Date,
  updatedAt: Date
}
```

### PostgreSQL Schema

```sql
-- Analytics Table
CREATE TABLE content_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id VARCHAR(255) NOT NULL,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    engagement_score DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Preferences
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    preferred_sources TEXT[],
    preferred_tags TEXT[],
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Frontend Architecture

### Models

```typescript
// Content Item Interface
export interface ContentItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  tags: string[];
  translatedTitle?: string;
  translatedSummary?: string;
  url: string;
  thumbnail: string;
}

// Source Interface
export interface Source {
  id: string;
  name: string;
  type: 'youtube' | 'blog' | 'rss';
  url: string;
}
```

### Services (NgRx Signals)

```typescript
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly state = signalState(initialState);

  // Computed signals for reactive access
  readonly sources = computed(() => this.state.sources());
  readonly content = computed(() => this.state.content());

  // State management methods
  addContentItem(item: ContentItem): void;
  fetchUpdates(): void;
  addSource(source: Source): void;
}
```

### Components

#### Core UI Kit Button Component

```typescript
@Component({
  selector: 'core-icon-button',
  template: `
    <button (click)="onButtonClick()" [class]="buttonClasses()">
      <svg><!-- Plus icon --></svg>
      <span>{{ name() }}</span>
    </button>
  `,
})
export class CoreIconButtonComponent {
  readonly name = input<string>('Add Source');
  readonly color = input<ButtonColor>('secondary');
  readonly size = input<ButtonSize>('medium');
  readonly disabled = input<boolean>(false);
  readonly buttonClick = output<void>();
}
```

## Backend API Structure

### Express Server Setup

```typescript
// Express configuration with CORS and JSON parsing
const app = express();
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to content-analyzer-backend!' });
});
```

### Database Connections

```typescript
// MongoDB connection
const mongoUri = process.env.DB_URI || 'mongodb://mongo:27017';
const dbName = process.env.DB_NAME || 'mydatabase';

// PostgreSQL connection
const postgresUrl = 'postgresql://postgres:password@postgres:5432/content_analyzer';

// Redis connection
const redisUrl = 'redis://redis:6379';
```

## Docker Services

### Service Configuration

```yaml
services:
  content-analyzer-backend: # Express API (Port 54321)
  mongo: # MongoDB (Port 9005)
  postgres: # PostgreSQL (Port 5432)
  redis: # Redis Cache (Port 6379)
  mongo-express: # MongoDB UI (Port 8081)
  pgadmin: # PostgreSQL UI (Port 8080)
```

### Admin Interfaces

```bash
# MongoDB Admin (mongo-express)
http://localhost:8081
Username: admin
Password: admin123

# PostgreSQL Admin (pgAdmin)
http://localhost:8080
Email: admin@admin.com
Password: admin123
```

## Storybook Documentation

### Component Stories

```typescript
// CoreIconButton Stories
export default {
  title: 'Buttons/CoreIconButton',
  component: CoreIconButtonComponent,
  parameters: { layout: 'centered' },
};

// Story Examples
export const Default: Story = {
  /* secondary, medium */
};
export const Primary: Story = {
  /* white background */
};
export const Disabled: Story = {
  /* opacity reduced */
};
export const AllColors: Story = {
  /* color showcase */
};
export const AllSizes: Story = {
  /* size comparison */
};
```

### View Storybook

```bash
npm run storybook  # http://localhost:6006
```

## Development Guidelines

### Code Standards

- TypeScript strict mode enabled
- ESLint + Prettier formatting
- Max 4 parameters per function
- Max 50 executable lines per function
- Max 80 characters per line
- Single Responsibility Principle
- Dependency Inversion Principle

### Angular Best Practices

- OnPush change detection strategy
- Signal-based state management
- Async pipe for observables
- Standalone components
- Computed signals for derived state

### Testing

```bash
npm run test        # Run all tests
npx nx affected:test # Run affected tests only
```

## Project Structure

```
side-projects/
├── content-analyzer/              # Angular Frontend
│   ├── src/app/
│   │   ├── models/               # TypeScript interfaces
│   │   ├── services/             # NgRx signal services
│   │   └── components/           # Angular components
│   └── project.json              # Angular build config
│
├── content-analyzer-backend/      # Express Backend
│   ├── src/
│   │   ├── webserver/           # Express setup
│   │   └── main.ts              # Entry point
│   ├── mongo-init/              # MongoDB init scripts
│   ├── postgres-init/           # PostgreSQL init scripts
│   ├── docker-compose.yml       # Multi-database setup
│   └── .env                     # Environment config
│
├── libs/core-ui-kit/             # Shared Components
│   └── src/buttons/             # Reusable buttons
│
└── package.json                  # Monorepo configuration
```

## API Endpoints

### Content Management

```bash
GET  /api                        # Health check
GET  /api/content               # Get all content items
POST /api/content               # Create content item
GET  /api/sources               # Get all sources
POST /api/sources               # Add new source
```

### Analytics

```bash
GET  /api/analytics/:contentId  # Get content analytics
POST /api/analytics             # Record analytics event
GET  /api/preferences/:userId   # Get user preferences
PUT  /api/preferences/:userId   # Update user preferences
```

## Troubleshooting

### Common Issues

#### Docker Services Not Starting

```bash
# Check service status
docker-compose ps

# View service logs
docker-compose logs [service-name]

# Restart specific service
docker-compose restart [service-name]
```

#### Database Connection Issues

```bash
# Check MongoDB connection
docker exec -it mongo mongosh

# Check PostgreSQL connection
docker exec -it postgres psql -U postgres -d content_analyzer

# Check Redis connection
docker exec -it redis redis-cli ping
```

#### Frontend Build Errors

```bash
# Clear Nx cache
npx nx reset

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Angular CLI version
ng version
```

### Port Conflicts

```bash
# Check port usage
lsof -i :54321  # Backend
lsof -i :4306   # Frontend
lsof -i :9005   # MongoDB
```

## Contributing

### Development Workflow

1. Create feature branch from main
2. Make changes following code standards
3. Run tests: `npm run test`
4. Run linting: `npm run lint`
5. Format code: `npm run format`
6. Submit pull request

### Commit Standards

```bash
feat: add new content filtering feature
fix: resolve database connection timeout
docs: update API documentation
style: format code with prettier
refactor: extract content service logic
test: add unit tests for content service
```

## License

MIT License - see LICENSE file for details.
