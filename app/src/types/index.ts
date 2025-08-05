// Core domain types
export interface TopicSection {
  id: string;
  title: string;
  content: string;
  filename: string;
  order: number;
}

export interface Topic {
  id: string;
  title: string;
  content: string; // Combined content from all sections or single file content
  uploadedAt: string;
  completed: boolean;
  isDirectory?: boolean; // Whether this topic is a directory with sections
  sections?: TopicSection[]; // If directory, contains multiple sections
  filename?: string; // If single file, the filename
}

// Component prop types
export interface TopicCardProps {
  topic: Topic;
  onComplete: (id: string) => void;
  onDelete?: (id: string) => void;
}

export interface TopicListProps {
  topics: Topic[];
  onTopicComplete: (id: string) => void;
  onTopicDelete?: (id: string) => void;
}

// Page view types
export type ViewType = 'home' | 'onboarding' | 'admin';

// Admin related types
export interface AdminCredentials {
  username: string;
  password: string;
}

// API response types
export interface TopicsResponse {
  topics: Topic[];
}

export interface TopicResponse {
  topic: Topic;
}

export interface ApiError {
  error: string;
}

// Hook return types
export interface UseTopicsReturn {
  topics: Topic[];
  loading: boolean;
  error: string | null;
  loadTopics: () => Promise<void>;
  clearTopics: () => void;
  createTopic: (title: string, content: string) => Promise<void>;
  deleteTopic: (id: string) => Promise<void>;
  updateTopicCompletion: (id: string, completed: boolean) => Promise<void>;
}

export interface UseAuthReturn {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  checkAuth: () => void;
}

export interface UseLanguageReturn {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  t: (key: string, params?: Record<string, unknown>) => string;
}

// Theme types
export interface ThemeConfig {
  appName: string;
  logo: string;
  primaryColor: string;
  primaryLight: string;
  primaryDark: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
}
