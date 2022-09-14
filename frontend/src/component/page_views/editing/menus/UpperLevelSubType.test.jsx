import React from 'react'
import { useAppSelector } from '../../../../hooks/reactRedux'
import { screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../../utils/testUtils'
import UpperLevelSubType from './UpperLevelSubType'
jest.mock('../../../../hooks/reactRedux', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../hooks/reactRedux'),
  useAppSelector: jest.fn()
}))
describe('UpperLevelSubType', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('../../../../hooks/reactRedux')
  })
  const testProps = {
    upperLevelSubType: { mouseX: 0, mouseY: 0 },
    upperLevelSubTypeCloseHandler: jest.fn()
  }
  describe('appearance', () => {
    test('snapshot', () => {
      useAppSelector.mockImplementation(() => ({ editable: true }))
      const { baseElement } = renderWithProviders(<UpperLevelSubType {...testProps} />)
      const menuItems = screen.getAllByRole('menuitem')
      expect(baseElement).toMatchSnapshot()
      expect(menuItems).toHaveLength(2)
    })
  })
})