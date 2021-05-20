import { v4 } from 'uuid';
import { START_LOADING } from './types';

// import axiosClient from '../../api/apiClient';
// import { actRespErrorMessage } from '../../utils/respErrorHandler';

export const startLoading = (sessionId = v4()) => {
  // console.log('finish loading ->')
  return {
    type: START_LOADING,
    payload: sessionId,
  };
};
