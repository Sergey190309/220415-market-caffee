import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Icon,
  Grid,
  Sidebar,
  Segment,
  Menu,
  Checkbox,
  Button,
} from "semantic-ui-react";

import Landing from "../../layout/Landing";
import Language from "../../language/Language";

const SideBar = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Grid columns={1}>
      <Grid.Column>
        <Checkbox
          checked={visible}
          label={{ children: <code>visible</code> }}
          onChange={(e, data) => setVisible(data.checked)}
        />
      </Grid.Column>

      <Grid.Column>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width="thin"
          >
            <Menu.Item name="logo">
              <Link to="/" onClick={() => setVisible(false)}>
                <Icon name="utensils" size="large" />
              </Link>
            </Menu.Item>
            <Menu.Item name="item01">NavBarItem01</Menu.Item>
            <Menu.Item name="item02">NavBarItem02</Menu.Item>
            <Menu.Item name="item03">NavBarItem03</Menu.Item>
            <Menu.Item name="login">
              <Link to="/login" onClick={() => setVisible(false)}>
                <Button>Log-In</Button>
              </Link>
            </Menu.Item>
            <Menu.Item name="language">
              <Link to="#">
                <Language />
              </Link>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <Landing />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
};

export default SideBar;
