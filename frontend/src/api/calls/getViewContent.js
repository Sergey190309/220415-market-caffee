import { techAxiosClient } from '../apiClient';
// import { respErrorHandler } from '../../utils/respErrorHandler';
// import { v4 } from 'uuid';

export const getViewContent = params => {
  try {
    // console.log('getViewContent, params ->', params)
    const resp = techAxiosClient.get('/content', { params: params });
    // console.log('getViewContent, resp ->', resp);
    return resp;
  } catch (error) {
    console.error('logInCall error\n', error.data);
    throw error;
  }
};
