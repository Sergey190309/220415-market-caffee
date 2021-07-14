import { combineReducers } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import alerts from '../reducers/alert';
import alerts from './alerts'
import logIn from '../reducers/auth';
// import auth from './auth'
import device from './device';
// import device from '../reducers/device';
import lng from '../reducers/lng';
import structure from './structure';
import tech from './tech'

export const rootReducer = combineReducers({
  alerts,
  // auth,
  logIn,
  device,
  lng,
  structure,
  tech,
});

export default rootReducer;
