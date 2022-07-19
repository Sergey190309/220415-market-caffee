import React from 'react'
import { useTranslation } from 'react-i18next'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders, setupStore } from '../../../utils/testUtils'

import SignUp, { signUpSchema, initValues } from './SignUp'
import { initialState, setState } from '../../../redux/slices/auth'
import { signUpSaga } from '../../../redux/saga/auth'
import { signUpCall } from '../../../api/calls/getAuthTechInfo'
import { act } from 'react-dom/test-utils'

jest.mock('../../../api/calls/getAuthTechInfo', () => ({
  __esModule: true,
  ...jest.requireActual('../../../api/calls/getAuthTechInfo'),
  signUpCall: jest.fn()
}))
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn((key) => key)
  })
}))

describe('SignUp testing', () => {
  afterAll(() => {
    jest.unmock('react-i18next')
  })
  describe('non react components', () => {
    test('signUpSchema', () => {
      const { t } = useTranslation()
      const result = signUpSchema(t)
      // console.log('t calls ->', t.mock.calls)
      expect(result.fields.userName.type).toBe('string')
      expect(result.fields.email.type).toBe('string')
      expect(result.fields.password.type).toBe('string')
      expect(result.fields.password2.type).toBe('string')
      expect(t).toHaveBeenCalledTimes(6)
      expect(t.mock.calls[0][0]).toBe('signup.errors.userName.max')
      // eslint-disable-next-line no-template-curly-in-string
      expect(t.mock.calls[0][1]).toEqual({ max: '${max}' })
      expect(t.mock.calls[1][0]).toBe('signup.errors.email.invalidEmail')
      expect(t.mock.calls[2][0]).toBe('signup.errors.required')
      expect(t.mock.calls[3][0]).toBe('signup.errors.password.min')
      // eslint-disable-next-line no-template-curly-in-string
      expect(t.mock.calls[3][1]).toEqual({ min: '${min}' })
      expect(t.mock.calls[4][0]).toBe('signup.errors.required')
      expect(t.mock.calls[5][0]).toBe('signup.warnings.pwdMustMatch!')
    })
  })
  describe('react components', () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })
    describe('apprearance', () => {
      test('screen shot', () => {
        const testState = { ...initialState(), loading: true, isSignUpOpened: true }
        const { baseElement } = renderWithProviders(<SignUp />, {
          preloadedState: { auth: testState }
        })
        expect(baseElement).toMatchSnapshot()
        // console.log('testState ->', testState)
        // screen.debug()
      })
      test('empty component, not visible', () => {
        const testState = { ...initialState(), loading: true }
        renderWithProviders(<SignUp />, { preloadedState: { auth: testState } })
        const signUpDialog = screen.queryByTestId('signup-dialog')
        expect(signUpDialog).toBeNull()
        // expect(baseElement).toMatchSnapshot()
        // screen.debug(signUpDialog)
      })
    })
    describe('functional tests', () => {
      test('change fields and signup pressing', async () => {
        const mockSignUpData = {
          user_name: 'mock user_name', email: 'mock@gmail.com', password: 'ytrewq'
        }
        signUpCall.mockImplementation(() => ({
          data: { payload: 'mock payload', message: 'mock message' }
        }))
        const user = userEvent.setup()
        const testState = { ...initialState(), loading: true, isSignUpOpened: true }
        const store = setupStore({ auth: testState }, signUpSaga)

        renderWithProviders(< SignUp />, { preloadedState: { auth: testState }, store })
        const signUpDialogBefore = screen.getByTestId(/signup-dialog/i)
        expect(signUpDialogBefore).not.toBeNull()
        expect(screen.queryByTestId('signup-form-linear-progress')).toBeNull()

        const userNameInput = screen.getByLabelText(/signup.labels.userName/i)
        const emailInput = screen.getByLabelText(/signup.labels.email/i)
        const passwordInput = screen.getByLabelText(/signup.labels.password$/i)
        const password2Input = screen.getByLabelText(/signup.labels.password2/i)

        await user.clear(userNameInput)
        await user.type(userNameInput, mockSignUpData.user_name)
        await user.clear(emailInput)
        await user.type(emailInput, mockSignUpData.email)
        await user.clear(passwordInput)
        await user.type(passwordInput, mockSignUpData.password)
        await user.clear(password2Input)
        await user.type(password2Input, mockSignUpData.password)

        const signUpButton = screen.getByText(/signup.buttons.signup/i)
        await user.click(signUpButton)

        act(() => {
          store.dispatch(setState({ loading: false }))
        })

        await waitFor(() => {
          const signUpDialogAfter = screen.queryByTestId(/signup-dialog/i)
          // screen.debug(signUpDialogAfter)
          // console.log('signUpDialogAfter ->', signUpDialogAfter)
        })

        // expect(signUpCall).toHaveBeenCalledTimes(1)
        // expect(signUpCall).toHaveBeenCalledWith(mockSignUpData)
        // expect(passwordInput).toHaveLength(2);
        // screen.debug(passwordInput)
        // console.log('signUpCall ->', signUpCall.mock.calls)
      })
    })
  })
})
