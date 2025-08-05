import { useState } from 'react';
import { ViewType } from '@/types';

export function useNavigation() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const navigateToHome = () => {
    setCurrentView('home');
  };

  const navigateToOnboarding = () => {
    setCurrentView('onboarding');
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
    if (!isAdminMode) {
      setCurrentView('home');
    }
  };

  const enableAdminMode = () => {
    setIsAdminMode(true);
  };

  const disableAdminMode = () => {
    setIsAdminMode(false);
  };

  return {
    currentView,
    isAdminMode,
    navigateToHome,
    navigateToOnboarding,
    toggleAdminMode,
    enableAdminMode,
    disableAdminMode,
  };
}
