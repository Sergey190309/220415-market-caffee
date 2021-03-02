import React, {
  Fragment,
} from 'react';

import SignUp from './items/SignUp'

import * as apiCalls from '../api/apiCalls'

export const App = ({ setDeviceSize }) => {
  const postSignUp = () => {
    apiCalls.signUp()
  }
  return (
    <Fragment>
      <SignUp postSignUp={postSignUp} />
    </Fragment>
  );
};

export default App;
