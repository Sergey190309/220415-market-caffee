import mockAxios from '../../api/apiClient';

import { takeEvery } from 'redux-saga/effects';
// import { runSaga } from 'redux-saga';
import { LOG_IN_FAIL, LOG_IN_START, LOG_IN_SUCCESS, START_ALERT } from '../actions/types';
import { logInSaga, logInFetch } from './auth';
import { recordSaga } from '../../testUtils';
import { actRespErrorMessage } from '../../utils/respErrorHandler';

jest.mock('../../utils/respErrorHandler', () => ({ actRespErrorMessage: jest.fn() }));

describe('auth testing', () => {
  describe('logIn step by step tesing', () => {
    const genObject = logInSaga();
    test('should catch every LOG_IN_START call', () => {
      // console.log(genObject.next().value)
      expect(genObject.next().value).toEqual(takeEvery(LOG_IN_START, logInFetch));
      // console.log(genObject.next().value)
      expect(genObject.next().done).toBeTruthy();
    });
  });
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

    // actRespErrorMessage = jest.fn();

    beforeAll(() => {
      jest.resetAllMocks();
    });
    test('success logIn', async () => {
      mockAxios.post.mockImplementation(() => Promise.resolve({ data: mockResolveData }));
      const initialAction = {
        type: LOG_IN_START,
        payload: mockLogInData,
      };
      const dispatched = await recordSaga(logInFetch, initialAction);
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post.mock.calls[0][0]).toBe('/users/login');
      expect(mockAxios.post.mock.calls[0][1]).toEqual(mockLogInData);
      // console.log(mockAxios.post.mock.calls[0][0])
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
        type: LOG_IN_START,
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
});
