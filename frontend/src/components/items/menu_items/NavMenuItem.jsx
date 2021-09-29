import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {
  Menu
  // Icon
  // Grid, Button
} from 'semantic-ui-react'

const StyledNavMenuItem = styled(Menu.Item)`
  font-weight: bold;
  font-size: 1.2em;
`

const NavMenuItem = ({ disabled, name, to, active, content, onClick }) => {
  return (
    <Menu.Item
      as={Link}
      // disabled={disabled}
      name={name}
      to={to}
      // active={active}
      content={content}
      onClick={onClick}
    />
    //   Fuck!
    // </StyledNavMenuItem>
  )
}

NavMenuItem.defaultProps = {
  // as: {},
  disabled: false,
  name: '',
  to: '',
  active: false,
  onClick: () => { },
  content: ''
}

NavMenuItem.propTypes = {
  // as: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired
}
export default NavMenuItem
