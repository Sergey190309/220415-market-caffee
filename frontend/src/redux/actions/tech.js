// import { v4 } from 'uuid';
import { START_INIT_LOADING } from './types';

// import axiosClient from '../../api/apiClient';
// import { actRespErrorMessage } from '../../utils/respErrorHandler';

export const startLoading = () => {
  // console.log('startLoading ->', sessionId)
  return {
    type: START_INIT_LOADING,
    // payload: sessionId,
  };
};
