import { resolveDataContent } from '../../../testAxiosConstants'

export const getViewContent = params => {
  // console.log('mockGetViewContent, params ->', params)
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
