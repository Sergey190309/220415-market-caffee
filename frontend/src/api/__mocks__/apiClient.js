import { resolveDataTechInPost, resolveDataTechInGet } from '../../testAxiosConstants'

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
export const setAxiosAuthToken = jest.fn()
