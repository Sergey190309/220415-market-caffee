import React, { Fragment, useState, useEffect } from 'react';
// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './layout/Layout';
// import { getLngList } from '../api/calls/getBackEndInfo';

import { setDeviceSize } from '../redux/actions';

export const App = ({ setDeviceSize }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    updateDimentions();
    window.addEventListener('resize', updateDimentions);
    return () => window.removeEventListener('resize', updateDimentions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  // useEffect(() => {
  //   getLngList(techToken);
  // }, [techToken]);

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

App.defaultProps = {
  // techToken: '',
  setDeviceSize: () => {
    console.log('setDeviceSize called');
  },
};

App.propTypes = {
  // techToken: PropTypes.string.isRequired,
  setDeviceSize: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   techToken: state.tech.tech_token,
// });

export default connect(null, { setDeviceSize })(App);
// export default connect(mapStateToProps, { setDeviceSize })(App);
