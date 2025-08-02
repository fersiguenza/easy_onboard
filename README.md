# 🚀 Easy Onboard

<div align="center">
  <img src="https://github.com/fersiguenza/easy_onboard/blob/main/app/public/logo.png" alt="Easy Onboard Logo" width="120" height="120">
</div>

<div align="center">
  <strong>Simple onboarding content management for teams</strong>
</div>

<br>

**Easy Onboard** is a flexible onboarding platform that supports both library usage and development customization. Choose the approach that works best for your team.

## 🚀 **Two Ways to Use Easy Onboard**

### **📦 Option 1: NPM Package (Recommended)**
Perfect for teams who want to get started quickly with their own content.

```bash
# One-command setup (auto-installs dependencies)
npx create-easyonboard my-company-onboard

# Or with options
npx create-easyonboard my-onboard --template startup --start
```

**✅ Best for:**
- Quick setup with your own content
- Standard onboarding needs
- Teams who want to focus on content, not code

### **🔧 Option 2: Fork & Customize**
Perfect for teams who need custom features and full control.

```bash
# Clone and customize
git clone https://github.com/yourorg/easy-onboard
cd easy-onboard/app

# Install and run
npm install
npm run dev
```

**✅ Best for:**
- Custom features and integrations
- Unique workflow requirements
- Teams with development resources

## ✨ **Key Features**

- 📝 **Markdown-based content** - Simple content management
- 🎨 **Complete theming** - Brand colors, logos, and styling via environment variables
- 📊 **Progress tracking** - Visual completion indicators
- 🌍 **Multilingual support** - English and Spanish included
- 🔒 **Admin interface** - Upload and manage content
- 🐳 **Docker ready** - One-command deployment
- 📱 **Responsive design** - Works on all devices

## 🎯 **Quick Start Examples**

### **NPM Package Usage**
```bash
# Zero-config setup - creates project and starts dev server
npx create-easyonboard my-onboard --template startup --start

# Or create project only (auto-installs dependencies)  
npx create-easyonboard my-onboard --template corporate --docker

# Customize branding
cd my-onboard
nano .env.local  # Update colors, company name, logo

# Your app is ready at http://localhost:3000 (if using --start)
```

### **Fork & Customize Usage**
```bash
# Clone and setup
git clone https://github.com/yourorg/easy-onboard
cd easy-onboard/app
npm install && npm run dev

# Your content goes in: data/topics/
# Theming via: .env.local
```

## 🎨 **Theme Customization**

All branding is controlled via environment variables:

```bash
# .env.local
NEXT_PUBLIC_APP_NAME="Acme Corp Onboarding"
NEXT_PUBLIC_COMPANY_NAME="Acme Corp"
NEXT_PUBLIC_PRIMARY_COLOR="59, 130, 246"  # Blue theme
NEXT_PUBLIC_COMPANY_LOGO="/your-logo.svg"
```

## 📝 **Content Management**

Simply add markdown files to your topics directory:

```
content/topics/           # NPM package projects
├── 01-welcome.md
├── 02-setup.md
└── 03-workflow.md

data/topics/              # Fork projects  
├── 01-welcome.md
├── 02-setup.md
└── 03-workflow.md
```

## 📚 **Documentation**

- **[📖 Complete Documentation](docs/)** - All guides and references
- **[🎨 Theme Customization](docs/THEMES.md)** - Colors, branding, and styling
- **[🚀 Deployment Guide](docs/DEPLOYMENT.md)** - Docker, cloud, and traditional hosting
- **[🤝 Contributing Guide](docs/CONTRIBUTING.md)** - Content creation best practices
- **[📦 Publishing Guide](docs/PUBLISHING.md)** - NPM package distribution

## 📄 **License**

MIT License - Use it however you'd like!

---

**Choose your path: Quick setup with NPM or full customization with forking.** ✨
