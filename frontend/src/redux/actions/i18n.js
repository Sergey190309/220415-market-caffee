import { setLocale } from 'react-redux-i18n';

import { supportedLocales, fallbackLocale } from '../../l10n/i18n.config';

export const setLocaleWithFallback = desiredLocale => {
  const finalLocale = Object.keys(supportedLocales).includes(desiredLocale)
    ? desiredLocale
    : fallbackLocale;
  return dispatch => dispatch(setLocale(finalLocale));
};
