import React from 'react'
import { useTranslation } from 'react-i18next'
// import * as mockedFormik from 'formik'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders, setupStore } from '../../../utils/testUtils'
import LogIn, { logInSchema, initValues } from './LogIn'
// import { setLogInVisibility, logInSuccess } from '../../../redux/slices'
import { initialState, setState } from '../../../redux/slices/auth'
import { logInSaga } from '../../../redux/saga/auth'
import { logInCall } from '../../../api/calls/getAuthTechInfo'
import { setAxiosAuthAccessToken, setAxiosAuthRefreshToken } from '../../../api/apiClient'
import { act } from 'react-dom/test-utils'

// jest.mock('formik')
// jest.mock('formik', () => ({
//   __esModule: true,
//   ...jest.requireActual('formik'),
//   useFormik: jest.fn()
// }))
jest.mock('../../../api/apiClient', () => ({
  __esModule: true,
  ...jest.requireActual('../../../api/apiClient'),
  setAxiosAuthAccessToken: jest.fn(),
  setAxiosAuthRefreshToken: jest.fn(),
}))
jest.mock('../../../api/calls/getAuthTechInfo', () => ({
  __esModule: true,
  ...jest.requireActual('../../../api/calls/getAuthTechInfo'),
  logInCall: jest.fn()
}))
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn((key) => key)
    // i18n: { changeLanguage: jest.fn() },
  })
}))

describe('LogIn testing', () => {
  afterAll(() => {
    jest.unmock('../../../api/apiClient')
    jest.unmock('../../../api/calls/getAuthTechInfo')
    jest.unmock('react-i18next')
  })
  describe('non react components', () => {
    test('logInSchema', () => {
      const { t } = useTranslation()
      const result = logInSchema(t)
      expect(result.fields.email.type).toBe('string')
      expect(result.fields.password.type).toBe('string')
      expect(t).toHaveBeenCalledTimes(4)
      expect(t.mock.calls[0][0]).toBe('login.errors.email.invalidEmail')
      expect(t.mock.calls[1][0]).toBe('login.errors.required')
      expect(t.mock.calls[2][0]).toBe('login.errors.password.min')
      // eslint-disable-next-line no-template-curly-in-string
      expect(t.mock.calls[2][1]).toEqual({ min: '${min}' })
      expect(t.mock.calls[3][0]).toBe('login.errors.required')
    })
  })
  describe('React Component', () => {
    const logInData = {
      user_name: 'admin',
      email: 'a@agatha-ng.com',
      isAdmin: true,
      access_token: 'mock access token',
      refresh_token: 'mock refresh token'
    }
    // const mockedHandleSubmit = jest.fn()
    // const mockedSetSubmitting = jest.fn()
    // const mockedValues = {
    //   email: 'a@agatha-ng.com',
    //   password: 'qwerty'
    // }
    beforeEach(() => {
      jest.resetAllMocks()
      // useFormik.mockImplementation(() => ({
      //   values: mockedValues,
      //   touched: {
      //     email: false,
      //     password: false
      //   },
      //   errors: {
      //     email: false,
      //     password: false
      //   },
      //   handleSubmit: mockedHandleSubmit,
      //   setSubmitting: mockedSetSubmitting
      //   // values: mockedValues
      // }))
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    describe('appearance', () => {
      test('screen shot', () => {
        const testState = { ...initialState(), loading: true, isLogInOpened: true }
        const { baseElement } = renderWithProviders(<LogIn />, { preloadedState: { auth: testState } })
        expect(baseElement).toMatchSnapshot()
        // console.log('baseElement ->', baseElement)
        // screen.debug()
      })
      test('empty component in not visible', () => {
        const testState = {
          ...initialState(),
          // loading: true, isLogInOpened: true
        }
        renderWithProviders(<LogIn />, { preloadedState: { auth: testState } })
        // expect(baseElement).toMatchSnapshot()
        const logInDialog = screen.queryByTestId('login-dialog')
        expect(logInDialog).toBeNull()
        // console.log('logInDialog ->', logInDialog)
        // screen.debug()
      })
    })
    describe('functional tests (mocked dispatch)', () => {
      test('pressing login button', async () => {
        logInCall.mockImplementation(
          () => ({ data: { payload: logInData, message: 'mock message' } })

          // setTimeout(() => (() => ({ data: { payload: logInData, message: 'mock message' } })), 500)
        )
        // const spyOnSubmitForm = jest.spyOn(mockedFormik.submitForm, 'submitForm')
        /**
         * It tests appearence and disappearence GUI elements
         */
        const user = userEvent.setup()
        const testState = {
          ...initialState(),
          loading: true, isLogInOpened: true
        }
        const store = setupStore({ auth: testState }, logInSaga)
        // const initState = { auth: testState }

        renderWithProviders(<LogIn />, {
          preloadedState: { auth: testState }, store
        })

        const loginDialogBefore = screen.getByTestId('login-dialog')
        expect(loginDialogBefore).not.toBeNull()

        expect(screen.queryByTestId('login-form-linear-progress')).toBeNull()

        const logInButton = screen.getByTestId('button-login')
        await user.click(logInButton)

        act(() => {
          store.dispatch(setState({ loading: false }))
        })
        // rerender(<LogIn />, {store})
        await waitFor(() => {
          const loginDialogAfter = screen.queryByTestId('login-dialog')
          expect(loginDialogAfter).toBeNull()
        })
        // console.log('state.auth ->', store.getState().auth)
        expect(logInCall).toHaveBeenCalledTimes(1)
        expect(logInCall).toHaveBeenCalledWith(initValues)
        expect(setAxiosAuthAccessToken).toHaveBeenCalledTimes(1)
        expect(setAxiosAuthAccessToken).toHaveBeenCalledWith(logInData.access_token)
        expect(setAxiosAuthRefreshToken).toHaveBeenCalledTimes(1)
        expect(setAxiosAuthRefreshToken).toHaveBeenCalledWith(logInData.refresh_token)
        // screen.debug()
      })
    })
  })
})
