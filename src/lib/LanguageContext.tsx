import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('mg_io_lang');
    if (saved && ['EN', 'ES', 'DE', 'FR', 'IT', 'PT'].includes(saved)) {
      return saved as Language;
    }
    // Browser language fallback check
    const navLang = navigator.language.slice(0, 2).toLowerCase();
    if (navLang === 'es') return 'ES';
    if (navLang === 'de') return 'DE';
    if (navLang === 'fr') return 'FR';
    if (navLang === 'it') return 'IT';
    if (navLang === 'pt') return 'PT';
    return 'EN';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mg_io_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['EN']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
