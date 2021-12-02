/* eslint-disable react/display-name */
import React from 'react'
import {
  render,
  screen,
  waitFor
} from '@testing-library/react'

import { makeRecordIdList } from '../../../utils/utils'

import ViewVBlock from './ViewVBlock'

// import { output } from './ViewVBlock';

import store from '../../../redux/store'
import ViewParagraph from './ViewParagraph'
import ViewPicture from './ViewPicture'
import ViewNothing from './ViewNothing'
import { Provider } from 'react-redux'
import { testRender } from '../../../testHelpers'

const mockViewParagraph = jest.fn()
jest.mock('./ViewParagraph', () => props => {
  mockViewParagraph(props)
  return <div data-textid='mockViewParagraph' />
})
const mockViewPicture = jest.fn()
jest.mock('./ViewPicture', () => props => {
  mockViewPicture(props)
  return <div data-textid='mockViewPicture' />
})
const mockViewNothing = jest.fn()
jest.mock('./ViewNothing', () => props => {
  mockViewNothing(props)
  return <div data-textid='mockViewNothing' />
})

describe('ViewVBlock testing', () => {
  const testProps = {
    recordsId: '01_vblock_txt_4',
    viewName: 'mockViewName'
  }
  describe('appearance', () => {
    test('rendering, txt', async () => {
      const actualProps = { ...testProps }
      await waitFor(() => {
        testRender(<ViewVBlock {...actualProps} />, { store: store })
      })
      const output = screen.getByTestId('Output')
      expect(output).toMatchSnapshot()
      const length = +actualProps.recordsId.split('_').pop()
      expect(output.children).toHaveLength(length)
      expect(mockViewParagraph).toHaveBeenCalledTimes(length)
      // screen.debug(output)
    })
    test('rendering, pix', async () => {
      const actualProps = {
        ...testProps,
        recordsId: '01_vblock_pix_3'
      }
      await waitFor(() => {
        testRender(<ViewVBlock {...actualProps} />, { store: store })
      })
      const output = screen.getByTestId('Output')
      expect(output).toMatchSnapshot()
      const length = +actualProps.recordsId.split('_').pop()
      expect(output.children).toHaveLength(length)
      expect(mockViewPicture).toHaveBeenCalledTimes(length)
    })
    test('rendering, nothing', async () => {
      const actualProps = {
        ...testProps,
        recordsId: '01_vblock_zzz_3'
      }
      await waitFor(() => {
        testRender(<ViewVBlock {...actualProps} />, { store: store })
      })
      const output = screen.getByTestId('Output')
      expect(output).toMatchSnapshot()
      expect(output.children).toHaveLength(1)
      expect(mockViewNothing).toHaveBeenCalledTimes(2)
      /* once on init, other - normal rendering */
      // console.log('ViewVBlock.test:\n rendering (snapshot)',
      //   '\n  output ->', output.children.length)
      // screen.debug(output)
    })
  })

  describe('rendering children with proper props', () => {
    test('output calling ViewParagraph', async () => {
      const mockRecordIdList = makeRecordIdList(testProps.recordsId)
      const viewParagraphPropsList = mockRecordIdList.map(item => ({
        recordId: item
      }))
      const actualProps = { ...testProps }
      await waitFor(() => {
        testRender(<ViewVBlock {...actualProps} />, { store: store })
      })
      const output = screen.getByTestId('Output')
      const outputArray = [...output.children]
      outputArray.forEach((element, index) => {
        expect(mockViewParagraph)
          .toHaveBeenCalledWith(viewParagraphPropsList[index])
      })
    })
    test('output calling ViewPicture', async () => {
      const actualProps = { ...testProps, recordsId: '01_vblock_pix_3' }
      const mockRecordIdList = makeRecordIdList(actualProps.recordsId)
      const viewPicturePropsList = mockRecordIdList.map(item => ({
        recordId: item,
        viewName: testProps.viewName,
        dimension: { direction: 'horizontal', size: 250 }
      }))
      await waitFor(() => {
        testRender(<ViewVBlock {...actualProps} />, { store: store })
      })
      const output = screen.getByTestId('Output')
      const outputArray = [...output.children]
      outputArray.forEach((element, index) => {
        expect(mockViewPicture)
          .toHaveBeenCalledWith(viewPicturePropsList[index])
      })
      // screen.debug(output)
    })
    test('output calling ViewNothing', async () => {
      const actualProps = { ...testProps, recordsId: '01_vblock_zzz_3' }
      await waitFor(() => {
        testRender(<ViewVBlock {...actualProps} />, { store: store })
      })
      // const output = screen.getByTestId('Output')
      expect(mockViewNothing).toHaveBeenLastCalledWith({})
      // screen.debug(output)
    })
  })
})
