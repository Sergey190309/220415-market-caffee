import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment} from "semantic-ui-react";

import Aux from "../HOC/auxiliary/auxiliary";
import NavBar from "../navigation/NavBar";
import SideBar from "../navigation/SideBar";
import Content from "./Content";
// import Landing from "../content/landing/Landing";
// import PriceList from "../content/price_list/PriceList";
// import Pictures from "../content/pictures/Pictures";

export const Layout = ({ layout }) => {
  const [deviceSize, setDeviceSize] = useState("");
  useEffect(() => {
    setDeviceSize(layout.deviceSize)
  }, [layout.deviceSize])

  let output
  switch (deviceSize) {
    case 'small':
      output = (<SideBar />)
      break;
    default:
      output = (
        <Segment>
          <NavBar />
          <Content />
        </Segment>
      )
      break;
  }

  return (
    <Aux>
      {output}
    </Aux>
  )
};

Layout.propTypes = {
  layout: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  layout: state.layout,
});

export default connect(mapStateToProps)(Layout);
