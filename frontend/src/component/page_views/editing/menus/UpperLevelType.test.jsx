import React from 'react'
import { useAppSelector } from '../../../../hooks/reactRedux'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../../utils/testUtils'
import UpperLevelType from './UpperLevelType'
// import UpperLevelSubType from './UpperLevelSubType'
jest.mock('../../../../hooks/reactRedux', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../hooks/reactRedux'),
  useAppSelector: jest.fn()
}))
const mockedUpperLevelSubType = jest.fn()
jest.mock('./UpperLevelSubType', () => ({
  __esModule: true,
  ...jest.requireActual('./UpperLevelSubType'),
  default: props => {
    mockedUpperLevelSubType(props)
    return <mock-upper-level-subtype data-testid='mocked-upper-level-subtype' />
  }
}))
describe('UpperLevelSubType', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('../../../../hooks/reactRedux')
    jest.unmock('./UpperLevelType')
  })
  const testProps = {
    upperLevelType: { mouseX: 0, mouseY: 0 },
    upperLevelTypeCloseHandler: jest.fn()
  }
  describe('appearance', () => {
    test('snapshot', () => {
      useAppSelector.mockImplementation(() => ({ editable: true }))
      const { baseElement } = renderWithProviders(<UpperLevelType {...testProps} />)
      const menuItems = screen.getAllByRole('menuitem')
      expect(baseElement).toMatchSnapshot()
      expect(menuItems).toHaveLength(4)
    })
  })
  describe('actions', () => {
    test('vblock', async () => {
      const user = userEvent.setup()
      useAppSelector.mockImplementation(() => ({ editable: true }))
      renderWithProviders(<UpperLevelType {...testProps} />)
      const addAbove = screen.getByRole('menuitem', { name: 'upperLevelType.vblock' })
      await user.click(addAbove)
      // console.log('mockedUpperLevelSubType ->', mockedUpperLevelSubType.mock.calls[0][0])
      expect(mockedUpperLevelSubType).toHaveBeenCalledTimes(1)
      expect(mockedUpperLevelSubType).toHaveBeenCalledWith({
        upperLevelSubType: { mouseX: 2, mouseY: -6 },
        upperLevelSubTypeCloseHandler: expect.any(Function)
      })
    })
    test('hblock', async () => {
      const user = userEvent.setup()
      useAppSelector.mockImplementation(() => ({ editable: true }))
      renderWithProviders(<UpperLevelType {...testProps} />)
      const addBelow = screen.getByRole('menuitem', { name: 'upperLevelType.hblock' })
      await user.click(addBelow)
      expect(mockedUpperLevelSubType).toHaveBeenCalledTimes(1)
      expect(mockedUpperLevelSubType).toHaveBeenCalledWith({
        upperLevelSubType: { mouseX: 2, mouseY: -6 },
        upperLevelSubTypeCloseHandler: expect.any(Function)
      })
    })
  })
})