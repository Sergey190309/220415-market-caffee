import React, {
  useState, useEffect,
  useContext
  // useRef
} from 'react'
import PropTypes from 'prop-types'
import { Menu, Popup } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import { elementFunc } from '../../../../testHelpers'
import {
  elementBlockSubTypes
} from '../../../../utils/elementTypes'
import { LandingContext, ElementSwitcherContext } from '../../../../context'
import {
  ContextMenuItem
} from '../../../items/menu_items/ContextMenuItem'
import {
  positiveColor
} from '../../../../utils/colors'

export const elementSubtypesMenu = t => [
  {
    name: elementBlockSubTypes.txt,
    icon: { name: 'file alternate outline', color: positiveColor },
    content: t('1LE.txt')
  },
  {
    name: elementBlockSubTypes.pix,
    icon: { name: 'file image outline', color: positiveColor },
    content: t('1LE.pix')
  }

]

const ElementSubtypesMenu = ({
  context,
  addBelow,
  upperLevelElementType,
  setMenuOpened
}) => {
  const [opened, setOpened] = useState(false)
  const [menuStrucrure, setMenuStrucrure] = useState([])

  const { componentName: viewId } = useContext(LandingContext)
  const { recordsId } = useContext(ElementSwitcherContext)

  const { t } = useTranslation('context')

  // const elementType = useRef('')
  // const elementSubType = useRef('')

  useEffect(() => {
    setOpened(true)
    setMenuStrucrure(elementSubtypesMenu(t))
    return () => {
      setMenuOpened(false)
    }
  }, [])

  const onClickHandler = (event, { name }) => {
    event.preventDefault()

    switch (name) {
      case elementBlockSubTypes.txt:
        elementFunc({
          viewId,
          type: upperLevelElementType,
          subtype: elementBlockSubTypes.txt,
          index: +recordsId.split('_')[0] + (addBelow ? 1 : 0)
        })
        break
      case elementBlockSubTypes.pix:
        elementFunc({
          viewId,
          type: upperLevelElementType,
          subtype: elementBlockSubTypes.pix,
          index: +recordsId.split('_')[0] + (addBelow ? 1 : 0)
        })
        break
      default:
        break
    }
    // // setOpened(false)
    // setOpenedProp(false)
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
          <ContextMenuItem key={index} {...item} onClick={onClickHandler} />
        ))}
      </Menu>
    </Popup>

  )
}

ElementSubtypesMenu.defaultProps = {
  context: {},
  addBelow: false,
  upperLevelElementType: '',
  setMenuOpened: () => { }
}

ElementSubtypesMenu.propTypes = {
  context: PropTypes.object.isRequired,
  addBelow: PropTypes.bool.isRequired,
  upperLevelElementType: PropTypes.string.isRequired,
  setMenuOpened: PropTypes.func.isRequired
}

export default ElementSubtypesMenu
