import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { getLngList } from '../api/calls/getViewsContents';
import store from '../redux/store';
import { i18nInitiated } from '../redux/actions/tech';

export const initI18next = (supportedLngs = []) => {
  // export const initI18next = (supportedLngs = ['en', 'ru']) => {
  // -------------------------------------------------------------------------
  // This i18n instance is just dummy one.
  // This instance should take all values upon loading appropriate values
  // from back - end.
  // -------------------------------------------------------------------------
  const nameSpaces = ['navbar', 'login', 'signup', 'general'];
  const lng = 'cimode';
  // const lng = 'en'
  i18next
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
      // debug: false,
      debug: process.env.NODE_ENV === 'development',
      backend: {
        loadPath: './locales/{{lng}}/{{ns}}.json',
        addPath: './locales/l10n/add/{{lng}}/{{ns}}.json',
      },
    })
    .then(() => {
      // console.log('initI18next.then, i18next.language ->', i18next.languages)
      // console.log('initI18next.then, resource ->', )
      store.dispatch(i18nInitiated());
    });
};

// initI18next()

export const setI18next = async lngs => {
  console.log('setI18next, lngs ->', lngs);
  i18next.options.supportedLngs = lngs;
  console.log('setI18next, supportedLngs ->', i18next.languages);
  await i18next.changeLanguage(lngs[0])
  // console.log('setI18next, i18next.languages before ->', i18next.languages)
  // console.log('setI18next, i18next.namespaces ->', i18next.options.ns)
  // await i18next.addResourceBundle(lngs[0], i18next.options.ns[0], i18next.options.backend)
  // await i18next.reloadResources(lngs)
  // console.log('setI18next, i18next.languages after ->', i18next.language)
};

// ==================================================================================
// The function set list of supported languages from back-end.
// ==================================================================================
export const setSupportedLngs = async () => {
  const result = await getLngList();
  // console.log('i18n, setSupportedLngs result from back-end ->', result);
  i18next.options.supportedLngs = [...result, 'cimode'];
  // store.dispatch(finishLoading())
};

export default i18next;
