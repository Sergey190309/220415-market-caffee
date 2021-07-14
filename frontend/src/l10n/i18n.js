import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
// import { getLngList } from '../api/calls/getViewsContents';
import store from '../redux/store';
import { i18nInitiated } from '../redux/slices/tech';
// import { i18nInitiated } from '../redux/actions/tech';
import { axiosCommonLng } from '../api/apiClient';

export const initI18next = (supportedLngs = []) => {
  // export const initI18next = (supportedLngs = ['en', 'ru']) => {
  // -------------------------------------------------------------------------
  // This i18n instance is just 'empty' one for correct component rendering.
  // This instance should take all values upon loading appropriate values
  // from back - end.
  // -------------------------------------------------------------------------
  const nameSpaces = ['navbar', 'login', 'signup', 'general'];
  console.log('initI18n, i18next ->', i18next);
  // const lng = 'cimode';
  const lng = 'en';
  i18next
  // i18next
    .use(initReactI18next)
    .use(HttpApi)
    .init({
      lng: lng,
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
      },
    })
    .then(() => {
      // console.log('initI18next.then, i18next.language ->', i18next.languages)
      // console.log('initI18next.then, i18next.supportedLngs->', i18next['options'].supportedLngs)
      store.dispatch(i18nInitiated());
    });
};

// initI18next()

export const setI18next = (lngs, supportedLngs = i18next.options.supportedLngs) => {
  // const _lngs = [...lngs, 'cn']
  const lngsToAdd = [];
  lngs.forEach(value => {
    if (!supportedLngs.includes(value)) {
      // if (!i18next.options.supportedLngs.includes(value)) {
      lngsToAdd.push(value);
    }
  });
  lngsToAdd.forEach(value => {
    supportedLngs.push(value);
  });

  axiosCommonLng(i18next.language); // Set axios header for backend calls.

  // console.log('setI18next, i18next.languages before ->', i18next.languages)
};

// ==================================================================================
// The function set list of supported languages from back-end.
// ==================================================================================
// export const setSupportedLngs = async () => {
//   const result = await getLngList();
//   i18next.options.supportedLngs = [...result, 'cimode'];
// };

export default i18next;
