import axios from 'axios';
// import i18next from 'i18next';

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const axiosCommonPostLng = lng => {
  axiosClient.defaults.headers.post['Accept-Language'] = lng;
};

export const axiosCommonPostToken = token => {
  axiosClient.defaults.headers.post['Authorization'] = `Bearer ${token}`;
};

export default axiosClient;
