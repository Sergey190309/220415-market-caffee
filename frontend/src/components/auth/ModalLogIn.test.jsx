import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { ModalLogIn, onCloseHandle } from './ModalLogIn';

describe('ModalLogIn testing', () => {
  describe('Not react components', () => {
    test('onCloseHandle function testing', () => {
      const setModalClosed = jest.fn()
      const setOpen = jest.fn()
      onCloseHandle(setModalClosed, setOpen)
      expect(setModalClosed).toHaveBeenCalledTimes(1);
      expect(setOpen).toHaveBeenCalledWith(false);
    })

  })

  describe('Appiance', () => {
    test('ModalLogIn exists and has some attributes', () => {
      const testProps = {
        kindOfModal: 'Loading',
        setModalClosed: jest.fn(),
        onCloseHandle: jest.fn()
      }
      render(
        <BrowserRouter>
          <ModalLogIn {...testProps} />
        </BrowserRouter>
      );
      // screen.debug()
      const modalItem = screen.getByTestId('modal')
      // // console.log(modalItem.className)
      expect(modalItem.className).toContain('ui');
      expect(modalItem.className).toContain('small');
      expect(modalItem.className).toContain('basic');
      expect(modalItem.className).toContain('modal');
      expect(modalItem.className).toContain('transition');
      expect(modalItem.className).toContain('visible');
      expect(modalItem.className).toContain('active');

    });
  });
});
