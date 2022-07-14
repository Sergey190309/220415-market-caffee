import React from 'react'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { useTranslation } from 'react-i18next'

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import configureStore from 'redux-mock-store'

import { renderWithProviders } from '../../../utils/testUtils'
import LogIn, { logInSchema } from './LogIn'
// import reducer from '../../../redux/slices'
import { setLogInVisibility } from '../../../redux/slices'
import { initialState } from '../../../redux/slices/auth'
import { init } from 'i18next'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn((key) => key)
    // t: key => key
    // i18n: { changeLanguage: jest.fn() },
  })
}))

describe('LogIn testing', () => {
  afterAll(() => {
    // jest.unmock('react-redux')
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
    describe('integration test', () => {
      const middlewares = []
      const mockStore = configureStore(middlewares)
      test('pressing login button', async () => {
        const user = userEvent.setup()
        const testState = { ...initialState(), loading: true, isLogInOpened: true }
        const initState = { auth: testState }
        const store = mockStore(initState)

        const { rerender } = renderWithProviders(<LogIn />, {
          preloadedState: { initState }, store
        })

        expect(screen.queryByTestId('login-form-linear-progress')).toBeNull()

        const logInButton = screen.getByTestId('button-login')
        await user.click(logInButton)

        expect(screen.getByTestId('login-form-linear-progress')).not.toBeNull()

        // await store.dispatch()

        const actions = store.getActions()
        console.log('action ->', actions)
        console.log('state.auth ->', store.getState().auth)
        // console.log('linearProgress ->', linearProgress)

        // screen.debug(linearProgress)
      })
    })
  })
})
