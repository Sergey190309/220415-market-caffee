import { v4 } from 'uuid';
import {
  TECH_IN_SUCCESS,
  TECH_IN_FAIL,
  START_LOADING,
  FINISH_LOADING,
} from './types';

import axiosClient from '../../api/apiClient';
import { actRespErrorHandler } from '../../utils/respErrorHandler';

// export const techInAction = async (sessionId = v4()) => {
export const techInAction =
  (sessionId = v4()) =>
  async dispatch => {
    try {
      const resp = await axiosClient.post('/home/tech/auth', { tech_id: sessionId });
      // console.log('actions auth, techInAction,q resp ->', resp.data.payload)
      dispatch({
        type: TECH_IN_SUCCESS,
        payload: resp.data.payload ? resp.data.payload : null,
      });
    } catch (error) {
      actRespErrorHandler(error, dispatch, TECH_IN_FAIL);
    }
  };

export const startLoading = () => {
    // console.log('finish loading ->')
    return {
      type: START_LOADING,
    };
  };

export const finishLoading = () => {
  // console.log('finish loading ->')
  return {
    type: FINISH_LOADING,
  };
};
