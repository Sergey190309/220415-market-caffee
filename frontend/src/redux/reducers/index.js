import { combineReducers } from 'redux';
import alertReducer from './alert';
import device from './device';
import logIn from './auth';

export default combineReducers({
  alertReducer,
  device,
  logIn,
});
