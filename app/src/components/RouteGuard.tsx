'use client';

import { useEffect, useState } from 'react';
import { useUniversalAuth } from '@/hooks/useUniversalAuth';
import { getAuthConfig } from '@/config/auth';
import UniversalLogin from './UniversalLogin';
import { LoadingState } from './ui/Loading';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  adminOnly?: boolean;
  allowGuest?: boolean;
}

export default function RouteGuard({ 
  children, 
  requireAuth: propRequireAuth,
  adminOnly: propAdminOnly,
  allowGuest = false 
}: RouteGuardProps) {
  const { isAuthenticated, isLoading, user } = useUniversalAuth();
  const [showLogin, setShowLogin] = useState(false);
  const authConfig = getAuthConfig();

  // Determine if authentication is required
  const requireAuth = propRequireAuth ?? authConfig.requireAuth;
  const adminOnly = propAdminOnly ?? authConfig.adminOnly;

  useEffect(() => {
    if (!isLoading) {
      // If no auth provider is set, allow access
      if (authConfig.provider === 'none') {
        return;
      }

      // If authentication is required but user is not authenticated
      if (requireAuth && !isAuthenticated) {
        setShowLogin(true);
        return;
      }

      // If admin-only but user is not admin
      if (adminOnly && (!user?.isAdmin && user?.id !== 'guest')) {
        setShowLogin(true);
        return;
      }

      setShowLogin(false);
    }
  }, [isAuthenticated, isLoading, requireAuth, adminOnly, user, authConfig.provider]);

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingState message="Checking authentication..." />;
  }

  // Show login if required
  if (showLogin) {
    return (
      <UniversalLogin
        onLogin={() => setShowLogin(false)}
        title={adminOnly ? 'Admin Access Required' : 'Sign In Required'}
      />
    );
  }

  // Allow access
  return <>{children}</>;
}
