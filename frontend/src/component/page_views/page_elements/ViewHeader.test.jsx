// import React from 'react'
// import { screen } from '@testing-library/react'
// import { useAppState, useAppEffect, useAppContext } from '../../../hooks/react'

// import { renderWithProviders } from '../../../utils/testUtils'
// import { useSaga } from '../../../redux/contentSaga/createIO'
// import ViewHeader from './ViewHeader'
// import ShowText from '../sub_elements/ShowText'
// import { isJsxFragment } from 'typescript'

// jest.mock('../sub_elements/ShowText', () => ({
//   __esModule: true,
//   ...jest.requireActual('../sub_elements/ShowText'),
//   default: jest.fn()
// }))
// jest.mock('../../../hooks/react', () => ({
//   __esModule: true,
//   ...jest.requireActual('../../../hooks/react'),
//   useAppContext: jest.fn()
// }))
// jest.mock('../../../redux/contentSaga/createIO', () => ({
//   __esModule: true,
//   ...jest.requireActual('../../../redux/contentSaga/createIO'),
//   useSaga: jest.fn()
// }))
describe('ViewHeader', () => {
  // beforeEach(() => {
  //   jest.resetAllMocks()
  // })
  // afterAll(() => {
  //   jest.unmock('../sub_elements/ShowText')
  //   jest.unmock('../../../hooks/react')
  //   jest.unmock('../../../redux/contentSaga/createIO')
  // })
  // const mockedProps = {
  //   recordsId: 'mockedRecordID',
  //   initialState: {
  //     title: '',
  //     content: ['']
  //   }
  // }
  test('rendering ShowText - DOES NOT WORK', () => {
    // useSaga.mockImplementation(() => {
    //   const state = {
    //     title: 'mockedTitle',
    //     content: ['first line', 'second line']
    //   }
    //   const sagaDispatch = jest.fn()
    //   return [state, sagaDispatch]
    // })
    // const mockedComponent = { componentName: 'mockedComponentName' }
    // useAppContext.mockImplementation(() => mockedComponent)
    // const mockedShowText = jest.fn()
    // ShowText.mockImplementation((props) => {
    //   mockedShowText(props)
    //   return <mocked-show-text data-testid='mocked-show-text' />
    // })
    // renderWithProviders(<ViewHeader {...mockedProps} />)
  })
})