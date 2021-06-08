// ==================================================================================
// The reducer has not been needed.
import { CONTENT_FAIL, CONTENT_START, CONTENT_SUCCESS } from './types';

export const contentStart = () => {
  return {
    type: CONTENT_START,
  };
};

export const contentSuccess = contentInfo => {
  return {
    type: CONTENT_SUCCESS,
    payload: contentInfo,
  };
};

export const contentFail = () => {
  return {
    type: CONTENT_FAIL,
  };
};
