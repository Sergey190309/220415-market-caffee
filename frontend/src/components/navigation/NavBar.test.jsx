import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar, { clickHandler } from './NavBar';

describe.only('NavBar testing', () => {
  describe('Non react elements', () => {
    const activateItems = ['logo', 'priceList', 'pictures'];
    const notActivateItems = ['signInOut', 'language'];
    const activateModal = 'signInOut';
    const setActiveItem = jest.fn();
    const setModalOpened = jest.fn();

    describe('clickHandling function testing', () => {
      test('calling from items that makes them active', () => {
        activateItems.forEach(item => {
          clickHandler(item, setActiveItem, setModalOpened);
          expect(setActiveItem).toHaveBeenCalledWith(item);
        });
      });

      test('calling from items that does not make them active', () => {
        notActivateItems.forEach(item => {
          clickHandler(item, setActiveItem, setModalOpened);
        });
        expect(setActiveItem).not.toHaveBeenCalled();
      });

      test('only one item activate modal', () => {
        notActivateItems.forEach(item => {
          clickHandler(item, setActiveItem, setModalOpened);
        });
        activateItems.forEach(item => {
          clickHandler(item, setActiveItem, setModalOpened);
        });
        expect(setModalOpened).toHaveBeenCalledWith('LogIn');
      });

      test('calling from item activating modal', () => {
        clickHandler(activateModal, setActiveItem, setModalOpened);
        expect(setModalOpened).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe.only('Logo element', () => {
    test('it exists', () => {
      render(<NavBar />)
      screen.debug()
    });
  });
});
