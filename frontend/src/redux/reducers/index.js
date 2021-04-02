import { combineReducers } from 'redux';
import alerts from './alert';
import device from './device';
import logIn from './auth';

export const rootReducer = combineReducers({
  alerts,
  device,
  logIn,
});

export default rootReducer
