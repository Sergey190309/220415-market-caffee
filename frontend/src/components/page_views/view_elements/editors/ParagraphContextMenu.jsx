import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Popup,
  Button
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import { positiveColor, neutralColor, warningColor } from '../../../../utils/colors'

const ParagraphContextMenu = ({
  isOpened, context, saveDisabled,
  setContextMenuOpened, setParagraphEditted, saveToBackend
}) => {
  const [opened, setOpened] = useState(false)
  const { t } = useTranslation('context')

  useEffect(() => {
    setOpened(isOpened)
  }, [isOpened])

  const onClickHandling = (event, { name }) => {
    console.log('ParagraphContentMenu, onClickHandling, name ->', name)
    event.preventDefault()
    if (name === 'edit') {
      setParagraphEditted(true)
    }
    setOpened(false)
    setContextMenuOpened(false)
  }

  return (
    <Popup
      // basic
      context={context}
      open={opened}
      onClose={() => {
        setOpened(false)
        setContextMenuOpened(false)
      }}
    >
      <Button.Group
        vertical
        // compact
        style={{
          width: '300px'
        }}
      >
        <Button
          name='edit'
          icon={{ name: 'edit', color: positiveColor }}
          onClick={onClickHandling}
          content={t('1stLevel.editElement')}
          style={{ textAlign: 'left' }}
        />
        <Button
          name='save'
          icon={{ name: 'save', color: warningColor }}
          disabled={saveDisabled}
          onClick={onClickHandling}
          content={t('1stLevel.saveElement')}
          style={{ textAlign: 'left' }}
        />
        <Button
          name='above'
          icon={{ name: 'angle double up', color: neutralColor }}
          content={t('1stLevel.addAbove')}
          style={{ textAlign: 'left' }}
          onClick={onClickHandling}
        />
        <Button
          name='below'
          icon={{ name: 'angle double down', color: neutralColor }}
          content={t('1stLevel.addBelow')}
          style={{ textAlign: 'left' }}
          onClick={onClickHandling}
        />
        <Button
          name='delete'
          icon={{ name: 'delete', color: warningColor }}
          content={t('1stLevel.deleteElement')}
          style={{ textAlign: 'left' }}
          onClick={onClickHandling}
          />
      </Button.Group>
    </Popup>
  )
}

ParagraphContextMenu.defaultProps = {
  isOpened: false,
  saveDisabled: false,
  context: false,
  setContextMenuOpened: () => { },
  setParagraphEditted: () => { },
  saveToBackend: () => { }
}

ParagraphContextMenu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  saveDisabled: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  setContextMenuOpened: PropTypes.func.isRequired,
  setParagraphEditted: PropTypes.func.isRequired,
  saveToBackend: PropTypes.func.isRequired
}

export default ParagraphContextMenu
