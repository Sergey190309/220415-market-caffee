import {
  // resolveDataTechInPost,
  resolveDataTechInGet
  // resolveDataPutTextContent
} from '../../constants/tests/testAxiosConstants'

// export const refreshTokenAxiosClient = {
//   put: ()=> Promise.resolve()
// }
export const authTextAxiosClient = {
  defaults: {
    headers: {
      common: 'some'
    }
  },
  put: jest.fn(() => Promise.resolve({ data: {} }))
}

// export const refreshTokenAxiosClient = {
//   put: ()=> Promise.resolve()
// }

export const techTextAxiosClient = {
  // post: () => Promise.resolve(resolveDataTechInPost),
  get: () => Promise.resolve(resolveDataTechInGet),
  defaults: {
    headers: {
      common: ['Authorization']
    }
  }
}

export const setAxiosCommonLng = jest.fn()
export const setAxiosTechToken = jest.fn()
export const setAxiosAuthAccessToken = jest.fn()
export const setAxiosAuthRefreshToken = jest.fn()
