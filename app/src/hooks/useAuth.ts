import { useState, useEffect } from 'react';
import { UseAuthReturn } from '@/types';
import { config } from '@/config';

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const adminAuth = localStorage.getItem(config.storage.adminAuth);
    setIsAuthenticated(!!adminAuth);
  };

  const login = () => {
    localStorage.setItem(config.storage.adminAuth, 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(config.storage.adminAuth);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };
}
