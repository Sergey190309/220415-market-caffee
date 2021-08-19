import { v4 } from 'uuid'
import { techTextAxiosClient as mockAxios } from '../../api/apiClient'
import { i18nSuccess, initLoadingSuccess, lngsFail, lngsSuccess, startI18n, startLngs, techInFail, techInSuccess, structureStart } from '../slices'
import { recordSaga } from '../../testUtils'
import {
  // startInitWorker,
  techInFetch,
  lngsWorker,
  i18nWorker
} from './tech'
import * as i18n from '../../l10n/i18n'

describe('Tech sagas tesing', () => {
  describe('Tech in testing', () => {
    const mockTechInData = v4()
    const mockResolveData = {
      message: 'ТехРег докладывает! Тех жетон в сообщении.',
      payload: 'mock_token'
    }
    const mockRejectData = {
      response: {
        data: {
          message: 'Error message'
        },
        status: 400,
        headers: { header: 'Some header' }
      },
      config: { config: 'Some config' }
    }

    beforeEach(() => {
      jest.resetAllMocks()
    })

    test('tech in success', async () => {
      mockAxios.get.mockImplementation(() => Promise.resolve({ data: mockResolveData }))
      const initialAction = {
        payload: mockTechInData
      }
      const expDispatch00 = {
        type: techInSuccess.type,
        payload: mockResolveData.payload
      }
      const expDispatch01 = {
        type: structureStart.type
      }
      const expDispatch02 = {
        type: startLngs.type
      }
      const dispatched = await recordSaga(techInFetch, initialAction)
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      expect(mockAxios.get.mock.calls[0][0]).toBe('/home/tech/auth')
      expect(mockAxios.get.mock.calls[0][1]).toEqual({ params: { tech_id: mockTechInData } })

      expect(dispatched).toHaveLength(3)
      expect(dispatched[0]).toEqual(expDispatch00)
      expect(dispatched[1]).toEqual(expDispatch01)
      expect(dispatched[2]).toEqual(expDispatch02)
      // console.log('tech in success, mockAxios.get.mock.calls[0][0] ->', mockAxios.get.mock.calls[0][1])
    })

    test('tech in fail', async () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      mockAxios.get.mockImplementation(() => Promise.reject({ data: mockRejectData }))
      const initialAction = {
        payload: mockTechInData
      }
      const dispatched = await recordSaga(techInFetch, initialAction)
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      expect(mockAxios.get.mock.calls[0][0]).toBe('/home/tech/auth')
      expect(mockAxios.get.mock.calls[0][1]).toEqual({ params: { tech_id: mockTechInData } })
      expect(dispatched).toHaveLength(1)
      const { type, payload } = dispatched[0]
      expect(type).toBe(techInFail.type)
      expect(payload).toBeObject()
      expect(payload).toContainKeys(['data'])
      // console.log('tech in fail, dispatched ->', dispatched)
    })
  })

  describe('lngsSaga testing', () => {
    const mockResolveData = {
      message: 'There are 2 locales in our database as follows:',
      payload: [
        {
          remarks: 'General english.',
          id: 'en'
        },
        {
          remarks: 'Общий русский.',
          id: 'ru'
        },
        {
          remarks: '中国人.',
          id: 'cn'
        }
      ]
    }
    const mockRejectData = {
      response: {
        data: {
          message: 'Error message'
        },
        status: 400,
        headers: { header: 'Some header' }
      },
      config: { config: 'Some config' }
    }

    beforeAll(() => {
      jest.resetAllMocks()
    })

    test('lngs success', async () => {
      mockAxios.get.mockImplementation(() => Promise.resolve({ data: mockResolveData }))
      const expDispatch00 = {
        type: lngsSuccess.type
      }
      const expDispatch01 = {
        type: startI18n.type,
        payload: ['en', 'ru', 'cn']
      }
      const dispatched = await recordSaga(lngsWorker)
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      expect(mockAxios.get.mock.calls[0][0]).toBe('/global/locales')

      expect(dispatched).toHaveLength(2)
      expect(dispatched[0]).toEqual(expDispatch00)
      expect(dispatched[1]).toEqual(expDispatch01)

      // console.log('tech in success tesing, daispatched ->', dispatched);
    })

    test('tech in fail', async () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      mockAxios.get.mockImplementation(() => Promise.reject({ data: mockRejectData }))
      const dispatched = await recordSaga(lngsWorker)
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      expect(mockAxios.get.mock.calls[0][0]).toBe('/global/locales')
      expect(dispatched).toHaveLength(1)
      const { type, payload } = dispatched[0]
      expect(type).toBe(lngsFail.type)
      expect(payload).toBeObject()
      expect(payload).toContainKeys(['data'])

      // console.log('tech in success tesing, dispatched ->', dispatched[0])
    })
  })

  describe('i18nWorker testing', () => {
    beforeAll(() => {
      jest.resetAllMocks()
    })

    test('i18nWorker success', async () => {
      const action = {
        payload: ['ru', 'en', 'cn']
      }
      const mockSetI18n = jest
        .spyOn(i18n, 'setI18next')
        .mockImplementation(() => Promise.resolve())

      const expDispatch00 = {
        type: i18nSuccess.type
      }
      const expDispatch01 = {
        type: initLoadingSuccess.type
      }
      // const args = [mockSetI18n, mockSetCommonLng];
      const dispatched = await recordSaga(i18nWorker, action)
      expect(mockSetI18n).toHaveBeenCalledTimes(1)
      expect(mockSetI18n.mock.calls[0][0]).toEqual(action.payload)

      // console.log('i18n success tesing, setI18n, calls ->', mockSetI18n.mock.calls[0][0]);

      expect(dispatched).toHaveLength(2)
      expect(dispatched[0]).toEqual(expDispatch00)
      expect(dispatched[1]).toEqual(expDispatch01)

      // console.log('i18n success tesing, daispatched ->', dispatched);
    })
  })
})
