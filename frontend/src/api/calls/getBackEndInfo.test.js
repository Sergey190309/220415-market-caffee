import mockAxios from '../apiClient';
import { getContents } from './getBackEndInfo';

describe('getContents testing', () => {
  const mockKeys = {
    one: 'one',
    two: 'two',
    three: 'three',
  }

  test('success', async () => {
    const mockData = {
      message: 'success message',
      payload: {
        title: 'Title',
        content: 'Contents'
      }
    }
    const expResults = { ...mockData.payload }

    mockAxios.get.mockResolvedValueOnce({ data: mockData })

    const result = await getContents(mockKeys)
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expResults);
    // console.log('result ->', result)
  });
});
