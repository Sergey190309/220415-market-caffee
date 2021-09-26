import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'

import store from '../../../../redux/store'
import { UpperLevel } from '../ElementSwitcher'
import { UpperLeverElementId } from '../ViewVBlock'
// import { UpperLevelElementId } from '../ViewVBlock'

import ElementTypesMenu from './ElementTypesMenu'

describe('ElementTypesMenu', () => {
  const testProps = {
    isOpened: false,
    context: {},
    upperLevelElementId: 0,
    setOpenedProp: jest.fn()
  }
  const upperLvlElementId = '01_vblock_txt_3'
  const upperLvlAddElement = jest.fn()
  const upperLvlDeleteElement = jest.fn()

  const renderRedux = props => {
    render(
      <Provider store={store}>
        <UpperLevel.Provider value={{
          upperLvlAddElement,
          upperLvlDeleteElement
        }}>
          <UpperLevelElementId.Provider value={upperLvlElementId}>
            <ElementTypesMenu {...props} />
          </UpperLevelElementId.Provider>
        </UpperLevel.Provider>
      </Provider>
    )
  }
  describe('appeance', () => {
    test('it should exist and has all options and icons', () => {
      const actualProps = { ...testProps, isOpened: true }
      renderRedux(actualProps)
      screen.debug()
    })
  });
})
