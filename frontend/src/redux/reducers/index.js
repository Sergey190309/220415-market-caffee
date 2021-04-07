import { combineReducers } from 'redux';
import alerts from './alert';
import device from './device';
import logIn from './auth';
import lng from './lng'

export const rootReducer = combineReducers({
  alerts,
  device,
  logIn,
  lng
});

export default rootReducer
