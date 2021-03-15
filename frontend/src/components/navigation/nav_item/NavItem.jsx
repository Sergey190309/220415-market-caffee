import React from 'react';
import PropTypes from 'prop-types'
import { Translate } from 'react-redux-i18n';

import { Header } from 'semantic-ui-react';
// import Item from '../../items/Item';

const NavItem = ({ title }) => {
  // console.log(I18n.t(title))

  return (
    <Header as='h3'>
      <Translate value={title} />
    </Header>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
}

export default NavItem;
