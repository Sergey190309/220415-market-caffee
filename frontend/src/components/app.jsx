import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Container } from "semantic-ui-react";

import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Alert from "./layout/Alert";
import Login from "./auth/Login";
import Register from "./auth/Register";

import { setDisplayWidth } from "../redux/actions/display_width";


const App = () => {
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimentions();
    window.addEventListener("resize", updateDimentions);
    console.log(width);
    return () => window.removeEventListener("resize", updateDimentions);
  }, [width]);

  const updateDimentions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Container>
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Container>
      </Fragment>
    </BrowserRouter>
  );
};

Register.propTypes = {
  setDisplayWidth: PropTypes.func.isRequired
}

export default connect(null, {setDisplayWidth})(App);
// export default App;
