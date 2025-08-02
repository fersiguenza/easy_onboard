# Docker Commands for Easy Onboard

## Quick Start with Docker Compose

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f easy-onboard

# Stop the application
docker-compose down

# Restart after changes
docker-compose down && docker-compose up -d --build
```

## Manual Docker Commands

### Build the Image
```bash
docker build -t easy-onboard:latest .
```

### Run with Volume
```bash
# Create a volume for persistent storage
docker volume create easy_onboard_data

# Run the container
docker run -d \
  --name easy-onboard \
  -p 3000:3000 \
  -v easy_onboard_data:/app/data \
  -e TOPICS_STORAGE_PATH="/app/data/topics" \
  -e NEXT_PUBLIC_APP_NAME="Your Company Onboard" \
  -e NEXT_PUBLIC_PRIMARY_COLOR="147, 51, 234" \
  easy-onboard:latest
```

### Environment Variables
All customization can be done via environment variables:

```bash
docker run -d \
  --name easy-onboard \
  -p 3000:3000 \
  -v easy_onboard_data:/app/data \
  -e TOPICS_STORAGE_PATH="/app/data/topics" \
  -e NEXT_PUBLIC_APP_NAME="DevCorp Onboarding" \
  -e NEXT_PUBLIC_PRIMARY_COLOR="59, 130, 246" \
  -e NEXT_PUBLIC_LOGO="/your-logo.svg" \
  -e NEXT_PUBLIC_ADMIN_PASSWORD="your-secure-password" \
  easy-onboard:latest
```

## Volume Management

### List volumes
```bash
docker volume ls
```

### Inspect volume
```bash
docker volume inspect easy_onboard_data
```

### Backup volume
```bash
docker run --rm -v easy_onboard_data:/data -v $(pwd):/backup alpine tar czf /backup/easy_onboard_backup.tar.gz -C /data .
```

### Restore volume
```bash
docker run --rm -v easy_onboard_data:/data -v $(pwd):/backup alpine sh -c "cd /data && tar xzf /backup/easy_onboard_backup.tar.gz"
```

### Remove volume (careful!)
```bash
docker volume rm easy_onboard_data
```

## Container Management

### View logs
```bash
docker logs easy-onboard -f
```

### Execute into container
```bash
docker exec -it easy-onboard sh
```

### Stop and remove container
```bash
docker stop easy-onboard
docker rm easy-onboard
```

### Update application
```bash
# Stop current container
docker stop easy-onboard

# Remove old container
docker rm easy-onboard

# Pull/build new image
docker build -t easy-onboard:latest .

# Run new container with same volume
docker run -d \
  --name easy-onboard \
  -p 3000:3000 \
  -v easy_onboard_data:/app/data \
  -e TOPICS_STORAGE_PATH="/app/data/topics" \
  easy-onboard:latest
```
