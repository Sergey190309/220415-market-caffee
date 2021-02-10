import React from "react";
// import { Link } from "react-router-dom";
// import { Menu, Button } from "semantic-ui-react";

import Aux from '../HOC/auxiliary/auxiliary'

const NavItem = ({ name, title }) => {
  // The component return local title and other locally depending content.
  // const kind_id = 'nav_item'
  // const title = 'Menu'
  // console.log(color)
  return (
    <Aux>
        {title}
    </Aux>
  );
  // return (
  //   <Menu.Item name={name} color='teal'>
  //     <Link to={link}>{title}</Link>
  //   </Menu.Item>
  // );
};

export default NavItem;
