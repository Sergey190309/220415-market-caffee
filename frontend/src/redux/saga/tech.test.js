import { v4 } from 'uuid';
import mockAxios from '../../api/apiClient';
import { TECH_IN_FAIL, TECH_IN_SUCCESS } from '../actions/types';
import { recordSaga } from '../../testUtils';
import { techInFetch } from './tech';

describe('Tech saga testing', () => {
  const mockTechInData = v4();
  const mockResolveData = {
    message: 'ТехРег докладывает! Тех жетон в сообщении.',
    payload: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMTUwNjcyNywianRpIjoiY2E2MjMxYzEtNTUxOS00NGE2LThlZjItYjg5ZTI1MzNjYWRkIiwibmJmIjoxNjIxNTA2NzI3LCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDliMjFjNGQtOTlmNC00YmJhLWI0MmYtZjBkNzllOGVhNDU1IiwiaWQiOiIwOWIyMWM0ZC05OWY0LTRiYmEtYjQyZi1mMGQ3OWU4ZWE0NTUifQ.Th7t0ArPxn8j0sb5spFX0_uB8wPBLYCs6_TB0bIuuLU'
  }
  const mockRejectData = {
    response: {
      data: {
        message: 'Error message',
      },
      status: 400,
      headers: { header: 'Some header' },
    },
    config: { config: 'Some config' },
  };

  beforeAll(() => {
    jest.resetAllMocks();
  });

  test('tech in success', async () => {
    mockAxios.post.mockImplementation(() => Promise.resolve({ data: mockResolveData }));
    const initialAction = {
      // type: LOG_IN_START,
      payload: mockTechInData,
    };
    const expDispatch = {
      type: TECH_IN_SUCCESS,
      payload: mockResolveData.payload
    }
    const dispatched = await recordSaga(techInFetch, initialAction);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post.mock.calls[0][0]).toBe('/home/tech/auth');
    expect(mockAxios.post.mock.calls[0][1]).toEqual({ tech_id: mockTechInData});
    expect(dispatched.length).toBe(1);
    expect(dispatched[0]).toEqual(expDispatch);

    // console.log('tech in success tesing, dispatched ->', dispatched)

  });

  test('tech in fail', async () => {
    mockAxios.post.mockImplementation(() => Promise.reject({ data: mockRejectData }));
    const initialAction = {
      // type: LOG_IN_START,
      payload: mockTechInData,
    };
    // const expDispatch = {
    //   type: TECH_IN_SUCCESS,
    //   payload: mockResolveData.payload
    // }
    const dispatched = await recordSaga(techInFetch, initialAction);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post.mock.calls[0][0]).toBe('/home/tech/auth');
    expect(mockAxios.post.mock.calls[0][1]).toEqual({ tech_id: mockTechInData});
    expect(dispatched.length).toBe(1);
    const { type, payload } = dispatched[0]
    expect(type).toBe(TECH_IN_FAIL);
    expect(payload).toBeObject()
    expect(payload).toContainKeys(['data'])

    // expect(dispatched[0]).toEqual(expDispatch);

    // console.log('tech in success tesing, dispatched ->', dispatched[0].payload)

  });

});
