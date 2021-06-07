import { techAxiosClient } from '../apiClient';
// import { respErrorHandler } from '../../utils/respErrorHandler';
// import { v4 } from 'uuid';

export const getViewStructure = () => {
  try {
    const resp = techAxiosClient.get('/structure/list');
    // console.log('getViewStructure, resp ->', resp)
    return resp;
  } catch (error) {
    console.error('logInCall error\n', error);
    throw error;
  }
};
