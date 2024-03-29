import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Menu,
  Message,
  Popup
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import { ELEMENT_EDIT_SAVE, ELEMENT_EDIT_CANCEL } from '../../redux/constants/menuKeys'
import { positiveColor, warningColor } from '../../utils/colors'
import {
  backendTxtUpdateStart, backendTxtUpdateClear, deviceSelector
} from '../../redux/slices'
import { ContextMenuItem } from './menu_items/ContextMenuItem'

export const saveToBackendContextMenu = t => ([
  {
    name: ELEMENT_EDIT_SAVE,
    icon: { name: 'save', color: positiveColor },
    content: t('2LE.saveEditedElement')
  },
  {
    name: ELEMENT_EDIT_CANCEL,
    icon: { name: 'cancel', color: warningColor },
    content: t('2LE.cancelEditedElement')
  }
])

const SaveToBackendContextMenu = ({
  isOpened,
  context,
  setContextMenuOpened
}) => {
  const { t } = useTranslation('context')

  const [menuStructure, setMenuStructure] = useState([])

  const { editable } = useSelector(deviceSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    setMenuStructure(saveToBackendContextMenu(t))
  }, [])

  const onClickHandler = (event, { name }) => {
    event.preventDefault()
    switch (name) {
      case ELEMENT_EDIT_SAVE:
        // console.log('SaveToBackendContextMenu:\n onClickHandler',
        //   '\n  ELEMENT_EDIT_SAVE')
        dispatch(backendTxtUpdateStart())
        break
      case ELEMENT_EDIT_CANCEL:
        // console.log('SaveToBackendContextMenu:\n onClickHandler',
        //   '\n  ELEMENT_EDIT_CANCEL')
        dispatch(backendTxtUpdateClear())
        break
      default:
        break
    }
    setContextMenuOpened(false)
  }

  return (
    <Popup
      data-testid='Popup'
      hoverable
      wide
      open={isOpened && editable}
      context={context}
      onClose={() => {
        // setOpened(false)
        setContextMenuOpened(false)
      }}
    >
      <Message
        // as='p'
        content={t('note.SaveToBackendContextMenu')}
        icon={{ name: 'exclamation', color: warningColor }}
      />
      <Menu
        data-testid='Menu'
        vertical
        compact
      >
        {menuStructure.map((item, index) => (
          <ContextMenuItem
            key={index} {...item} onClick={onClickHandler} />
        ))}
      </Menu>
    </Popup>
  )
}

SaveToBackendContextMenu.defaultProps = {
  isOpened: true,
  context: {},
  setContextMenuOpened: () => { },
  saveToBackend: () => { }

}

SaveToBackendContextMenu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  setContextMenuOpened: PropTypes.func.isRequired,
  saveToBackend: PropTypes.func.isRequired
}

export default SaveToBackendContextMenu
