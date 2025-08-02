// Core exports
export * from './types';
export * from './config';
export * from './hooks';

// Services
export { topicsService } from './lib/topicsService';
export { themeConfig } from './lib/theme';

// Components
export { default as ThemeProvider } from './components/ThemeProvider';
export { default as HomePage } from './components/HomePage';
export { default as OnboardingFlow } from './components/OnboardingFlow';
export { default as AdminPanel } from './components/AdminPanel';
export { default as AdminLogin } from './components/AdminLogin';

// UI Components
export * from './components/ui';
