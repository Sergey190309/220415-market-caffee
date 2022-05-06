import { combineReducers } from '@reduxjs/toolkit'
import tech from './tech'

export const rootReducer = combineReducers({
  tech
})

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
  i18nFail
} from './tech'


export default rootReducer
