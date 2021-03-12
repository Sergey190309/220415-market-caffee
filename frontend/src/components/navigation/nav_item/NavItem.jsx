import React from 'react';
import PropTypes from 'prop-types'
import { Translate } from 'react-redux-i18n';

import { Header } from 'semantic-ui-react';
// import Item from '../../items/Item';

const NavItem = ({ title }) => {
  // console.log(title)
  return (
    <Header as='h3'>
      <Translate value={title} />
      {/* <Item kindId='nav_item' title={title} /> */}
    </Header>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
}

export default NavItem;
