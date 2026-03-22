import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import he from './locales/he.json';
import en from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      he: he,
      en: en
    },
    lng: 'he', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

document.documentElement.dir = 'rtl';
document.documentElement.lang = 'he';

export default i18n;
