import React from 'react'
import { render, screen } from '@testing-library/react'

import { makeRecordIdList } from '../../../utils/utils'

import ViewVBlock, { addAbove, addBelow, deleteElement } from './ViewVBlock'

// import { output } from './ViewVBlock';

import store from '../../../redux/store'
import ViewParagraph from './ViewParagraph'
import ViewPicture from './ViewPicture'
import ViewNothing from './ViewNothing'
import { Provider } from 'react-redux'

const mockViewParagraph = ({ recordId, viewName, lng }) => {
  return <div data-testid='ViewParagraph' />
}
const mockViewPicture = ({ recordId, viewName, lng }) => {
  return <div data-testid='ViewPicture' />
}
const mockViewNothing = ({ recordId, viewName, lng }) => {
  return <div data-testid='ViewNothing' />
}
// const mockAdd
// const mockViewParagraph = jest.fn()

// eslint-disable-next-line react/display-name
// jest.mock('./ViewParagraph', () => props => {
//   mockViewParagraph(props)
//   return <div data-testid='ViewParagraph' />
// })

jest.mock('./ViewParagraph', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('./ViewPicture', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('./ViewNothing', () => ({ __esModule: true, default: jest.fn() }))
// jest.mock('./ViewVBlock')

describe('ViewVBlock testing', () => {
  describe('functions testing', () => {
    test('addAbove', () => {

    })
  })

  describe('rendering children with proper props', () => {
    beforeEach(() => {
      ViewParagraph.mockImplementation(mockViewParagraph)
      ViewPicture.mockImplementation(mockViewPicture)
      ViewNothing.mockImplementation(mockViewNothing)
      // addAbove.mockImplementation(jest.fn(() => 'something'))
    })

    test('output calling ViewParagraph', () => {
      const testProps = {
        recordsId: '01_vblock_txt_3',
        viewName: 'mockViewName',
        lng: 'en' // default value
      }
      const mockRecordIdList = makeRecordIdList(testProps.recordsId)
      const viewParagraphPropsList = mockRecordIdList.map(item => ({
        viewName: testProps.viewName,
        lng: testProps.lng,
        recordId: item
        // addAboveProp: addAbove,
        // addBelowProp: addBelow,
        // deleteElementProp: deleteElement
      }))
      render(
        <Provider store={store}>
          <ViewVBlock {...testProps} />
        </Provider>)
      expect(ViewParagraph).toHaveBeenCalledTimes(3)
      expect(ViewPicture).toHaveBeenCalledTimes(0)
      expect(ViewNothing).toHaveBeenCalledTimes(0)
      viewParagraphPropsList.forEach((item, index) => {
        expect(ViewParagraph.mock.calls[index][0]).toEqual(expect.objectContaining(item))
      })
      // expect(mockViewParagraph.mock.calls[0][0]).toEqual({
      //   viewName: 'mockViewName',
      //   lng: 'mockLng',
      //   recordId: '01_vblock_txt_000',
      //   addAboveProp: addAbove
      // })
      // console.log('output calling mockViewParagraph ->', ViewParagraph.mock.calls[0][0])
      // screen.debug()
    })
    test('output calling ViewPicture', () => {
      /**
       * last failed:
       * I've chanched arguments.
       */
      const testProps = {
        recordsId: '01_vblock_pix_4',
        viewName: 'mockViewName',
        lng: 'en' // default value
      }
      const mockRecordIdList = makeRecordIdList(testProps.recordsId)
      const viewParagraphPropsList = mockRecordIdList.map(item => ({
        viewName: testProps.viewName,
        lng: testProps.lng,
        recordId: item,
        dimension: { direction: 'horizontal', size: 250 }
        // addAboveProp: jest.fn().mockName('addAboveProp'),
        // addBelowProp: addBelow,
        // deleteElementProp: deleteElement
      }))
      render(
        <Provider store={store}>
          <ViewVBlock {...testProps} />
        </Provider>)
      expect(ViewParagraph).toHaveBeenCalledTimes(0)
      expect(ViewPicture).toHaveBeenCalledTimes(4)
      expect(ViewNothing).toHaveBeenCalledTimes(0)
      viewParagraphPropsList.forEach((item, index) => {
        // expect(ViewPicture).toHaveBeenCalledWith(expect.objectContaining(item))
        expect(ViewPicture.mock.calls[index][0]).toEqual(expect.objectContaining(item))
        // console.log('output calling ViewPicture  ->', ViewPicture.mock.calls[index][0])
      })
      // console.log('ViewVBlock.test, output calling ViewPicture\nviewParagraphPropsList ->', viewParagraphPropsList)
      // screen.debug()
    })
    test('output calling ViewNothing', () => {
      const testProps = {
        recordId: '01_vblock_xxx_4',
        viewName: 'mockViewName',
        lng: 'mockLng'
      }
      render(
        <Provider store={store}>
          <ViewVBlock {...testProps} />
        </Provider>)
      expect(ViewParagraph).toHaveBeenCalledTimes(0)
      expect(ViewPicture).toHaveBeenCalledTimes(0)
      expect(ViewNothing).toHaveBeenCalledTimes(2)
      // console.log('output calling ViewNothing ->', ViewNothing.mock.calls);
    })
  })
})
