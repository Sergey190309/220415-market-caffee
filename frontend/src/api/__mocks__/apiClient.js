import { resolveDataTechInPost, resolveDataTechInGet } from '../../testAxiosConstants';

export const techAxiosClient = {
  post:()=>Promise.resolve(resolveDataTechInPost),
  get: () => Promise.resolve(resolveDataTechInGet),
  defaults: {
    headers: {
      common: ['Authorization']
    },
  }
}

export const axiosCommonToken = jest.fn();
