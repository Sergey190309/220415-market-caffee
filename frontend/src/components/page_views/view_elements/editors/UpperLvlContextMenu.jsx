import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Popup } from 'semantic-ui-react'

const UpperLvlContextMenu = ({
  isOpened,
  context,
  setOpenedProp,
  upperLvlAddElementProp,
  upperLvlDeleteElementProp
}) => {
  const [opened, setOpened] = useState(false)
  return (
    <Popup
      hoverable
      wide
      context={context}
    >
      Hello!
    </Popup>
  )
}

UpperLvlContextMenu.defaultProps = {
  isOpened: false,
  context: {},
  setOpenedProp: () => { },
  upperLvlAddElementProp: () => { },
  upperLvlDeleteElementProp: () => { }
}

UpperLvlContextMenu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  setOpenedProp: PropTypes.func.isRequired,
  upperLvlAddElementProp: PropTypes.func.isRequired,
  upperLvlDeleteElementProp: PropTypes.func.isRequired
}

export default UpperLvlContextMenu
