import { combineReducers } from '@reduxjs/toolkit'
import tech from './tech'

export const rootReducer = combineReducers({
  tech
})

export {
  startInitLoading
} from './tech'


export default rootReducer
