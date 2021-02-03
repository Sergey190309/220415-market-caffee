import React, { Fragment, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Container } from "semantic-ui-react";

// import NavBar from "./layout/menus/NavBar";
import MenuSwitcher from "./layout/menus/MenuSwitcher";
import Landing from "./layout/Landing";
import Alert from "./layout/Alert";
import Login from "./auth/Login";
import Register from "./auth/Register";

import { setDeviceSize } from "../redux/actions";

const App = ({ setDeviceSize }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    updateDimentions();
    window.addEventListener("resize", updateDimentions);
    // console.log('useEffect width', width)
    return () => window.removeEventListener("resize", updateDimentions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const updateDimentions = () => {
    const _width = window.outerWidth;
    // console.log("Update dementions - width from window", _width);
    setWidth(_width);
    setDeviceSize(_width);
  };

  return (
    <Fragment>
      <MenuSwitcher />
      {/* <Route exact path="/" component={Landing} /> */}
      <Container>
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Container>
    </Fragment>
  );
};

Register.propTypes = {
  setDeviceSize: PropTypes.func.isRequired,
};

export default connect(null, { setDeviceSize })(App);
// export default App;
