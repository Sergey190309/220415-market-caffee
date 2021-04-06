import mockAxios from '../apiClient';
import { getContents } from './getBackEndInfo';

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
    mockAxios.get.mockImplementationOnce(() => Promise.reject({...mockData}));
    // expect(getContents(mockKeys)).toThrow()
    const result = await getContents(mockKeys)
    console.log(result)
  });
});
