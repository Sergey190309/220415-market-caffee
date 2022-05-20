/* eslint-disable no-labels */
import mockAxios from 'axios'
// import mockAxios from 'axios'

import { headers } from './apiClient'
import { baseURL } from '../constants/api'
// import { setAxiosCommonLng } from './apiClient'

// jest.mock('axios', () => {
//   create: jest.fn()
// })
describe('apiClient testing', () => {
  test('testing all constants (5)', () => {
    const expArg0 = {
      baseURL: baseURL,
      headers: headers
    }
    const expArg2 = {
      baseURL: baseURL,
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'arraybuffer',
      responseEncoding: 'binary'
    }

    // axios.create.mockReset()
    // expect(true).toBe(true)
    // const something = techTextAxiosClient
    expect(mockAxios.create).toHaveBeenCalledTimes(5)
    expect(mockAxios.create.mock.calls[0][0]).toEqual(expArg0)
    expect(mockAxios.create.mock.calls[1][0]).toEqual(expArg0)
    expect(mockAxios.create.mock.calls[2][0]).toEqual(expArg2)
    expect(mockAxios.create.mock.calls[3][0]).toEqual(expArg0)
    expect(mockAxios.create.mock.calls[4][0]).toEqual(expArg2)
    // console.log('testing all constants (5), mockAxios.create ->',
    //   mockAxios.create())
  })
  test('setAxiosCommonLng testing - not finished', () => {
    // mockAxios.create.mockImplementation(agrs => {
    //   console.log('args')
    // })
    // setAxiosCommonLng('fuck!')
    expect(true).toBe(true)
  })
})