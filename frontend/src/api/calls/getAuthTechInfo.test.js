import { v4 } from 'uuid'
import { techTextAxiosClient as mockAxios } from '../apiClient'
import { lngsCall, techInCall } from './getAuthTechInfo'
// import '@testing-library/jest-dom'

describe('Testing API calls', () => {
  describe('lngsCall testing', () => {
    const mockResolveData = {
      message: 'There are 2 locales in our database as follows:',
      payload: [
        {
          id: 'en',
          remarks: 'General english.'
        },
        {
          id: 'ru',
          remarks: 'Общий русский.'
        }
      ]
    }
    // const mockRejectData = {
    //   response: {
    //     data: {
    //       message: 'Something went wrong. Check tech_token and sessions set up.',
    //     },
    //     status: 500,
    //     headers: { header: 'Some header' },
    //   },
    //   config: { config: 'Some config' },
    // };
    beforeAll(() => {
      jest.resetAllMocks()
    })

    test('lngsCall success', async () => {
      mockAxios.get.mockImplementation(() => Promise.resolve({ data: mockResolveData }))
      const resp = await lngsCall()
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      expect(mockAxios.get.mock.calls[0]).toEqual(['/global/locales'])
      // console.log('lngsCall success ->', resp.data)
      expect(resp.data).toEqual(mockResolveData)
    })
  })

  describe('techInCall', () => {
    const mockTechInData = { tech_id: v4() }
    const mockResolveData = {
      message: 'ТехРег докладывает! Тех жетон в сообщении.',
      payload:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMTUwNjcyNywianRpIjoiY2E2MjMxYzEtNTUxOS00NGE2LThlZjItYjg5ZTI1MzNjYWRkIiwibmJmIjoxNjIxNTA2NzI3LCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDliMjFjNGQtOTlmNC00YmJhLWI0MmYtZjBkNzllOGVhNDU1IiwiaWQiOiIwOWIyMWM0ZC05OWY0LTRiYmEtYjQyZi1mMGQ3OWU4ZWE0NTUifQ.Th7t0ArPxn8j0sb5spFX0_uB8wPBLYCs6_TB0bIuuLU'
    }
    // const mockRejectData = {
    //   response: {
    //     data: {
    //       message: 'Error message',
    //     },
    //     status: 400,
    //     headers: { header: 'Some header' },
    //   },
    //   config: { config: 'Some config' },
    // };
    beforeAll(() => {
      jest.resetAllMocks()
    })

    test('techInCall success', async () => {
      mockAxios.get.mockImplementation(() => Promise.resolve({ data: mockResolveData }))
      const resp = await techInCall(mockTechInData)
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      expect(mockAxios.get.mock.calls[0][0]).toBe('/home/tech/auth')
      expect(mockAxios.get.mock.calls[0][1]).toEqual({ params: mockTechInData })
      const { data } = resp
      console.log('getAuthTechInfo.test\n techInCall',
        '\n  data ->', data)
      expect(data).toEqual(expect.objectContaining(mockResolveData))
    })
  })
})
