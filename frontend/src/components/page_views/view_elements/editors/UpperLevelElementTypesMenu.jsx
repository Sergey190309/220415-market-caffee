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

const ElementTypesMenu = ({
  context,
  addBelow,
  setUpperLevelElementType,
  setMenuOpened,
  setUpperLevelSubtypeMenuOpened
}) => {
  const [opened, setOpened] = useState(false)
  const [menuStrucrure, setMenuStrucrure] = useState([])

  const { t } = useTranslation('context')

  // const elementType = useRef('')
  // const elementSubType = useRef('')

  const { componentName: viewId } = useContext(LandingContext)
  const { recordsId } = useContext(ElementSwitcherContext)

  useEffect(() => {
    setOpened(true)
    setMenuStrucrure([
      {
        name: elementBlockTypes.header,
        icon: { name: 'hand point up outline', color: positiveColor },
        content: t('1LE.header')
        // onClick: onClickHandler
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
    return () => {
      setMenuOpened(false)
    }
  }, [])
  //       {
  //         name: elementBlockSubTypes.txt,
  //         icon: { name: 'file alternate outline', color: positiveColor },
  //         text: t('1LE.txt'),
  //         onClick: onClickHandler
  //       },
  //       {
  //         name: elementBlockSubTypes.pix,
  //         icon: { name: 'file image outline', color: positiveColor },
  //         text: t('1LE.pix'),
  //         onClick: onClickHandler
  //       }

  const onClickHandler = (event, { name }) => {
    event.preventDefault()
    switch (name) {
      case elementBlockTypes.header:
        console.log('UpperLevelElementTypesMenu:\n onClickHandler',
          '\n  name ->', name,
          '\n  viewId ->', viewId,
          '\n  recordsId ->', recordsId,
          '\n  recordsId ->', +recordsId.split('_')[0] + (addBelow ? 1 : 0)
        )
        break
      case elementBlockTypes.vblock:
        console.log('UpperLevelElementTypesMenu:\n onClickHandler',
          '\n  name ->', name
        )
        setUpperLevelElementType(elementBlockTypes.vblock)
        setUpperLevelSubtypeMenuOpened(true)
        break
      case elementBlockTypes.hblock:
        console.log('UpperLevelElementTypesMenu:\n onClickHandler',
          '\n  name ->', name
        )
        setUpperLevelElementType(elementBlockTypes.hblock)
        setUpperLevelSubtypeMenuOpened(true)
        break
      case elementBlockTypes.footer:
        console.log('UpperLevelElementTypesMenu:\n onClickHandler',
          '\n  name ->', name,
          '\n  viewId ->', viewId,
          '\n  recordsId ->', recordsId,
          '\n  recordsId ->', +recordsId.split('_')[0] + (addBelow ? 1 : 0)
        )
        break
      default:
        break
    }
    setMenuOpened(false)
  }
  //   switch (name) {
  //     case elementBlockTypes.header:
  //     case elementBlockTypes.footer:
  //       upperLvlAddElement(upperLevelElementId, name)
  //       break
  //     case elementBlockSubTypes.txt:
  //     case elementBlockSubTypes.pix:
  //       upperLvlAddElement(upperLevelElementId, elementType.current, name)
  //       break
  //     default:
  //       break
  //   }
  //   // setOpened(false)
  //   setOpenedProp(false)
  // }

  // const onClickDropdownHandler = (type) => {
  //   // event.preventDefault()
  //   if (elementType.current === '') {
  //     elementType.current = type
  //   } else {
  //     elementType.current = ''
  //   }
  //   console.log('ElementTypeMenu:\n Dropdown',
  //     '\n  elementType ->', elementType)
  // }

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
