import { Topic } from '@/types';
import { config } from '@/config';

class TopicsService {
  private baseUrl = config.api.topics;

  async getTopics(): Promise<Topic[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch topics');
      }
      const data = await response.json();
      return data.topics || [];
    } catch (error) {
      console.error('Error fetching topics:', error);
      // Fallback to localStorage for development
      return this.getLocalStorageTopics();
    }
  }

  async createTopic(title: string, content: string): Promise<Topic> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to create topic');
      }

      const data = await response.json();
      return data.topic;
    } catch (error) {
      console.error('Error creating topic:', error);
      // Fallback to localStorage
      const topic: Topic = {
        id: Date.now().toString(),
        title,
        content,
        uploadedAt: new Date().toISOString(),
        completed: false,
      };
      this.saveToLocalStorage(topic);
      return topic;
    }
  }

  async createTopicDirectory(title: string, content?: string): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, isDirectory: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to create topic directory');
      }

      return true;
    } catch (error) {
      console.error('Error creating topic directory:', error);
      return false;
    }
  }

  async addTopicSection(topicId: string, sectionTitle: string, content: string): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: topicId, sectionTitle, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to add topic section');
      }

      return true;
    } catch (error) {
      console.error('Error adding topic section:', error);
      return false;
    }
  }

  async deleteTopic(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete topic');
      }

      return true;
    } catch (error) {
      console.error('Error deleting topic:', error);
      // Fallback to localStorage
      this.removeFromLocalStorage(id);
      return true;
    }
  }

  async updateTopicCompletion(id: string, completed: boolean): Promise<Topic | null> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update topic');
      }

      const data = await response.json();
      return data.topic;
    } catch (error) {
      console.error('Error updating topic:', error);
      // Fallback to localStorage
      this.updateLocalStorageCompletion(id, completed);
      return null;
    }
  }

  // Fallback methods for localStorage
  private getLocalStorageTopics(): Topic[] {
    try {
      const saved = localStorage.getItem(config.storage.topics);
      return saved ? JSON.parse(saved) : this.getDefaultTopics();
    } catch {
      return this.getDefaultTopics();
    }
  }

  private saveToLocalStorage(topic: Topic) {
    try {
      const existing = this.getLocalStorageTopics();
      existing.push(topic);
      localStorage.setItem(config.storage.topics, JSON.stringify(existing));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private removeFromLocalStorage(id: string) {
    try {
      const existing = this.getLocalStorageTopics();
      const filtered = existing.filter(topic => topic.id !== id);
      localStorage.setItem(config.storage.topics, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  private updateLocalStorageCompletion(id: string, completed: boolean) {
    try {
      const existing = this.getLocalStorageTopics();
      const updated = existing.map(topic => 
        topic.id === id ? { ...topic, completed } : topic
      );
      localStorage.setItem(config.storage.topics, JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }

  private getDefaultTopics(): Topic[] {
    return [
      {
        id: 'welcome-1',
        title: 'Welcome to the Team',
        content: `# Welcome to Our Development Team! 🚀

We're excited to have you join our team! This onboarding process will help you get up to speed with our tools, processes, and culture.

## What You'll Learn

- Team structure and communication channels  
- Development environment setup
- Our coding standards and best practices
- Git workflow and collaboration tools

## Your Journey

This onboarding is designed to be completed at your own pace. Each topic builds on the previous one, so we recommend going through them in order.

Click "Next" when you're ready to begin your onboarding journey!

## Need Help?

If you have any questions during this process, don't hesitate to reach out:
- Ask in our #onboarding Slack channel
- Schedule time with your mentor
- Contact the team lead for urgent matters

Welcome aboard! 🎉`,
        uploadedAt: new Date().toISOString(),
        completed: false,
      },
      {
        id: 'environment-2',
        title: 'Development Environment Setup',
        content: `# Development Environment Setup 💻

Let's get your development environment ready! Follow these steps to set up all the tools you'll need.

## Required Software

### 1. Code Editor - VS Code (Recommended)
Download and install VS Code from: https://code.visualstudio.com/

**Essential Extensions:**
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets  
- Prettier - Code formatter
- ESLint
- GitLens
- Auto Rename Tag

### 2. Version Control - Git
\`\`\`bash
# macOS (using Homebrew)
brew install git

# Windows (using Chocolatey)  
choco install git

# Ubuntu/Debian
sudo apt-get install git
\`\`\`

**Configure Git:**
\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"
\`\`\`

### 3. Node.js and npm
Install Node.js 18+ (LTS version) from: https://nodejs.org/

Or use Node Version Manager (recommended):
\`\`\`bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 18
nvm install 18
nvm use 18
nvm alias default 18
\`\`\`

## Project Setup

### Clone the Repository
\`\`\`bash
# Navigate to your projects directory
cd ~/projects

# Clone the main repository
git clone https://github.com/company/main-project.git
cd main-project

# Install dependencies
npm install
\`\`\`

### Environment Variables
\`\`\`bash
# Copy the example file
cp .env.example .env.local

# Edit with your values
code .env.local
\`\`\`

## Verification

Test your setup by running:
\`\`\`bash
# Start the development server
npm run dev

# Run tests
npm test

# Check linting
npm run lint
\`\`\`

If all commands run successfully, your environment is ready! ✅

## Next Steps

1. Read the coding standards (next topic)
2. Join the development team channels
3. Schedule your first code review session

Need help with setup? Ask in #development-setup! 🛠️`,
        uploadedAt: new Date().toISOString(),
        completed: false,
      },
      {
        id: 'standards-3',
        title: 'Coding Standards & Git Workflow',
        content: `# Coding Standards & Git Workflow 📋

Let's review our team's coding standards and Git workflow to ensure consistent, high-quality code.

## Code Style Guidelines

### JavaScript/TypeScript
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes and components
- Use **SCREAMING_SNAKE_CASE** for constants
- Prefer arrow functions for simple functions
- Always specify return types for public functions

**Example:**
\`\`\`typescript
// Good
const calculateTotalPrice = (items: Item[]): number => {
  return items.reduce((total, item) => total + item.price, 0);
};

// Class names
class UserManager {}

// Constants  
const MAX_RETRY_ATTEMPTS = 3;
\`\`\`

### React Components
- Use functional components with hooks
- Keep components small and focused
- Extract custom hooks for reusable logic
- Use TypeScript interfaces for props

**Example:**
\`\`\`typescript
interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function Button({ title, onClick, disabled }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {title}
    </button>
  );
}
\`\`\`

## Git Workflow

### Branch Naming
\`\`\`
<type>/<ticket-number>-<description>

Examples:
feature/AUTH-123-oauth-integration
bugfix/UI-456-layout-fix
hotfix/PROD-789-memory-leak
\`\`\`

### Commit Messages
Follow Conventional Commits:
\`\`\`
<type>: <description>

Examples:
feat: add OAuth login functionality
fix: handle null values in user data
docs: update API documentation
refactor: simplify date formatting
\`\`\`

### Pull Request Process
1. **Create a branch** from main/master
2. **Make your changes** following our style guides
3. **Write tests** for new functionality
4. **Submit a pull request** with clear description
5. **Address feedback** from code review
6. **Merge** after approval

## Code Review Checklist

Before submitting a PR:
- [ ] Code follows naming conventions
- [ ] Functions are small and focused
- [ ] Error handling is implemented
- [ ] Tests are written and passing
- [ ] No console.log statements in production
- [ ] TypeScript types are properly defined

## Tools & Automation

We use these tools to maintain code quality:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking
- **Jest** for testing

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)
- [Git Best Practices](https://git-scm.com/book)

Ready to start coding? Let's move on to your first task! 🚀`,
        uploadedAt: new Date().toISOString(),
        completed: false,
      }
    ];
  }
}

export const topicsService = new TopicsService();
