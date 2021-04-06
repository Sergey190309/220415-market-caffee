import axiosClient from '../apiClient';
import { respErrorHandler } from '../../utils/respErrorHandler';

export const getContents = async keys => {
  try {
    const resp = await axiosClient.get('/contents', { params: keys });
    const result={title: resp.data.payload.title, content: resp.data.payload.content}
    console.log('getContents, result ->', result);
    return result;
  } catch (error) {
    // console.log('error:', error);
    respErrorHandler(error)
  }
  // const json = {
  //   "identity": identity,
  //   "view_id": view_id,
  // }
  // return 'results'
};
