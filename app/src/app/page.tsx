'use client';

import { useState, useEffect, useRef } from 'react';
import HomePage from '@/components/HomePage';
import OnboardingFlow from '@/components/OnboardingFlow';
import AdminPanel from '@/components/AdminPanel';
import Congratulations from '@/components/Congratulations';
import ThemeProvider from '@/components/ThemeProvider';
import RouteGuard from '@/components/RouteGuard';
import { LoadingState } from '@/components/ui';
import { themeConfig } from '@/lib/theme';
import { useTopics, useLanguage, useNavigation } from '@/hooks';
import { useUniversalAuth } from '@/hooks/useUniversalAuth';
import { getAuthConfig } from '@/config/auth';
import '@/lib/i18n';

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'onboarding' | 'congratulations'>('home');
  const previousUserRef = useRef<any>(null);
  
  // Custom hooks
  const { topics, loading, createTopic, deleteTopic, updateTopicCompletion, loadTopics, clearTopics } = useTopics();
  const { t } = useLanguage();
  const { isAdminMode, enableAdminMode, disableAdminMode } = useNavigation();
  const { user, logout } = useUniversalAuth();
  const authConfig = getAuthConfig();

    // Simple, direct authentication handling
  useEffect(() => {
    const previousUser = previousUserRef.current;
    
    if (user) {
      // Load topics immediately (only once per user)
      if (topics.length === 0) {
        loadTopics();
      }
      
      // Handle admin vs regular user
      if (user.isAdmin) {
        enableAdminMode();
      }
    } else if (previousUser && !user) {
      // Only clear when transitioning from logged in to logged out
      clearTopics();
      disableAdminMode();
    }
    
    // Update the ref
    previousUserRef.current = user;
  }, [user, topics.length, loadTopics, enableAdminMode]);

  const handleAdminToggle = () => {
    if (!isAdminMode && user?.isAdmin) {
      enableAdminMode();
    } else if (isAdminMode) {
      disableAdminMode();
    }
  };

  const handleLogout = async () => {
    // Clear admin mode first
    disableAdminMode();
    setCurrentView('home');
    
    // Clear topics and local storage
    clearTopics();
    
    // Then logout from auth provider
    await logout();
    
    // Force refresh the page to ensure everything is cleared
    window.location.reload();
  };

  const handleTopicUpload = (title: string, content: string) => {
    try {
      createTopic(title, content);
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

  const handleTopicComplete = (topicId: string) => {
    try {
      updateTopicCompletion(topicId, true);
      
      // Check if all topics are completed after this update
      const completedCount = topics.filter(topic => topic.completed || topic.id === topicId).length;
      if (completedCount === topics.length && topics.length > 0) {
        // All topics completed, show congratulations
        setTimeout(() => setCurrentView('congratulations'), 500);
      }
    } catch (error) {
      console.error('Error updating topic completion:', error);
    }
  };

  const handleOnboardingComplete = () => {
    setCurrentView('congratulations');
  };

  const handleStartOnboarding = () => {
    setCurrentView('onboarding');
  };

  const handleContinueOnboarding = () => {
    setCurrentView('onboarding');
  };

  const handleExitAdmin = () => {
    disableAdminMode();
    setCurrentView('home');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white">
        
        {/* Navigation Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center min-w-0 flex-1">
                <button
                  onClick={handleBackToHome}
                  className="flex items-center hover:opacity-75 transition-opacity min-w-0"
                >
                  <img 
                    src={themeConfig.logo} 
                    alt="Company Logo" 
                    className="h-8 w-8 mr-2 sm:mr-3 flex-shrink-0"
                  />
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                    <span className="text-primary">{themeConfig.appName}</span>
                  </h1>
                </button>
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-4 flex-shrink-0">
                {/* Back to Home Button (only in onboarding view) */}
                {currentView === 'onboarding' && !isAdminMode && (
                  <button
                    onClick={handleBackToHome}
                    className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors hidden sm:block"
                  >
                    ← {t('onboarding.backToHome')}
                  </button>
                )}

                {/* Admin Toggle - Only show if user is admin */}
                {user?.isAdmin && (
                  <button
                    onClick={handleAdminToggle}
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                      isAdminMode 
                        ? 'bg-primary-light text-primary-dark' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span className="sm:hidden">{isAdminMode ? '👤' : '⚙️'}</span>
                    <span className="hidden sm:inline">{isAdminMode ? `👤 ${t('header.userView')}` : `⚙️ ${t('header.admin')}`}</span>
                  </button>
                )}

                {/* Logout Button */}
                {user && authConfig.provider !== 'none' && (
                  <button
                    onClick={handleLogout}
                    className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <span className="sm:hidden">↗</span>
                    <span className="hidden sm:inline">{t('header.logout')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {loading ? (
            <LoadingState message={t('common.loading')} />
          ) : isAdminMode ? (
            // Admin Panel - Always requires admin authentication
            <RouteGuard adminOnly={true}>
              <AdminPanel 
                topics={topics}
                onTopicUpload={handleTopicUpload}
                onTopicDelete={handleTopicDelete}
                onTopicComplete={handleTopicComplete}
              />
            </RouteGuard>
          ) : currentView === 'congratulations' ? (
            // Congratulations Page - Show after onboarding completion
            <RouteGuard requireAuth={authConfig.requireAuth}>
              <Congratulations 
                onBackToHome={handleBackToHome}
                completedTopicsCount={topics.filter(topic => topic.completed).length}
              />
            </RouteGuard>
          ) : currentView === 'onboarding' ? (
            // Onboarding Flow - Protected based on PROTECT_WELCOME setting
            <RouteGuard requireAuth={authConfig.protectWelcome}>
              <OnboardingFlow 
                topics={topics}
                onTopicComplete={handleTopicComplete}
                onComplete={handleOnboardingComplete}
              />
            </RouteGuard>
          ) : (
            // Home Page - Protected based on REQUIRE_AUTH setting
            <RouteGuard requireAuth={authConfig.requireAuth}>
              <HomePage
                topics={topics}
                onStartOnboarding={handleStartOnboarding}
                onContinueOnboarding={handleContinueOnboarding}
              />
            </RouteGuard>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}
