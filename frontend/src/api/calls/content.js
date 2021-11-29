import { authTextAxiosClient, techTextAxiosClient, techPixAxiosClient } from '../apiClient'

const contentURL = '/content'
const elementURL = '/content/handling'
const imageURL = '/images/'

export const putAddElement = json => {
  console.log('api, calls, content:\n putAddElement',
    '\n  json ->', json)
  const resp = authTextAxiosClient.put(elementURL, { ...json })
  return resp
}

export const patchRemoveElement = json => {
  const resp = authTextAxiosClient.patch(elementURL, { ...json })
  // console.log('api, calls, content:\n putAddElement:',
  //   '\n  resp ->', resp)
  return resp
}

export const putTextContent = json => {
  console.log('api, calls, content:\n putTextContent',
    '\n  json ->', json)
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
