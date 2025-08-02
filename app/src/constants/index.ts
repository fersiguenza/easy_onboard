// File extensions
export const ALLOWED_FILE_EXTENSIONS = ['.md', '.markdown'] as const;

// Validation patterns
export const FILENAME_PATTERN = /^[a-zA-Z0-9\s\-_]+$/;
export const TITLE_MAX_LENGTH = 100;
export const CONTENT_MAX_LENGTH = 50000;

// UI constants
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Theme variants
export const THEME_VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
  danger: 'danger',
  success: 'success',
  warning: 'warning',
  info: 'info',
} as const;

// Status types
export const LOADING_STATES = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
} as const;

export type LoadingState = typeof LOADING_STATES[keyof typeof LOADING_STATES];
