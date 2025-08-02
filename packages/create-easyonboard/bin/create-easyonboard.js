#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const program = new Command();

program
  .name('create-easyonboard')
  .description('Create a new Easy Onboard project')
  .version('1.0.0')
  .argument('[project-name]', 'Name of the project')
  .option('-d, --docker', 'Include Docker configuration')
  .option('-t, --template <template>', 'Use a specific template (corporate, startup, tech)', 'corporate')
  .option('--skip-install', 'Skip automatic npm install')
  .option('--start', 'Automatically start dev server after installation')
  .action(async (projectName, options) => {
    try {
      if (!projectName) {
        console.log(chalk.red('❌ Project name is required'));
        console.log(chalk.yellow('Usage: npx create-easyonboard my-project'));
        process.exit(1);
      }

      await createProject(projectName, options);
    } catch (error) {
      console.error(chalk.red('❌ Error creating project:'), error.message);
      process.exit(1);
    }
  });

async function createProject(projectName, options) {
  const projectPath = path.resolve(projectName);
  
  console.log(chalk.blue('🚀 Creating Easy Onboard project...'));
  console.log(chalk.gray(`📁 Project: ${projectName}`));
  console.log(chalk.gray(`📍 Location: ${projectPath}`));
  
  // Check if directory exists
  if (await fs.pathExists(projectPath)) {
    console.log(chalk.red(`❌ Directory ${projectName} already exists`));
    process.exit(1);
  }

  // Create project directory
  await fs.ensureDir(projectPath);
  
  // Copy template files
  await copyTemplateFiles(projectPath, options);
  
  // Create package.json
  await createPackageJson(projectPath, projectName);
  
  // Create environment configuration
  await createEnvironmentConfig(projectPath);
  
  // Create sample content
  await createSampleContent(projectPath);
  
  // Create Docker files if requested
  if (options.docker) {
    await createDockerFiles(projectPath);
  }
  
  console.log(chalk.green('✅ Project created successfully!'));
  console.log('');
  
  // Automatically install dependencies unless skipped
  if (!options.skipInstall) {
    console.log(chalk.blue('📦 Installing dependencies...'));
    try {
      execSync('npm install', { 
        cwd: projectPath, 
        stdio: ['ignore', 'ignore', 'pipe'] 
      });
      console.log(chalk.green('✅ Dependencies installed successfully!'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  Failed to install dependencies automatically'));
      console.log(chalk.gray('   Please run: npm install'));
    }
    console.log('');
  }
  
  // Start dev server if requested
  if (options.start && !options.skipInstall) {
    console.log(chalk.blue('� Starting development server...'));
    console.log(chalk.gray('   Your app will be available at http://localhost:3000'));
    console.log(chalk.gray('   Press Ctrl+C to stop the server'));
    console.log('');
    
    try {
      execSync('npm run dev', { 
        cwd: projectPath, 
        stdio: 'inherit' 
      });
    } catch (error) {
      console.log(chalk.yellow('⚠️  Failed to start dev server'));
      console.log(chalk.gray('   Please run: npm run dev'));
    }
  } else {
    // Show next steps only if not auto-starting
    console.log(chalk.yellow('🎯 Your project is ready!'));
    console.log(chalk.gray(`   cd ${projectName}`));
    if (options.skipInstall) {
      console.log(chalk.gray('   npm install'));
    }
    console.log(chalk.gray('   npm run dev'));
    console.log('');
    
    console.log(chalk.blue('� Customize your onboarding:'));
    console.log(chalk.gray('   • Edit content/topics/ for your markdown content'));
    console.log(chalk.gray('   • Update .env.local for branding and colors'));
    console.log(chalk.gray('   • Replace public/logo.svg with your company logo'));
    
    if (options.docker) {
      console.log('');
      console.log(chalk.blue('🐳 Docker deployment:'));
      console.log(chalk.gray('   docker-compose up -d'));
    }
  }
}

async function copyTemplateFiles(projectPath, options) {
  // Copy core application files from the main app directory
  const appSourcePath = path.join(__dirname, '../../../app');
  
  // Copy essential files
  const filesToCopy = [
    'src',
    'public',
    'next.config.ts',
    'tsconfig.json',
    'postcss.config.mjs',
    'eslint.config.mjs',
    'next-env.d.ts'
  ];
  
  for (const file of filesToCopy) {
    const sourcePath = path.join(appSourcePath, file);
    const destPath = path.join(projectPath, file);
    
    if (await fs.pathExists(sourcePath)) {
      await fs.copy(sourcePath, destPath);
    }
  }
}

async function createPackageJson(projectPath, projectName) {
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint"
    },
    dependencies: {
      "i18next": "^25.3.2",
      "next": "15.4.5",
      "react": "19.1.0",
      "react-dom": "19.1.0",
      "react-i18next": "^15.6.1",
      "react-markdown": "^10.1.0",
      "rehype-highlight": "^7.0.2",
      "remark-gfm": "^4.0.1"
    },
    devDependencies: {
      "@eslint/eslintrc": "^3",
      "@tailwindcss/postcss": "^4",
      "@types/node": "^20",
      "@types/react": "^19",
      "@types/react-dom": "^19",
      "eslint": "^9",
      "eslint-config-next": "15.4.5",
      "tailwindcss": "^4",
      "typescript": "^5"
    }
  };
  
  await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
}

async function createEnvironmentConfig(projectPath) {
  const envContent = `# Easy Onboard Configuration

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=onboard123

# App Branding
NEXT_PUBLIC_APP_NAME="My Company Onboard"
NEXT_PUBLIC_COMPANY_NAME="My Company"
NEXT_PUBLIC_COMPANY_LOGO="/logo.svg"

# Theme Colors (RGB values)
NEXT_PUBLIC_PRIMARY_COLOR="139, 92, 246"     # Violet-600 (default)
NEXT_PUBLIC_PRIMARY_LIGHT="196, 181, 253"   # Violet-300
NEXT_PUBLIC_PRIMARY_DARK="124, 58, 237"     # Violet-700
NEXT_PUBLIC_ACCENT_COLOR="168, 85, 247"     # Violet-500

# Background Theme
NEXT_PUBLIC_GRADIENT_FROM="245, 243, 255"   # Violet-50
NEXT_PUBLIC_GRADIENT_TO="255, 255, 255"     # White

# Storage (for Docker deployment)
# TOPICS_STORAGE_PATH="/app/content/topics"

# Development
NEXT_TELEMETRY_DISABLED=1
`;

  await fs.writeFile(path.join(projectPath, '.env.local'), envContent);
  await fs.writeFile(path.join(projectPath, '.env.example'), envContent);
}

async function createSampleContent(projectPath) {
  const contentDir = path.join(projectPath, 'content/topics');
  await fs.ensureDir(contentDir);
  
  // Sample topics
  const sampleTopics = [
    {
      filename: '01-welcome.md',
      content: `# Welcome to Our Team! 👋

Welcome to our company! We're excited to have you join our team.

## What You'll Learn

During your onboarding journey, you'll discover:

- Our company culture and values
- Development tools and workflows  
- Team processes and best practices
- How to contribute effectively

## Getting Started

This onboarding system will guide you through everything step by step. Take your time and don't hesitate to ask questions!

## Next Steps

Ready to dive in? Let's start with setting up your development environment.
`
    },
    {
      filename: '02-development-setup.md',
      content: `# Development Environment Setup 💻

Let's get your development environment ready for productive work.

## Required Tools

### Code Editor
- **VS Code** (recommended) or your preferred editor
- Install relevant extensions for your technology stack

### Version Control
\`\`\`bash
# Install Git
git --version

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"
\`\`\`

### Development Tools
\`\`\`bash
# Node.js (for JavaScript projects)
node --version
npm --version

# Your project-specific tools here
\`\`\`

## Repository Access

1. Clone the main repository
2. Set up your development branch
3. Install dependencies

## Verification

Test that everything works by running:
\`\`\`bash
npm install
npm run dev
\`\`\`

Great! Your development environment is ready.
`
    },
    {
      filename: '03-team-workflow.md',
      content: `# Team Workflow & Best Practices 🔄

Learn how our team collaborates effectively.

## Development Workflow

### Branch Strategy
- \`main\` - Production code
- \`develop\` - Integration branch  
- \`feature/\` - Feature branches
- \`hotfix/\` - Emergency fixes

### Pull Request Process
1. Create feature branch from \`develop\`
2. Make your changes
3. Write tests
4. Create pull request
5. Code review
6. Merge after approval

## Code Standards

### Commit Messages
\`\`\`
feat: add user authentication
fix: resolve navigation bug
docs: update README
\`\`\`

### Code Review Guidelines
- Be constructive and kind
- Focus on code, not the person
- Explain your suggestions
- Approve when ready

## Communication

- **Daily standups** - 9:00 AM
- **Sprint planning** - Every 2 weeks
- **Retrospectives** - End of each sprint
- **Slack** - For quick questions
- **Documentation** - In our knowledge base

## Tools We Use

- **Project Management**: [Your tool]
- **Communication**: Slack/Teams
- **Documentation**: Confluence/Notion
- **CI/CD**: GitHub Actions/Jenkins

You're ready to contribute! 🚀
`
    }
  ];
  
  for (const topic of sampleTopics) {
    await fs.writeFile(path.join(contentDir, topic.filename), topic.content);
  }
}

async function createDockerFiles(projectPath) {
  const dockerCompose = `version: '3.8'

services:
  easyonboard:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - TOPICS_STORAGE_PATH=/app/content/topics
    volumes:
      - ./content:/app/content
    restart: unless-stopped
    container_name: easyonboard

volumes:
  easyonboard_data:
`;

  const dockerfile = `FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Create content directory
RUN mkdir -p /app/content/topics
RUN chown -R nextjs:nodejs /app/content

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
`;

  await fs.writeFile(path.join(projectPath, 'docker-compose.yml'), dockerCompose);
  await fs.writeFile(path.join(projectPath, 'Dockerfile'), dockerfile);
}

program.parse();
