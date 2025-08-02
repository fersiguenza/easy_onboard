import { useState, useEffect, useCallback } from 'react';
import { getAuthConfig, getCognitoConfig, getAzureConfig, getGoogleConfig, getSimpleAuthConfig, AuthProvider } from '@/config/auth';

export interface User {
  id: string;
  email?: string;
  name?: string;
  isAdmin?: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

export interface UniversalAuthReturn extends AuthState {
  login: (credentials?: { username?: string; password?: string }) => Promise<void>;
  logout: () => Promise<void>;
  loginWithProvider: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export function useUniversalAuth(): UniversalAuthReturn {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
  });

  const authConfig = getAuthConfig();

  const updateState = useCallback((updates: Partial<AuthState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Simple authentication (current system)
  const loginSimple = async (username: string, password: string): Promise<boolean> => {
    const config = getSimpleAuthConfig();
    if (!config) {
      throw new Error('Simple auth not configured');
    }

    let user: User | null = null;

    // Check if admin credentials
    if (username === config.adminUsername && password === config.adminPassword) {
      user = { 
        id: username, 
        name: username, 
        email: `${username}@company.com`,
        isAdmin: true 
      };
    }
    // Check if regular user credentials
    else if (username === config.userUsername && password === config.userPassword) {
      user = { 
        id: username, 
        name: username, 
        email: `${username}@company.com`,
        isAdmin: false 
      };
    }

    if (user) {
      localStorage.setItem('easy-onboard-auth', JSON.stringify(user));
      updateState({ isAuthenticated: true, user });
      return true;
    }
    return false;
  };

  // Cognito authentication
  const loginCognito = async (username?: string, password?: string): Promise<boolean> => {
    const config = getCognitoConfig();
    if (!config) {
      throw new Error('Cognito not configured');
    }

    // For demo purposes - in real implementation, use AWS Cognito SDK
    console.log('Cognito login would authenticate with:', { username, config });
    
    // Simulate Cognito response with group membership check
    if (username && password) {
      // In real implementation, check user's groups from Cognito
      const isAdmin = username.includes('admin') || username.includes('administrator');
      
      const user: User = { 
        id: username, 
        email: `${username}@company.com`,
        name: username,
        isAdmin: isAdmin
      };
      localStorage.setItem('easy-onboard-auth', JSON.stringify(user));
      updateState({ isAuthenticated: true, user });
      return true;
    }
    return false;
  };

  // Azure AD authentication
  const loginAzure = async (): Promise<boolean> => {
    const config = getAzureConfig();
    if (!config) {
      throw new Error('Azure AD not configured');
    }

    // For demo purposes - in real implementation, use MSAL
    console.log('Azure AD login would redirect to:', config.authority);
    
    // Simulate Azure AD response with group membership
    // In real implementation, check user's groups from Azure AD
    const isAdmin = Math.random() > 0.5; // Demo: random admin assignment
    
    const user: User = { 
      id: 'azure-user', 
      email: 'user@company.com',
      name: 'Azure User',
      isAdmin: isAdmin
    };
    localStorage.setItem('easy-onboard-auth', JSON.stringify(user));
    updateState({ isAuthenticated: true, user });
    return true;
  };

  // Google OAuth authentication
  const loginGoogle = async (): Promise<boolean> => {
    const config = getGoogleConfig();
    if (!config) {
      throw new Error('Google OAuth not configured');
    }

    // For demo purposes - in real implementation, use Google OAuth SDK
    console.log('Google login would authenticate with client:', config.clientId);
    
    // Simulate Google response with domain check for admin
    // In real implementation, check user's domain or groups
    const userEmail = 'user@gmail.com'; // Demo email
    const isAdmin = config.adminDomain ? userEmail.endsWith(config.adminDomain) : false;
    
    const user: User = { 
      id: 'google-user', 
      email: userEmail,
      name: 'Google User',
      isAdmin: isAdmin
    };
    localStorage.setItem('easy-onboard-auth', JSON.stringify(user));
    updateState({ isAuthenticated: true, user });
    return true;
  };

  const login = async (credentials?: { username?: string; password?: string }): Promise<void> => {
    updateState({ isLoading: true, error: null });

    try {
      let success = false;

      switch (authConfig.provider) {
        case 'simple':
          if (credentials?.username && credentials?.password) {
            success = await loginSimple(credentials.username, credentials.password);
          }
          break;
        case 'cognito':
          if (credentials?.username && credentials?.password) {
            success = await loginCognito(credentials.username, credentials.password);
          }
          break;
        case 'azure':
          success = await loginAzure();
          break;
        case 'google':
          success = await loginGoogle();
          break;
        case 'none':
          // No authentication required
          const guestUser: User = { id: 'guest', name: 'Guest User' };
          updateState({ isAuthenticated: true, user: guestUser });
          return;
      }

      if (!success) {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      updateState({ error: error instanceof Error ? error.message : 'Authentication failed' });
    } finally {
      updateState({ isLoading: false });
    }
  };

  const loginWithProvider = async (): Promise<void> => {
    if (authConfig.provider === 'azure' || authConfig.provider === 'google') {
      await login();
    }
  };

  const logout = async (): Promise<void> => {
    // Clear localStorage first
    localStorage.removeItem('easy-onboard-auth');
    
    // Clear state immediately
    updateState({ 
      isAuthenticated: false, 
      user: null, 
      error: null,
      isLoading: false
    });
    
    // Provider-specific logout logic
    switch (authConfig.provider) {
      case 'azure':
        // In real implementation, call MSAL logout
        console.log('Azure AD logout');
        break;
      case 'google':
        // In real implementation, call Google logout
        console.log('Google logout');
        break;
      case 'cognito':
        // In real implementation, call Cognito logout
        console.log('Cognito logout');
        break;
    }
  };

  const checkAuth = async (): Promise<void> => {
    updateState({ isLoading: true });

    try {
      // For 'none' provider, always authenticate as guest
      if (authConfig.provider === 'none') {
        const guestUser: User = { id: 'guest', name: 'Guest User' };
        updateState({ 
          isAuthenticated: true, 
          user: guestUser, 
          isLoading: false 
        });
        return;
      }

      // Check for stored authentication
      const storedAuth = localStorage.getItem('easy-onboard-auth');
      if (storedAuth) {
        const user = JSON.parse(storedAuth);
        updateState({ 
          isAuthenticated: true, 
          user, 
          isLoading: false 
        });
      } else {
        updateState({ 
          isAuthenticated: false, 
          isLoading: false 
        });
      }
    } catch (error) {
      updateState({ 
        error: 'Failed to check authentication', 
        isLoading: false 
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    ...state,
    login,
    logout,
    loginWithProvider,
    checkAuth,
  };
}
