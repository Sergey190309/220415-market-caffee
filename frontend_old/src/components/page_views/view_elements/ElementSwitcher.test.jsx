/* eslint-disable react/prop-types */

import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import store from '../../../redux/store'
import ElementSwitcher from './ElementSwitcher'
import ViewHeader from './ViewHeader'
import ViewFooter from './ViewFooter'
import ViewVBlock from './ViewVBlock'
import ViewHBlock from './ViewHBlock'
import ViewNothing from './ViewNothing'

import { landingPageStructure } from '../../../testConstants'

// const mockGetLoadedStructure = () => mockLandingPageStructure
// const mockGetLoadedStructure = jest.fn(() => landingPageStructure)

const MockViewHeader = ({ recordsId, viewName, lng }) =>
  <div data-testid='ViewHeader' />
const MockViewFooter = ({ recordsId, viewName, lng }) =>
  <div data-testid='ViewFooter' />
const MockViewVBlock = ({ recordsId, viewName, lng }) =>
  <div data-testid='ViewVBlock' />
const MockViewHBlock = ({ recordsId, viewName, lng }) =>
  <div data-testid='ViewHBlock' />
const MockViewNothing = ({ recordsId, viewName, lng }) =>
  <div data-testid='ViewNothing' />

// jest.mock('./ElementSwitcher')
// jest.mock('./ElementSwitcher', () => ({
//   __esModule: true,
//   // getLoadedStructure: jest.fn(() => mockLandingPageStructure)
//   getLoadedStructure: jest.fn()
// }))

jest.mock('./ViewHeader', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('./ViewFooter', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('./ViewVBlock', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('./ViewHBlock', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('./ViewNothing', () => ({ __esModule: true, default: jest.fn() }))
// jest.mock('./ViewFooter');
// jest.mock('./ViewVBlock');
// jest.mock('./ViewHBlock');
// jest.mock('./ViewNothing');

describe('ElementSwitcher testing', () => {
  const testProps = {
    viewName: 'mockViewName',
    getStructure: jest.fn()
  }
  beforeEach(() => {
    testProps.getStructure = jest.fn(() => landingPageStructure)
    ViewHeader.mockImplementation(MockViewHeader)
    ViewFooter.mockImplementation(MockViewFooter)
    ViewVBlock.mockImplementation(MockViewVBlock)
    ViewHBlock.mockImplementation(MockViewHBlock)
    ViewNothing.mockImplementation(MockViewNothing)
  })
  // const testProps = {
  //   structure: { ...landingPageStructure, '05': { type: 'wrongType' } },
  //   viewName: 'landing',
  //   lng: 'en'
  // }
  test('it should exist and rendered (snapshot)', () => {
    // console.log('ElementSwitcher.test, snapshot:\n',
    //   'testProps ->', testProps)
    // getLoadedStructure.mockImplementation(() => mockLandingPageStructure)

    const result = render(
      <Provider store={store}>
        <ElementSwitcher {...testProps} />
      </Provider>
    )
    expect(result).toMatchSnapshot()
    // expect(testProps.getStructure).toHaveBeenCalledTimes(1)
    // screen.debug()
  })
  test('call children with appropriate props', () => {
    render(
      <Provider store={store}>
        <ElementSwitcher {...testProps} />
      </Provider>
    )
    expect(ViewHeader).toHaveBeenCalledTimes(1)
    expect(ViewFooter).toHaveBeenCalledTimes(1)
    expect(ViewVBlock).toHaveBeenCalledTimes(2)
    expect(ViewHBlock).toHaveBeenCalledTimes(1)
    expect(ViewNothing).toHaveBeenCalledTimes(1)

    // console.log('ElementSwitcher testing, ViewHeader ->', landingPageStructure)

    expect(ViewHeader.mock.calls[0][0]).toEqual({
      recordsId: '00_header',
      viewName: testProps.viewName
    })
    expect(ViewVBlock.mock.calls[0][0]).toEqual({
      recordsId: '01_vblock_txt_3',
      viewName: testProps.viewName
    })
    expect(ViewHBlock.mock.calls[0][0]).toEqual({
      recordsId: '02_hblock_pix_2',
      viewName: testProps.viewName
    })
    expect(ViewVBlock.mock.calls[1][0]).toEqual({
      recordsId: '03_vblock_pix_2',
      viewName: testProps.viewName
    })
    expect(ViewFooter.mock.calls[0][0]).toEqual({
      recordsId: '04_footer',
      viewName: testProps.viewName
    })
    // expect(ViewNothing.mock.calls[0][0]).toEqual({
    //   recordsId: '05_wrongType',
    //   viewName: testProps.viewName
    // })
  })
})
