import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Button } from "semantic-ui-react";

import Language from "../../language/Language";

const NavBar = () => {
  return (

    <Menu>
      <Menu.Item
      name='logo'>
        <Link to='/'>
          <Icon name='utensils' size='large' />
        </Link>
      </Menu.Item>

      <Menu.Item name='item01'>
        NavBarItem01
      </Menu.Item>

      <Menu.Item name='item02'>
        NavBarItem02
      </Menu.Item>

      <Menu.Item name='item03'>
        NavBarItem03
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item
        name='login'>
          <Link to='/login'><Button>Log-In</Button></Link>
        </Menu.Item>

        <Menu.Item
        name='language'>
          <Link to='#'><Language /></Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
};

export default NavBar;
