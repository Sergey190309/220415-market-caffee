import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Menu, Popup } from 'semantic-ui-react'

const ParagraphContextMenu = ({
  isOpened, context,
  setContextMenuOpened, setElementEditted
}) => {
  const [opened, setOpened] = useState(false)
  useEffect(() => {
    setOpened(isOpened)
  }, [isOpened])

  const onItemClickHandling = (event, { name }) => {
    event.preventDefault()
    if (name === 'edit') {
      setElementEditted(true)
    }
    setOpened(false)
    setContextMenuOpened(false)
  }

  return (
    <Popup
      basic
      context={context}
      open={opened}
      onClose={() => {
        setOpened(false)
        setContextMenuOpened(false)
      }}
    >
      <Menu
        items={[
          { name: 'edit', key: 'edit', content: 'Edit element', icon: 'edit' },
          { name: 'delete', key: 'code', content: 'Delete element', icon: 'trash' }
        ]}
        onItemClick={onItemClickHandling}
        secondary
        vertical
      />
    </Popup>
  )
}

ParagraphContextMenu.defaultProps = {
  isOpened: false,
  context: false,
  setContextMenuOpened: () => { },
  setElementEditted: () => { }
}

ParagraphContextMenu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  setContextMenuOpened: PropTypes.func.isRequired,
  setElementEditted: PropTypes.func.isRequired
}

export default ParagraphContextMenu
