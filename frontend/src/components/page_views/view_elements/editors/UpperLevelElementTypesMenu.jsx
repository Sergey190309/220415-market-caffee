import React, {
  useState, useEffect,
  useContext
  // useRef
} from 'react'
import PropTypes from 'prop-types'
import { Menu, Popup } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import {
  elementBlockTypes
} from '../../../../utils/elementTypes'

import { LandingContext, ElementSwitcherContext } from '../../../../context'
import { ContextMenuItem } from '../../../items/menu_items/ContextMenuItem'
import {
  positiveColor
} from '../../../../utils/colors'
import { elementFunc } from './auxFuncs'

export const upperLevelElementTypesMenu = t => ([
  {
    name: elementBlockTypes.header,
    icon: { name: 'hand point up outline', color: positiveColor },
    content: t('1LE.header')
  },
  {
    name: elementBlockTypes.vblock,
    icon: { name: 'ellipsis vertical', color: positiveColor },
    content: t('1LE.vblock')
  },
  {
    name: elementBlockTypes.hblock,
    icon: { name: 'ellipsis horizontal', color: positiveColor },
    content: t('1LE.hblock')
  },
  {
    name: elementBlockTypes.footer,
    icon: { name: 'hand point down outline', color: positiveColor },
    content: t('1LE.footer')
  }
])

const ElementTypesMenu = ({
  context,
  addBelow,
  setUpperLevelElementType,
  setMenuOpened,
  setUpperLevelSubtypeMenuOpened
}) => {
  const { t } = useTranslation('context')

  const [opened, setOpened] = useState(false)
  const [menuStrucrure, setMenuStrucrure] = useState([])

  // const elementType = useRef('')
  // const elementSubType = useRef('')

  const { componentName: viewId } = useContext(LandingContext)
  const { recordsId } = useContext(ElementSwitcherContext)

  useEffect(() => {
    setOpened(true)
    setMenuStrucrure(upperLevelElementTypesMenu(t))
    return () => {
      setMenuOpened(false)
    }
  }, [])

  const onClickHandler = (event, { name }) => {
    event.preventDefault()
    switch (name) {
      case elementBlockTypes.header:
        elementFunc({ name, viewId, recordsId, addBelow })
        break
      case elementBlockTypes.vblock:
        elementFunc({ name })
        setUpperLevelElementType(elementBlockTypes.vblock)
        setUpperLevelSubtypeMenuOpened(true)
        break
      case elementBlockTypes.hblock:
        elementFunc({ name })
        setUpperLevelElementType(elementBlockTypes.hblock)
        setUpperLevelSubtypeMenuOpened(true)
        break
      case elementBlockTypes.footer:
        elementFunc({ name, viewId, recordsId, addBelow })
        break
      default:
        break
    }
    setMenuOpened(false)
  }

  return (
    <Popup
      data-testid='Popup'
      hoverable
      wide='very'
      context={context}
      open={opened}
      onClose={() => {
        // console.log('ElementTypesMenu:\n onClose')
        // setOpened(false)
        setMenuOpened(false)
      }}
    >
      <Menu
        vertical
        compact
      >
        {menuStrucrure.map((item, index) => (
          <ContextMenuItem
            key={index} {...item} onClick={onClickHandler}
          />
        ))}
      </Menu>
    </Popup>

  )
}

ElementTypesMenu.defaultProps = {
  context: {},
  addBelow: false,
  setUpperLevelElementType: () => { },
  setMenuOpened: () => { },
  setUpperLevelSubtypeMenuOpened: () => { }
}

ElementTypesMenu.propTypes = {
  context: PropTypes.object.isRequired,
  addBelow: PropTypes.bool.isRequired,
  setUpperLevelElementType: PropTypes.func.isRequired,
  setMenuOpened: PropTypes.func.isRequired,
  setUpperLevelSubtypeMenuOpened: PropTypes.func.isRequired
}

export default ElementTypesMenu
