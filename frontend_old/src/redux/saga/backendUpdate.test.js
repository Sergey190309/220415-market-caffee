import { recordSaga } from '../../testUtils'
import { backendTxtUpdateSuccess, openModal, startAlert } from '../slices'
import { backendTextUpdate } from './backendUpdate'
import { rejectPutTextContentExpired, resolveDataPutTextContent } from '../../testAxiosConstants'
import { authTextAxiosClient as mockAxiosClient } from '../../api/apiClient'

describe('content to backend', () => {
  beforeAll(() => {
    jest.resetAllMocks()
  })
  describe('text content to backend', () => {
    const initialAction = {
      payload: {
        identity: 'mockIdentity',
        view_id: 'mockViewId',
        content: {
          title: 'mockTitle',
          content: ['mockContent, line 0', 'mockContent, line 1']
        }
      }
    }
    test('backendUpdate success call testing', async () => {
      mockAxiosClient.put.mockImplementationOnce(() => Promise.resolve({ data: resolveDataPutTextContent }))
      const dispatched = await recordSaga(backendTextUpdate, initialAction)
      expect(dispatched).toHaveLength(2)
      expect(dispatched[0].type).toBe(backendTxtUpdateSuccess.type)
      expect(dispatched[0].payload).toBe(undefined)

      expect(dispatched[1].type).toBe(startAlert.type)
      const { id, ...other } = dispatched[1].payload
      expect(typeof id).toBe('string')
      expect(other).toEqual({
        message: resolveDataPutTextContent.message,
        alertType: 'info',
        timeout: 3000
      })

      // console.log('saga, backendUpdate.test succes, dispatched ->', dispatched)
    })

    test('backendUpdate refresh token testing', async () => {
      mockAxiosClient.put.mockImplementationOnce(() => Promise.reject(rejectPutTextContentExpired))
      const dispatched = await recordSaga(backendTextUpdate, initialAction)
      expect(dispatched).toHaveLength(2)
      expect(dispatched[0].type).toBe(openModal.type)
      expect(dispatched[0].payload).toBe('confirmPassword')
      expect(dispatched[1].type).toBe(startAlert.type)
      const { id, ...other } = dispatched[1].payload
      expect(typeof id).toBe('string')
      expect(other).toEqual({
        message: rejectPutTextContentExpired.response.data.description,
        alertType: 'error',
        timeout: 5000
      })
      // console.log('saga, backendUpdate.test token expired, dispatched ->', dispatched)
    })
  })
})
