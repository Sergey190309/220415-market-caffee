// import { connect } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
// import store from '../redux/store';
import { axiosCommonLng } from '../api/apiClient';
import { getLngList } from '../api/calls/getViewsContents';
// import store from '../redux/store'
// import { finishLoading } from '../redux/actions/auth';

// const state = store.getState();
// console.log('i18n ->', state.logIn);
// (async () => {
//   console.log('i18n ->', await getLngList());
// })();

// (async () => {
//   console.log('init, directly ->', await getTechToken())
// })()

export const initI18next = (supportedLngs = ['en', 'ru']) => {
  // const supportedLngs = ['en', 'ru', 'cn'];
  const nameSpaces = ['navbar', 'login', 'signup', 'general'];
  i18next
    .use(initReactI18next)
    .use(HttpApi)
    .init({
      lng: 'en',
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
      axiosCommonLng(i18next.language);
      // finishLoading()
      // store.dispatch()
    });
}

initI18next()


// The function set list of supported languages from back-end.
// It should be called from tech in success reducer.
export const setSupportedLngs = async () => {
  const result =  await getLngList()
  // console.log('i18n, setSupportedLngs result from back-end ->', result);
  i18next.options.supportedLngs = [...result, 'cimode']
  // store.dispatch(finishLoading())
};

export default i18next;
