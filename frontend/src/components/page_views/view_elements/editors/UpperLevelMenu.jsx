import React, { useState, useEffect, Fragment } from 'react'
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
import { neutralColor, warningColor } from '../../../../utils/colors'
import { ContextMenuItem } from '../../../items/menu_items/ContextMenuItem'

// import { deviceSelector } from '../../../../redux/slices'

const UpperLevelMenu = ({
  isOpened,
  context,
  setMenuOpened
}) => {
  const { t } = useTranslation('context')
  const [opened, setOpened] = useState(false)
  const [menuStructure, setMenuStructure] = useState([])

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
      setOpened(false)
    }
  }, [])

  const onClickHandler = (event, { name }) => {
    event.preventDefault()
    console.log('UpperLevelMenu:\n onClickHandler',
      '\n  name ->', name)
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
          console.log('ParagraphContextMenu:\n onClose')
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
  setMenuOpened: () => { }
}

UpperLevelMenu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  setMenuOpened: PropTypes.func.isRequired
}

export default UpperLevelMenu
