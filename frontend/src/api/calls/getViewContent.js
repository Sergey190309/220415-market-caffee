import { techAxiosClient } from '../apiClient';

export const getViewContent = params => {
  try {
    // console.log('getViewContent, params ->', params);
    const resp = techAxiosClient.get('/content', { params: params });
    return resp;
  } catch (error) {
    console.error('logInCall error');
  }
};
