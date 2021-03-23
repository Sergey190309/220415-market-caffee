import React, { Fragment, useState, useEffect } from 'react';
// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './layout/Layout';

import { setDeviceSize } from '../redux/actions';

export const App = ({ setDeviceSize }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    updateDimentions();
    window.addEventListener('resize', updateDimentions);
    return () => window.removeEventListener('resize', updateDimentions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const updateDimentions = () => {
    const _width = window.outerWidth;
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
