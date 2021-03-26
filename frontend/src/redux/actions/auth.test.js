import React from 'react';
import axios from 'axios';
// import {render, screen} from '@testing-library/react'
import {
  connectedLinkedRender,
  screen,
  waitFor,
} from '../../testUtils/modifiedRenderReactTesting';
import userEvent from '@testing-library/user-event';

import LogIn from '../../components/auth/LogIn';

jest.mock('axios')
describe('Auth action testing', () => {
  const initValues = {
    email: 'a@agatha-ng.com',
    password: 'qwerty',
  };
  const testProps = {
    initValues: initValues,
    logInSchema: jest.fn(),
    setModalOpened: jest.fn(),
    setModalClosed: jest.fn(),
    logInAction: jest.fn()
  };

  test('get tokens - successful logon', async () => {
    connectedLinkedRender(<LogIn {...testProps} />);

    const logInButton = screen.getByRole('button', { name: 'buttons.logIn' });
    console.log(logInButton)
    // userEvent.click(logInButton);
    // await waitFor(() => {
    //   expect(testProps.logInAction).toHaveBeenCalledTimes(1);
    // })
  });
});
