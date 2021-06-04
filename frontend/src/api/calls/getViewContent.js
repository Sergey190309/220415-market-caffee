import axiosClient from '../apiClient';
// import { respErrorHandler } from '../../utils/respErrorHandler';
// import { v4 } from 'uuid';

export const getViewContent = (params) => {
  try {
    console.log('getViewContent, params ->', params)
    const resp = axiosClient.get('/content');
    // console.log('getViewStructure, resp ->', resp)
    return resp;
  } catch (error) {
    console.error('logInCall error\n', error)
    throw error;

  }
};
