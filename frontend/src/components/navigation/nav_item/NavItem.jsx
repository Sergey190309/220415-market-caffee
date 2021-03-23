import React from 'react';
import PropTypes from 'prop-types'

import { Header } from 'semantic-ui-react';
// import Item from '../../items/Item';

const NavItem = ({ title }) => {

  return (
    <Header as='h3'>
      {title}
    </Header>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
}

export default NavItem;
