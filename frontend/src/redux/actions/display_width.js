import { SET_WIDTH } from "./types";

export const setDisplayWidth = (width) => (dispatch) => {
  dispatch({
    type: SET_WIDTH,
    payload: width,
  });
};
