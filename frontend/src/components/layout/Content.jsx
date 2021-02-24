import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "../content/landing/Landing";
import Pictures from "../content/pictures/Pictures";
import PriceList from "../content/price_list/PriceList";

const Content = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/pricelist" exact component={PriceList} />
        <Route path="/pictures" exact component={Pictures} />
      </Switch>
    </Fragment>
  );
};

export default Content;
