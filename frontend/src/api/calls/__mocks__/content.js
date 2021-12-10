import { resolveDataContent, resolveDataPutTextContent } from '../../../testAxiosConstants'

export const putAddElement = json => {
  // console.log('api, calls, content:\n putAddElement',
  //   '\n  json ->', json)
  return Promise.resolve({ data: {} })
}
export const patchRemoveElement = json => {
  return Promise.resolve({ data: {} })
}

export const putTextContent = json => {
  // console.log('api, calls, content, mock:\n putTextContent',
  //   '\n  json ->', json)
  return Promise.resolve({ data: resolveDataPutTextContent })
}

export const getViewContent = params => {
  // console.log('mockGetViewContent,\n  params ->', params)
  switch (params.identity) {
    case 'mockNoTitle':
      return Promise.resolve({
        data: {
          payload: {
            content: resolveDataContent.payload.content
          }
        }
      })
    case 'mockNoContent':
      return Promise.resolve({
        data: {
          payload: {
            title: resolveDataContent.payload.title
          }
        }
      })
    default:
      return Promise.resolve({ data: resolveDataContent })
  }
}
