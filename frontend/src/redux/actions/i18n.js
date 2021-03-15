import { setLocale } from 'react-redux-i18n';

import { supportedLocales, fallbackLocale } from '../../l10n/i18n.config';
import { SET_AVAILABLE_LOCALES } from './types';

export const setLocaleWithFallback = desiredLocale => {
  const finalLocale = Object.keys(supportedLocales).includes(desiredLocale)
    ? desiredLocale
    : fallbackLocale;
  return dispatch => dispatch(setLocale(finalLocale));
};

export const setAvailableLocales = () => dispatch => {
  // console.log('action')

  return dispatch({
    type: SET_AVAILABLE_LOCALES,
    payload: Object.keys(supportedLocales),
  });
};
