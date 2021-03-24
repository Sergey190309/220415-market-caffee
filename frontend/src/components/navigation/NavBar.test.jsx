import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  connectedLinkedRender,
  screen,
} from '../../testUtils/modifiedRenderReactTesting';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { NavBar, clickHandler } from './NavBar';
import '../../../__mock__/react-i18next';
// import { exact } from 'prop-types';

describe('NavBar testing', () => {
  describe('non react elements', () => {
    describe('clickHandling function testing', () => {
      const activateItems = ['logo', 'priceList', 'pictures'];
      const notActivateItems = ['signInOut', 'language'];
      // const activateModal = 'signInOut';
      const setActiveItem = jest.fn();
      const setModalOpened = jest.fn();

      test('calling from items that makes them active', () => {
        activateItems.forEach(item => {
          clickHandler(item, setActiveItem, setModalOpened);
          expect(setActiveItem).toHaveBeenCalledWith(item);
        });
        expect(setActiveItem).toHaveBeenCalledTimes(3);
      });

      test('calling from items that does not make them active', () => {
        notActivateItems.forEach(item => {
          clickHandler(item, setActiveItem, setModalOpened);
        });
        expect(setActiveItem).not.toHaveBeenCalled();
      });

      test('only one item activate modal and call with proper arg', () => {
        [...activateItems, ...notActivateItems].forEach(item => {
          clickHandler(item, setActiveItem, setModalOpened);
        });
        expect(setModalOpened).toHaveBeenCalledTimes(1);
        expect(setModalOpened).toHaveBeenCalledWith('logIn');
      });
    });
  });

  describe('react components', () => {
    const testProps = {
      initActive: '',
      setModalOpened: jest.fn(),
      clickHandler: jest.fn(),
    };
    describe('appearance', () => {
      test('it exists and has appropriate elements', () => {
        connectedLinkedRender(<NavBar {...testProps} />);
        screen.getByRole('');
      });
    });
  });
});
