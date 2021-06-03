import mockAxios from '../apiClient';
// import { getContents, getTechToken, getLngList } from './getViewsContents';
import {getViewStructure} from './getViewsStructure'

export const mockResolveData = {
    message: 'В нашей базе числятся 5 структуры как указанно ниже:',
    payload: [
        {
            view_id: 'admin',
            attributes: {},
            view: {
                view_id: 'admin',
                description: 'Views that available to logged admins only.'
            },
            user_id: 0,
            updated: null,
            created: '2021-06-01T10:12:16'
        },
        {
            view_id: 'landing',
            attributes: {
                '00': {
                    name: 'header',
                    type: 'header'
                },
                '01': {
                    qnt: 3,
                    name: 'vblock00',
                    type: 'vblock',
                    subtype: 'txt'
                },
                '02': {
                    qnt: 2,
                    name: 'hblock00',
                    type: 'hblock',
                    subtype: 'pix'
                },
                '03': {
                    qnt: 2,
                    name: 'vblock01',
                    type: 'vblock',
                    subtype: 'pix'
                },
                '04': {
                    name: 'footer',
                    type: 'footer'
                }
            },
            view: {
                view_id: 'landing',
                description: 'That is root view where customers come from searching engines.'
            },
            user_id: 0,
            updated: null,
            created: '2021-06-01T10:12:16'
        },
        {
            view_id: 'pictures',
            attributes: {},
            view: {
                view_id: 'pictures',
                description: 'Some pictures with our kind interiors.'
            },
            user_id: 0,
            updated: null,
            created: '2021-06-01T10:12:16'
        },
        {
            view_id: 'price_list',
            attributes: {},
            view: {
                view_id: 'price_list',
                description: 'The view with price to our services.'
            },
            user_id: 0,
            updated: null,
            created: '2021-06-01T10:12:16'
        },
        {
            view_id: 'private',
            attributes: {},
            view: {
                view_id: 'private',
                description: 'View that available to logged users only.'
            },
            user_id: 0,
            updated: null,
            created: '2021-06-01T10:12:16'
        }
    ]
  }

export const mockRejectData = {
  response: {
    data: {
      message: 'Something went wrong. Check tech_token and sessions set up.',
    },
    status: 500,
    headers: { header: 'Some header' },
  },
  config: { config: 'Some config' },
}

describe('getViewStructure testing', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  test('getViewStructure success', async () => {
    mockAxios.get.mockImplementation(() => Promise.resolve({ data: mockResolveData }));
    const resp = await getViewStructure();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith('/structure/list');
    // console.log('lngsCall success ->', resp.data)
    expect(resp.data).toEqual(mockResolveData);
  });
});