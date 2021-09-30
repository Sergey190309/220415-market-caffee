import React, { useState, useEffect, useSelector } from 'react'
import PropTypes from 'prop-types'
import {
  Popup,
  Menu
  // Dropdown
} from 'semantic-ui-react'

// import { deviceSelector } from '../../../../redux/slices'

const UpperLevelMenu = ({
  isOpened,
  context,
  setMenuOpened
}) => {
  const [opened, setOpened] = useState(false)

  // const { editable } = useSelector(deviceSelector)

  useEffect(() => {
    setOpened(true)
    return () => {
      setMenuOpened(false)
    }
  }, [isOpened])

  return (
    <Popup
      data-testid='Popup'
      context={context}
      open={opened}
      // open={opened && editable}
      onClose={() => {
        setMenuOpened(false)
        setOpened(false)
        // console.log('ParagraphContextMenu:\n onClose')
      }}
    >
      UpperLevelMenu
    </Popup>
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
