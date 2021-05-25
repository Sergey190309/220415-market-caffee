import { v4 } from 'uuid';
import {
  START_INIT_LOADING,
  INIT_LOADING_SUCCESS,
  START_TECH_IN,
  START_LNGS,
  TECH_IN_SUCCESS,
  TECH_IN_FAIL,
  LNGS_SUCCESS,
  LNGS_FAIL,
  START_I18N,
  I18N_SUCCESS,
  I18N_FAIL,
} from './types';

// import axiosClient from '../../api/apiClient';
// import { actRespErrorMessage } from '../../utils/respErrorHandler';

export const startLoading = () => {
  // console.log('startLoading ->', sessionId)
  return {
    type: START_INIT_LOADING,
    // payload: sessionId,
  };
};

export const loadingSuccess = () => {
  // console.log('startLoading ->', sessionId)
  return {
    type: INIT_LOADING_SUCCESS,
    // payload: sessionId,
  };
};

export const startTechIn = (sessionId = v4()) => {
  return {
    type: START_TECH_IN,
    payload: sessionId,
  };
};

export const techInSuccess = techToken => {
  return {
    type: TECH_IN_SUCCESS,
    payload: techToken,
  };
};

export const techInFail = error => {
  return {
    type: TECH_IN_FAIL,
    payload: error,
  };
};

export const startLngs = () => {
  return {
    type: START_LNGS,
  };
};

export const lngsSuccess = () => {
  return {
    type: LNGS_SUCCESS,
    // payload: lngs,
  };
};

export const lngsFail = error => {
  return {
    type: LNGS_FAIL,
    payload: error,
  };
};

export const startI18n = lngs => {
  return {
    type: START_I18N,
    payload: lngs,
  };
};

export const i18nSuccess = () => {
  return {
    type: I18N_SUCCESS,
    // payload: lngs,
  };
};

export const i18nFail = error => {
  return {
    type: I18N_FAIL,
    payload: error,
  };
};
