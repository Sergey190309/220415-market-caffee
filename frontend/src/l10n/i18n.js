import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
// import { getLngList } from '../api/calls/getViewsContents';
import store from '../redux/store'
import { i18nInitiated } from '../redux/slices/tech'
// import { i18nInitiated } from '../redux/actions/tech';
import { setAxiosCommonLng } from '../api/apiClient'

export const initI18next = (supportedLngs = ['en', 'ru']) => {
  /**
   * This i18n instance is just 'empty' one for correct component rendering.
   * This instance should take all values upon loading appropriate values
   * from back - end.
   */
  const nameSpaces = ['navbar', 'auth',
    // 'general', 'context'
  ]
  // const nameSpaces = ['navbar', 'auth', 'general', 'context', 'errors']
  // console.log('initI18next, supportedLngs ->', supportedLngs);
  const lng = supportedLngs[0]
  i18next
    .use(initReactI18next)
    .use(HttpApi)
    .init({
      // lng: 'ru',
      lng: lng,
      supportedLngs,
      ns: nameSpaces,
      defaultNS: 'general',
      saveMissing: true,
      fallbackNS: 'general',
      // to support en-US and en-UK
      // nonExplicitSupportedLngs: true,
      fallbackLng: 'ru',
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
      console.log('initI18next.then, i18next.language ->', i18next.options.supportedLngs)
      store.dispatch(i18nInitiated())
    })
}

export const setI18next = lngs => {
  const lngsToAdd = []
  lngs.forEach(value => {
    if (!i18next.languages.includes(value)) {
      // if (!i18next.options.supportedLngs.includes(value)) {
        lngsToAdd.push(value)
      }
    })
  // console.log('setI18next, i18next.languages ->', i18next.languages);
  lngsToAdd.forEach(value => {
    i18next.languages.push(value)
  })
  console.log('i18n, i18next.languages ->', i18next.languages, '\n  store.getState().lng.lng ->', store.getState().lng.lng)
  setAxiosCommonLng(store.getState().lng.lng) // Set axios header for backend calls.
}
