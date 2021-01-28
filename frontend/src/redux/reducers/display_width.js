import { SET_WIDTH } from "../actions/types";

const initialState = 0;

const displayWidth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_WIDTH:
      return payload;
    default:
      return state;
  }
};

export default displayWidth;
