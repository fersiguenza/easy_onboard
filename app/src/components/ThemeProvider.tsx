'use client';

import { useEffect } from 'react';
import { themeConfig } from '@/lib/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Set CSS custom properties from environment variables
    const root = document.documentElement;
    const cssVars = themeConfig.getCSSVars();
    
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, []);

  return <>{children}</>;
}
