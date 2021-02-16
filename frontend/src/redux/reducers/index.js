import { combineReducers } from "redux";
import alertReducer from "./alert";
import device from "./deviceSize";

export default combineReducers({
  // alertReducer
  infoForUser: alertReducer,
  layout: device,
});
