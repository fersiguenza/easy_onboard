# 🔐 Authentication Guide

Easy Onboard supports multiple authentication providers to meet different organizational needs. Configure authentication through environment variables for seamless integration.

## 🎯 **Authentication Providers**

### **🔓 No Authentication (Default)**
Perfect for open onboarding or internal wikis.

```bash
NEXT_PUBLIC_AUTH_PROVIDER=none
NEXT_PUBLIC_REQUIRE_AUTH=false
```

**Features:**
- ✅ Open access to all content
- ✅ Admin panel requires simple credentials
- ✅ Perfect for internal teams

### **🔑 Simple Authentication**
Basic username/password authentication with separate user roles.

```bash
NEXT_PUBLIC_AUTH_PROVIDER=simple

# Regular user credentials (content access only)
NEXT_PUBLIC_USER_USERNAME=user
NEXT_PUBLIC_USER_PASSWORD=welcome123

# Admin credentials (content + admin panel access)
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

NEXT_PUBLIC_REQUIRE_AUTH=true
```

**Features:**
- ✅ Two user types: Regular users and Admins
- ✅ Quick setup
- ✅ No external dependencies
- ✅ Role-based access control
- ⚠️ Credentials stored in environment variables

### **☁️ AWS Cognito**
Enterprise-grade authentication with user pools and group-based admin access.

```bash
NEXT_PUBLIC_AUTH_PROVIDER=cognito
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_COGNITO_REGION=us-east-1
NEXT_PUBLIC_COGNITO_DOMAIN=your-app.auth.us-east-1.amazoncognito.com
NEXT_PUBLIC_COGNITO_ADMIN_GROUP=Administrators  # Group for admin users
NEXT_PUBLIC_REQUIRE_AUTH=true
```

**Features:**
- ✅ Scalable user management
- ✅ Group-based admin access
- ✅ MFA support
- ✅ Password policies
- ✅ Social login integration

### **🏢 Microsoft Azure AD**
Perfect for organizations using Microsoft 365 with group-based permissions.

```bash
NEXT_PUBLIC_AUTH_PROVIDER=azure
NEXT_PUBLIC_AZURE_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_AZURE_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
NEXT_PUBLIC_AZURE_REDIRECT_URI=http://localhost:3000/auth/callback
NEXT_PUBLIC_AZURE_ADMIN_GROUP_ID=admin-group-id  # Azure AD group for admins
NEXT_PUBLIC_REQUIRE_AUTH=true
```

**Features:**
- ✅ Single Sign-On (SSO)
- ✅ Azure AD group integration
- ✅ Existing AD integration
- ✅ Conditional access policies
- ✅ Enterprise security

### **📧 Google OAuth**
Simple integration with Google accounts and domain-based admin access.

```bash
NEXT_PUBLIC_AUTH_PROVIDER=google
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
NEXT_PUBLIC_GOOGLE_ADMIN_DOMAIN=admin.company.com  # Domain for admin users
NEXT_PUBLIC_REQUIRE_AUTH=true
```

**Features:**
- ✅ Google Workspace integration
- ✅ Domain-based admin access
- ✅ Easy user onboarding
- ✅ Familiar login experience

## 🛡️ **Protection Levels**

### **Global Settings**
Control authentication requirements across the entire app:

```bash
# Require authentication for all pages
NEXT_PUBLIC_REQUIRE_AUTH=true

# Protect welcome/content pages only
NEXT_PUBLIC_PROTECT_WELCOME=true

# Make entire app admin-only
NEXT_PUBLIC_ADMIN_ONLY=true
```

### **Page-Level Protection**
Different protection levels for different content:

| Setting | Home Page | Content Pages | Admin Panel |
|---------|-----------|---------------|-------------|
| `REQUIRE_AUTH=false` | Open | Open | Protected |
| `REQUIRE_AUTH=true` | Protected | Protected | Protected |
| `PROTECT_WELCOME=true` | Open | Protected | Protected |
| `ADMIN_ONLY=true` | Admin Only | Admin Only | Admin Only |

## 🚀 **Quick Start Examples**

### **Example 1: Open Internal Wiki**
```bash
NEXT_PUBLIC_AUTH_PROVIDER=none
NEXT_PUBLIC_REQUIRE_AUTH=false
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=wiki123
```

### **Example 2: Protected Company Onboarding**
```bash
NEXT_PUBLIC_AUTH_PROVIDER=simple
NEXT_PUBLIC_REQUIRE_AUTH=true
NEXT_PUBLIC_ADMIN_USERNAME=hr_admin
NEXT_PUBLIC_ADMIN_PASSWORD=hr_secure_2024
```

### **Example 3: Enterprise Cognito Setup**
```bash
NEXT_PUBLIC_AUTH_PROVIDER=cognito
NEXT_PUBLIC_REQUIRE_AUTH=true
NEXT_PUBLIC_PROTECT_WELCOME=true
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_ABC123DEF
NEXT_PUBLIC_COGNITO_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j
NEXT_PUBLIC_COGNITO_REGION=us-east-1
```

### **Example 4: Microsoft 365 Integration**
```bash
NEXT_PUBLIC_AUTH_PROVIDER=azure
NEXT_PUBLIC_REQUIRE_AUTH=true
NEXT_PUBLIC_AZURE_CLIENT_ID=12345678-1234-1234-1234-123456789012
NEXT_PUBLIC_AZURE_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
NEXT_PUBLIC_AZURE_REDIRECT_URI=https://onboard.company.com/auth/callback
```

## 🔧 **Implementation Notes**

### **Security Considerations**
- ✅ All authentication happens client-side for demo purposes
- ⚠️ **Production**: Implement server-side validation
- ⚠️ **Credentials**: Use secure secret management in production
- ✅ **HTTPS**: Always use HTTPS in production

### **Provider Setup Requirements**

#### **AWS Cognito Setup**
1. Create User Pool in AWS Console
2. Configure App Client (Public client, no secret)
3. Set up Custom Domain (optional)
4. Configure OAuth flows and scopes

#### **Azure AD Setup**
1. Register app in Azure Portal
2. Configure redirect URIs
3. Set up API permissions
4. Generate client credentials

#### **Google OAuth Setup**
1. Create project in Google Cloud Console
2. Configure OAuth consent screen
3. Create OAuth 2.0 credentials
4. Set authorized redirect URIs

### **Migration Path**
Easy to migrate between providers:

1. **None → Simple**: Add credentials, change provider
2. **Simple → Cognito**: Set up Cognito, migrate users
3. **Any → Azure**: Perfect for Microsoft shops
4. **Any → Google**: Great for Google Workspace orgs

## 🎯 **Best Practices**

### **Development**
```bash
# Development: Simple auth
NEXT_PUBLIC_AUTH_PROVIDER=simple
NEXT_PUBLIC_REQUIRE_AUTH=false  # Open during development
```

### **Staging**
```bash
# Staging: Mirror production but separate pools
NEXT_PUBLIC_AUTH_PROVIDER=cognito
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_STAGING
```

### **Production**
```bash
# Production: Full enterprise setup
NEXT_PUBLIC_AUTH_PROVIDER=azure
NEXT_PUBLIC_REQUIRE_AUTH=true
NEXT_PUBLIC_PROTECT_WELCOME=true
```

## 📞 **Support**

Need help setting up authentication? Check:
- **[AWS Cognito Docs](https://docs.aws.amazon.com/cognito/)**
- **[Azure AD Docs](https://docs.microsoft.com/en-us/azure/active-directory/)**
- **[Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)**

---

**🔐 Secure your onboarding content with the provider that fits your organization!**
