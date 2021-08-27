import { combineReducers } from '@reduxjs/toolkit'
// import { combineReducers } from 'redux';
// import alerts from '../reducers/alert';
import alerts from './alerts'
// import logIn from '../reducers/auth';
import auth from './auth'
import backendUpdate from './backendUpdate'
// import aux from './aux'
import device from './device'
// import device from '../reducers/device';
import lng from './lng'
// import lng from '../reducers/lng';
import structure from './structure'
import tech from './tech'

export const rootReducer = combineReducers({
  alerts,
  auth,
  backendUpdate,
  device,
  lng,
  structure,
  tech
})

export {
  clearAlerts,
  startAlert,
  removeAlert
} from './alerts'
export {
  setState as authSetState,
  signUpStart,
  signUpSuccess,
  signUpFail,
  signUpModalClosed,
  logInStart,
  logInSuccess,
  logInFail,
  logInModalClosed,
  logOut,
  confirmPasswordStart,
  confirmPasswordSuccess,
  confirmPasswordFail,
  confirmPasswordModalClosed,
  authSelector
} from './auth'
export {
  setTestState as backendUpdateSetState,
  backendUpdateStart,
  backendUpdateSuccess,
  backendUpdateFail,
  resetBackendUpdate,
  backendUpdateSelector
}
  from './backendUpdate'
export {
  setDeviceSize,
  openModal,
  closeModal,
  setMessage,
  setEditable,
  deviceSelector
} from './device'
export {
  lngSwitch,
  lngSelector
} from './lng'
export {
  setState as structureSetState,
  structureSelector,
  structureStart,
  structureSuccess,
  structureFail
} from './structure'
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
  i18nFail
} from './tech'
export default rootReducer
