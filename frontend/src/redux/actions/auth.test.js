// import React from 'react';
// import axios from 'axios';
// import {render, screen} from '@testing-library/react'
// import {
//   connectedLinkedRender,
//   screen,
//   // waitFor,
// } from '../../testUtils/modifiedRenderReactTesting';
// import userEvent from '@testing-library/user-event';

// import LogIn from '../../components/auth/LogIn';

// jest.mock('axios')
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import nock from 'nock';
// import fetch from 'isomorphic-fetch';

import { logInAction, logOutAction } from './auth';

describe('Auth action testing', () => {
  describe('normal action creators', () => {
    test('logOutAction', () => {
      console.log(logOutAction())
    });

  });
});
