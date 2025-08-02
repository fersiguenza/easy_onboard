'use client';

import { useState } from 'react';
import OnboardingFlow from '@/components/OnboardingFlow';
import AdminPanel from '@/components/AdminPanel';
import AdminLogin from '@/components/AdminLogin';
import HomePage from '@/components/HomePage';
import ThemeProvider from '@/components/ThemeProvider';
import { LoadingState } from '@/components/ui';
import { themeConfig } from '@/lib/theme';
import { useTopics, useAuth, useLanguage, useNavigation } from '@/hooks';
import '@/lib/i18n';

export default function Home() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  // Custom hooks
  const { topics, loading, createTopic, deleteTopic, updateTopicCompletion } = useTopics();
  const { isAuthenticated: isAdminAuthenticated, login: adminLogin, logout: adminLogout } = useAuth();
  const { t } = useLanguage();
  const { 
    currentView, 
    isAdminMode, 
    navigateToHome, 
    navigateToOnboarding, 
    toggleAdminMode, 
    enableAdminMode, 
    disableAdminMode 
  } = useNavigation();

  const handleAdminToggle = () => {
    if (!isAdminMode && !isAdminAuthenticated) {
      setShowAdminLogin(true);
    } else {
      toggleAdminMode();
    }
  };

  const handleAdminLogin = () => {
    adminLogin();
    enableAdminMode();
    setShowAdminLogin(false);
  };

  const handleAdminLogout = () => {
    adminLogout();
    disableAdminMode();
  };

  const handleStartOnboarding = () => {
    navigateToOnboarding();
  };

  const handleContinueOnboarding = () => {
    navigateToOnboarding();
  };

  const handleBackToHome = () => {
    navigateToHome();
  };

  const handleTopicComplete = async (topicId: string) => {
    try {
      await updateTopicCompletion(topicId, !topics.find(t => t.id === topicId)?.completed);
    } catch (error) {
      console.error('Error updating topic completion:', error);
    }
  };

  const handleTopicUpload = async (title: string, content: string) => {
    try {
      await createTopic(title, content);
    } catch (error) {
      console.error('Error uploading topic:', error);
    }
  };

  const handleTopicDelete = async (topicId: string) => {
    try {
      await deleteTopic(topicId);
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white">
        {/* Header - Only show on admin mode or onboarding view */}
        {(isAdminMode || currentView === 'onboarding') && (
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <button
                    onClick={handleBackToHome}
                    className="flex items-center hover:opacity-75 transition-opacity"
                  >
                    <img 
                      src={themeConfig.logo} 
                      alt="Company Logo" 
                      className="h-8 w-8 mr-3"
                    />
                    <h1 className="text-2xl font-bold text-gray-900">
                      <span className="text-primary">{themeConfig.appName}</span>
                    </h1>
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Back to Home Button (only in onboarding view) */}
                  {currentView === 'onboarding' && !isAdminMode && (
                    <button
                      onClick={handleBackToHome}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      ← {t('onboarding.backToHome')}
                    </button>
                  )}

                  {/* Admin Toggle */}
                  <button
                    onClick={handleAdminToggle}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      isAdminMode 
                        ? 'bg-primary-light text-primary-dark' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isAdminMode ? `👤 ${t('header.userView')}` : `⚙️ ${t('header.admin')}`}
                  </button>

                  {/* Admin Logout */}
                  {isAdminAuthenticated && (
                    <button
                      onClick={handleAdminLogout}
                      className="px-3 py-1 rounded-full text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      {t('header.logout')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main>
          {loading ? (
            <LoadingState message={t('common.loading')} />
          ) : isAdminMode ? (
            <AdminPanel 
              topics={topics}
              onTopicUpload={handleTopicUpload}
              onTopicDelete={handleTopicDelete}
              onTopicComplete={handleTopicComplete}
            />
          ) : currentView === 'home' ? (
            <HomePage
              topics={topics}
              onStartOnboarding={handleStartOnboarding}
              onContinueOnboarding={handleContinueOnboarding}
            />
          ) : (
            <OnboardingFlow 
              topics={topics}
              onTopicComplete={handleTopicComplete}
            />
          )}
        </main>

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <AdminLogin
            onLogin={handleAdminLogin}
            onCancel={() => setShowAdminLogin(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
