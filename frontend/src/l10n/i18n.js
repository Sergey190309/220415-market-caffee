import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { getLngList } from '../api/calls/getViewsContents';
import store from '../redux/store'
import {i18nInitiated} from '../redux/actions/tech'

export const initI18next = (supportedLngs = []) => {
  // -------------------------------------------------------------------------
  // This i18n instance is just dummy one.
  // This instance should take all values upon loading appropriate values from back - end.
  // -------------------------------------------------------------------------
  const nameSpaces = ['navbar', 'login', 'signup', 'general'];
  const lng = 'cimode'
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
      // console.log('initI18next.then, i18next.language ->', i18next.language)
      store.dispatch(i18nInitiated())
      // finishLoading()
      // store.dispatch()
    });
}

// initI18next()


// The function set list of supported languages from back-end.
// It should be called from tech in success reducer.
export const setSupportedLngs = async () => {
  const result =  await getLngList()
  // console.log('i18n, setSupportedLngs result from back-end ->', result);
  i18next.options.supportedLngs = [...result, 'cimode']
  // store.dispatch(finishLoading())
};

export default i18next;
