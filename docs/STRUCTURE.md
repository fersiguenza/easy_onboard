# Project Structure Documentation

This document explains the new organized structure of the Easy Onboard application.

## 🏗️ **Project Architecture**

### **Modular Design**
The application is now organized using clean architecture principles with clear separation of concerns.

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── page.tsx          # Main application entry
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── HomePage.tsx      # Feature components
│   ├── OnboardingFlow.tsx
│   ├── AdminPanel.tsx
│   └── ...
├── hooks/                 # Custom React hooks
│   ├── useTopics.ts      # Business logic hooks
│   ├── useAuth.ts
│   ├── useLanguage.ts
│   └── index.ts          # Barrel exports
├── lib/                   # Utilities and services
│   ├── topicsService.ts  # API client
│   ├── theme.ts          # Theme configuration
│   └── i18n.ts           # Internationalization
├── types/                 # TypeScript definitions
│   └── index.ts          # All type definitions
├── config/                # Application configuration
│   └── index.ts          # Centralized config
├── constants/             # Application constants
│   └── index.ts          # Reusable constants
└── index.ts              # Main barrel export
```

## 📋 **Key Files Explained**

### **Types (`src/types/index.ts`)**
Centralized TypeScript definitions for:
- `Topic`: Core domain model
- `UseTopicsReturn`: Hook return types
- `ThemeConfig`: Theme configuration
- Component prop interfaces

### **Configuration (`src/config/index.ts`)**
Centralized application settings:
- Storage keys for localStorage
- API endpoint URLs
- Supported languages
- File upload settings
- UI configuration

### **Custom Hooks (`src/hooks/`)**
Business logic extracted into reusable hooks:

#### `useTopics()`
- Manages topic CRUD operations
- Handles loading states and errors
- Provides clean API for topic management

#### `useAuth()`
- Manages authentication state
- Handles login/logout operations
- Persists auth state

#### `useLanguage()`
- Manages language switching
- Provides translation function
- Persists language preference

#### `useNavigation()`
- Manages view state (home/onboarding/admin)
- Provides navigation functions
- Handles admin mode toggling

### **UI Components (`src/components/ui/`)**
Reusable components with consistent API:
- `Button`: Configurable button with variants
- `LoadingState`: Loading indicator with message
- `LoadingSpinner`: Simple spinner component

### **Services (`src/lib/`)**
External integrations and utilities:
- `topicsService`: API client for topic operations
- `theme`: Dynamic theme configuration
- `i18n`: Internationalization setup

## 🎯 **Benefits of New Structure**

### **1. Better Maintainability**
- Clear separation of concerns
- Single responsibility principle
- Easy to locate and modify code

### **2. Improved Reusability**
- Custom hooks can be reused across components
- UI components follow consistent patterns
- Business logic is decoupled from UI

### **3. Type Safety**
- Centralized type definitions
- Better IDE support and autocomplete
- Reduced runtime errors

### **4. Scalability**
- Easy to add new features
- Component composition patterns
- Clean dependency injection

### **5. Testing**
- Hooks can be tested in isolation
- Components have clear interfaces
- Mocking is straightforward

## 🔧 **Usage Examples**

### **Using Custom Hooks**
```tsx
// Clean component with hooks
function MyComponent() {
  const { topics, loading, createTopic } = useTopics();
  const { isAuthenticated, login } = useAuth();
  const { t, changeLanguage } = useLanguage();

  // Component logic here...
}
```

### **Creating New UI Components**
```tsx
// Follow established patterns
import { Button } from '@/components/ui';

function MyFeature() {
  return (
    <Button 
      variant="primary" 
      loading={isLoading}
      onClick={handleClick}
    >
      {t('button.save')}
    </Button>
  );
}
```

### **Adding New Configuration**
```tsx
// Add to config/index.ts
export const config = {
  // existing config...
  newFeature: {
    enabled: true,
    apiUrl: '/api/new-feature',
  },
};
```

## 📦 **Import Patterns**

### **Barrel Exports**
```tsx
// Use centralized exports
import { useTopics, useAuth, Button, LoadingState } from '@/hooks';
import { Topic, ThemeConfig } from '@/types';
import { config } from '@/config';
```

### **Feature Imports**
```tsx
// Import from feature directories
import { topicsService } from '@/lib/topicsService';
import { themeConfig } from '@/lib/theme';
```

## 🔄 **Migration Benefits**

### **Before: Monolithic Component**
- 200+ lines in single file
- Mixed concerns (UI, business logic, state)
- Hard to test and maintain
- Repeated code patterns

### **After: Modular Architecture**
- Clean 50-line main component
- Separated business logic in hooks
- Reusable UI components
- Centralized configuration
- Type-safe interfaces

## 🚀 **Development Workflow**

### **Adding New Features**
1. Define types in `src/types/`
2. Add configuration in `src/config/`
3. Create custom hook if needed
4. Build UI components
5. Compose in main application

### **Modifying Existing Features**
1. Locate relevant hook or service
2. Update business logic
3. Update types if needed
4. Test components

### **Adding New Pages**
1. Create page component
2. Use existing hooks and components
3. Follow established patterns

This structure provides a solid foundation for future development and maintenance! 🎉
