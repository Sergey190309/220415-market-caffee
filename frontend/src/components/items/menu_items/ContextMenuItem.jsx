import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Menu
} from 'semantic-ui-react'

const StyledContextMenuItem = styled(Menu.Item)`
  /* margin: .1em 0em !important;
  text-align: left !important; */
`

/**
 * The component carry out the following functions:
 * 1. Normal onClick.
 * 2. In case of providing onHover function it calls that function
*      with position object.
 * 3. Styling.
 */
export const ContextMenuItem = ({
  name, icon, content, disabled, onClick
}) => {
  return (
    <StyledContextMenuItem
      name={name}
      icon={icon}
      disabled={disabled}
      onClick={onClick}
      content={content}
    />
  )
}

ContextMenuItem.defaultProps = {
  name: '',
  icon: {},
  content: '',
  disabled: false,
  onClick: () => { }
}

ContextMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}
