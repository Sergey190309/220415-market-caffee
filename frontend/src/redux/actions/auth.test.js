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

import {LOG_IN_MODAL_CLOSED, LOG_OUT, SIGN_UP_MODAL_CLOSED} from './types'

import { logInAction, logOutAction, setLoggedInFalse, setSignedUpFalse } from './auth';

describe('Auth action testing', () => {
  describe('normal action creators', () => {
    test('logOutAction', () => {
      const expAction = {
        type: LOG_OUT
      }
      expect(logOutAction()).toEqual(expAction);
    });

    test('setSignedUpFalse', () => {
      const expAction = {
        type: SIGN_UP_MODAL_CLOSED
      }
      expect(setSignedUpFalse()).toEqual(expAction);
    });

    test('setLoggedInFalse', () => {
      const expAction = {
        type: LOG_IN_MODAL_CLOSED
      }
      expect(setLoggedInFalse()).toEqual(expAction);
    });
  });

  describe('async action creators', () => {

  });
});
