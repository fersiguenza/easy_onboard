'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { themeConfig, getButtonStyles } from '@/lib/theme';
import { getAuthConfig, getCognitoConfig, getAzureConfig, getGoogleConfig } from '@/config/auth';
import { useUniversalAuth } from '@/hooks/useUniversalAuth';

interface UniversalLoginProps {
  onLogin: () => void;
  onCancel?: () => void;
  title?: string;
}

export default function UniversalLogin({ onLogin, onCancel, title }: UniversalLoginProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithProvider, isLoading, error } = useUniversalAuth();
  
  const authConfig = getAuthConfig();
  const cognitoConfig = getCognitoConfig();
  const azureConfig = getAzureConfig();
  const googleConfig = getGoogleConfig();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login({ username, password });
      onLogin();
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleProviderLogin = async (provider: 'azure' | 'google') => {
    try {
      await loginWithProvider();
      onLogin();
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const renderCredentialsForm = () => (
    <form onSubmit={handleCredentialsSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          {authConfig.provider === 'cognito' ? 'Email' : t('admin.login.username')}
        </label>
        <input
          type={authConfig.provider === 'cognito' ? 'email' : 'text'}
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
          style={{ 
            '--tw-ring-color': `rgb(${themeConfig.colors.primary})`,
          } as React.CSSProperties}
          placeholder={authConfig.provider === 'cognito' ? 'user@company.com' : t('admin.login.username')}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          {t('admin.login.password')}
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
          style={{ 
            '--tw-ring-color': `rgb(${themeConfig.colors.primary})`,
          } as React.CSSProperties}
          placeholder="Password"
          required
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-md font-semibold transition-colors text-white ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
        }`}
        style={{
          backgroundColor: isLoading 
            ? '#9CA3AF' 
            : `rgb(${themeConfig.colors.primary})`,
          '--hover-bg': `rgb(${themeConfig.colors.primaryDark})`
        } as React.CSSProperties & { '--hover-bg': string }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = `rgb(${themeConfig.colors.primaryDark})`;
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = `rgb(${themeConfig.colors.primary})`;
          }
        }}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );

  const renderProviderButtons = () => (
    <div className="space-y-3">
      {azureConfig && (
        <button
          onClick={() => handleProviderLogin('azure')}
          disabled={isLoading}
          className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4z" fill="#00BCF2"/>
          </svg>
          <span>Continue with Microsoft</span>
        </button>
      )}

      {googleConfig && (
        <button
          onClick={() => handleProviderLogin('google')}
          disabled={isLoading}
          className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </button>
      )}

      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );

  const getProviderName = () => {
    switch (authConfig.provider) {
      case 'cognito': return 'AWS Cognito';
      case 'azure': return 'Microsoft Azure';
      case 'google': return 'Google';
      case 'simple': return 'Admin';
      default: return 'Authentication';
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-theme bg-opacity-95 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4 border border-gray-200">
        {/* Logo */}
        <div className="text-center mb-6">
          <img 
            src={themeConfig.logo} 
            alt="Company Logo" 
            className="h-16 w-16 mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-900">
            {title || `Sign in with ${getProviderName()}`}
          </h2>
          {authConfig.provider !== 'none' && (
            <div className="text-sm text-gray-600 mt-2">
              <p>Access your onboarding content</p>
            </div>
          )}
        </div>

        {/* Authentication form based on provider */}
        {(authConfig.provider === 'simple' || authConfig.provider === 'cognito') && renderCredentialsForm()}
        
        {(authConfig.provider === 'azure' || authConfig.provider === 'google') && renderProviderButtons()}

        {/* Configuration help */}
        {authConfig.provider !== 'none' && !cognitoConfig && !azureConfig && !googleConfig && authConfig.provider !== 'simple' && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
            <strong>Configuration needed:</strong> Please set the required environment variables for {getProviderName()} authentication.
          </div>
        )}

        {/* Cancel button */}
        {onCancel && (
          <button
            onClick={onCancel}
            className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
