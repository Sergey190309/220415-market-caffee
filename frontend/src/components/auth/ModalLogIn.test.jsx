import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from 'semantic-ui-react';

import { ModalLogIn } from './ModalLogIn';

describe('ModalLogIn testing', () => {
  describe('Appiance', () => {
    test('ModalLogIn rendering (it does not work)', () => {
      render(<ModalLogIn />);
      // screen.getAllByRole('', {hidden: true});
      // screen.debug();
    });
  });
});
