import React from 'react';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import store from '../../redux/store'
import { ModalLogIn, onCloseHandle } from './ModalLogIn';
import { openModal } from '../../redux/slices';

describe('ModalLogIn testing', () => {
  describe('Not react components', () => {
    test('onCloseHandle function testing', () => {
      const dispatch = jest.fn();
      const closeModal = jest.fn(() => 'closeModal');
      const setOpen = jest.fn();
      onCloseHandle(dispatch, closeModal, setOpen);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith('closeModal');
      expect(closeModal).toHaveBeenCalledTimes(1);
      expect(setOpen).toHaveBeenCalledWith(false);
    });
  });

  describe('Appiance', () => {
    test('ModalLogIn exists (snapshot)', () => {
      const testProps = {
        setModalClosed: jest.fn(),
        onCloseHandle: jest.fn(),
      };
      store.dispatch(openModal('somthing'))
      render(
        <Provider store={store}>
          <ModalLogIn {...testProps} />
        </Provider>
      );
      // screen.debug()
      const modalItem = screen.getByTestId('modal');
      expect(modalItem).toMatchSnapshot();
      // screen.debug()
    });
  });
});
