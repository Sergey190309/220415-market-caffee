import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reactRedux'
import { initialState } from '../../redux/slices/auth'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { initialState as initDeviceState } from '../../redux/slices/device'
import { initialState as initAuthState } from '../../redux/slices/auth'
import { renderWithProviders } from '../../utils/testUtils'
import Greeting from './Greeting'

describe('Greeting', () => {
  const testDeviceState = { ...initDeviceState }
  const testAuthState = { ...initAuthState() }
  afterAll(() => {
    jest.unmock('../../api/apiClient')
  })
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('appearance', () => {
    test('snapshot, all possible elements', () => {
      const mockDeviceState = { ...testDeviceState, editable: true }
      const mockAuthState = {
        ...testAuthState, isLoggedIn: true, isAdmin: true, user_name: 'mocked name'
      }
      const { container } = renderWithProviders(<Greeting />, {
        preloadedState: {
          auth: mockAuthState, device: mockDeviceState
        }
      })
      expect(container).toMatchSnapshot()
      // screen.debug(container)
    })
    test('admin logged', () => {
      const mockDeviceState = { ...testDeviceState, editable: true }
      const mockAuthState = {
        ...testAuthState, isLoggedIn: true, isAdmin: true, user_name: 'mocked name'
      }
      renderWithProviders(<Greeting />, {
        preloadedState: {
          auth: mockAuthState, device: mockDeviceState
        }
      })
      const greeting = screen.getByTestId('greeitng-outer-box')
      expect(greeting).toHaveTextContent(mockAuthState.user_name)
      expect(greeting).toHaveTextContent('editable')
    })
    test('user logged', () => {
      const mockDeviceState = { ...testDeviceState, editable: true }
      const mockAuthState = {
        ...testAuthState, isLoggedIn: true, user_name: 'mocked name'
      }
      renderWithProviders(<Greeting />, {
        preloadedState: {
          auth: mockAuthState, device: mockDeviceState
        }
      })
      const greeting = screen.getByTestId('greeitng-outer-box')
      expect(greeting).toHaveTextContent(mockAuthState.user_name)
      expect(greeting).not.toHaveTextContent('editable')
    })
    test('noone logged', () => {
      const mockDeviceState = { ...testDeviceState, editable: true }
      const mockAuthState = testAuthState
      const { container } = renderWithProviders(<Greeting />, {
        preloadedState: {
          auth: mockAuthState, device: mockDeviceState
        }
      })
      expect(container).toBeEmptyDOMElement()
    })
  })
  describe('actions', () => {
    test('switch editable', () => {

    })
  })
})