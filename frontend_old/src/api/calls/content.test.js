import { techTextAxiosClient as mockAxios } from '../apiClient'
import { getViewContent } from './content'

const mockResolveData = {
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
    content:
      'We are cosy, lovely place offering good food and drinks on reasonable prices.',
    locale_id: 'en',
    view_id: 'landing'
  }
}

// const mockRejectData = {
//   response: {
//     data: {
//       message:
//         'A contents with identity "01_vblock_txt_0", view "landing" and locale "en" not found.'
//     },
//     status: 404,
//     headers: { header: 'Some header' }
//   },
//   config: { config: 'Some config' }
// }

const params = {
  view_id: 'mock view_id',
  identity: 'mock identity',
  locale_id: 'mock locale_id'
}

describe('getViewContent testing', () => {
  beforeAll(() => {
    jest.resetAllMocks()
  })

  test('getViewContent, success', async () => {
    mockAxios.get.mockImplementation(() => Promise.resolve({ data: mockResolveData }))
    const resp = await getViewContent(params)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get.mock.calls[0][0]).toBe('/content')
    expect(mockAxios.get.mock.calls[0][1]).toEqual({ params: params })
    expect(resp.data).toEqual(mockResolveData)
    // console.log('getViewContent, resp ->', resp.data);
  })

  test('getViewContent, network Error', async () => {
    const errorMessage = 'Network Error'
    mockAxios.get.mockImplementation(() => Promise.reject(new Error(errorMessage)))
    // const resp = await getViewContent(params);
    await expect(getViewContent(params)).rejects.toThrow(errorMessage)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get.mock.calls[0][0]).toBe('/content')
    expect(mockAxios.get.mock.calls[0][1]).toEqual({ params: params })
  })
})
