import {
  techTextAxiosClient as mockTechAxios,
  authTextAxiosClient as mockAuthAxios
} from '../../api/apiClient'

import {
  logInData as mockLogInData,
  resolveData as mockResolveData,
  rejectData as mockRejectData
} from '../../testAxiosConstants'

// import { runSaga } from 'redux-saga';
import {
  logInFail, logInSuccess, signUpFail, signUpSuccess, startAlert
} from '../slices'
import { logInFetch, signUpFetch } from './auth'
import { recordSaga } from '../../testUtils'
import { actRespErrorMessage } from '../../utils/errorHandler'

jest.mock('../../utils/errorHandler', () => ({
  actRespErrorMessage: jest.fn()
}))

describe('auth testing', () => {
  describe('logIn whole saga testing', () => {
    beforeAll(() => {
      jest.resetAllMocks()
    })
    test('success logIn', async () => {
      mockTechAxios.post.mockImplementation(() => Promise.resolve({ data: mockResolveData }))
      const initialAction = {
        // type: LOG_IN_START,
        payload: mockLogInData
      }
      // console.log('success logIn, logInFetch ->', logInFetch)
      const dispatched = await recordSaga(logInFetch, initialAction)
      expect(mockTechAxios.post).toHaveBeenCalledTimes(1)
      expect(mockTechAxios.post.mock.calls[0][0]).toBe('/users/login')
      expect(mockTechAxios.post.mock.calls[0][1]).toEqual(mockLogInData)
      // console.log(mockAxios.post.mock.calls[0][0])
      expect(dispatched).toHaveLength(2)
      expect(dispatched[0]).toEqual({
        type: logInSuccess.type,
        // type: LOG_IN_SUCCESS,
        payload: mockResolveData.payload
      })
      const { type, payload } = dispatched[1]
      expect(type).toBe(startAlert.type)
      const { id, ...otherProps } = payload
      expect(id)
        .toEqual(expect.stringMatching(/\w{8}(-\w{4}){3}-\w{12}/g))
      expect(otherProps).toEqual({
        message: mockResolveData.message,
        alertType: 'info',
        timeout: 3000
      })
      // console.log('auth.test\n success logIn',
      //   '\n  id ->', id)
    })

    test('fail logIn, not found', async () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      mockAuthAxios.post.mockImplementation(() => Promise.reject({ data: mockRejectData }))
      const initialAction = {
        // type: LOG_IN_START,
        payload: mockLogInData
      }
      actRespErrorMessage.mockImplementation(
        () => `${mockRejectData.response.data.message} ${mockRejectData.response.status}`
      )
      const dispatched = await recordSaga(logInFetch, initialAction)
      expect(actRespErrorMessage).toHaveBeenCalledTimes(1)
      expect(actRespErrorMessage.mock.calls[0][0].data).toEqual(mockRejectData)
      expect(dispatched[0]).toEqual({
        type: logInFail.type,
        payload: { data: mockRejectData }
      })
      const { type, payload } = dispatched[1]
      expect(type).toBe(startAlert.type)
      const { id, ...otherProps } = payload
      expect(otherProps).toEqual({
        message: `${mockRejectData.response.data.message} ${mockRejectData.response.status}`,
        alertType: 'error',
        timeout: 5000
      })
      // console.log('dispatched ->', dispatched[1]);
    })
  })

  describe('Sign up whole saga testign', () => {
    const mockSignUpData = {
      user_name: 'mockUserName',
      email: 'mock@email.test',
      password: 'mockPassword'
    }
    const mockResolveData = {
      message: 'Test message.',
      payload: {
        id: 11,
        user_name: 'sa',
        first_name: null,
        last_name: null,
        email: 'sa6702@gmail.com',
        role: null,
        remarks: null,
        locale: {
          id: 'en',
          remarks: 'General english.'
        },
        time_zone: 3,
        created: '2021-05-20T08:23:59',
        updated: null,
        accessed: null
      }
    }
    const mockRejectData = {
      response: {
        data: {
          message: 'Пользователь с email sa6702@gmail.com уже существует.'
        },
        status: 400,
        headers: { header: 'Some header' }
      },
      config: { config: 'Some config' }
    }
    beforeAll(() => {
      jest.resetAllMocks()
    })

    test('success signUp', async () => {
      mockAuthAxios.post.mockImplementation(() => Promise.resolve({ data: mockResolveData }))
      const initialAction = {
        payload: mockSignUpData
      }
      const dispatched = await recordSaga(signUpFetch, initialAction)
      expect(mockAuthAxios.post).toHaveBeenCalledTimes(1)
      expect(mockAuthAxios.post.mock.calls[0][0]).toBe('/users')
      expect(mockAuthAxios.post.mock.calls[0][1]).toEqual(mockSignUpData)
      // console.log(mockAxios.post.mock.calls[0][0])
      expect(dispatched[0]).toEqual({
        type: signUpSuccess.type,
        payload: mockResolveData.payload
      })
      const { payload } = dispatched[1]
      // const { type, payload } = dispatched[1]
      // expect(type).toBe(START_ALERT);
      const { id, ...otherProps } = payload
      expect(id)
        .toEqual(expect.stringMatching(/\w{8}(-\w{4}){3}-\w{12}/g))
      expect(otherProps).toEqual({
        message: mockResolveData.message,
        alertType: 'info',
        timeout: 3000
      })
    })

    test('fail signUp, already exists', async () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      mockAuthAxios.post.mockImplementation(() => Promise.reject({ data: mockRejectData }))
      const initialAction = {
        // type: LOG_IN_START,
        payload: mockSignUpData
      }
      actRespErrorMessage.mockImplementation(
        () => `${mockRejectData.response.data.message} ${mockRejectData.response.status}`
      )
      const dispatched = await recordSaga(signUpFetch, initialAction)
      // console.log('dispatched ->', dispatched);
      expect(actRespErrorMessage).toHaveBeenCalledTimes(1)
      expect(actRespErrorMessage.mock.calls[0][0].data).toEqual(mockRejectData)
      expect(dispatched[0]).toEqual({
        type: signUpFail.type,
        payload: { data: mockRejectData }
      })
      const { type, payload } = dispatched[1]
      expect(type).toBe(startAlert.type)
      const { id, ...otherProps } = payload
      expect(otherProps).toEqual({
        message: `${mockRejectData.response.data.message} ${mockRejectData.response.status}`,
        alertType: 'error',
        timeout: 5000
      })
    })
  })
})
