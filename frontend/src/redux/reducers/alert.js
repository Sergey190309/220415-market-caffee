import { START_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

const alerts = (state = initialState, action) => {
  const { type, payload } = action;
  // console.log('reducers, alerts -', action)
  switch (type) {
    case START_ALERT:
      // console.log('alert reducer, payload ->', payload)
    //   return state
      return [...state, payload];
    // case SET_ALERT:
    //   return [...state, payload];
    case REMOVE_ALERT:
      // console.log('alert reducer, REMOVE_ALERT -', action)
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
};

export default alerts;
