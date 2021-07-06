import { techAxiosClient as mockAxios } from '../../api/apiClient';

// import { runSaga } from 'redux-saga';
import { LOG_IN_FAIL, LOG_IN_SUCCESS, SIGN_UP_SUCCESS, START_ALERT } from '../constants/types';
import { logInFetch, signUpFetch } from './auth';
import { recordSaga } from '../../testUtils';
import { actRespErrorMessage } from '../../utils/errorHandler'

jest.mock('../../utils/errorHandler', () => ({ actRespErrorMessage: jest.fn() }));

describe('auth testing', () => {
  describe('log In whole saga testing', () => {
    const mockLogInData = {
      email: 'mock@email.test',
      password: 'mockPassword',
    };
    const mockResolveData = {
      message: 'Hi! You are welcome.',
      payload: {
        user_name: 'admin',
        email: 'a@agatha-ng.com',
        isAdmin: true,
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
      },
    };
    const mockRejectData = {
      response: {
        data: {
          message: 'Error message',
        },
        status: 404,
        headers: { header: 'Some header' },
      },
      config: { config: 'Some config' },
    };

    beforeAll(() => {
      jest.resetAllMocks();
    });
    test('success logIn', async () => {
      mockAxios.post.mockImplementation(() => Promise.resolve({ data: mockResolveData }));
      const initialAction = {
        // type: LOG_IN_START,
        payload: mockLogInData,
      };
      // console.log('success logIn, logInFetch ->', logInFetch)
      const dispatched = await recordSaga(logInFetch, initialAction);
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post.mock.calls[0][0]).toBe('/users/login');
      expect(mockAxios.post.mock.calls[0][1]).toEqual(mockLogInData);
      // console.log(mockAxios.post.mock.calls[0][0])
      expect(dispatched.length).toBe(2);
      expect(dispatched[0]).toEqual({
        type: LOG_IN_SUCCESS,
        payload: mockResolveData.payload,
      });
      const { type, payload } = dispatched[1];
      expect(type).toBe(START_ALERT);
      const { id, ...otherProps } = payload;
      expect(id).toBeString();
      expect(otherProps).toEqual({
        message: mockResolveData.message,
        alertType: 'info',
        timeout: 3000,
      });
      // console.log(dispatched)
    });

    test('fail logIn, not found', async () => {
      mockAxios.post.mockImplementation(() => Promise.reject({ data: mockRejectData }));
      const initialAction = {
        // type: LOG_IN_START,
        payload: mockLogInData,
      };
      actRespErrorMessage.mockImplementation(
        () => `${mockRejectData.response.data.message} ${mockRejectData.response.status}`
      );
      const dispatched = await recordSaga(logInFetch, initialAction);
      expect(actRespErrorMessage).toHaveBeenCalledTimes(1);
      expect(actRespErrorMessage.mock.calls[0][0].data).toEqual(mockRejectData);
      expect(dispatched[0]).toEqual({
        type: LOG_IN_FAIL,
        payload: { data: mockRejectData },
      });
      const { type, payload } = dispatched[1]
      expect(type).toBe(START_ALERT);
      const { id, ...otherProps } = payload
      expect(otherProps).toEqual({
        message: `${mockRejectData.response.data.message} ${mockRejectData.response.status}`,
        alertType: 'error',
        timeout: 5000,
      });
      // console.log('function, calls ->', actRespErrorMessage.mock.calls[0][0].data);
      // console.log('function, results ->', actRespErrorMessage.mock.results[0]);
      // console.log('dispatched ->', dispatched[1]);
    });
  });

  describe('Sign up whole saga testign', () => {

    const mockSignUpData = {
      user_name: 'mockUserName',
      email: 'mock@email.test',
      password: 'mockPassword',
    };
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
        },
    };
    const mockRejectData = {
      response: {
        data: {
          message: 'Пользователь с email sa6702@gmail.com уже существует.',
        },
        status: 400,
        headers: { header: 'Some header' },
      },
      config: { config: 'Some config' },
    };
    beforeAll(() => {
      jest.resetAllMocks();
    });

    test('success signUp', async () => {
      mockAxios.post.mockImplementation(() => Promise.resolve({ data: mockResolveData }))
      const initialAction = {
        payload: mockSignUpData
      }
      const dispatched = await recordSaga(signUpFetch, initialAction)
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post.mock.calls[0][0]).toBe('/users');
      expect(mockAxios.post.mock.calls[0][1]).toEqual(mockSignUpData);
      // console.log(mockAxios.post.mock.calls[0][0])
      expect(dispatched[0]).toEqual({
        type: SIGN_UP_SUCCESS,
        payload: mockResolveData.payload,
      });
      const { type, payload } = dispatched[1];
      expect(type).toBe(START_ALERT);
      const { id, ...otherProps } = payload;
      expect(id).toBeString();
      expect(otherProps).toEqual({
        message: mockResolveData.message,
        alertType: 'info',
        timeout: 3000,
      });
    });

    test('fail signUp, already exists', async () => {
      mockAxios.post.mockImplementation(() => Promise.reject({ data: mockRejectData }));
      const initialAction = {
        // type: LOG_IN_START,
        payload: mockSignUpData,
      };
      actRespErrorMessage.mockImplementation(
        () => `${mockRejectData.response.data.message} ${mockRejectData.response.status}`
      );
      const dispatched = await recordSaga(logInFetch, initialAction);
      // console.log('dispatched ->', dispatched);
      expect(actRespErrorMessage).toHaveBeenCalledTimes(1);
      expect(actRespErrorMessage.mock.calls[0][0].data).toEqual(mockRejectData);
      expect(dispatched[0]).toEqual({
        type: LOG_IN_FAIL,
        payload: { data: mockRejectData },
      });
      const { type, payload } = dispatched[1]
      expect(type).toBe(START_ALERT);
      const { id, ...otherProps } = payload
      expect(otherProps).toEqual({
        message: `${mockRejectData.response.data.message} ${mockRejectData.response.status}`,
        alertType: 'error',
        timeout: 5000,
      });
    });
  });
});
