import { v4 } from 'uuid'

import { techTextAxiosClient as mockAxios } from '../../api/apiClient'
import {
  // techInSuccess, startLngs
} from '../slices'

import { recordSaga } from '../../utils/testUtils'
import { startInitWorker } from './tech'

describe('Tech saga testing', () => {
  describe('startInitSaga', () => {
    const mockTechInData = v4()
    // const mockResolveData = {
    //   message: 'ТехРег докладывает! Тех жетон в сообщении.',
    //   payload: 'mock_token'
    // }
    // const mockRejectData = {
    //   response: {
    //     data: {
    //       message: 'Error message'
    //     },
    //     status: 400,
    //     headers: { header: 'Some header' }
    //   },
    //   config: { config: 'Some config' }
    // }
    beforeEach(() => {
      jest.resetAllMocks()
    })
    test('startInitWorker', async () => {
      const dispatched = await recordSaga(startInitWorker)
      console.log('saga>tech.test',
        '\n  dispatched ->', dispatched
      )
    })

    // test('tech in success', async () => {
    //   mockAxios.get.mockImplementation(() => Promise.resolve({ data: mockResolveData }))
    //   const initialAction = {
    //     payload: mockTechInData
    //   }
    //   const expDispatch00 = {
    //     type: techInSuccess.type,
    //     payload: mockResolveData.payload
    //   }
    //   const expDispatch01 = {
    //     type: startLngs.type
    //   }
    //   const dispatched = await recordSaga(techInFetch, initialAction)
    // });
  });
});