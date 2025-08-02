# Publishing Guide

Instructions for publishing Easy Onboard packages to NPM.

## 📦 **Package Structure**

```
easy-onboard/
├── app/                           # Main application (for forking)
├── packages/
│   └── create-easyonboard/        # NPM package for library usage
├── data/topics/                   # Sample content for forks
├── package.json                   # Monorepo configuration
└── README.md                      # Main documentation
```

## 🚀 **Publishing Steps**

### **1. Prepare Release**
```bash
# Update version in packages/create-easyonboard/package.json
# Update CHANGELOG.md
# Test package locally
```

### **2. Test Package Locally**
```bash
# Link package locally
cd packages/create-easyonboard
npm link

# Test creation
npx create-easyonboard test-project
cd test-project
npm install
npm run dev
```

### **3. Publish to NPM**
```bash
# Login to NPM
npm login

# Publish package
cd packages/create-easyonboard
npm publish --access public
```

### **4. Verify Publication**
```bash
# Test installation
npx create-easyonboard@latest test-install
```

## 🔄 **Version Management**

### **Semantic Versioning**
- `1.0.0` - Initial release
- `1.0.1` - Bug fixes
- `1.1.0` - New features
- `2.0.0` - Breaking changes

### **Release Process**
1. Update package version
2. Update CHANGELOG.md
3. Test thoroughly
4. Publish to NPM
5. Create GitHub release
6. Update documentation

## 📋 **Pre-publish Checklist**

### **✅ Package Requirements**
- [ ] Package.json is complete
- [ ] README.md is up to date
- [ ] CLI script is executable
- [ ] Dependencies are correct
- [ ] File paths are relative
- [ ] Templates are included

### **✅ Testing Requirements**
- [ ] Package installs correctly
- [ ] Project generation works
- [ ] Sample content is created
- [ ] Environment configuration works
- [ ] Docker files are generated (if requested)
- [ ] App starts successfully

### **✅ Documentation Requirements**
- [ ] Main README.md updated
- [ ] DEPLOYMENT.md covers both usage types
- [ ] THEMES.md includes customization
- [ ] CONTRIBUTING.md has content guidelines

## 🛠️ **Package Maintenance**

### **Regular Updates**
- Keep dependencies updated
- Test with latest Node.js versions
- Update sample content
- Improve CLI experience

### **Issue Management**
- Monitor NPM download statistics
- Address user feedback
- Fix reported bugs promptly
- Add requested features

## 📊 **Usage Analytics**

### **NPM Statistics**
```bash
# Check package downloads
npm info create-easyonboard

# View package details
npm view create-easyonboard
```

### **GitHub Insights**
- Monitor repository stars/forks
- Track issue resolution time
- Analyze user feedback

---

**Make onboarding easy for everyone!** 🌟
