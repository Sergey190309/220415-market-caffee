import { combineReducers } from '@reduxjs/toolkit'
import alerts from './alerts'
import lng from './lng'
import structure from './structure'
import tech from './tech'

export const rootReducer = combineReducers({
  alerts,
  lng,
  structure,
  tech,
})

export {
  clearAlerts,
  startAlert,
  removeAlert
} from './alerts'

export { lngSwitch } from './lng'

export {
  // setState,
  structureStart, structureSuccess, structureFail,
  structureResetChanged
} from './structure'

export {
  startInitLoading, initLoadingSuccess,
  startTechIn, techInSuccess, techInFail,
  startLngs, lngsSuccess, lngsFail,
  startI18n, i18nInitiated, i18nSuccess, i18nFail
} from './tech'

export default rootReducer
