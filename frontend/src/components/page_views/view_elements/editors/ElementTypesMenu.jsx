import React, { useState, useEffect, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Menu, Popup } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import {
  elementBlockTypes,
  elementBlockSubTypes
} from '../../../../utils/elementTypes'
import { ContextMenuItem } from '../../../items/menu_items/ContextMenuItem'
import { neutralColor, positiveColor } from '../../../../utils/colors'
import { UpperLevel } from '../ElementSwitcher'
// import { UpperLeverElementId } from '../ViewVBlock'

const ElementTypesMenu = ({
  isOpened, context,
  upperLevelElementId, setOpenedProp
}) => {
  // const [opened, setOpened] = useState(false)
  const [menuStrucrure, setMenuStrucrure] = useState([])
  const [subMenuStructure, setSubMenuStructure] = useState([])

  const { t } = useTranslation('context')

  const { upperLvlAddElement } = useContext(UpperLevel)
  // const upperLevelElementId = useContext(UpperLeverElementId)

  const elementType = useRef('')
  // const elementSubType = useRef('')

  useEffect(() => {
    setMenuStrucrure([
      {
        name: elementBlockTypes.header,
        icon: { name: 'hand point up outline', color: positiveColor },
        content: t('1LE.header'),
        onClick: onClickHandler
      },
      {
        name: elementBlockTypes.footer,
        icon: { name: 'hand point down outline', color: positiveColor },
        content: t('1LE.footer'),
        onClick: onClickHandler
      }
    ])
    setSubMenuStructure(
      [
        {
          name: elementBlockSubTypes.txt,
          icon: { name: 'file alternate outline', color: positiveColor },
          text: t('1LE.txt'),
          onClick: onClickHandler
        },
        {
          name: elementBlockSubTypes.pix,
          icon: { name: 'file image outline', color: positiveColor },
          text: t('1LE.pix'),
          onClick: onClickHandler
        }
      ]
    )
  }, [])

  // useEffect(() => {
  //   // console.log('ElementTypesMenu:\n useEffect',
  //   //   '\n  isOpened ->', isOpened)
  //   setOpened(isOpened)
  // }, [isOpened])

  const onClickHandler = (event, { name }) => {
    console.log('ElementTypeMenu:\n onClickHandler',
      '\n  upperLevelElementId ->', upperLevelElementId,
      '\n  name ->', name
    )
    event.preventDefault()
    switch (name) {
      case elementBlockTypes.header:
      case elementBlockTypes.footer:
        upperLvlAddElement(upperLevelElementId, name)
        break
      case elementBlockSubTypes.txt:
      case elementBlockSubTypes.pix:
        upperLvlAddElement(upperLevelElementId, elementType.current, name)
        break
      default:
        break
    }
    // setOpened(false)
    setOpenedProp(false)
  }

  const onClickDropdownHandler = (type) => {
    // event.preventDefault()
    if (elementType.current === '') {
      elementType.current = type
    } else {
      elementType.current = ''
    }
    console.log('ElementTypeMenu:\n Dropdown',
      '\n  elementType ->', elementType)
  }

  return (
    <Popup
      data-testid='Popup'
      // basic
      // hoverable
      context={context}
      open={isOpened}
      onClose={() => {
        // console.log('ElementTypesMenu:\n onClose')
        // setOpened(false)
        setOpenedProp(false)
      }}
    >
      <Menu
        vertical
        compact
      >
        {menuStrucrure.map((item, index) => (
          <ContextMenuItem key={index} {...item} />
        ))}
        <Menu.Item>
          <Dropdown
            fluid
            icon={{ name: 'dropdown', color: neutralColor }}
            text={t('1LE.vblock')}
            className='icon'
            onClick={() => {
              console.log('ElementTypesMenu:\n first dropdown')
              onClickDropdownHandler(elementBlockTypes.vblock)
            }}
          >
            <Dropdown.Menu>
              {subMenuStructure.map((item, index) =>
                <Dropdown.Item key={index} {...item} />)}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            fluid
            icon={{ name: 'dropdown', color: neutralColor }}
            text={t('1LE.hblock')}
            className='icon'
            onClick={() => {
              onClickDropdownHandler(elementBlockTypes.hblock)
            }}
          >
            <Dropdown.Menu>
              {subMenuStructure.map((item, index) =>
                <Dropdown.Item key={index} {...item} />)}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Popup>

  )
}

ElementTypesMenu.defaultProps = {
  isOpened: false,
  context: {},
  upperLevelElementId: -1,
  setOpenedProp: () => { }
}

ElementTypesMenu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  upperLevelElementId: PropTypes.number.isRequired,
  setOpenedProp: PropTypes.func.isRequired
}

export default ElementTypesMenu
