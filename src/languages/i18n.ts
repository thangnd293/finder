import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from '@/assets/locales/en';
import translationVI from '@/assets/locales/vi';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: translationEN,
      },
      vi: {
        translation: translationVI,
      },
    },
  });

export const lngs = {
  en: { nativeName: 'English' },
  vi: { nativeName: 'Việt Nam' },
};

export const t: any = i18n.t.bind(i18n) as any;
export default i18n;
