// Application configuration
export const config = {
  // Storage keys
  storage: {
    language: 'easy-onboard-language',
    adminAuth: 'easy-onboard-admin',
    topics: 'easy-onboard-topics',
  },

  // API endpoints
  api: {
    topics: '/api/topics',
  },

  // Supported languages
  languages: ['en', 'es'] as const,

  // File upload settings
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['.md', '.markdown'],
  },

  // UI settings
  ui: {
    loadingDelay: 200, // ms before showing loading state
    autoSaveDelay: 1000, // ms for auto-save debounce
  },
} as const;

export type Language = typeof config.languages[number];
