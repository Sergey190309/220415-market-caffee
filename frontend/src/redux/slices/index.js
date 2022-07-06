import { combineReducers } from '@reduxjs/toolkit'
import alerts from './alerts'
import auth from './auth'
import device from './device'
import lng from './lng'
import structure from './structure'
import tech from './tech'

export const rootReducer = combineReducers({
  alerts,
  auth,
  device,
  lng,
  structure,
  tech
})

export {
  clearAlerts, startAlert, removeAlert
} from './alerts'

export {
  authSelector,
  signUpStart, signUpSuccess,
  signUpFail, signUpModalClosed,
  logInStart, logInSuccess,
  logInFail, logInModalClosed,
  logOut,
  confirmPasswordStart, confirmPasswordSuccess,
  confirmPasswordFail,
  confirmPasswordModalClosed
} from './auth'

export {
  deviceSelector,
  setDeviceSize,
  // openModal, closeModal,
  setMessage, setEditable
}  from './device'

export { lngSelector, lngSwitch } from './lng'

export {
  // setState,
  structureStart, structureSuccess, structureFail,
  structureResetChanged
} from './structure'

export {
  techSelector,
  startInitLoading, initLoadingSuccess,
  startTechIn, techInSuccess, techInFail,
  startLngs, lngsSuccess, lngsFail,
  startI18n, i18nInitiated, i18nSuccess, i18nFail
} from './tech'

export default rootReducer
