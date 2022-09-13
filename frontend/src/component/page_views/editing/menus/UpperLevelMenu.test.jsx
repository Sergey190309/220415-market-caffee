import React from 'react'
import { useAppSelector } from '../../../../hooks/reactRedux'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../../utils/testUtils'

import UpperLevelMenu from './UpperLevelMenu'
// import UpperLevelType from './UpperLevelType'
jest.mock('../../../../hooks/reactRedux', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../hooks/reactRedux'),
  useAppSelector: jest.fn()
}))
const mockedUpperLevelType = jest.fn()
jest.mock('./UpperLevelType', () => ({
  __esModule: true,
  ...jest.requireActual('./UpperLevelType'),
  default: props => {
    mockedUpperLevelType(props)
    return <mock-upper-level-type data-testid='mocked-upper-level-type' />
  }
}))
describe('UpperLevelMenu', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('../../../../hooks/reactRedux')
    jest.unmock('./UpperLevelType')
  })
  const testProps = {
    upperLevelMenu: { mouseX: 0, mouseY: 0 },
    upperLevelMenuCloseHandler: jest.fn()
  }
  describe('appearance', () => {
    test('snapshot', () => {
      useAppSelector.mockImplementation(() => ({ editable: true }))
      const { baseElement } = renderWithProviders(<UpperLevelMenu {...testProps} />)
      const menuItems = screen.getAllByRole('menuitem')
      expect(baseElement).toMatchSnapshot()
      expect(menuItems).toHaveLength(4)
    })
  })
  describe('actions', () => {
    test('addAbove', async () => {
      const user = userEvent.setup()
      useAppSelector.mockImplementation(() => ({ editable: true }))
      renderWithProviders(<UpperLevelMenu {...testProps} />)
      const addAbove = screen.getByRole('menuitem', { name: 'upperLevelMenu.addAbove' })
      await user.click(addAbove)
      expect(mockedUpperLevelType).toHaveBeenCalledTimes(1)
      expect(mockedUpperLevelType).toHaveBeenCalledWith({
        upperLevelType: { mouseX: 2, mouseY: -6 },
        upperLevelTypeCloseHandler: expect.any(Function)
      })
    })
    test('addBelow', async () => {
      const user = userEvent.setup()
      useAppSelector.mockImplementation(() => ({ editable: true }))
      renderWithProviders(<UpperLevelMenu {...testProps} />)
      const addBelow = screen.getByRole('menuitem', { name: 'upperLevelMenu.addBelow' })
      await user.click(addBelow)
      expect(mockedUpperLevelType).toHaveBeenCalledTimes(1)
      expect(mockedUpperLevelType).toHaveBeenCalledWith({
        upperLevelType: { mouseX: 2, mouseY: -6 },
        upperLevelTypeCloseHandler: expect.any(Function)
      })
    })
  })
})