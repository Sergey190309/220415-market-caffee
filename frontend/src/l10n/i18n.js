// import { connect } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { axiosCommonPostLng } from '../api/apiClient'
// import { setLocales } from '../redux/actions';

const supportedLngs = ['en', 'ru', 'cn'];
const nameSpaces = ['navbar', 'login', 'signup', 'general']

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    lng: 'ru',
    supportedLngs: supportedLngs,
    ns: nameSpaces,
    defaultNS: 'general',
    saveMissing: true,
    fallbackNS: 'general',
    // to support en-US and en-UK
    // nonExplicitSupportedLngs: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    // debug: process.env.NODE_ENV === 'development',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
      addPath: './locales/l10n/add/{{lng}}/{{ns}}.json',
    }
  })
  .then(() => {
    axiosCommonPostLng(i18next.language)
  });

export default i18next;
