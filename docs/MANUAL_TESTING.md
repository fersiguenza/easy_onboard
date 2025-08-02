# Manual Testing Guide for Easy Onboard

## 🧪 **Quick Manual Tests**

### **Test 1: NPM Package Approach**

```bash
# 1. Create a test project
cd /tmp
npx /Users/fernandosiguenza/Desktop/ideas/easy_onboard/packages/create-easyonboard/bin/create-easyonboard.js my-test --docker --template startup

# 2. Verify files were created
cd my-test
ls -la
# Should see: package.json, src/, public/, content/topics/, .env.local, docker-compose.yml

# 3. Check sample content
ls content/topics/
cat content/topics/01-welcome.md

# 4. Install and test
npm install
npm run dev
# Visit http://localhost:3000
```

### **Test 2: Fork & Customize Approach**

```bash
# 1. Test the main app
cd /Users/fernandosiguenza/Desktop/ideas/easy_onboard/app

# 2. Install and run
npm install
npm run dev
# Visit http://localhost:3000
```

### **Test 3: Theme Customization**

```bash
# In either approach, edit .env.local:
NEXT_PUBLIC_PRIMARY_COLOR="219, 39, 119"     # Pink-600
NEXT_PUBLIC_PRIMARY_LIGHT="251, 207, 232"   # Pink-200
NEXT_PUBLIC_PRIMARY_DARK="190, 24, 93"      # Pink-700

# Restart server and verify pink theme
```

### **Test 4: Admin Interface**

```bash
# Visit http://localhost:3000/admin
# Login with: admin / onboard123
# Test file upload and topic management
```

## ✅ **Expected Results**

### **NPM Package:**
- ✅ CLI creates complete project structure
- ✅ Sample content files generated
- ✅ Environment configuration ready
- ✅ Docker files included (if --docker flag)
- ✅ Project builds and runs independently

### **Fork Approach:**
- ✅ Full source code access
- ✅ Complete development environment
- ✅ All features and customization options
- ✅ Build and deployment tools included

### **Both Approaches:**
- ✅ Theme customization via environment variables
- ✅ Admin interface with dynamic theming
- ✅ Responsive design on mobile/desktop
- ✅ Multi-language support (EN/ES)
- ✅ Progress tracking functionality

## 🔧 **Troubleshooting**

### **Build Warnings (Non-Critical)**
- ESLint warnings about `<img>` tags → Can be ignored or fixed with Next.js Image
- TypeScript unused variables → Can be cleaned up but don't affect functionality

### **Port Conflicts**
- If port 3000 is busy, Next.js will automatically use 3001, 3002, etc.

### **Docker Issues**
- Ensure Docker is installed and running
- Check if ports 3000/80 are available

## 🎯 **Success Criteria**

Both approaches are **working correctly** if:
1. ✅ Projects can be created/cloned
2. ✅ Dependencies install successfully  
3. ✅ Development server starts
4. ✅ App loads in browser
5. ✅ Theme customization works
6. ✅ Admin interface is accessible
7. ✅ Content can be uploaded and displayed

---

**Both distribution methods are ready for production use!** 🚀
