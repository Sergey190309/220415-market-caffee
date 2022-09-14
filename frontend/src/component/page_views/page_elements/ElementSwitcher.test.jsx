import React from 'react'
import { screen, waitFor } from '@testing-library/react'

import { useAppContext } from '../../../hooks/react'
import { useAppSelector } from '../../../hooks/reactRedux'
import ElementSwitcher, { getLoadedStructure } from './ElementSwitcher'
import { renderWithProviders } from '../../../utils/testUtils'


const mockedViewHeader = jest.fn()
jest.mock('./ViewHeader', () => ({
  __esModule: true,
  ...jest.requireActual('./ViewHeader'),
  default:  props  => {
    mockedViewHeader(props)
    return <mock-view-header data-testid='mocked-view-header' />
  }
}))
const mockedViewVBlock  =jest.fn()
jest.mock('./ViewVBlock', () => ({
  __esModule: true,
  ...jest.requireActual('./ViewVBlock'),
  default: props => {
    mockedViewVBlock(props)
    return <mocked-view-vblock data-testid='mocked-view-vblock' />
  }
}))
jest.mock('../../../hooks/react', () => ({
  __esModule: true,
  ...jest.requireActual('../../../hooks/react'),
  useAppContext: jest.fn()
}))
jest.mock('../../../hooks/reactRedux', () => ({
  __esModule: true,
  ...jest.requireActual('../../../hooks/reactRedux'),
  useAppSelector: jest.fn()
}))

describe('ElementSwitcher', () => {
  afterAll(() => {
    jest.unmock('./ViewHeader')
    jest.unmock('./ViewVBlock')
    jest.unmock('../../../hooks/react')
    jest.unmock('../../../hooks/reactRedux')
  })
  const mockedComponentName = 'landing'
  const mockedEmptyComponentName = 'admin'
  const mockedStructure = {
    "00": {
      "name": "header",
      "type": "header"
    },
    "01": {
      "qnt": 3,
      "name": "",
      "type": "vblock",
      "subtype": "txt"
    }
  }
  const mockedLoadedStructures = {
    "admin": {},
    "landing": mockedStructure
  }
  describe('non react component', () => {
    test('called with mockStructure', () => {
      expect(getLoadedStructure(mockedComponentName, mockedLoadedStructures))
        .toEqual(mockedStructure)
    })
    test('called with empty component name', () => {
      expect(getLoadedStructure(mockedEmptyComponentName, mockedLoadedStructures))
        .toEqual({})
    })
    test('called with empty structures', () => {
      expect(getLoadedStructure(mockedComponentName, {})).toEqual({})
    })
  })
  describe('react component', () => {
    test('appearance', async () => {
      useAppContext.mockImplementation(() => ({ componentName: 'landing' }))
      useAppSelector.mockImplementation(() => mockedLoadedStructures)
      renderWithProviders(<ElementSwitcher />)
      await waitFor(() => {
        screen.getByTestId('mocked-view-vblock')
      })
      expect(mockedViewHeader).toHaveBeenCalledTimes(1);
      const viewHeaderKey = Object.keys(mockedStructure)[0]
      const recordIdHeader = `${viewHeaderKey}_${mockedStructure[viewHeaderKey].type}`
      expect(mockedViewHeader).toHaveBeenCalledWith({recordsId: recordIdHeader});

      expect(mockedViewVBlock).toHaveBeenCalledTimes(1);
      const viewVblockKey = Object.keys(mockedStructure)[1]
      const recordIdVBlock = `${viewVblockKey}_${mockedStructure[viewVblockKey].type}` +
        `_${mockedStructure[viewVblockKey].subtype}_${mockedStructure[viewVblockKey].qnt}`
      expect(mockedViewVBlock).toHaveBeenCalledWith({recordsId: recordIdVBlock });
      // console.log(mockedViewHeader.mock.calls)
      // console.log(mockedViewVBlock.mock.calls)
      // screen.debug()
    })
  })
})