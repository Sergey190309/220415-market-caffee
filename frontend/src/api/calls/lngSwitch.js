import axiosClient from '../apiClient';
import { respErrorHandler } from '../../utils/respErrorHandler';

export const lngSwitch = async lng => {
  try {
    const resp = await axiosClient.post('/home/localization', { locale: lng });
    // console.log(resp.data.payload)
    return resp.data.payload
  } catch (error) {
    respErrorHandler(error);
  }
};
