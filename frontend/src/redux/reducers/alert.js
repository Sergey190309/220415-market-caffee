import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

const alerts = (state = initialState, action) => {
  const { type, payload } = action;
  // console.log('alert reducer! -', action)
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
    // console.log('alert reducer, REMOVE_ALERT -', action)
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default alerts;
