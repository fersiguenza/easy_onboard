'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { themeConfig, getButtonStyles } from '@/lib/theme';

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

export default function AdminLogin({ onLogin, onCancel }: AdminLoginProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check if admin credentials are configured via environment variables
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    // If no admin credentials configured, show appropriate message
    if (!adminUsername || !adminPassword) {
      setError('Admin access not configured. Please set NEXT_PUBLIC_ADMIN_USERNAME and NEXT_PUBLIC_ADMIN_PASSWORD environment variables.');
      setLoading(false);
      return;
    }

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem('easy-onboard-admin', 'true');
      onLogin();
    } else {
      setError('Invalid username or password');
    }
    
    setLoading(false);
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
          <h2 className="text-2xl font-semibold text-gray-900">{t('admin.login.title')}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.login.username')}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ 
                '--tw-ring-color': `rgb(${themeConfig.colors.primary})`,
              } as React.CSSProperties}
              placeholder={t('admin.login.username')}
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
              placeholder={t('admin.login.password')}
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-2">
              {error}
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              {t('admin.login.cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 text-white rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity"
              style={getButtonStyles('primary')}
            >
              {loading ? '...' : t('admin.login.button')}
            </button>
          </div>
        </form>

        {/* Development credentials info - only show in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 text-xs text-gray-500 bg-gray-50 rounded-md p-3 border-l-4 border-primary-light">
            <div className="flex items-center mb-2">
              <svg className="h-4 w-4 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <strong className="text-gray-700">Development Mode</strong>
            </div>
            <p className="mb-1"><strong>Default credentials:</strong></p>
            <p>Username: admin</p>
            <p>Password: onboard123</p>
            <p className="mt-2 text-primary"><em>Configure via .env.local file</em></p>
          </div>
        )}
      </div>
    </div>
  );
}
