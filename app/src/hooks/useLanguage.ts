import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UseLanguageReturn } from '@/types';
import { config, Language } from '@/config';

export function useLanguage(): UseLanguageReturn {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    if (config.languages.includes(lang as Language)) {
      i18n.changeLanguage(lang);
      localStorage.setItem(config.storage.language, lang);
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem(config.storage.language);
    if (savedLanguage && config.languages.includes(savedLanguage as Language)) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    t,
  };
}
