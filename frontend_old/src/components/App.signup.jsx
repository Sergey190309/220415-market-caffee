import React, { Fragment } from 'react';

// import SignUp from './auth/SignUp';
// import LogIn from './auth/LogIn'
import SignUp from './auth/SignUp'

// import * as apiCalls from '../api/apiCalls';

export const App = ({ setDeviceSize }) => {

  return (
    <Fragment>
      <SignUp />
    </Fragment>
  );
};

export default App;
