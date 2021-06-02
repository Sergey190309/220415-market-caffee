import mockAxios from '../../api/apiClient';
import { recordSaga } from '../../testUtils';
import { mockResolveData, mockRejectData } from '../../api/calls/getViewsStructure.test';
import { structureWorker } from './structure';
describe('Structure saga testing', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  test('Structure saga worker success', async () => {
    mockAxios.get.mockImplementation(() => Promise.resolve({ data: mockResolveData }));
    const dispatched = await recordSaga(structureWorker)
    console.log('Structure saga worker success, dispatched ->', dispatched)
  });
});
