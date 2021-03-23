import { SET_LOCALES, CHANGE_LOCALE } from './types';

// locales are {locale: '', availableLocales: []}
export const setLocales = locales => dispatch => {
  console.log('action')
  return dispatch({
    type: SET_LOCALES,
    payload: locales,
  });
};

export const changeLocale = locale => dispatch => {
  return dispatch({
    type: CHANGE_LOCALE,
    payload: locale,
  });
};
