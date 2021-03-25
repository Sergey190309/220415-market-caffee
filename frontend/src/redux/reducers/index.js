import { combineReducers } from 'redux';
import alerts from './alert';
import device from './device';
import logIn from './auth';

export default combineReducers({
  alerts,
  device,
  logIn,
});
