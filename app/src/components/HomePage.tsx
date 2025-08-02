'use client';

import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { themeConfig, getButtonStyles, getProgressBarStyle } from '@/lib/theme';

interface Topic {
  id: string;
  title: string;
  content: string;
  uploadedAt: string;
  completed: boolean;
}

interface HomePageProps {
  topics: Topic[];
  onStartOnboarding: () => void;
  onContinueOnboarding: () => void;
}

export default function HomePage({ topics, onStartOnboarding, onContinueOnboarding }: HomePageProps) {
  const { t } = useTranslation();
  
  const completedTopics = topics.filter(topic => topic.completed).length;
  const hasProgress = completedTopics > 0;
  const totalTopics = topics.length;

  if (topics.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-theme flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="mx-auto h-24 w-24 bg-primary-light rounded-full flex items-center justify-center mb-8">
            <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('home.welcome')} {t('app.title')}!</h1>
          <p className="text-gray-600 mb-8">
            {t('home.noTopics')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-theme">
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Logo */}
          <div className="mx-auto mb-8">
            <img 
              src={themeConfig.logo} 
              alt="Company Logo" 
              className="h-20 w-20 mx-auto mb-6"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {t('home.welcome')} <span className="text-primary">{themeConfig.appName}</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>

          {/* Progress Card */}
          {hasProgress && (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">{t('home.progress', { completed: completedTopics, total: totalTopics })}</span>
                <span className="text-sm text-primary font-medium">
                  {Math.round((completedTopics / totalTopics) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-500"
                  style={getProgressBarStyle((completedTopics / totalTopics) * 100)}
                ></div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {hasProgress ? (
              <button
                onClick={onContinueOnboarding}
                className="px-8 py-4 text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                style={getButtonStyles('primary')}
              >
                {t('home.continue')}
              </button>
            ) : (
              <button
                onClick={onStartOnboarding}
                className="px-8 py-4 text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                style={getButtonStyles('primary')}
              >
                {t('home.getStarted')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
