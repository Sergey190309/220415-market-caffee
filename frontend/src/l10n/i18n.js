import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
// import { getLngList } from '../api/calls/getViewsContents';
import store from '../redux/store'
import { i18nInitiated } from '../redux/slices/tech'
// import { i18nInitiated } from '../redux/actions/tech';
import { axiosCommonLng } from '../api/apiClient'

export const initI18next = (supportedLngs = ['en', 'ru']) => {
  /**
   * This i18n instance is just 'empty' one for correct component rendering.
   * This instance should take all values upon loading appropriate values
   * from back - end.
   */

  const nameSpaces = ['navbar', 'login', 'signup', 'general', 'context']
  // console.log('initI18n,  supportedLngs->', supportedLngs);
  const lng = supportedLngs[0]
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
        escapeValue: false
      },
      debug: false,
      // debug: process.env.NODE_ENV === 'development',
      backend: {
        loadPath: './locales/{{lng}}/{{ns}}.json',
        addPath: './locales/l10n/add/{{lng}}/{{ns}}.json'
      }
    })
    .then(() => {
      // console.log('initI18next.then, i18next.language ->', i18next.options.supportedLngs)
      store.dispatch(i18nInitiated())
    })
}

export const setI18next = lngs => {
  const lngsToAdd = []
  // console.log('setI18next, i18next.languages ->', i18next.lngs);
  lngs.forEach(value => {
    if (!i18next.languages.includes(value)) {
      // if (!i18next.options.supportedLngs.includes(value)) {
      lngsToAdd.push(value)
    }
  })
  lngsToAdd.forEach(value => {
    i18next.languages.push(value)
  })
  // console.log('i18n, i18next.language ->', i18next.language)
  axiosCommonLng(store.getState().lng.lng) // Set axios header for backend calls.
}

export default i18next
