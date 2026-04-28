import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: keyof typeof translations, key: string, subKey?: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('jci-language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('jci-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (section: keyof typeof translations, key: string, subKey?: string): string => {
    try {
      const sectionData = translations[section] as Record<string, unknown>;
      if (!sectionData) return key;
      
      const keyData = sectionData[key] as Record<string, unknown>;
      if (!keyData) return key;
      
      if (subKey) {
        const subKeyData = keyData[subKey] as Record<Language, string>;
        return subKeyData?.[language] || subKey;
      }
      
      if (typeof keyData === 'object' && language in keyData) {
        return (keyData as Record<Language, string>)[language];
      }
      
      return key;
    } catch {
      return key;
    }
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
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
