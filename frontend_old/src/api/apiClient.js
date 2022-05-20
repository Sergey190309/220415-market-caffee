import axios from 'axios'
// import i18next from 'i18next';

// const baseURL = 'http://127.0.0.1:3000'
let baseURL = 'localhost:9090'
// let baseURL = 'localhost:5000'
if (process.env.REACT_APP_BASE_URL !== undefined) {
  baseURL = process.env.REACT_APP_BASE_URL
}
console.log('env in apiClient -', process.env.REACT_APP_BASE_URL)
console.log('BASE_URL in apiClient -', baseURL)
const headers = {
  // Accept: 'application/json',
  'Content-Type': 'application/json',
  common: {
    // 'Accept-Language': 'ru'
    'Accept-Language': 'en'
  }
}

export const techTextAxiosClient = axios.create({
  /**
   * configurated on initial update using tech token
   * used for get requests for textual information.
   */
  baseURL: baseURL,
  headers: headers
})

export const refreshTokenAxiosClient = axios.create({
  /**
   * Used to configurate instance to confirm password with
   * refresh token
   */
  baseURL: baseURL,
  headers: headers
})

export const techPixAxiosClient = axios.create({
  // export const pixAxiosClient = axios.create({
  /**
   * configurated on initial update using tech token
   * used for get requests for pictures.
   */
  baseURL: baseURL,
  headers: {
    ...headers,
    'Content-Type': 'multipart/form-data'

    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    // 'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X- Request-With'
  },
  responseType: 'arraybuffer',
  responseEncoding: 'binary'
})

export const authTextAxiosClient = axios.create({
  /**
   * configurated on log in / out
   * used for all other then get requests for textual information.
   */
  baseURL: baseURL,
  headers: headers
})

export const authPixAxiosClient = axios.create({
  // export const pixAxiosClient = axios.create({
  /**
   * configurated on log in / out
   * used for all other then get requests for pictures.
   */
  baseURL: baseURL,
  headers: {
    ...headers,
    'Content-Type': 'multipart/form-data'

    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    // 'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X- Request-With'
  },
  responseType: 'arraybuffer',
  responseEncoding: 'binary'
})

export const setAxiosCommonLng = lng => {
  // console.log('apiClient, axiosCommonLng, lng ->', lng)
  techTextAxiosClient.defaults.headers.common[
    'Accept-Language'] = lng
  techPixAxiosClient.defaults.headers.common[
    'Accept-Language'] = lng
  authTextAxiosClient.defaults.headers.common[
    'Accept-Language'] = lng
  authPixAxiosClient.defaults.headers.common[
    'Accept-Language'] = lng
  refreshTokenAxiosClient.defaults.headers.common[
    'Accept-Language'] = lng
}

export const setAxiosTechToken = (token) => {
  // console.log('axiosCommonToken, token ->', token)
  techTextAxiosClient.defaults.headers.common.Authorization = `Bearer ${token}`
  techPixAxiosClient.defaults.headers.common.Authorization = `Bearer ${token}`
}

// export const setAxiosAuthToken = (tokens) => {
//   // console.log('api, setAxiosAuthToken, access_token ->', tokens.access_token)
//   authTextAxiosClient.defaults.headers.common.Authorization = `Bearer ${tokens.access_token}`
//   authPixAxiosClient.defaults.headers.common.Authorization = `Bearer ${tokens.access_token}`
//   refreshTokenAxiosClient.defaults.headers.common.Authorization = `Bearer ${tokens.refresh_token}`
// }

export const setAxiosAuthAccessToken = token => {
  // console.log('api,  setAxiosAuthAccessToken, access_token ->', tokens.access_token)
  authTextAxiosClient.defaults.headers.common.Authorization = `Bearer ${token}`
  authPixAxiosClient.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const setAxiosAuthRefreshToken = token => {
  // console.log('api,  setAxiosAuthRefreshToken, access_token ->', tokens.access_token)
  refreshTokenAxiosClient.defaults.headers.common.Authorization = `Bearer ${token}`
}
