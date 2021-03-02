import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "../content/landing/Landing";
import Pictures from "../content/pictures/Pictures";
import PriceList from "../content/price_list/PriceList";
// import ModalLogIn from '../auth/ModalLogIn'

const Content = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/pricelist" exact component={PriceList} />
        <Route path="/pictures" exact component={Pictures} />
        {/* <Route path="/signinout" exact component={ModalLogIn} /> */}
      </Switch>
    </Fragment>
  );
};

export default Content;
