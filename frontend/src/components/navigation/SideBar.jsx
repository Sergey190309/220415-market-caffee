import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Icon, Grid, Sidebar, Segment, Menu, Button } from "semantic-ui-react";

import Content from "../content/Content";
import Logo from '../nav_items/Logo'
// import Language from "../../language/Language";

const SideBar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Grid celled>
      <Grid.Row color='teal'>
        <Grid.Column width="2" textAlign='center' verticalAlign='middle'>
          <Logo />
        </Grid.Column>
        <Grid.Column width="12" textAlign='center' verticalAlign='middle'>
          <h1>Hi there!</h1>
        </Grid.Column>
        <Grid.Column width="2" textAlign='center' verticalAlign='middle'>
          <Icon
            name={visible ? "angle double right" : "angle double left"}
            size="big"
            onClick={() => setVisible(!visible)}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              onHide={() => setVisible(false)}
              vertical
              direction="right"
              visible={visible}
              width="thin"
            >
              <Menu.Item name="item01">NavBarItem01</Menu.Item>
              <Menu.Item name="item02">NavBarItem02</Menu.Item>
              <Menu.Item name="item03">NavBarItem03</Menu.Item>
              <Menu.Item name="login">
                <Link to="/login" onClick={() => setVisible(false)}>
                  <Button>Log-In</Button>
                </Link>
              </Menu.Item>
              {/* <Menu.Item name="language">
                <Link to="#">
                  <Language />
                </Link>
              </Menu.Item> */}
            </Sidebar>
            <Sidebar.Pusher dimmed={visible}>
              <Segment basic>
                <Content />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SideBar;
