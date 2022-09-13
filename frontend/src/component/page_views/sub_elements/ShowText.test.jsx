import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { useAppSelector } from '../../../hooks/reactRedux'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../utils/testUtils'
import { PARAGRAPH } from '../../../constants/elementTypes'
import ShowText from './ShowText'
import ContextMenu from '../editing/menus/ContextMenu'

jest.mock('../../../hooks/reactRedux', () => ({
  __esModule: true,
  ...jest.requireActual('../../../hooks/reactRedux'),
  useAppSelector: jest.fn()
}))
const mockedContextMenu = jest.fn()
jest.mock('../editing/menus/ContextMenu', () => ({
  __esModule: true,
  ...jest.requireActual('../editing/menus/ContextMenu'),
  default: props => {
    mockedContextMenu(props)
    return <mocked-context-menu data-testId='mocked-context-menu' />
  }
}))

describe('ShowText', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('../../../hooks/reactRedux')
    jest.unmock('../editing/menus/ContextMenu')
  })
  const mockedProps = {
    contentToShow: {
      title: 'Mocked title',
      content: ['Mocked first line', 'Mocked second line']
    },
    recordId: 'mockedRecordId',
    textType: PARAGRAPH,
    setTextEdit: jest.fn(),
    parentEdited: false
  }
  describe('appearance', () => {
    test('snapshot', () => {
      useAppSelector.mockImplementation(() => ({ editable: false }))
      const { container } = renderWithProviders(<ShowText {...mockedProps} />)
      expect(container).toMatchSnapshot()
      // screen.debug(container)
    })
  })
  describe('actions', () => {
    test('tooltip visible', async () => {
      const user = userEvent.setup()
      useAppSelector.mockImplementation(() => ({ editable: true }))
      renderWithProviders(<ShowText {...mockedProps} />)
      const element = screen.getByTestId('tooltip')
      await user.hover(element)
      const tooltip = await screen.findByRole('tooltip')
      expect(tooltip).toBeInTheDocument()
    })
    test.skip('context menu', async () => {
      // I'm unable to test this menu with lazy import, it works with normal import.
      const user = userEvent.setup()
      useAppSelector.mockImplementation(() => ({ editable: true }))
      renderWithProviders(<ShowText {...mockedProps} />)
      const element = screen.getByTestId('tooltip')
      await waitFor(() => {
        user.pointer([{ target: element }, { keys: '[MouseRight]' }])
      })
      await waitFor(() => {
        screen.getByTestId('mocked-context-menu')
        expect(mockedContextMenu).toHaveBeenCalledTimes(1);
        console.log('mockedContextMenu ->', mockedContextMenu.mock.calls)
      })
      screen.debug(element)
    })
  })
})