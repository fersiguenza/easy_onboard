// Theme configuration using environment variables
export const themeConfig = {
  // App branding
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Easy Onboard',
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Your Company',
  logo: process.env.NEXT_PUBLIC_COMPANY_LOGO || '/logo.png',
  
  // Colors (RGB values)
  colors: {
    primary: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '139, 92, 246',
    primaryLight: process.env.NEXT_PUBLIC_PRIMARY_LIGHT || '196, 181, 253',
    primaryDark: process.env.NEXT_PUBLIC_PRIMARY_DARK || '124, 58, 237',
    accent: process.env.NEXT_PUBLIC_ACCENT_COLOR || '168, 85, 247',
    gradientFrom: process.env.NEXT_PUBLIC_GRADIENT_FROM || '245, 243, 255',
    gradientTo: process.env.NEXT_PUBLIC_GRADIENT_TO || '255, 255, 255',
  },
  
  // CSS custom properties for dynamic theming
  getCSSVars: () => ({
    '--color-primary': process.env.NEXT_PUBLIC_PRIMARY_COLOR || '139, 92, 246',
    '--color-primary-light': process.env.NEXT_PUBLIC_PRIMARY_LIGHT || '196, 181, 253',
    '--color-primary-dark': process.env.NEXT_PUBLIC_PRIMARY_DARK || '124, 58, 237',
    '--color-accent': process.env.NEXT_PUBLIC_ACCENT_COLOR || '168, 85, 247',
    '--color-gradient-from': process.env.NEXT_PUBLIC_GRADIENT_FROM || '245, 243, 255',
    '--color-gradient-to': process.env.NEXT_PUBLIC_GRADIENT_TO || '255, 255, 255',
  }),
};

// Helper functions for generating dynamic styles
export const getButtonStyles = (variant: 'primary' | 'secondary' = 'primary') => {
  if (variant === 'primary') {
    return {
      backgroundColor: `rgb(${themeConfig.colors.primary})`,
      color: 'white',
    };
  }
  return {
    backgroundColor: `rgba(${themeConfig.colors.primary}, 0.1)`,
    color: `rgb(${themeConfig.colors.primary})`,
  };
};

export const getGradientStyle = () => ({
  background: `linear-gradient(to bottom right, rgb(${themeConfig.colors.gradientFrom}), rgb(${themeConfig.colors.gradientTo}))`,
});

export const getProgressBarStyle = (percentage: number) => ({
  background: `rgb(${themeConfig.colors.primary})`,
  width: `${percentage}%`,
});
