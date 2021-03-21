import React, { Fragment } from 'react';

// import SignUp from './auth/SignUp';
import LogIn from './auth/LogIn'

import * as apiCalls from '../api/apiCalls';

export const App = ({ setDeviceSize }) => {

  return (
    <Fragment>
      <LogIn />
    </Fragment>
  );
};

export default App;
