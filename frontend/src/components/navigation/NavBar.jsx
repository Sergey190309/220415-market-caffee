import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Menu, Segment, Container, Button } from "semantic-ui-react";

// import Logo from "../nav_items/Logo";
// import Language from "../nav_items/Language";
import NavItem from "../nav_items/NavItem";

const NavBar = () => {
  const [activeItem, setActiveItem] = useState("test2");

  return (
    <Container
      // as={Segment}
      // color="orange"
      // inverted
    >
      <Menu
        // inverted
        secondary
        size="small"
      >
        {/* <Menu.Item>
          <Logo />
        </Menu.Item> */}
        <Menu.Item
          as={Button}
          // inverted
          // color="olive"
          name="test1"
          active={activeItem === "test1"}
          onClick={() => setActiveItem("test1")}
        />
        <Menu.Item
          as={Button}
          // inverted
          // color="olive"
          name="test2"
          active={activeItem === "test2"}
          onClick={() => setActiveItem("test2")}
        />
        <Menu.Item
          as={Button}
          // inverted
          // color="olive"
          name="priceList"
          active={activeItem === "priceList"}
          onClick={() => setActiveItem("priceList")}
        >
          <NavItem name="priceList" title="Menu" link="/pricelist" />
        </Menu.Item>

        <Menu.Item
          as={Button}
          // inverted
          // color="olive"
          name="pictures"
          active={activeItem === "pictures"}
          onClick={() => setActiveItem("pictures")}
        >
          <NavItem name="pictures" title="Gallery" link="/pictures" />
        </Menu.Item>

        {/* <Menu.Menu position="right">
          <Menu.Item name="language" color='yellow'>
            <Link to="#">
              <Language />
            </Link>
          </Menu.Item>
        </Menu.Menu> */}
      </Menu>
    </Container>
  );
};

export default NavBar;
