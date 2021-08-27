import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Popup, Button } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import { positiveColor, neutralColor, warningColor } from '../../../../utils/colors'

const ParagraphContextMenu = ({
  isOpened,
  saveDisabled,
  context,
  setContextMenuOpened,
  setParagraphEditted,
  saveToBackend,
  deleteElement,
  addAbove,
  addBelow
}) => {
  const [opened, setOpened] = useState(false)
  const { t } = useTranslation('context')

  useEffect(() => {
    // console.log('ParagraphContentMenu, useEffect isOpened->', isOpened)
    setOpened(isOpened)
  }, [isOpened])

  const onClickHandling = (event, { name }) => {
    // console.log('ParagraphContentMenu, onClickHandling, name ->', name)
    event.preventDefault()
    switch (name) {
      case 'edit':
        setParagraphEditted(true)
        break
      case 'save':
        saveToBackend()
        break
      case 'delete':
        deleteElement()
        break
      case 'above':
        addAbove()
        break
      case 'below':
        addBelow()
        break
      default:
        break
    }
    setOpened(false)
    setContextMenuOpened(false)
  }

  // console.log('ParagraphContextMenu, context ->', context)
  return (
    <Popup
      // basic
      data-testid='Popup'
      context={context}
      // open={true}
      open={opened}
      onClose={() => {
        setOpened(false)
        setContextMenuOpened(false)
      }}
      // data-testid='Popup'
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
          // disabled={false}
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
  context: {},
  setContextMenuOpened: () => { },
  setParagraphEditted: () => { },
  saveToBackend: () => { },
  deleteElement: () => { },
  addAbove: () => { },
  addBelow: () => { }
}

ParagraphContextMenu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  saveDisabled: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  setContextMenuOpened: PropTypes.func.isRequired,
  setParagraphEditted: PropTypes.func.isRequired,
  saveToBackend: PropTypes.func.isRequired,
  deleteElement: PropTypes.func.isRequired,
  addAbove: PropTypes.func.isRequired,
  addBelow: PropTypes.func.isRequired
}

export default ParagraphContextMenu
