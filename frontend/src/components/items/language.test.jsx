import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'

import store from '../../redux/store'
import Language, { onChange } from './Language'
import { initLoadingSuccess } from '../../redux/slices'
import userEvent from '@testing-library/user-event'

describe('Language switcher testing', () => {
  describe('function testing', () => {
    test('onChange testing', () => {
      const mockValue = 'mockValue'
      const mockSetActiveLng = jest.fn()
      const mockDispatch = jest.fn()
      const mockI18next = {
        changeLanguage: jest.fn()
      }

      onChange(mockValue, mockSetActiveLng, mockDispatch, mockI18next)
      expect(mockSetActiveLng).toHaveBeenCalledTimes(1)
      expect(mockSetActiveLng).toHaveBeenCalledWith(mockValue)

      expect(mockDispatch).toHaveBeenCalledTimes(1)

      expect(mockI18next.changeLanguage).toHaveBeenCalledTimes(1)
      expect(mockI18next.changeLanguage).toHaveBeenCalledWith(mockValue)
    })
  })
  describe('Component', () => {
    const mockProps = {
      onChange: jest.fn(),
      i18next: {
        language: 'ru',
        languages: ['en', 'ru']
      }
    }

    test('it rendered normal way (snapshot)', () => {
      const { container, rerender } = render(
        <Provider store={store}>
          <Language {...mockProps} />
        </Provider>
      )
      store.dispatch(initLoadingSuccess())
      rerender(
        <Provider store={store}>
          <Language {...mockProps} />
        </Provider>
      )
      expect(container).toMatchSnapshot()
      // screen.debug();
    })

    describe('user action', () => {
      test('FAILED click, I am unable to simulate click', async () => {
        /**
         * It looks semantic react limitation:
         * https://stackoverflow.com/questions/52813527/cannot-check-expectelm-not-tobevisible-for-semantic-ui-react-component
         * Not sure about
         */
        store.dispatch(initLoadingSuccess())
        render(
          // const {rerender} = render(
          <Provider store={store}>
            <Language {...mockProps} />
          </Provider>
        )
        /**
         * Structure
         */
        const dropdown = screen.getByTestId('dropdown')
        expect(dropdown).toBeVisible()
        expect(dropdown.children).toHaveLength(3)

        const display = dropdown.children[0]
        expect(display).toHaveClass('divider text', { exact: true })
        const icon = dropdown.children[1]
        expect(icon).toHaveClass('dropdown icon', { exact: true })

        const options = dropdown.children[2]
        // expect(options).toHaveClass('menu transition', { exact: true });
        expect(options).toBeVisible()
        expect(options.children).toHaveLength(2)
        const option0 = options.children[0]
        expect(option0).toHaveClass('active selected item', { exact: true })
        const option1 = options.children[1]
        expect(option1).toHaveClass('item', { exact: true })

        /**
         * Actions
         */
        userEvent.click(dropdown)

        const clickedOptions = screen.getAllByRole('option') //
        expect(clickedOptions).toHaveLength(2)
        expect(clickedOptions[1]).toHaveClass('item', { exact: true })
        await waitFor(() => {
          userEvent.click(clickedOptions[1])
          const clickedOption = clickedOptions[1]
          expect(clickedOption).toHaveClass('item', { exact: true })
        })

        // rerender(
        //   <Provider store={store}>
        //     <Language {...mockProps} />
        //   </Provider>
        // )
        // screen.debug();
      })
    })
  })
})
