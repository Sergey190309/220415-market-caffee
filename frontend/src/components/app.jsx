import React, { Fragment, useState, useEffect } from "react";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import { Container } from "semantic-ui-react";

import Layout from './layout/Layout'

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
      <Layout />
    </Fragment>
  );
};

App.propTypes = {
  setDeviceSize: PropTypes.func.isRequired,
};

export default connect(null, { setDeviceSize })(App);
