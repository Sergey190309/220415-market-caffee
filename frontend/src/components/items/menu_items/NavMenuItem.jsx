import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// import styled from 'styled-components'
import {
  MenuItem
  // Icon
  // Grid, Button
} from 'semantic-ui-react'

// const StyledNavMenuItem = styled(MenuItem)`
//   font-weight: bold;
//   font-size: 1.2em;
// `

const NavMenuItem = ({
  disabled,
  name,
  to,
  active,
  content,
  onClick
}) => {
  // console.log('NavMenuItem:\n',
  //   '\n  disabled ->', disabled
  // )
  return (
    <MenuItem
      data-testid='MenuItem'
      style={{ fontWeight: 'bold', fontSize: '1.2em' }}
      as={disabled ? null : Link}
      disabled={disabled}
      name={name}
      to={to}
      active={active}
      content={content}
      onClick={onClick}
    />
  )
}

NavMenuItem.defaultProps = {
  disabled: false,
  name: '',
  to: '',
  active: false,
  onClick: () => { },
  content: ''
}

NavMenuItem.propTypes = {
  disabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired
}
export default NavMenuItem
