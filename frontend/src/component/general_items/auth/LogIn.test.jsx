import React from 'react'
import { useTranslation } from 'react-i18next'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders, setupStore } from '../../../utils/testUtils'
import LogIn, { logInSchema, initValues } from './LogIn'
import { initialState, setState } from '../../../redux/slices/auth'
import { logInSaga } from '../../../redux/saga/auth'
import { logInCall, } from '../../../api/calls/getAuthTechInfo'
import { setAxiosAuthAccessToken, setAxiosAuthRefreshToken } from '../../../api/apiClient'
import { act } from 'react-dom/test-utils'

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
  })
}))

describe('LogIn testing', () => {
  afterAll(() => {
    // jest.unmock('../../../redux/slices/auth')
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
    beforeEach(() => {
      jest.resetAllMocks()
    })
    // afterEach(() => {
    //   jest.restoreAllMocks()
    // })
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
    describe('functional tests', () => {
      test.only('pressing login button', async () => {
        const mockLogInData = {
          email: 'sa6702@gmail.com', password: 'ytrewq'
        }
        logInCall.mockImplementation(
          () => ({ data: { payload: logInData, message: 'mock message' } })
        )
        /**
         * It tests function calls on pressing login button.
         */
        const user = userEvent.setup()
        const testState = {
          ...initialState(),
          loading: true, isLogInOpened: true
        }
        const store = setupStore({ auth: testState }, logInSaga)

        renderWithProviders(<LogIn />, {
          preloadedState: { auth: testState }, store
        })

        const loginDialogBefore = screen.getByTestId(/login-dialog/i)
        expect(loginDialogBefore).not.toBeNull()
        expect(screen.queryByTestId(/login-form-linear-progress/i)).toBeNull()

        const emailInput = screen.getByLabelText(/login.labels.email/i)
        const passwordInput = screen.getByLabelText(/login.labels.password/i)
        await user.clear(emailInput)
        await user.type(emailInput, mockLogInData.email)
        await user.clear(passwordInput)
        await user.type(passwordInput, mockLogInData.password)

        const logInButton = screen.getByText(/login.buttons.logIn/i)
        await user.click(logInButton)

        act(() => {
          store.dispatch(setState({ loading: false }))
        })
        await waitFor(() => {
          const loginDialogAfter = screen.queryByTestId(/login-dialog/i)
          expect(loginDialogAfter).toBeNull()
        })
        // expect(logInCall).toHaveBeenCalledTimes(1)
        // expect(logInCall).toHaveBeenCalledWith(mockLogInData)
        expect(setAxiosAuthAccessToken).toHaveBeenCalledTimes(1)
        expect(setAxiosAuthAccessToken).toHaveBeenCalledWith(logInData.access_token)
        expect(setAxiosAuthRefreshToken).toHaveBeenCalledTimes(1)
        expect(setAxiosAuthRefreshToken).toHaveBeenCalledWith(logInData.refresh_token)
        // screen.debug()
      })
      test('pressing cancel button', async () => {
        const mockLogInData = {
          email: 'sa6702@gmail.com', password: 'ytrewq'
        }
        // logInCall.mockImplementation(
        //   () => ({ data: { payload: logInData, message: 'mock message' } })
        // )
        const user = userEvent.setup()
        const testState = {
          ...initialState(),
          loading: true, isLogInOpened: true
        }
        const store = setupStore({ auth: testState }, logInSaga)
        renderWithProviders(<LogIn />, {
          preloadedState: { auth: testState }, store
        })
        const loginDialogBefore = screen.getByTestId('login-dialog')
        expect(loginDialogBefore).not.toBeNull()
        const emailInput = screen.getByLabelText(/login.labels.email/i)
        const passwordInput = screen.getByLabelText(/login.labels.password/i)
        await user.clear(emailInput)
        await user.type(emailInput, mockLogInData.email)
        await user.clear(passwordInput)
        await user.type(passwordInput, mockLogInData.password)
        expect(emailInput).toHaveValue(mockLogInData.email)
        expect(passwordInput).toHaveValue(mockLogInData.password)
        const cancelButton = screen.getByTestId('button-cancel')
        await user.click(cancelButton)
        expect(emailInput).toHaveValue(initValues.email)
        expect(passwordInput).toHaveValue(initValues.password)
        await waitFor(() => {
          const loginDialogAfter = screen.queryByTestId('login-dialog')
          expect(loginDialogAfter).toBeNull()
        })
        // screen.debug()
      })
      test('pressing singup button', async () => {
        const user = userEvent.setup()
        const testState = {
          ...initialState(),
          loading: true, isLogInOpened: true
        }
        const store = setupStore({ auth: testState }, logInSaga)
        renderWithProviders(<LogIn />, {
          preloadedState: { auth: testState }, store
        })
        let state = store.getState().auth
        expect(state).toEqual(expect.objectContaining({
          isLogInOpened: true, isSignUpOpened: false
        }))
        const signUpButton = screen.getByText(/login.buttons.signUp/i)

        await user.click(signUpButton)
        state = store.getState().auth
        expect(state).toEqual(expect.objectContaining({
          isLogInOpened: false, isSignUpOpened: true
        }))
        // screen.debug(signUpButton)
      })
    })
  })
})
