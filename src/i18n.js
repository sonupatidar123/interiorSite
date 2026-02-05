import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "about_title": "About Lucky Interior",
      "about_desc": "Crafting beautiful spaces across Mandsaur & Indore.",
      "meet_lokesh": "Meet Lokesh – Your Interior Partner",
      "projects": "Projects Completed",
      "years": "Years Experience"
    }
  },
  hi: {
    translation: {
      "about_title": "लकी इंटीरियर के बारे में",
      "about_desc": "मंदसौर और इंदौर में सुंदर और कार्यात्मक स्थान बनाना।",
      "meet_lokesh": "लोकेश से मिलें - आपके इंटीरियर पार्टनर",
      "projects": "पूरे किए गए प्रोजेक्ट",
      "years": "वर्षों का अनुभव"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: { escapeValue: false }
  });

export default i18n;