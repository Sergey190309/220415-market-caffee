import { resolveDataTechInPost, resolveDataTechInGet } from '../../testAxiosConstants';

export const techAxiosClient = {
  post:()=>Promise.resolve(resolveDataTechInPost),
  get:()=>Promise.resolve(resolveDataTechInGet)
}

export const axiosCommonToken = jest.fn();
