import { combineReducers } from 'redux';
// import alerts from '../reducers/alert';
import alerts from './alert'
import device from '../reducers/device';
import logIn from '../reducers/auth';
import lng from '../reducers/lng';
import tech from '../reducers/tech';
import structure from '../reducers/structure';

export const rootReducer = combineReducers({
  alerts: alerts,
  device: device,
  logIn: logIn,
  lng: lng,
  tech: tech,
  structure: structure,
});

export default rootReducer;
