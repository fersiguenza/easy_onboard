# Contributing Content Guide

## 🎯 Quick Start for Content Contributors

### **Step 1: Understand the Structure**

```
easy_onboard/
├── data/topics/          ← Your markdown files go here
├── README.md            ← Main documentation
├── GETTING_STARTED.md   ← Developer setup guide
└── app/                 ← Technical code (developers only)
```

### **Step 2: Add Your Content**

1. **Create a new markdown file** in `data/topics/`
2. **Use descriptive filename**: `your-topic-name.md`
3. **Optional numbering**: `04-your-topic.md` for ordering

### **Step 3: Write Great Content**

```markdown
# Your Topic Title

Brief introduction explaining what this topic covers...

## Prerequisites
- What developers need before starting
- Links to previous topics if applicable

## Step-by-Step Instructions

### Step 1: Setup
Detailed instructions with commands:

```bash
npm install your-package
```

### Step 2: Configuration
More detailed steps...

## Common Issues
- **Problem**: Description of issue
- **Solution**: How to fix it

## Next Steps
- What to do after completing this topic
- Links to related topics
```

### **Step 4: Content Guidelines**

#### **✅ Good Practices**
- **Clear headings**: Use descriptive section titles
- **Step-by-step**: Break complex tasks into numbered steps  
- **Code examples**: Include copy-paste ready commands
- **Visual formatting**: Use **bold**, `code`, and > quotes
- **Practical examples**: Show real-world scenarios
- **Troubleshooting**: Include common issues and solutions

#### **❌ Avoid**
- Vague instructions
- Missing code examples
- Outdated information
- Complex jargon without explanation

### **Step 5: File Naming Convention**

#### **With Ordering (Recommended)**
```
01-welcome-to-team.md
02-development-setup.md  
03-git-workflow.md
04-testing-practices.md
```

#### **Without Ordering**
```
docker-setup.md
code-review-process.md
deployment-guide.md
```

### **Step 6: Test Your Content**

1. **Start the app locally**:
   ```bash
   cd app/
   npm run dev
   ```

2. **View at**: http://localhost:3000
3. **Check your topic appears** in the sidebar
4. **Verify formatting** looks correct

## 📝 Content Templates

### **Setup Guide Template**
```markdown
# Tool/Environment Setup

## Overview
Brief description of what we're setting up and why.

## Prerequisites
- Operating system requirements
- Existing tools needed

## Installation Steps

### macOS
```bash
brew install your-tool
```

### Windows
```bash
choco install your-tool
```

### Linux
```bash
sudo apt install your-tool
```

## Verification
How to confirm the setup worked:
```bash
your-tool --version
```

## Configuration
Any additional setup needed.

## Troubleshooting
Common issues and solutions.

## Next Steps
Link to the next topic in the onboarding flow.
```

### **Process Guide Template**
```markdown
# Process/Workflow Name

## Overview
What this process is and why we use it.

## When to Use
Specific scenarios where this applies.

## Step-by-Step Process

### Step 1: Preparation
What to do first...

### Step 2: Execution  
Main steps...

### Step 3: Review
How to verify success...

## Examples
Real-world examples or scenarios.

## Best Practices
- Tips for success
- Common patterns

## Common Mistakes
- What to avoid
- How to fix issues

## Resources
- Links to related documentation
- Tools mentioned
```

## 🤝 Getting Help

### **For Content Questions**
- Ask your team lead
- Review existing topics for inspiration
- Check the style guide

### **For Technical Issues**
- See `app/docs/` for developer documentation
- Run `cd app && npm run dev` to test locally
- Check `GETTING_STARTED.md` for setup help

### **For Urgent Issues**
- Contact the development team
- Create an issue in the repository

## ⭐ Content Ideas

### **Common Onboarding Topics**
- Welcome and team introduction
- Development environment setup
- Code style and standards
- Git workflow and branching
- Testing practices
- Deployment process
- Security guidelines
- Code review process
- Documentation standards
- Team communication tools

### **Company-Specific Topics**
- Company values and culture
- Team structure and roles
- Product overview
- Customer information
- Business processes
- Compliance requirements

Remember: **Focus on actionable content that helps new team members become productive quickly!**
