import { combineReducers } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import alerts from '../reducers/alert';
import alerts from './alerts';
import logIn from '../reducers/auth';
// import auth from './auth'
import device from './device';
// import device from '../reducers/device';
import lng from '../reducers/lng';
import structure from './structure';
import tech from './tech';

export const rootReducer = combineReducers({
  alerts,
  // auth,
  logIn,
  device,
  lng,
  structure,
  tech,
});

export { startAlert, removeAlert } from './alerts';
export { setDeviceSize, openModal, closeModal } from './device';
export { structureStart, structureSuccess, structureFail } from './structure';
export {
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
