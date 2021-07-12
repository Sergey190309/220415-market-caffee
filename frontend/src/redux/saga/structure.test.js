import { techAxiosClient } from '../../api/apiClient';
import { recordSaga } from '../../testUtils';
import { mockResolveData, mockRejectData } from '../../api/calls/getViewsStructure.test';
import { structureWorker } from './structure';

describe('Structure saga testing', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  test('Structure saga worker success', async () => {
    techAxiosClient.get.mockImplementation(() =>
      Promise.resolve({ data: mockResolveData })
    );

    // const initialAction = {
    //   payload: 'payload'
    // }
    techAxiosClient.defaults.headers.common['Authorization'] = 'something';
    const dispatched = await recordSaga(structureWorker);
    expect(dispatched.length).toBe(1);
    expect(techAxiosClient.get).toHaveBeenCalledTimes(1);
    expect(techAxiosClient.get).toHaveBeenCalledWith('/structure/list');
    expect(dispatched[0].payload).toEqual(
      mockResolveData.payload.map(sturcture => {
        return { [sturcture['view_id']]: sturcture['attributes'] };
      })
    );
  });
});
