import mockAxios from '../apiClient';
import { getContents, getTecToken } from './getBackEndInfo';


describe('getTecToken testing', () => {

  test('success', async () => {
    const mockData = {
      "message": "Mock message here.",
      "payload": "mock_tec_token"
    }
    mockAxios.post.mockImplementation(() => Promise.resolve({ data: mockData }))
    const expResult = {'tec_token': mockData.payload}
    const result = await getTecToken('sessionId')
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith('/home/tec/auth', { 'tec_id': 'sessionId' });
    expect(result).toEqual(expResult);
    // console.log('getTecToken testing, result ->', result)
  });

  test('fail, no tec_token (payload)', async () => {
    const mockData = {
      "message": "Mock message here.",
      // "payload": "mock_tec_token"
    }
    const expResult = {'tec_token': null}
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: mockData }))
    const result = await getTecToken('sessionId')
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith('/home/tec/auth', { 'tec_id': 'sessionId' });
    expect(result).toEqual(expResult);
    // console.log('getTecToken testing, result ->', result)
  });

});

describe('getLocales testing', () => {
  test('success', async () => {

  });
});

describe('getContents testing', () => {
  const mockKeys = {
    one: 'one',
    two: 'two',
    three: 'three',
  };

  test('success', async () => {
    const mockData = {
      message: 'success message',
      payload: {
        title: 'Title',
        content: 'Contents',
      },
    };
    const expResults = { ...mockData.payload };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: mockData }));

    const result = await getContents(mockKeys);
    // console.log('getContents, resp ->', result)
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith('/contents', { params: mockKeys });
    expect(result).toEqual(expResults);
  });

  test('fail, not found', async () => {
    const mockData = {
      response: {
        data: {
          message: 'Error message',
        },
        status: 404,
        headers: { header: 'Some header' },
      },
      config: { config: 'Some config' },
    };
    mockAxios.get.mockImplementationOnce(() => Promise.reject({ ...mockData }));

    const testing = (error) => {
      expect(error).toEqual(mockData);
    }

    try {
      await getContents(mockKeys);
      // console.log(result);
    } catch (err) {
      // console.log(err);
      testing(err)
    }
  });
});
