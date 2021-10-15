import React, { useState, useEffect, useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Popup,
  Menu
  // Dropdown
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import {
  UPPER_ELEMENT_ADD_ABOVE, UPPER_ELEMENT_ADD_BELOW,
  UPPER_ELEMENT_DELETE
} from '../../../../redux/constants/menuKeys'
import { LandingContext, ElementSwitcherContext } from '../../../../context'
import { neutralColor, warningColor } from '../../../../utils/colors'
import { ContextMenuItem } from '../../../items/menu_items/ContextMenuItem'

// import { deviceSelector } from '../../../../redux/slices'

/**
 * To handle upper level elements I need:
 *    - view id (landing or something)
 *    - serial index - id, string in my case.
 *    - upper level type - choose from upperLevelTypeMenu (Header,
 *        Footer, VBlock, HBlock)
 *    - upper level subtype - from upperLevelSubtypeMenu (txt, pix).
 * Functions to handle upper level elements would be here. They are:
 *    - addUpperLevelElement - provide context to type and subtype menus
 *    - deleteUpperLevelElement - direct dispatch here in onClickHandler.
 */

export const addUppreLevelElement = (viewId, upperElementIndex, type = 'header', subtype = 'txt') => {
  console.log('UpperLevelMenu:\n addUppreLevelElement',
    '\n  viewId ->', viewId,
    '\n  upperElementIndex ->', upperElementIndex,
    '\n  type ->', type,
    '\n  subtype ->', subtype
  )
}

const UpperLevelMenu = ({
  // isOpened,
  context,
  setMenuOpened,
  setUpperLevelTypeMenuOpened,
  addBelow
}) => {
  const { t } = useTranslation('context')
  const [opened, setOpened] = useState(false)
  const [menuStructure, setMenuStructure] = useState([])

  const { componentName: viewId } = useContext(LandingContext)
  const { recordsId } = useContext(ElementSwitcherContext)

  // const { editable } = useSelector(deviceSelector)
  useEffect(() => {
    // console.log('UpperLevelMenu:\n useEffect[isMenuOpened]',
    //   '\n  isMenuOpened ->', isMenuOpened
    // )
    setOpened(true)
    setMenuStructure([
      {
        name: UPPER_ELEMENT_ADD_ABOVE,
        icon: { name: 'angle up', color: neutralColor },
        content: t('1LE.addAbove')
      },
      {
        name: UPPER_ELEMENT_ADD_BELOW,
        icon: { name: 'angle down', color: neutralColor },
        content: t('1LE.addBelow')
      },
      {
        name: UPPER_ELEMENT_DELETE,
        icon: { name: 'delete', color: warningColor },
        content: t('1LE.DeleteElement')
      }
    ])
    return () => {
      // console.log('UpperLevelMenu:\n useEffect[], clean up',
      //   '\n  isMenuOpened ->', isOpened
      // )
      setMenuOpened(false)
    }
  }, [])

  const onClickHandler = (event, { name }) => {
    event.preventDefault()
    switch (name) {
      case UPPER_ELEMENT_ADD_ABOVE:
        console.log('UpperLevelMenu:\n onClickHandler',
          '\n  name ->', name)
        addBelow(false)
        setUpperLevelTypeMenuOpened(true)
        // addUppreLevelElement(viewId, +recordsId.split('_')[0])
        break
      case UPPER_ELEMENT_ADD_BELOW:
        console.log('UpperLevelMenu:\n onClickHandler',
          '\n  name ->', name)
        // addUppreLevelElement(viewId, +recordsId.split('_')[0] + 1)
        addBelow(true)
        setUpperLevelTypeMenuOpened(true)
        break
      case UPPER_ELEMENT_DELETE:
        console.log('UpperLevelMenu:\n onClickHandler',
          '\n  name ->', name,
          '\n  viewId ->', viewId,
          '\n  recordsId ->', recordsId,
          '\n  index ->', recordsId.split('_')[0]
        )
        break

      default:
        break
    }
    setMenuOpened(false)
  }

  return (
    <Fragment>
      <Popup
        data-testid='Popup'
        hoverable
        wide='very'
        context={context}
        open={opened}
        // open={opened && editable}
        onClose={() => {
          // console.log('UpperLevelMenu:\n onClose')
          // setOpened(false)
          setMenuOpened(false)
        }}
      >
        <Menu
          vertical
          compact
        >
          {menuStructure.map((item, index) => (
            <ContextMenuItem
              key={index} {...item} onClick={onClickHandler}
            />
          ))}
        </Menu>
      </Popup>
    </Fragment>
  )
}

UpperLevelMenu.defaultProps = {
  isOpened: true,
  context: {},
  setMenuOpened: () => { },
  setUpperLevelTypeMenuOpened: () => { },
  addBelow: () => { }
}

UpperLevelMenu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  setMenuOpened: PropTypes.func.isRequired,
  setUpperLevelTypeMenuOpened: PropTypes.func.isRequired,
  addBelow: PropTypes.func.isRequired
}

export default UpperLevelMenu
