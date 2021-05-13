import mockAxios from '../apiClient';
import { getContents, getTechToken, getLngList } from './getBackEndInfo';

describe('getLngList testing', () => {
  test('success', async () => {
    console.log('getLngList testing, success, result ->', await getLngList())
  });
});

describe('getTechToken testing', () => {

  test('success', async () => {
    const mockData = {
      "message": "Mock message here.",
      "payload": "mock_tech_token"
    }
    mockAxios.post.mockImplementation(() => Promise.resolve({ data: mockData }))
    const expResult = {'techToken': mockData.payload}
    // console.log('getTechToken testing, result ->', expResult)
    const result = await getTechToken('sessionId')
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith('/home/tech/auth', { 'tech_id': 'sessionId' });
    expect(result).toEqual(expResult);
  });

  test('fail, no tech_token (payload)', async () => {
    const mockData = {
      "message": "Mock message here.",
      // "payload": "mock_tech_token"
    }
    const expResult = {'techToken': null}
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: mockData }))
    const result = await getTechToken('sessionId')
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith('/home/tech/auth', { 'tech_id': 'sessionId' });
    expect(result).toEqual(expResult);
    // console.log('getTechToken testing fail, result ->', result)
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
