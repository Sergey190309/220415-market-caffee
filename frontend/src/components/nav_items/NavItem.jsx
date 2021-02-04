import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const NavItem = ({ name, link, title, color }) => {
  // const kind_id = 'nav_item'
  // const title = 'Menu'
  // console.log(color)
  return (
    <Menu.Item name={name} color='red' href={link} component={Link}>
      {title}
    </Menu.Item>
  );
  // return (
  //   <Menu.Item name={name} color='teal'>
  //     <Link to={link}>{title}</Link>
  //   </Menu.Item>
  // );
};

export default NavItem;
