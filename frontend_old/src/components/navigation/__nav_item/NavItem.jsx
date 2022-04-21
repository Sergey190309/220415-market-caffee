import React from 'react'
import PropTypes from 'prop-types'

import { Header } from 'semantic-ui-react'
// import Item from '../../items/Item';

const NavItem = ({ title, disabled, visible = true }) => {
  // console.log('NavItem -', visible)
  // const result = (
  const result = visible
    ? (
    <Header disabled={disabled} as='h4'>
      {title}
    </Header>
      )
    : null

  return result
}

NavItem.propTypes = {
  title: PropTypes.string.isRequired
}

export default NavItem
