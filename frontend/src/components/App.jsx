import React, { Fragment, useState, useEffect } from 'react';
// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './layout/Layout';

// import { setDeviceSize} from '../redux/actions';
import { setDeviceSize, setAvailableLocales } from '../redux/actions';

export const App = ({ setDeviceSize, setAvailableLocales }) => {
  //
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setAvailableLocales()
  }, [setAvailableLocales])

  useEffect(() => {
    updateDimentions();
    window.addEventListener('resize', updateDimentions);
    // console.log('useEffect width', width)
    return () => window.removeEventListener('resize', updateDimentions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  // setAvailableLocales();

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
  setAvailableLocales: PropTypes.func.isRequired,
};

// export default connect(null, { setDeviceSize })(App);
export default connect(null, { setDeviceSize, setAvailableLocales })(App);
