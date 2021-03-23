import { SET_LOCALES, CHANGE_LOCALE } from '../actions/types';

const initState = {
  locale: '',
  availableLocales: [],
};

const checkValidity = (locale, availableLocales) => {
  return (
    typeof locale === 'string' &&
    Array.isArray(availableLocales) &&
    availableLocales.length > 0 &&
    availableLocales.includes(locale)
  );
};

const locales = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOCALES:
      if (checkValidity(payload.locale, payload.availableLocales)) {
        return {
          ...state,
          locale: payload.locale,
          availableLocales: payload.availableLocales,
        };
      } else {
        return state;
      }
    case CHANGE_LOCALE:
      if (checkValidity(payload, state.availableLocales)) {
        return { ...state, locale: payload };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default locales;
