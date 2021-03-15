import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import alertReducer from './alert';
import device from './device';
import availableLocales from './availableLocales';

export default combineReducers({
  availableLocales,
  i18n: i18nReducer,
  alertReducer,
  device,
});
