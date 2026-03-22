import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'he' ? 'en' : 'he';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="bg-slate-800/80 backdrop-blur-md text-slate-100 hover:bg-slate-700 px-3 py-1.5 rounded-full shadow-sm border border-slate-600/50 uppercase tracking-widest text-xs font-semibold transition-colors focus:outline-none"
      style={{ direction: 'ltr' }}
      aria-label="Toggle Language"
    >
      {i18n.language === 'he' ? 'EN' : 'HE'}
    </button>
  );
};

export default LanguageToggle;
