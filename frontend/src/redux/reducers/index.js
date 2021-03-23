import { combineReducers } from 'redux';
import alertReducer from './alert';
import device from './device';
// import locales from './locales';

export default combineReducers({
  alertReducer,
  device,
  // locales,
});
