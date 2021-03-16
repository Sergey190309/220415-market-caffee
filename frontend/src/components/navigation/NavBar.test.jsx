import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { connectedRender, screen } from '../../testUtils/connectedRenderer';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import NavBar, { clickHandler } from './NavBar';
import { exact } from 'prop-types';

describe('NavBar testing', () => {
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
  const testProps = {
    initActive: '',
    setModalOpened: jest.fn(),
    clickHandler: jest.fn(),
  };

  describe('Logo element', () => {
    test('it exists and have specific attributes', () => {
      connectedRender(<NavBar {...testProps} />);
      // const logo = screen.getByRole('')
      const logo = screen.getByRole('link', { name: 'logo' });
      expect(logo).toBeVisible();
      expect(logo).toHaveAttribute('href', '/');
      // console.log(logo)
      expect(logo).toHaveClass('item');
      // screen.debug()
    });

    test('it renders picture', () => {
      connectedRender(<NavBar {...testProps} />);
      const logo = screen.getByRole('link', { name: 'logo' });
      const picture = screen.getByRole('img');
      expect(logo).toContainElement(picture);
    });

    test('it should be active having appopriate prop', () => {
      connectedRender(<NavBar {...testProps} initActive='logo' />);
      // const logo = screen.getByRole('')
      const logo = screen.getByRole('link', { name: 'logo' });
      expect(logo).toHaveClass('active');
    });

    test('it calls appropriate function on click with proper arguments', () => {
      connectedRender(<NavBar {...testProps} initActive='logo' />);
      // const logo = screen.getByRole('')
      const logo = screen.getByRole('link', { name: 'logo' });
      userEvent.click(logo);
      expect(testProps.clickHandler).toHaveBeenCalledTimes(1);
      expect(testProps.clickHandler.mock.calls[0][0]).toEqual('logo');
    });
  });
  describe('Price list (menu) element', () => {
    test('it exists and has specific attributes', () => {
      connectedRender(<NavBar {...testProps} />);
      const priceList = screen.getByRole('link', { name: 'menu' });
      expect(priceList).toBeVisible();
      expect(priceList).toHaveAttribute('href', '/pricelist');
      expect(priceList).toHaveClass('item');
    });

    test('it becomes acitve with appropriate props', () => {
      connectedRender(<NavBar {...testProps} initActive='priceList' />);
      const priceList = screen.getByRole('link', { name: 'menu' });
      expect(priceList).toHaveClass('active');
    });

    test('on click it calls proper function with appropriate argument', () => {
      connectedRender(<NavBar {...testProps} initActive='priceList' />);
      const priceList = screen.getByRole('link', { name: 'menu' });
      userEvent.click(priceList);
      expect(testProps.clickHandler).toHaveBeenCalledTimes(1);
      expect(testProps.clickHandler.mock.calls[0][0]).toEqual('priceList');
    });
  });
  describe('Pictures element', () => {
    test('it exists and has specific attributes', () => {
      connectedRender(<NavBar {...testProps} />);
      const pictures = screen.getByRole('link', { name: 'gallery' });
      expect(pictures).toBeVisible();
      expect(pictures).toHaveAttribute('href', '/pictures');
      expect(pictures).toHaveClass('item');
    });

    test('it becomes acitve with appropriate props', () => {
      connectedRender(<NavBar {...testProps} initActive='pictures' />);
      const picture = screen.getByRole('link', { name: 'gallery' });
      expect(picture).toHaveClass('active');
    });

    test('on click it calls proper function with appropriate argument', () => {
      connectedRender(<NavBar {...testProps} />);
      const picture = screen.getByRole('link', { name: 'gallery' });
      userEvent.click(picture);
      expect(testProps.clickHandler).toHaveBeenCalledTimes(1);
      expect(testProps.clickHandler.mock.calls[0][0]).toEqual('pictures');
    });
  });

  describe('Log In element', () => {
    test('it existst and has specific atributes', () => {
      connectedRender(<NavBar {...testProps} />);
      const logIn = screen.getByRole('button');
      expect(logIn).toBeVisible();
      expect(logIn).toHaveClass('ui button', { exact: true });
      expect(logIn).not.toHaveAttribute('href');
    });

    test('on click it calls proper function with appropriate argument', () => {
      connectedRender(<NavBar {...testProps} />);
      const logIn = screen.getByRole('button');
      userEvent.click(logIn);
      expect(testProps.clickHandler).toHaveBeenCalledTimes(1);
      expect(testProps.clickHandler.mock.calls[0][0]).toEqual('signInOut');
    });
  });

  describe('Language switcher element', () => {
    test('it existst and has specific atributes', () => {
      connectedRender(<NavBar {...testProps} />);
      const langSwitcher = screen.getByTestId('langSwitcher');
      expect(langSwitcher).toBeVisible();
      expect(langSwitcher).toHaveClass('item', { exact: true });
      expect(langSwitcher).not.toHaveAttribute('href');
    });

    test('on click it calls proper function with appropriate argument', () => {
      connectedRender(<NavBar {...testProps} />);
      const langSwitcher = screen.getByTestId('langSwitcher');
      userEvent.click(langSwitcher);
      expect(testProps.clickHandler).toHaveBeenCalledTimes(1);
      expect(testProps.clickHandler.mock.calls[0][0]).toEqual('language');
    });
  });
});
