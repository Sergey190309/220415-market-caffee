import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Popup, Button } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
// import styled from 'styled-components'
import { ContextMenuButton } from '../styledComponents'

import { positiveColor, neutralColor, warningColor } from '../../../../utils/colors'

const EditorContextMenu = ({
  isOpened,
  saveDisabled,
  context,
  setContextMenuOpened,
  contextMenuAction
}) => {
  const [opened, setOpened] = useState(false)
  const { t } = useTranslation('context')

  useEffect(() => {
    setOpened(isOpened)
  }, [isOpened])

  const onButtonClickHandle = (event, { name }) => {
    event.preventDefault()
    contextMenuAction(name)
    setOpened(false)
    setContextMenuOpened(false)
  }
  /**
   * 2LEedit - for 2nd Level Edit
   */
  return (
    <Popup
      data-testid='Popup'
      basic context={context} open={opened}
      wide
      onClose={() => {
        setOpened(false)
        setContextMenuOpened(false)
      }}
    >
      <Button.Group
        vertical
        // style={{ width: '300px' }}
      >
        <ContextMenuButton
          // style={{ width: '300px' }}
          name='save'
          icon={{ name: 'save', color: positiveColor }}
          disabled={saveDisabled}
          content={t('2LEEdit.save')}
          // style={{ textAlign: 'left' }}
          onClick={onButtonClickHandle}
        />
        <ContextMenuButton
          name='back' // to editting
          icon={{ name: 'angle left', color: neutralColor }}
          content={t('2LEEdit.back')}
          // style={{ textAlign: 'left' }}
          onClick={onButtonClickHandle}
        />
        <ContextMenuButton
          name='cancel' // editting
          icon={{ name: 'cancel', color: warningColor }}
          content={t('2LEEdit.cancel')}
          style={{ textAlign: 'left' }}
          onClick={onButtonClickHandle}
        />
      </Button.Group>
    </Popup>
  )
}

EditorContextMenu.defaultProps = {
  isOpened: false,
  saveDisabled: true,
  context: {},
  setContextMenuOpened: () => {},
  contextMenuAction: () => {}

}

EditorContextMenu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  saveDisabled: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  setContextMenuOpened: PropTypes.func.isRequired,
  contextMenuAction: PropTypes.func.isRequired
}

export default EditorContextMenu
