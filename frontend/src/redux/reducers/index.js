import { combineReducers } from 'redux';
import alerts from './alert';
import device from './device';
import logIn from './auth';
import lng from './lng';
import tech from './tech';

export const rootReducer = combineReducers({
  alerts,
  device,
  logIn,
  lng,
  tech,
});

export default rootReducer;
