<<<<<<< HEAD
describe('ConfirmPassword testing', () => {
  test('dummy', () => {
=======
import React from 'react'
import { Provider } from 'react-redux'
import { useTranslation } from 'react-i18next'
>>>>>>> dev210823

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import store from '../../redux/store'
import ConfirmPassword, { confirmPasswordSchema, formStructure } from './ConfirmPassword'
import { clearAlerts, closeModal, confirmPasswordModalClosed, confirmPasswordStart, setMessage, startAlert } from '../../redux/slices'
import { refreshTokenAxiosClient as mockRefreshTokenClient } from '../../api/apiClient'
import { resolveDataConfirmPassword } from '../../testAxiosConstants'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key
    // i18n: { changeLanguage: jest.fn() },
  })
}))

describe('ConfirmPassword component testing', () => {
  const initValues = {
    password: 'qwerty'
  }
  describe('Non react part', () => {
    test('form structure', () => {
      expect(formStructure).toEqual(initValues)
    })
    test('Yup schema', () => {
      const { t } = useTranslation()
      const result = confirmPasswordSchema(t)
      expect(result.fields.password.type).toBe('string')
      // console.log('auth, confirmPassword.test, result ->', result)
    })
  })
  describe('Component testing', () => {
    const alertPayload = {
      message: 'mockMessage',
      alertType: 'info',
      timeout: 3000,
      id: 'mockId'
    }
    const testProps = {
      initValues,
      confirmPasswordSchema: jest.fn(),
      closeModal: jest.fn(),
      confirmPasswordStart: jest.fn(),
      confirmPasswordModalClosed: jest.fn(),
      setMessage: jest.fn()
    }
    beforeEach(() => {
      jest.resetAllMocks()
    })
    describe('appearance', () => {
      test('it exists and can be rendered (snapshot)', () => {
        render(
          // const { container } = render(
          <Provider store={store}>
            <ConfirmPassword />
          </Provider>
        )
        const wholeComponent = screen.getByTestId('whole-component')
        expect(wholeComponent).toMatchSnapshot()
      })
      test('it has all appropriate elements with alert', () => {
        store.dispatch(startAlert(alertPayload))
        render(
          // const { container } = render(
          <Provider store={store}>
            <ConfirmPassword />
          </Provider>
        )
        const alertHeader = screen.getByRole('heading', { name: alertPayload.message })
        expect(alertHeader).toHaveClass('ui teal header', { exact: true })
        expect(alertHeader).toHaveTextContent(alertPayload.message)
        expect(alertHeader.firstChild).toHaveClass('hand point right outline icon', { exact: true })
        const header = screen.getByRole('heading', { name: 'confirmpassword.header' })
        expect(header).toHaveClass('ui teal center aligned header', { exact: true })
        expect(header.firstChild.firstChild).toHaveClass('utensils large icon', { exact: true })
        const input = screen.getByTestId('input-password')
        expect(input.children).toHaveLength(3)
        expect(input.children[0]).toHaveClass('ui label label', { exact: true })
        expect(input.children[1]).toHaveAttribute('id', 'input-password')
        expect(input.children[2]).toHaveClass('key icon', { exact: true })
        const confirmButton = screen.getByRole('button', { name: 'confirmpassword.buttons.confirm' })
        expect(confirmButton).toHaveClass('ui teal large basic button', { exact: true })
        expect(confirmButton).toHaveAttribute('id', 'formik-semantic-ui-react-submit-button')
        const cancelButton = screen.getByRole('button', { name: 'confirmpassword.buttons.cancel' })
        expect(cancelButton).toHaveClass('ui orange large basic button', { exact: true })
        // console.log('auth, confirmPassword.test, element ->', input.children.length)
        // screen.debug(alertHeader)
      })

      test('input field contains value accrding props', () => {
        const actualProps = {
          ...testProps,
          initValues: {
            password: 'mock password'
          }
        }
        store.dispatch(clearAlerts())
        render(
          <Provider store={store}>
            <ConfirmPassword {...actualProps} />
          </Provider>
        )
        const input = screen.getByTestId('input-password')
        expect(input.childElementCount).toBe(3)
        expect(input.children[1]).toHaveValue(actualProps.initValues.password)
        // console.log('auth, confirmPassword.test, element ->', input.children[1].value)
        // screen.debug(input)
      })
    })
    describe('controls behavior ', () => {
      let actualProps

      beforeEach(() => {
        jest.resetAllMocks()
        actualProps = {
          ...testProps,
          confirmPasswordStart: jest.fn(() => ({ type: confirmPasswordStart.type })),
          // confirmPasswordStart: jest.fn().mockReturnValue({ type: confirmPasswordStart.type }),
          closeModal: jest.fn(() => ({ type: closeModal.type })),
          confirmPasswordModalClosed: jest.fn(() => ({ type: confirmPasswordModalClosed.type })),
          setMessage: jest.fn(() => ({ type: setMessage.type, payload: 'mockMessage' }))
        }
      })
      test('input', async () => {
        const inputText = 'input text'
        render(
          <Provider store={store}>
            <ConfirmPassword {...testProps} />
          </Provider>
        )
        const input = screen.getByTestId('input-password').children[1]
        userEvent.clear(input)
        userEvent.type(input, inputText)
        await waitFor(() => {
          expect(input).toHaveValue(inputText)
        })
        // console.log('auth, confirmPassword.test, element ->', input.value)
        // screen.debug(input)
      })
      test('confirm button', async () => {
        mockRefreshTokenClient.put.mockImplementation(() => Promise.resolve({ data: resolveDataConfirmPassword }))

        render(
          <Provider store={store}>
            <ConfirmPassword {...actualProps} />
          </Provider>
        )
        const confirmButton = screen.getByRole('button', { name: 'confirmpassword.buttons.confirm' })
        userEvent.click(confirmButton)
        await waitFor(() => {
          expect(actualProps.confirmPasswordStart).toHaveBeenCalledTimes(1)
          expect(actualProps.confirmPasswordStart).toHaveBeenCalledWith(initValues)
          expect(actualProps.closeModal).toHaveBeenCalledTimes(1)
          expect(actualProps.confirmPasswordModalClosed).toHaveBeenCalledTimes(1)
        })
        // console.log('auth, confirmPassword.test, element ->', confirmButton.value)
        // screen.debug(confirmButton)
      })
      test('cancel button', async () => {
        mockRefreshTokenClient.put.mockImplementation(() => Promise.resolve({ data: resolveDataConfirmPassword }))

        render(
          <Provider store={store}>
            <ConfirmPassword {...actualProps} />
          </Provider>
        )
        const cancelButton = screen.getByRole('button', { name: 'confirmpassword.buttons.cancel' })
        userEvent.click(cancelButton)
        await waitFor(() => {
          // expect(actualProps.confirmPasswordStart).toHaveBeenCalledTimes(1)
          expect(actualProps.setMessage).toHaveBeenCalledTimes(1)
          expect(actualProps.setMessage).toHaveBeenCalledWith('')
          expect(actualProps.closeModal).toHaveBeenCalledTimes(1)
          // expect(actualProps.confirmPasswordModalClosed).toHaveBeenCalledTimes(1)
        })
        // console.log('auth, confirmPassword.test, element ->', cancelButton.value)
        // screen.debug(cancelButton)
      })
    })
  })
})
