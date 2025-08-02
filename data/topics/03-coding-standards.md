# Coding Standards and Best Practices

This document outlines our team's coding standards and best practices to ensure consistent, maintainable, and high-quality code.

## General Principles

### Clean Code
- Write code that is easy to read and understand
- Use meaningful variable and function names
- Keep functions small and focused on a single task
- Comment your code when necessary, especially complex business logic

### DRY (Don't Repeat Yourself)
- Avoid code duplication
- Extract common functionality into reusable functions or components
- Use constants for repeated values

### SOLID Principles
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

## JavaScript/TypeScript Standards

### Naming Conventions
```typescript
// Variables and functions: camelCase
const userName = 'john_doe';
const calculateTotalPrice = () => {};

// Constants: SCREAMING_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';

// Classes: PascalCase
class UserManager {}
class PaymentProcessor {}

// Interfaces: PascalCase with 'I' prefix (optional)
interface IUser {}
interface UserProfile {}

// Types: PascalCase
type ApiResponse<T> = {
  data: T;
  status: number;
};
```

### Function Declaration
```typescript
// Prefer arrow functions for simple functions
const add = (a: number, b: number): number => a + b;

// Use function declarations for complex functions
function processUserData(userData: UserData): ProcessedData {
  // Complex logic here
  return processedData;
}

// Always specify return types for public functions
export const getUserById = async (id: string): Promise<User | null> => {
  // Implementation
};
```

### Error Handling
```typescript
// Use try-catch for async operations
async function fetchUserData(id: string): Promise<User> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    logger.error('Failed to fetch user data', { id, error });
    throw new UserNotFoundError(`User with id ${id} not found`);
  }
}

// Create custom error classes
class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}
```

## React/Next.js Standards

### Component Structure
```typescript
// Component file structure
import React from 'react';
import { ComponentProps } from './types';
import styles from './Component.module.css';

interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}

export default function MyComponent({ title, onSubmit }: Props) {
  // Hooks first
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Event handlers
  const handleSubmit = useCallback((data: FormData) => {
    setLoading(true);
    onSubmit(data);
  }, [onSubmit]);

  // Early returns
  if (!user) {
    return <div>Please log in</div>;
  }

  // Main render
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      {/* Component JSX */}
    </div>
  );
}
```

### State Management
```typescript
// Use useState for local component state
const [count, setCount] = useState(0);

// Use useReducer for complex state logic
const [state, dispatch] = useReducer(reducer, initialState);

// Use custom hooks for reusable logic
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  return { count, increment, decrement };
};
```

## CSS/Styling Standards

### Tailwind CSS
```typescript
// Use semantic class grouping
<div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
  {/* Content */}
</div>

// Extract complex styles to components
const buttonClasses = cn(
  'px-4 py-2 rounded-md transition-colors',
  'bg-blue-600 hover:bg-blue-700',
  'text-white font-medium',
  disabled && 'opacity-50 cursor-not-allowed'
);
```

### CSS Modules (when needed)
```css
/* Component.module.css */
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}
```

## Git Standards

### Commit Messages
Follow the Conventional Commits specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Examples:**
```
feat(auth): add OAuth login functionality
fix(api): handle null values in user data
docs(readme): update installation instructions
refactor(utils): simplify date formatting function
```

### Branch Naming
```
<type>/<ticket-number>-<short-description>

Examples:
feature/AUTH-123-oauth-integration
bugfix/UI-456-mobile-layout-fix
hotfix/PROD-789-memory-leak
```

## Testing Standards

### Unit Tests
```typescript
// UserService.test.ts
import { UserService } from './UserService';

describe('UserService', () => {
  describe('getUserById', () => {
    it('should return user when id exists', async () => {
      // Arrange
      const userId = '123';
      const expectedUser = { id: '123', name: 'John' };
      
      // Act
      const result = await UserService.getUserById(userId);
      
      // Assert
      expect(result).toEqual(expectedUser);
    });

    it('should throw error when user not found', async () => {
      // Arrange
      const invalidId = 'invalid';
      
      // Act & Assert
      await expect(UserService.getUserById(invalidId))
        .rejects
        .toThrow('User not found');
    });
  });
});
```

### Component Tests
```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Performance Guidelines

### Code Splitting
```typescript
// Lazy load components
const LazyComponent = lazy(() => import('./LazyComponent'));

// Use dynamic imports for large libraries
const loadChart = async () => {
  const { Chart } = await import('chart.js');
  return Chart;
};
```

### Optimization
```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Memoize components
const MemoizedComponent = memo(({ data }) => {
  return <div>{data}</div>;
});

// Debounce user input
const debouncedSearch = useDebounce(searchTerm, 300);
```

## Tools and Automation

### ESLint Configuration
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
    "no-console": "warn"
  }
}
```

### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows naming conventions
- [ ] Functions are small and focused
- [ ] Error handling is implemented
- [ ] Tests are written and passing
- [ ] No console.log statements in production code
- [ ] TypeScript types are properly defined
- [ ] Performance considerations are addressed
- [ ] Documentation is updated if needed

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

Remember: These standards are guidelines to help us write better code together. When in doubt, ask the team! 🤝
