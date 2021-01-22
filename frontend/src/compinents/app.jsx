import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Redux
import { Provider } from "react-redux";

import { Container } from "semantic-ui-react";

import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
// Redux
import store from "../redux/store";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Container>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Container>
      </Fragment>
    </BrowserRouter>
  </Provider>
);

export default App;
