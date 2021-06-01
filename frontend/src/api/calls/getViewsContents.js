import axiosClient from '../apiClient';
// import { respErrorHandler } from '../../utils/respErrorHandler';
// import { v4 } from 'uuid';

export const getViewStructure = viewName => {
  try {
    const resp = axiosClient.get('/structure', { params: { view_id: viewName } });
    // console.log('getViewStructure, resp ->', resp)
    return resp;
  } catch (error) {
    console.error('logInCall error\n', error)
    throw error;

  }
};
