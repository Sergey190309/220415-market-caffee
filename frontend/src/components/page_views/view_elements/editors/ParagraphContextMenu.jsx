import React, {} from 'react'
import PropTypes from 'prop-types'
// import { Menu, Popup } from 'semantic-ui-react'

const ParagraphContextMenu = ({
  isOpened, context,
  setContextMenuOpened, setElementEditted
}) => {
  return (
    <div>
      ParagraphContextMenu
    </div>
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
