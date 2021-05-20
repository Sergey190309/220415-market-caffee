import { v4 } from 'uuid';
import { START_INIT_LOADING, START_TECH_IN, START_LNGS, TECH_IN_SUCCESS, TECH_IN_FAIL } from './types';

// import axiosClient from '../../api/apiClient';
// import { actRespErrorMessage } from '../../utils/respErrorHandler';

export const startLoading = () => {
  // console.log('startLoading ->', sessionId)
  return {
    type: START_INIT_LOADING,
    // payload: sessionId,
  };
};

export const startTechIn = (sessionId = v4()) => {
  return {
    type: START_TECH_IN,
    payload: sessionId,
  };
};

export const techInSuccess = (techToken) => {
  return {
    type: TECH_IN_SUCCESS,
    payload: techToken
  }
}

export const techInFail = (error) => {
  return {
    type: TECH_IN_FAIL,
    payload: error
  }
}

export const startLngs = () => {
  return {
    type: START_LNGS,
  }
}
