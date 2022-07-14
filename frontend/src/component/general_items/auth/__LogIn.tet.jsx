import React from 'react'
import { Provider } from 'react-redux'
import * as reactRedux from 'react-redux'
// import * as formik from 'formik'
// import { useSelector, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { useTranslation } from 'react-i18next'

import { render, screen } from '@testing-library/react'

// import {connectedRender, screen} from '../../../utils/testUtils'
import userEvent from '@testing-library/user-event'

import reducer, {
  setLogInVisibility, setSignUpVisibility, logInStart
} from '../../../redux/slices'
import { initialState, setState } from '../../../redux/slices/auth'

import LogIn, { initValues, logInSchema } from './LogIn'

// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useSelector: jest.fn(),
//   useDispatch: jest.fn()
// }))
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn((key) => key)
    // t: key => key
    // i18n: { changeLanguage: jest.fn() },
  })
}))


const sagaMiddleware = createSagaMiddleware()
const middleware = (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

describe('LogIn testing', () => {
  afterAll(() => {
    jest.unmock('react-redux')
    jest.unmock('react-i18next')
  })
  describe('Non react components', () => {
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
      // console.log('t ->', t.mock.calls)
    })
  })
  describe('Components', () => {
    // const setState = (value) => {
    //   const testState = {...initialState}
    //   return configureStore({ reducer, middleware, initialState: { ...testState } })
    // }
    let store
    const setMockUseSelector = (values) => {
      const defaultValues = {
        loading: false,
        isLogInOpened: true
      }
      // console.log('values ->', values)
      // reactRedux.useSelector.mockImplementation(() => ({
      //   ...defaultValues,
      //   ...values
      // }))
      // useDispatch.mockImplementation(mockDispatch)
    }
    const setMockUseDispatch = () => {
      reactRedux.useDispatch.mockImplementation(() => jest.fn())
    }
    // const useSelectMock = jest.spyOn(reactRedux, 'useSelector')
    // const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
    // const formikMock=jest.spyOn(formik, )
    beforeEach(() => {
      jest.clearAllMocks()
      store = configureStore({ reducer, middleware, initialState })
    })
    test('appearance (snapshot)', () => {
      setMockUseSelector()
      setMockUseDispatch()
      const { baseElement } = render(
        <Provider store={store}>
          <LogIn />
        </Provider>
      )
      expect(baseElement).toMatchSnapshot()
      // screen.debug()
    })
    test('no component if isLogInOpened set false', () => {
      setMockUseSelector({
        isLogInOpened: false
      })
      setMockUseDispatch()
      render(
        <Provider store={store}>
          <LogIn />
        </Provider>
      )
      // const logInDialog = screen.queryByTestId('login-dialog')
      expect(screen.queryByTestId('login-dialog')).toBeNull()
    })
    test.only('button logIn', async () => {
      await store.dispatch(setState({ isLogInOpened: true }))
      // setMockUseSelector({
      //   loading: false,
      //   isLogInOpened: true
      // })
      // const dummyDispatch = jest.fn()
      // useDispatchMock.mockReturnValue(dummyDispatch)
      // expect(dummyDispatch).not.toHaveBeenCalled()
      const user = userEvent.setup()
      // reactReduxImp()
      const { rerender } = render(
        <Provider store={store}>
          <LogIn />
        </Provider>
      )
      // const logInButton = screen.getByTestId('button-login')

      // await user.click(logInButton)

      setMockUseSelector({ loading: true })

      console.log('state ->', store.getState().auth)

      // expect(dummyDispatch.mock.calls[0][0]).toEqual({
      //   type: setLogInVisibility.type, payload: false
      // })
      // expect(dummyDispatch.mock.calls[1][0]).toEqual({
      //   type: logInStart.type, payload: initValues
      // })
      // console.log('dummyDispatch ->', dummyDispatch.mock.calls)
      screen.debug()
      // screen.debug(logInButton)

    })
    test('button signUp', async () => {
      setMockUseSelector({
        loading: false,
        isLogInOpened: true
      })
      const dummyDispatch = jest.fn()
      useDispatchMock.mockReturnValue(dummyDispatch)
      expect(dummyDispatch).not.toHaveBeenCalled()
      const user = userEvent.setup()
      // reactReduxImp()
      render(
        <Provider store={store}>
          <LogIn />
        </Provider>
      )
      const signUpButton = screen.getByTestId('button-signup')
      await user.click(signUpButton)
      expect(dummyDispatch).toHaveBeenCalledTimes(3)
      expect(dummyDispatch.mock.calls[0][0]).toEqual({
        type: setLogInVisibility.type, payload: false
      })
      expect(dummyDispatch.mock.calls[1][0]).toEqual({
        type: setSignUpVisibility.type, payload: true
      })
      expect(dummyDispatch.mock.calls[2][0]).toEqual({
        type: setLogInVisibility.type, payload: false
      })
    })
  })
})
