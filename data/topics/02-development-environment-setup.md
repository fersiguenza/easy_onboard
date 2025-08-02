# Development Environment Setup

This guide will help you set up your local development environment with all the necessary tools and configurations.

## Prerequisites

Before you begin, make sure you have:

- A computer with admin privileges
- Stable internet connection
- At least 8GB of RAM and 50GB free disk space

## Required Software

### Code Editor
**VS Code** (Recommended)
```bash
# Download from: https://code.visualstudio.com/
# Or install via Homebrew (macOS):
brew install --cask visual-studio-code
```

**Essential Extensions:**
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- GitLens
- Bracket Pair Colorizer

### Version Control
**Git**
```bash
# macOS
brew install git

# Windows (using Chocolatey)
choco install git

# Ubuntu/Debian
sudo apt-get install git
```

**Configure Git:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"
```

### Node.js and npm
**Node.js 18+ (LTS version)**
```bash
# Download from: https://nodejs.org/
# Or install via Node Version Manager (recommended):

# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 18
nvm install 18
nvm use 18
nvm alias default 18
```

### Database Tools
**PostgreSQL** (if working on backend)
```bash
# macOS
brew install postgresql

# Start PostgreSQL service
brew services start postgresql
```

**Database GUI Tool** (Choose one)
- pgAdmin (Web-based)
- TablePlus (macOS/Windows)
- DBeaver (Cross-platform)

### Container Platform
**Docker Desktop**
```bash
# Download from: https://www.docker.com/products/docker-desktop
# Or install via package manager

# macOS
brew install --cask docker

# Verify installation
docker --version
docker-compose --version
```

## Project Setup

### Clone the Repository
```bash
# Navigate to your projects directory
cd ~/projects

# Clone the main repository
git clone https://github.com/company/main-project.git
cd main-project

# Install dependencies
npm install
```

### Environment Variables
Create a `.env.local` file in the project root:
```bash
# Copy the example file
cp .env.example .env.local

# Edit with your values
nano .env.local
```

### Database Setup
```bash
# Create local database
createdb project_development

# Run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

## Verification

Test your setup by running:

```bash
# Start the development server
npm run dev

# Run tests
npm test

# Check linting
npm run lint

# Build for production
npm run build
```

If all commands run successfully, your environment is ready! 🎉

## Troubleshooting

### Common Issues

**Node modules not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Git authentication issues:**
- Set up SSH keys or personal access tokens
- Check with IT for company-specific authentication requirements

## Next Steps

1. Read the coding standards document
2. Review the Git workflow guide
3. Join the development team channels
4. Schedule your first code review session

Need help? Ask in the #development-setup channel! 🛠️
