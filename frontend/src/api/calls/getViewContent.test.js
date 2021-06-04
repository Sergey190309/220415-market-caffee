import mockAxios from '../apiClient';
import { getViewContent } from './getViewContent';

export const mockResolveData = {
  message: 'The content has been found. Details are in payload.',
  payload: {
      updated: null,
      user_id: 1,
      locale: {
          remarks: 'General english.',
          id: 'en'
      },
      created: '2021-04-04T00:00:00',
      title: 'Couple of words about us.',
      view: {
          view_id: 'landing',
          description: 'That is root view where customers come from searching engines.'
      },
      identity: '01_vblock_txt_00',
      content: 'We are cosy, lovely place offering good food and drinks on reasonable prices.',
      locale_id: 'en',
      view_id: 'landing'
  }
}

export const mockRejectData = {
  response: {
    data: {
      "message": "A contents with identity '01_vblock_txt_0', view 'landing' and locale 'en' not found."
  },
    status: 404,
    headers: { header: 'Some header' },
  },
  config: { config: 'Some config' },
};

describe('getViewContent testing', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });
  test('not done! getViewContent, success', async () => {

    mockAxios.get.mockImplementation(() => Promise.resolve({ data: mockResolveData }));
    const resp = await getViewContent();

  });
});