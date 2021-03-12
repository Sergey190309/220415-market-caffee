import { combineReducers } from "redux";
import {i18nReducer} from 'react-redux-i18n'
import alertReducer from "./alert";
import device from "./device";

export default combineReducers({
  i18n: i18nReducer,
  alertReducer,
  device,
});
