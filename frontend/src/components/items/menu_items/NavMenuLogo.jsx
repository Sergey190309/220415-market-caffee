import React from 'react'
import { Link } from 'react-router-dom'
import { MenuItem, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import logo from '../../../assets/images/logo.png'
// import logo from '../../../assets/images/logo.png'

const NavMenuLogo = ({
  disabled,
  name,
  to,
  active,
  onClick
}) => {
  return (
    <MenuItem
      data-testid='NavMenuLogo'
      as={disabled ? null : Link}
      disabled={disabled}
      name={name}
      to={to}
      active={active}
      onClick={onClick}
    >
      <Image
        // bordered
        wrapped
        src={logo} alt='logo' size='mini' verticalAlign='middle' centered
      />
    </MenuItem>
  )
}
NavMenuLogo.defaultProps = {
  disabled: false,
  name: '',
  to: '',
  active: true,
  onClick: () => { }
}

NavMenuLogo.propTypes = {
  disabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default NavMenuLogo
