import { combineReducers } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import alerts from '../reducers/alert';
import alerts from './alerts';
// import logIn from '../reducers/auth';
import auth from './auth';
import device from './device';
// import device from '../reducers/device';
import lng from './lng';
// import lng from '../reducers/lng';
import structure from './structure';
import tech from './tech';

export const rootReducer = combineReducers({
  alerts,
  auth,
  // logIn,
  device,
  lng,
  structure,
  tech,
});

export { startAlert, removeAlert } from './alerts';
export {
  signUpStart,
  signUpSuccess,
  signUpFail,
  logInStart,
  logInSuccess,
  logInFail,
  logOut,
  signUpModalClosed,
  logInModalClosed,
  authSelector,
} from './auth';
export { deviceSelector, setDeviceSize, openModal, closeModal } from './device';
export { lngSwitch, lngSelector } from './lng';
export {
  setState,
  structureSelector,
  structureStart,
  structureSuccess,
  structureFail,
} from './structure';
export {
  techSelector,
  startInitLoading,
  initLoadingSuccess,
  startTechIn,
  techInSuccess,
  techInFail,
  startLngs,
  lngsSuccess,
  lngsFail,
  startI18n,
  i18nInitiated,
  i18nSuccess,
  i18nFail,
} from './tech';
export default rootReducer;
