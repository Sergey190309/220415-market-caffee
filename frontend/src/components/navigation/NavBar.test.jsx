import React from 'react';

import userEvent from '@testing-library/user-event'
import {
  connectedLinkedRender,
  screen,
  waitFor,
} from '../../testUtils'
import {clickHandler, NavBar} from './NavBar'
// import { exact } from 'prop-types';

describe('NavBar testing', () => {
  describe('non react elements', () => {
    describe('clickHandling function testing', () => {
      const activateItems = ['logo', 'priceList', 'pictures', 'private', 'admin'];
      const notActivateItems = ['signInOut', 'language'];
      // const activateModal = 'signInOut';
      const setActiveItem = jest.fn();
      const setModalOpened = jest.fn();

      test('calling from items that makes them active', () => {
        activateItems.forEach(item => {
          clickHandler(item, setActiveItem, setModalOpened);
          expect(setActiveItem).toHaveBeenCalledWith(item);
        });
        expect(setActiveItem).toHaveBeenCalledTimes(5);
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
      isAuthenticated: false,
      isAdmin: false,
      logOutAction: jest.fn(),
    };
    describe('appearance', () => {
      test('it exists and has appropriate elements not logged', () => {
        connectedLinkedRender(<NavBar {...testProps} />);
        expect(screen.getAllByRole('link').length).toBe(3);
        expect(screen.getAllByRole('img').length).toBe(1);
        expect(screen.getAllByRole('heading').length).toBe(3);
        expect(screen.getAllByRole('button').length).toBe(1);
        expect(screen.getAllByRole('listbox').length).toBe(1);
        expect(screen.getAllByRole('alert').length).toBe(1);
        expect(screen.getAllByRole('option').length).toBe(2);
        // screen.getByRole('');
      });

      test('it exists and has appropriate elements not admin logged', () => {
        const acitveProps = { ...testProps, isAuthenticated: true };
        connectedLinkedRender(<NavBar {...acitveProps} />);
        expect(screen.getAllByRole('link').length).toBe(4);
        expect(screen.getAllByRole('img').length).toBe(1);
        expect(screen.getAllByRole('heading').length).toBe(3);
        expect(screen.getAllByRole('button').length).toBe(1);
        expect(screen.getAllByRole('listbox').length).toBe(1);
        expect(screen.getAllByRole('alert').length).toBe(1);
        expect(screen.getAllByRole('option').length).toBe(2);
        // screen.getByRole('');
      });

      test('it exists and has appropriate elements admin logged', () => {
        const acitveProps = { ...testProps, isAuthenticated: true, isAdmin: true };
        connectedLinkedRender(<NavBar {...acitveProps} />);
        expect(screen.getAllByRole('link').length).toBe(5);
        expect(screen.getAllByRole('img').length).toBe(1);
        expect(screen.getAllByRole('heading').length).toBe(4);
        expect(screen.getAllByRole('button').length).toBe(1);
        expect(screen.getAllByRole('listbox').length).toBe(1);
        expect(screen.getAllByRole('alert').length).toBe(1);
        expect(screen.getAllByRole('option').length).toBe(2);
        // screen.getByRole('');
      });

      test('vital elements has appropriate classes noone logged', () => {
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
      test('vital elements has appropriate classes not admin logged', () => {
        const acitveProps = { ...testProps, isAuthenticated: true };
        connectedLinkedRender(<NavBar {...acitveProps} />);
        expect(screen.getByRole('link', { name: 'logo' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'menu' })).toHaveAttribute(
          'href',
          '/pricelist'
        );
        expect(screen.getByRole('link', { name: 'gallery' })).toHaveAttribute(
          'href',
          '/pictures'
        );
        expect(screen.getByRole('link', { name: 'forFriends' })).toHaveAttribute(
          'href',
          '/private'
        );
        expect(screen.getByRole('img')).toHaveClass(
          'ui mini centered middle aligned image'
        );
        expect(screen.getByRole('button')).toHaveClass('ui button', { exact: true });
        expect(screen.getByRole('listbox')).toHaveClass('ui button floating dropdown', {
          exact: true,
        });
      });

      test('vital elements has appropriate classes admin logged', () => {
        const acitveProps = { ...testProps, isAuthenticated: true, isAdmin: true };
        connectedLinkedRender(<NavBar {...acitveProps} />);
        expect(screen.getByRole('link', { name: 'logo' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'menu' })).toHaveAttribute(
          'href',
          '/pricelist'
        );
        expect(screen.getByRole('link', { name: 'gallery' })).toHaveAttribute(
          'href',
          '/pictures'
        );
        expect(screen.getByRole('link', { name: 'forFriends' })).toHaveAttribute(
          'href',
          '/private'
        );
        expect(screen.getByRole('link', { name: 'forAdmins' })).toHaveAttribute(
          'href',
          '/admin'
        );
        expect(screen.getByRole('img')).toHaveClass(
          'ui mini centered middle aligned image'
        );
        expect(screen.getByRole('button')).toHaveClass('ui button', { exact: true });
        expect(screen.getByRole('listbox')).toHaveClass('ui button floating dropdown', {
          exact: true,
        });
      });

      test('for friends item disabled and has no /href when noone logged in', () => {
        connectedLinkedRender(<NavBar {...testProps} />);
        const forFriendsItem = screen.getByRole('heading', { name: 'forFriends' });
        expect(forFriendsItem).toHaveClass('ui disabled header', { exact: true });
        expect(forFriendsItem).not.toHaveAttribute('/href');
      });
    });

    describe('Menu item behavior', () => {
      test('clicking noone logged in', async () => {
        const acitveProps = { ...testProps, isAuthenticated: true, isAdmin: true };
        connectedLinkedRender(<NavBar {...acitveProps} />);
        const logoItem = screen.getByRole('link', { name: 'logo' });
        const menuItem = screen.getByRole('link', { name: 'menu' });
        const galleryItem = screen.getByRole('link', { name: 'gallery' });
        // const privateItem = screen.getByRole('link', { name: 'forFriends' });
        // const adminItem = screen.getByRole('link', { name: 'forAdmins' });
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
        // userEvent.click(privateItem);
        // await waitFor(() => {
        //   expect(testProps.clickHandler.mock.calls[3][0]).toBe('private');
        // });
        // userEvent.click(adminItem);
        // await waitFor(() => {
        //   expect(testProps.clickHandler.mock.calls[4][0]).toBe('admin');
        // });
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
      test('clicking not admin logged in', async () => {
        const acitveProps = { ...testProps, isAuthenticated: true, isAdmin: true };
        connectedLinkedRender(<NavBar {...acitveProps} />);
        const logoItem = screen.getByRole('link', { name: 'logo' });
        const menuItem = screen.getByRole('link', { name: 'menu' });
        const galleryItem = screen.getByRole('link', { name: 'gallery' });
        const privateItem = screen.getByRole('link', { name: 'forFriends' });
        // const adminItem = screen.getByRole('link', { name: 'forAdmins' });
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
        userEvent.click(privateItem);
        await waitFor(() => {
          expect(testProps.clickHandler.mock.calls[3][0]).toBe('private');
        });
        // userEvent.click(adminItem);
        // await waitFor(() => {
        //   expect(testProps.clickHandler.mock.calls[4][0]).toBe('admin');
        // });
        userEvent.click(logInItem);
        await waitFor(() => {
          expect(testProps.clickHandler.mock.calls[4][0]).toBe('signInOut');
        });
        userEvent.click(lngItem);
        await waitFor(() => {
          expect(testProps.clickHandler.mock.calls[5][0]).toBe('language');
        });
        expect(testProps.clickHandler).toHaveBeenCalledTimes(6);
      });

      test('clicking admin logged in', async () => {
        const acitveProps = { ...testProps, isAuthenticated: true, isAdmin: true };
        connectedLinkedRender(<NavBar {...acitveProps} />);
        const logoItem = screen.getByRole('link', { name: 'logo' });
        const menuItem = screen.getByRole('link', { name: 'menu' });
        const galleryItem = screen.getByRole('link', { name: 'gallery' });
        const privateItem = screen.getByRole('link', { name: 'forFriends' });
        const adminItem = screen.getByRole('link', { name: 'forAdmins' });
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
        userEvent.click(privateItem);
        await waitFor(() => {
          expect(testProps.clickHandler.mock.calls[3][0]).toBe('private');
        });
        userEvent.click(adminItem);
        await waitFor(() => {
          expect(testProps.clickHandler.mock.calls[4][0]).toBe('admin');
        });
        userEvent.click(logInItem);
        await waitFor(() => {
          expect(testProps.clickHandler.mock.calls[5][0]).toBe('signInOut');
        });
        userEvent.click(lngItem);
        await waitFor(() => {
          expect(testProps.clickHandler.mock.calls[6][0]).toBe('language');
        });
        expect(testProps.clickHandler).toHaveBeenCalledTimes(7);
      });

      test('for friends itme shows popup when hovered, noone logged in', async () => {
        connectedLinkedRender(<NavBar {...testProps} />);
        const forFriendsItem = screen.getByRole('heading', { name: 'forFriends' });

        expect(screen.queryByText('plsLogIn')).not.toBeInTheDocument();

        userEvent.hover(forFriendsItem);
        await waitFor(async () => {
          expect(screen.queryByText('plsLogIn')).toBeInTheDocument();
        });
      });
    });
  });
});
