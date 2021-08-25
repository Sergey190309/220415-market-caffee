import { authTextAxiosClient, techTextAxiosClient, techPixAxiosClient } from '../apiClient'

const contentURL = '/content'
const imageURL = '/images/'

export const putTextContent = json => {
  // console.log('api, calls, content, putViewContent, json ->', json)
  const resp = authTextAxiosClient.put(contentURL, { ...json })
  // console.log('api, calls, content, putViewContent, resp ->', resp)
  return resp
}

export const getViewContent = params => {
  const resp = techTextAxiosClient.get(contentURL, { params: params })
  return resp
}

export const getViewPicture = params => {
  const resp = techPixAxiosClient.get(imageURL, { params: params })
  return resp
}
