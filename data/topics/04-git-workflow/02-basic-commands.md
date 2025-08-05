# Basic Git Commands

Here are the essential Git commands you'll use daily:

## Repository Setup

```bash
git clone <repository-url>
cd <project-directory>
```

## Daily Workflow

```bash
# Check status
git status

# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Stage changes
git add .

# Commit changes
git commit -m "feat: add new feature"

# Push branch
git push origin feature/your-feature-name
```

## Best Practices

- Always pull before starting work
- Use descriptive commit messages
- Keep commits small and focused
- Test before committing
