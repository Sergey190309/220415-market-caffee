import { combineReducers } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import alerts from '../reducers/alert';
import alerts from './alerts'
// import auth from './auth'
import device from '../reducers/device';
import logIn from '../reducers/auth';
import lng from '../reducers/lng';
import structure from './structure';
// import structure from '../reducers/structure';
import tech from './tech'
// import tech from '../reducers/tech';

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
