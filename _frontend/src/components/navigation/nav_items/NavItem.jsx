import React from 'react';
import { Header } from 'semantic-ui-react';
import Item from '../../items/Item';

const NavItem = ({ title }) => {
  return (
    <Header as='h3'>
      <Item kindId='nav_item' title={title} />
    </Header>
  );
};

export default NavItem;
