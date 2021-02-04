import React from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";

import Logo from "../nav_items/Logo";
import Language from "../nav_items/Language";
import NavItem from "../nav_items/NavItem";

const NavBar = () => {
  return (
    <Menu>
      <Menu.Item>
        <Logo color='teal' />
      </Menu.Item>
      <Menu.Item color='orange'>
        Test
      </Menu.Item>
      <NavItem name='priceList' title='Menu' link='/pricelist' />
      <NavItem name='pictures' title='Gallery' link='/pictures' />

      <Menu.Menu position="right">
        <Menu.Item name="login">
          <Link to="/login">
            <Button>Log-In</Button>
          </Link>
        </Menu.Item>

        <Menu.Item name="language" color='yellow'>
          <Link to="#">
            <Language />
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
