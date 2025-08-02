# Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended for Web)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/easy_onboard)

1. Click the deploy button above
2. Connect your GitHub account
3. Set environment variables:
   - `ADMIN_USERNAME`: Your admin username
   - `ADMIN_PASSWORD`: Your admin password
4. Deploy!

### 2. Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/easy_onboard)

1. Click the deploy button above
2. Connect your GitHub account
3. Set environment variables in Netlify dashboard
4. Deploy!

### 3. Docker (Self-hosted)

```bash
# Clone the repo
git clone https://github.com/yourusername/easy_onboard.git
cd easy_onboard

# Copy and edit environment variables
cp .env.example .env.local

# Deploy with Docker Compose
docker-compose up -d
```

### 4. Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/easy-onboard)

### 5. DigitalOcean App Platform
[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/yourusername/easy_onboard/tree/main)

## Environment Variables

Required environment variables for deployment:

```bash
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password
```

Optional:
```bash
NEXT_PUBLIC_APP_NAME="Your Company Onboard"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

## Custom Domain

After deployment, you can:
1. Point your custom domain to the deployment
2. Update the logo in `public/logo.png`
3. Customize the topics in the `topics/` directory
4. Modify branding in the components

## Security Notes

- Always change default admin credentials
- Use strong passwords for production
- Consider adding HTTPS (most platforms provide this automatically)
- The app uses localStorage, so data is per-browser/device
