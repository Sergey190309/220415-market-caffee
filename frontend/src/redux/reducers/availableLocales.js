import { SET_AVAILABLE_LOCALES } from '../actions/types';

const initialState = [];

const availableLocales = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_AVAILABLE_LOCALES:
      return [...payload]
    default:
      return state
  }
};

export default availableLocales;
