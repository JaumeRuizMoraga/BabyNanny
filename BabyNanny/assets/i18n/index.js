import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './es/es.json';
import en from './en/en.json';
const resources = {
 es: { translation: es },
 en: { translation: en },
};
i18n
 .use(initReactI18next)
 .init({
 resources,
 lng: 'en',
 fallbackLng: 'en',
 interpolation: {
 escapeValue: false,
 },
 });
export default i18n;