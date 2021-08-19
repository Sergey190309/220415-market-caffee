import React from 'react'
import { Provider } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  screen,
  // connectedLinkedRender,
  render,
  waitFor
} from '../../testUtils'
import userEvent from '@testing-library/user-event'

import store from '../../redux/store'
import { LogIn, logInSchema, formStructure } from './LogIn'
import { authSetState } from '../../redux/slices'
// import { logInCall } from '../../api/calls/getAuthTechInfo';
// import { useTranslation } from '../../../__mock__/react-i18next';
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key
    // i18n: { changeLanguage: jest.fn() },
  })
}))
jest.mock('../../api/calls/getAuthTechInfo')

describe('LogIn component testing', () => {
  const initValues = {
    email: 'a@agatha-ng.com',
    password: 'qwerty'
  }
  const testProps = {
    initValues: initValues,
    logInSchema: jest.fn(),
    openModal: jest.fn(),
    closeModal: jest.fn(),
    // closeModal: jest.fn(() => ({ kindOfModal: ''})),
    logInStart: jest.fn(),
    logInModalClosed: jest.fn()
    // onSubmit: jest.fn()
  }
  describe('Non react compinent', () => {
    test('form structure', () => {
      expect(formStructure).toEqual(initValues)
    })

    test('logInSchema function', () => {
      const { t } = useTranslation()
      const result = logInSchema(t)
      expect(result.fields.email.type).toBe('string')
      expect(result.fields.password.type).toBe('string')
    })
  })

  describe('component testing', () => {
    describe('appearance', () => {
      test('it exists and has all elements', () => {
        render(
          <Provider store={store}>
            <LogIn {...testProps} />
          </Provider>
        )
        expect(screen.getAllByRole('heading')).toHaveLength(2)
        expect(screen.getAllByRole('textbox')).toHaveLength(1)
        expect(screen.getAllByRole('button')).toHaveLength(4)
        expect(screen.getByPlaceholderText('login.placeHolders.password')).toBeVisible()
        // console.log(screen.getByPlaceholderText('placeHolders.password').value)
        // console.log(screen.ByPlaceholderText(''));
      })

      test('input elements has values according props', () => {
        const activeProps = {
          ...testProps,
          initValues: {
            email: 'test@mail.test',
            password: 'password'
          }
        }
        render(
          <Provider store={store}>
            <LogIn {...activeProps} />
          </Provider>
        )
        expect(screen.getByRole('textbox')).toHaveValue('test@mail.test')
        expect(screen.getByPlaceholderText('login.placeHolders.password')).toHaveValue(
          'password'
        )
      })
      test('Header and footer have appropriate classes', () => {
        render(
          <Provider store={store}>
            <LogIn {...testProps} />
          </Provider>
        )
        expect(screen.getByRole('heading', { name: 'header' })).toHaveClass(
          'ui teal center aligned header',
          { exact: true }
        )
        expect(screen.getByRole('heading', { name: 'message' })).toHaveClass(
          'ui header',
          { exact: true }
        )
        // console.log(screen.getByRole('heading', {name: 'header'}));
      })

      test('buttons have appropriate classes', () => {
        render(
          <Provider store={store}>
            <LogIn {...testProps} />
          </Provider>
        )
        expect(screen.getByRole('button', { name: 'buttons.logIn' })).toHaveClass(
          'ui teal large basic button',
          { exact: true }
        )
        expect(screen.getByRole('button', { name: 'buttons.reset' })).toHaveClass(
          'ui olive large basic button',
          { exact: true }
        )
        expect(screen.getByRole('button', { name: 'buttons.cancel' })).toHaveClass(
          'ui orange large basic button',
          { exact: true }
        )
        expect(screen.getByRole('button', { name: 'buttons.signUp' })).toHaveClass(
          'ui teal large basic left floated button',
          { exact: true }
        )
      })
    })

    describe('buttons behavior', () => {
      let actualProps
      beforeEach(() => {
        jest.resetAllMocks()
        // jest.resetModules()
        // console.log('beforeEach');
        actualProps = {
          ...testProps,
          logInStart: jest.fn().mockReturnValue({ type: 'auth/logInStart' }),
          openModal: jest
            .fn()
            .mockReturnValue({ type: 'device/openModal', payload: 'signUp' }),
          closeModal: jest.fn().mockReturnValue({ type: 'device/closeModal' })
        }
      })
      test('login', async () => {
        // const dispatch = jest.fn()
        render(
          <Provider store={store}>
            <LogIn {...actualProps} />
          </Provider>
        )
        const logInButton = screen.getByRole('button', { name: 'buttons.logIn' })
        userEvent.click(logInButton)
        await waitFor(() => {
          // expect(dispatch).toHaveBeenCalledTimes(1);
          expect(actualProps.logInStart).toHaveBeenCalledTimes(1)
          expect(actualProps.closeModal).toHaveBeenCalledTimes(1)
          // console.log(actualProps.logInStart.mock.calls[0][0]);
          expect(actualProps.logInStart.mock.calls[0][0]).toEqual(initValues)
        })
      })

      test('cancel', async () => {
        store.dispatch(authSetState({ isLoggedIn: false }))
        /**
         * Above is for cleaning up the state took place in previous test.
         */
        actualProps.closeModal.mockReset()
        actualProps = {
          ...testProps,
          closeModal: jest.fn().mockReturnValue({ type: 'device/closeModal' })
        }
        render(
          <Provider store={store}>
            <LogIn {...actualProps} />
          </Provider>
        )
        // expect(actualProps.closeModal).toHaveBeenCalledTimes(1);
        const cancelButton = screen.getByRole('button', { name: 'buttons.cancel' })
        userEvent.click(cancelButton)
        await waitFor(() => {
          expect(actualProps.closeModal).toHaveBeenCalledTimes(1)
          /**
           * I'm unable to understatnd why there are 2 closeModal calls.
           * First call from useEffect hook. Second from onClick.
           * If running this test separetelly
           */
        })
        // screen.debug()
      })

      test('sign up', async () => {
        render(
          <Provider store={store}>
            <LogIn {...actualProps} />
          </Provider>
        )
        const sighUpButton = screen.getByRole('button', { name: 'buttons.signUp' })
        userEvent.click(sighUpButton)
        await waitFor(() => {
          expect(actualProps.openModal).toHaveBeenCalledTimes(1)
          expect(actualProps.openModal.mock.calls[0][0]).toEqual('signUp')
        })
      })
    })
  })
})
