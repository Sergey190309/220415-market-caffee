import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { setAxiosCommonLng } from '../../../api/apiClient'
import { lngSwitch, structureStart } from '../../../redux/slices'
import { initialState, setTestTechState } from '../../../redux/slices/tech'
import { setupStore, renderWithProviders } from '../../../utils/testUtils'

import LanguageSwitcher, { onChangeLng } from './LanguageSwitcher'

jest.mock('../../../api/apiClient', () => ({
  __esModule: true,
  ...jest.requireActual('../../../api/apiClient'),
  setAxiosCommonLng: jest.fn()
}))
describe('LanguageSwitcher testing', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('../../../api/apiClient')
  })
  describe('non react elements', () => {
    test('onChange Lng', () => {
      const lng = 'lng'
      const setActiveLng = jest.fn()
      const dispatch = jest.fn()
      const _i18next = {
        changeLanguage: jest.fn()
      }
      onChangeLng(lng, setActiveLng, dispatch, _i18next)
      expect(setActiveLng).toHaveBeenCalledTimes(1)
      expect(setActiveLng).toHaveBeenCalledWith(lng)
      expect(_i18next.changeLanguage).toHaveBeenCalledTimes(1)
      expect(_i18next.changeLanguage).toHaveBeenCalledWith(lng)
      expect(setAxiosCommonLng).toHaveBeenCalledTimes(1)
      expect(setAxiosCommonLng).toHaveBeenCalledWith(lng)
      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual({ type: lngSwitch.type, payload: lng })
      expect(dispatch.mock.calls[1][0]).toEqual({ type: structureStart.type, payload: undefined })
    })
  })
  describe('react elements', () => {
    test('snapshot', async () => {
      const user = userEvent.setup()
      const testState = { ...initialState }
      const testStore = setupStore({ tech: testState })
      const testProps = {
        onChangeLng: jest.fn()
      }
      const { baseElement } = renderWithProviders(
        <LanguageSwitcher {...testProps} />, { preloadedState: { auth: testState }, testStore })
      const toggleButton = screen.getByRole('button')
      // console.log('toggle button ->', toggleButton)
      await user.click(toggleButton)
      // screen.debug()
      expect(baseElement).toMatchSnapshot()
    })
    describe('hooks and functions', () => {
      test('lng and lngs setting after i18nLoaded', async () => {
        // const user = userEvent.setup()
        const testState = {
          ...initialState,
          // i18nLoaded: true
        }
        const testStore = setupStore({ tech: testState, lng: { lng: 'fuck!' } })
        const testProps = {
          onChangeLng: jest.fn()
        }
        renderWithProviders(
          <LanguageSwitcher {...testProps} />, {
            preloadedState: { tech: testState, lng: { lng: 'fuck!' } }, testStore
          }
        )

        testStore.dispatch(setTestTechState({ i18nLoaded: true }))
        console.log('tech state ->', testStore.getState().tech)
        console.log('lng state ->', testStore.getState().lng)
        // const toggleButton = screen.getByRole('button')
        // await user.click(toggleButton)
        // screen.debug()
      })
    })
  })
})
