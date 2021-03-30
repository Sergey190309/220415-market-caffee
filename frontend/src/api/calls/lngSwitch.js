import axiosClient from '../apiClient';
import { respErrorHandler } from '../../utils/respErrorHandler';

export const lngSwitch = async lng => {
  try {
    await axiosClient.post('/home/localization', { locale: lng });
  } catch (error) {
    respErrorHandler(error);
  }
};
