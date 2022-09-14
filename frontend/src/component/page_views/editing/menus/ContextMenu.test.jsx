import React from 'react'
import { useAppSelector } from '../../../../hooks/reactRedux'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../../utils/testUtils'

// import UpperLevelMenu from './UpperLevelMenu'
import ContextMenu from './ContextMenu'

const mockedUpperLevelMenu = jest.fn()
jest.mock('./UpperLevelMenu', () => ({
  __esModule: true,
  ...jest.requireActual('./UpperLevelMenu'),
  default: props => {
    mockedUpperLevelMenu(props)
    return <mock-upper-level-menu data-testid='mocked-upper-level-menu' />
  }
}))
jest.mock('../../../../hooks/reactRedux', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../hooks/reactRedux'),
  useAppSelector: jest.fn()
}))
describe('ContextMenu', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('./UpperLevelMenu')
    jest.unmock('../../../../hooks/reactRedux')
  })
  const testProps = {
    contextMenu: { mouseX: 0, mouseY: 0 },
    contextMenuCloseHandler: jest.fn(),
    simpleElement: false,
    setTextEdit: jest.fn(),
  }
  describe('appearance', () => {
    test('render, snapshot block element', () => {
      useAppSelector.mockImplementation(() => ({ editable: true }))
      const { baseElement } = renderWithProviders(<ContextMenu {...testProps} />)
      const menuItems = screen.getAllByRole('menuitem')
      expect(menuItems).toHaveLength(7);
      expect(baseElement).toMatchSnapshot()
      // screen.debug(baseElement)
    })
    test('render, snapshot simple element', () => {
      useAppSelector.mockImplementation(() => ({ editable: true }))
      const actualProps = {...testProps, simpleElement: true}
      const { baseElement } =
        renderWithProviders(<ContextMenu {...actualProps} />)
      const menuItems = screen.getAllByRole('menuitem')
      expect(menuItems).toHaveLength(4);
      expect(baseElement).toMatchSnapshot()
      // screen.debug(baseElement)
    })
  })
  describe('actions', () => {
    test('editElement', async () => {
      useAppSelector.mockImplementation(() => ({ editable: true }))
      const user = userEvent.setup()
      renderWithProviders(<ContextMenu {...testProps} />)
      const editElement = screen.getByRole('menuitem', { name: 'contextMenu.editElement' })
      await user.click(editElement)
      // console.log('setTextEdit ->', testProps.setTextEdit.mock.calls)
      expect(testProps.setTextEdit).toHaveBeenCalledTimes(1)
      expect(testProps.setTextEdit).toHaveBeenCalledWith(true)
      // screen.debug(editElement)
    })
    test('handleUpperLevelElement', async () => {
      useAppSelector.mockImplementation(() => ({ editable: true }))
      const user = userEvent.setup()
      renderWithProviders(<ContextMenu {...testProps} />)
      const handleUpperLevelElement = screen.getByRole('menuitem', { name: 'contextMenu.handleUpperLevelElement' })
      await user.click(handleUpperLevelElement)
      // console.log('mockedUpperLevelMenu ->', mockedUpperLevelMenu.mock.calls[0])
      expect(mockedUpperLevelMenu).toHaveBeenCalledTimes(1)
      expect(mockedUpperLevelMenu.mock.calls[0][0]).toEqual({
        upperLevelMenu: { mouseX: 2, mouseY: -6 },
        upperLevelMenuCloseHandler: expect.any(Function)
      })
      // screen.debug(handleUpperLevelElement)
    })
  })
})