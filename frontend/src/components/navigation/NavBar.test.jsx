import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  connectedLinkedRender,
  screen,
  waitFor,
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
        expect(screen.getAllByRole('link').length).toBe(3);
        expect(screen.getAllByRole('img').length).toBe(1);
        expect(screen.getAllByRole('heading').length).toBe(2);
        expect(screen.getAllByRole('button').length).toBe(1);
        expect(screen.getAllByRole('listbox').length).toBe(1);
        expect(screen.getAllByRole('alert').length).toBe(1);
        expect(screen.getAllByRole('option').length).toBe(2);
        // screen.getByRole('');
      });

      test('vital elements has appropriate classes', () => {
        connectedLinkedRender(<NavBar {...testProps} />);

        // screen.debug()
        expect(screen.getByRole('link', { name: 'logo' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'menu' })).toHaveAttribute(
          'href',
          '/pricelist'
        );
        expect(screen.getByRole('link', { name: 'gallery' })).toHaveAttribute(
          'href',
          '/pictures'
        );
        expect(screen.getByRole('img')).toHaveClass(
          'ui mini centered middle aligned image'
        );
        expect(screen.getByRole('button')).toHaveClass('ui button', { exact: true });
        expect(screen.getByRole('listbox')).toHaveClass('ui button floating dropdown', {
          exact: true,
        });
      });
    });
    describe('Menu item behavior', () => {
      test('clicking', async () => {
        connectedLinkedRender(<NavBar {...testProps} />);
        const logoItem = screen.getByRole('link', { name: 'logo' });
        const menuItem = screen.getByRole('link', { name: 'menu' });
        const galleryItem = screen.getByRole('link', { name: 'gallery' });
        const logInItem = screen.getByRole('button');
        const lngItem = screen.getByTestId('lngSwitcher');

        userEvent.click(logoItem);
        await waitFor(() => {
          expect(testProps.clickHandler.mock.calls[0][0]).toBe('logo');
        });
        userEvent.click(menuItem);
        await waitFor(() => {
          expect(testProps.clickHandler.mock.calls[1][0]).toBe('priceList');
        });
        userEvent.click(galleryItem);
        await waitFor(() => {
          expect(testProps.clickHandler.mock.calls[2][0]).toBe('pictures');
        });
        userEvent.click(logInItem);
        await waitFor(() => {
          expect(testProps.clickHandler.mock.calls[3][0]).toBe('signInOut');
        });
        userEvent.click(lngItem);
        await waitFor(() => {
          expect(testProps.clickHandler.mock.calls[4][0]).toBe('language');
        });
        expect(testProps.clickHandler).toHaveBeenCalledTimes(5);
      });
    });
  });
});
