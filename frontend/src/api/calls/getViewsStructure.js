import { techTextAxiosClient } from '../apiClient'
// import { respErrorHandler } from '../../utils/respErrorHandler';
// import { v4 } from 'uuid';

export const getViewStructure = () => {
  const resp = techTextAxiosClient.get('/structure/list')
  // console.log('getViewStructure, resp ->', resp)
  return resp
}
