# Company Customization Guide

This guide explains how to customize Easy Onboard for your company without modifying any code.

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

### Required Configuration

```bash
# Admin Authentication
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password

# App Branding
NEXT_PUBLIC_APP_NAME="Your Company Onboard"
NEXT_PUBLIC_COMPANY_NAME="Your Company Name"
NEXT_PUBLIC_COMPANY_LOGO="/your-logo.png"
```

### Color Theme (Optional)

Customize your brand colors using RGB values:

```bash
# Primary brand color (main buttons, accents)
NEXT_PUBLIC_PRIMARY_COLOR="your, rgb, values"

# Light variant of primary color (backgrounds, hover states)
NEXT_PUBLIC_PRIMARY_LIGHT="your, rgb, values"

# Dark variant of primary color (hover states, emphasis)
NEXT_PUBLIC_PRIMARY_DARK="your, rgb, values"

# Accent color (secondary elements)
NEXT_PUBLIC_ACCENT_COLOR="your, rgb, values"

# Background gradient colors
NEXT_PUBLIC_GRADIENT_FROM="your, rgb, values"
NEXT_PUBLIC_GRADIENT_TO="your, rgb, values"
```

## Quick Setup Examples

### Blue Theme (Corporate)
```bash
NEXT_PUBLIC_PRIMARY_COLOR="59, 130, 246"      # blue-500
NEXT_PUBLIC_PRIMARY_LIGHT="147, 197, 253"    # blue-300
NEXT_PUBLIC_PRIMARY_DARK="29, 78, 216"       # blue-700
NEXT_PUBLIC_ACCENT_COLOR="96, 165, 250"      # blue-400
NEXT_PUBLIC_GRADIENT_FROM="239, 246, 255"    # blue-50
```

### Green Theme (Tech)
```bash
NEXT_PUBLIC_PRIMARY_COLOR="34, 197, 94"      # green-500
NEXT_PUBLIC_PRIMARY_LIGHT="134, 239, 172"    # green-300
NEXT_PUBLIC_PRIMARY_DARK="21, 128, 61"       # green-700
NEXT_PUBLIC_ACCENT_COLOR="74, 222, 128"      # green-400
NEXT_PUBLIC_GRADIENT_FROM="240, 253, 244"    # green-50
```

### Red Theme (Bold)
```bash
NEXT_PUBLIC_PRIMARY_COLOR="239, 68, 68"      # red-500
NEXT_PUBLIC_PRIMARY_LIGHT="252, 165, 165"    # red-300
NEXT_PUBLIC_PRIMARY_DARK="185, 28, 28"       # red-700
NEXT_PUBLIC_ACCENT_COLOR="248, 113, 113"     # red-400
NEXT_PUBLIC_GRADIENT_FROM="254, 242, 242"    # red-50
```

### Orange Theme (Energetic)
```bash
NEXT_PUBLIC_PRIMARY_COLOR="249, 115, 22"     # orange-500
NEXT_PUBLIC_PRIMARY_LIGHT="253, 186, 116"    # orange-300
NEXT_PUBLIC_PRIMARY_DARK="194, 65, 12"       # orange-700
NEXT_PUBLIC_ACCENT_COLOR="251, 146, 60"      # orange-400
NEXT_PUBLIC_GRADIENT_FROM="255, 247, 237"    # orange-50
```

## Logo Setup

1. **Add your logo**: Place your company logo in the `public/` directory
2. **Update the path**: Set `NEXT_PUBLIC_COMPANY_LOGO="/your-logo.png"`
3. **Recommended size**: 64x64px or 128x128px for best results
4. **Supported formats**: PNG, JPG, SVG

## Content Setup

### Sample Topics

Replace the files in the `topics/` directory:

```
topics/
├── 01-welcome.md              # Welcome message
├── 02-setup.md               # Environment setup
├── 03-standards.md           # Coding standards
└── 04-your-topic.md          # Additional topics
```

### Topic Structure

Each markdown file should follow this structure:

```markdown
# Topic Title

Brief introduction paragraph.

## Section 1

Content with **formatting**, `code snippets`, and:

- Bullet points
- Step-by-step instructions
- Links to resources

## Code Examples

\`\`\`bash
# Command examples
npm install
npm run dev
\`\`\`

## Next Steps

What to do after completing this topic.
```

## Deployment

### Docker (Recommended)

1. Set your environment variables in `.env.local`
2. Deploy with Docker Compose:

```bash
docker-compose up -d
```

### Vercel

1. Fork the repository
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Railway

1. Connect repository
2. Add environment variables
3. Deploy

## Environment Variables Reference

| Variable | Purpose | Default | Example |
|----------|---------|---------|---------|
| `ADMIN_USERNAME` | Admin login username | `admin` | `company-admin` |
| `ADMIN_PASSWORD` | Admin login password | `onboard123` | `SecureP@ss123` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Easy Onboard` | `Acme Corp Onboard` |
| `NEXT_PUBLIC_COMPANY_NAME` | Company name | `Your Company` | `Acme Corporation` |
| `NEXT_PUBLIC_COMPANY_LOGO` | Logo file path | `/logo.png` | `/acme-logo.png` |
| `NEXT_PUBLIC_PRIMARY_COLOR` | Primary RGB color | `139, 92, 246` | `59, 130, 246` |
| `NEXT_PUBLIC_PRIMARY_LIGHT` | Light primary RGB | `196, 181, 253` | `147, 197, 253` |
| `NEXT_PUBLIC_PRIMARY_DARK` | Dark primary RGB | `124, 58, 237` | `29, 78, 216` |
| `NEXT_PUBLIC_ACCENT_COLOR` | Accent RGB color | `168, 85, 247` | `96, 165, 250` |
| `NEXT_PUBLIC_GRADIENT_FROM` | Gradient start RGB | `245, 243, 255` | `239, 246, 255` |
| `NEXT_PUBLIC_GRADIENT_TO` | Gradient end RGB | `255, 255, 255` | `255, 255, 255` |

## Tips

- **Colors**: Use RGB values without spaces: `59,130,246` not `59, 130, 246`
- **Testing**: Test colors in development mode first
- **Consistency**: Keep related colors in the same color family
- **Accessibility**: Ensure sufficient contrast for readability
- **Logo**: Square logos work best for the header display

## Support

If you need help with customization:

1. Check this guide first
2. Test in development mode (`npm run dev`)
3. Verify environment variable syntax
4. Ensure logo file exists in `public/` directory
