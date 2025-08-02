# Easy Onboard - Persistent Storage Setup

This document explains how the persistent storage system works for admin-uploaded topics.

## Storage Architecture

### Development Mode
- Topics are stored in the local `./data/topics` directory
- Each topic is saved as a separate JSON file named `{topic-id}.json`
- localStorage is used as a fallback for better development experience

### Production Mode (Docker)
- Topics are stored in the Docker volume mounted at `/app/data/topics`
- Persistent across container restarts and updates
- Volume name: `easy_onboard_data`

## API Endpoints

### GET /api/topics
Returns all uploaded topics in chronological order.

**Response:**
```json
{
  "topics": [
    {
      "id": "unique-id",
      "title": "Topic Title",
      "content": "Markdown content...",
      "uploadedAt": "2024-01-15T10:30:00.000Z",
      "completed": false
    }
  ]
}
```

### POST /api/topics
Creates a new topic.

**Request:**
```json
{
  "title": "New Topic Title",
  "content": "# Markdown Content\n\nTopic content..."
}
```

**Response:**
```json
{
  "topic": {
    "id": "generated-id",
    "title": "New Topic Title",
    "content": "# Markdown Content...",
    "uploadedAt": "2024-01-15T10:30:00.000Z",
    "completed": false
  }
}
```

### PUT /api/topics
Updates topic completion status.

**Request:**
```json
{
  "id": "topic-id",
  "completed": true
}
```

### DELETE /api/topics?id={topicId}
Deletes a specific topic.

## Environment Variables

### TOPICS_STORAGE_PATH
Configures where topics are stored on the filesystem.

**Development:**
```bash
TOPICS_STORAGE_PATH="./data/topics"
```

**Production (Docker):**
```bash
TOPICS_STORAGE_PATH="/app/data/topics"
```

## Docker Setup

### Using Docker Compose (Recommended)

```bash
# Start the application with persistent storage
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down

# Remove everything including volume (careful!)
docker-compose down -v
```

### Manual Docker Setup

```bash
# Create a named volume
docker volume create easy_onboard_data

# Run the container
docker run -d \
  --name easy-onboard \
  -p 3000:3000 \
  -v easy_onboard_data:/app/data \
  -e TOPICS_STORAGE_PATH="/app/data/topics" \
  easy-onboard:latest
```

## Data Migration

### From localStorage to Persistent Storage

If you have existing topics in localStorage, they will be used as fallback when the API is unavailable. To migrate:

1. Export topics from browser localStorage
2. Use the admin interface to re-upload the content
3. The new API will store them persistently

### Backup and Restore

**Backup:**
```bash
# Copy from Docker volume
docker cp easy-onboard:/app/data/topics ./backup-topics

# Or from local development
cp -r ./data/topics ./backup-topics
```

**Restore:**
```bash
# Copy to Docker volume
docker cp ./backup-topics easy-onboard:/app/data/topics

# Or to local development
cp -r ./backup-topics ./data/topics
```

## Troubleshooting

### API Not Working
- Check if the `data/topics` directory exists and is writable
- Verify the `TOPICS_STORAGE_PATH` environment variable
- Check application logs for file permission errors

### Topics Not Persisting
- Ensure Docker volume is properly mounted
- Check container logs: `docker-compose logs easy-onboard`
- Verify environment variables are set correctly

### Development vs Production
- Development uses `./data/topics` (relative to project root)
- Production uses `/app/data/topics` (inside Docker container)
- Both can be customized via `TOPICS_STORAGE_PATH`

## File Structure

```
project/
├── data/
│   └── topics/
│       ├── topic-1234567890.json
│       ├── topic-1234567891.json
│       └── ...
├── src/
│   ├── app/api/topics/route.ts    # API endpoints
│   └── lib/topicsService.ts       # Client service
├── docker-compose.yml             # Docker setup
└── .env.example                   # Environment variables
```

Each topic file contains:
```json
{
  "id": "unique-timestamp-id",
  "title": "Topic Title",
  "content": "Full markdown content...",
  "uploadedAt": "ISO 8601 timestamp",
  "completed": false
}
```
