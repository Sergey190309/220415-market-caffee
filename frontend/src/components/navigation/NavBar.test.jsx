import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavBar, clickHandler } from './NavBar';

describe.skip('NavBar testing', () => {
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

  const initComponent = actualProps => {
    // beforeEach(() => {
    // const NavBar = () => {
    render(<BrowserRouter><NavBar {...actualProps} /></BrowserRouter>
    );
  };

  const getItem = (role, name, actualProps) => {
    initComponent(actualProps);
    return screen.getByRole(role, { name: name });
  };

  describe('Logo item testing', () => {
    const getLogo = actualProps => {
      return getItem('link', 'Logo here', actualProps);
    };

    test('it should exist', () => {
      const item = getLogo();
      expect(item).toBeInTheDocument();
    });

    test('it should have reference to proper url', () => {
      const item = getLogo();
      expect(item.href).toBe('http://localhost/');
    });

    test('click calls clickHandler, does not call setModalOpened', async () => {
      const item = getLogo(testProps);
      fireEvent.click(item);
      expect(testProps.clickHandler).toHaveBeenCalledTimes(1);
      expect(testProps.setModalOpened).toHaveBeenCalledTimes(0);
    });

    test('click makes item active', async () => {
      const item = getLogo();

      fireEvent.click(item);

      await waitFor(() => {
        expect(item.className).toContain('active');
      });
    });
  });

  describe('Menu item testing', () => {
    const getMenu = actualProps => {
      return getItem('link', 'menu', actualProps);
    };

    test('it should exist', () => {
      const item = getMenu();
      expect(item).toBeInTheDocument();
    });

    test('it should have reference to proper url', () => {
      const item = getMenu();
      expect(item.href).toBe('http://localhost/pricelist');
    });

    test('click calls clickHandler, does not call setModalOpened', () => {
      const item = getMenu(testProps);
      fireEvent.click(item);
      expect(testProps.clickHandler).toHaveBeenCalledTimes(1);
      expect(testProps.setModalOpened).toHaveBeenCalledTimes(0);
    });

    test('click makes item active', async () => {
      const item = getMenu();
      fireEvent.click(item);
      await waitFor(() => {
        expect(item.className).toContain('active');
      });
    });
  });

  describe('Gallery item testing', () => {
    const getMenu = actualProps => {
      return getItem('link', 'gallery', actualProps);
    };

    test('it should exist', () => {
      const item = getMenu();
      expect(item).toBeInTheDocument();
    });

    test('it should have reference to proper url', () => {
      const item = getMenu();
      expect(item.href).toBe('http://localhost/pictures');
    });

    test('click calls clickHandler, does not call setModalOpened', () => {
      const item = getMenu(testProps);
      fireEvent.click(item);
      expect(testProps.clickHandler).toHaveBeenCalledTimes(1);
      expect(testProps.setModalOpened).toHaveBeenCalledTimes(0);
    });

    test('click makes item active', async () => {
      const item = getMenu();
      fireEvent.click(item);
      await waitFor(() => {
        expect(item.className).toContain('active');
      });
    });
  });

  describe('LogInOut item testing', () => {
    const getMenu = actualProps => {
      return getItem('button', 'LogInOut', actualProps);
    };

    test('it should exist', () => {
      const item = getMenu();
      expect(item).toBeInTheDocument();
    });

    test('it should not have any reference', () => {
      const item = getMenu();
      expect(item.href).toBeUndefined();
    });

    test('click calls clickHandler, does not call setModalOpened', () => {
      const item = getMenu(testProps);
      fireEvent.click(item);
      expect(testProps.clickHandler).toHaveBeenCalledTimes(1);
      expect(testProps.setModalOpened).toHaveBeenCalledTimes(0);
    });

    test('click does not make item active', async () => {
      const item = getMenu();
      fireEvent.click(item);
      await waitFor(() => {
        expect(item.className).not.toContain('active');
      });
    });
  });

  describe('Language item testing', () => {
    const getMenu = actualProps => {
      return getItem('button', 'EN', actualProps);
    };

    test('it should exist', () => {
      const item = getMenu();
      expect(item).toBeInTheDocument();
    });

    test('it should not have any reference', () => {
      const item = getMenu();
      expect(item.href).toBeUndefined();
    });

    test('click calls clickHandler, does not call setModalOpened', () => {
      const item = getMenu(testProps);
      fireEvent.click(item);
      expect(testProps.clickHandler).toHaveBeenCalledTimes(1);
      expect(testProps.setModalOpened).toHaveBeenCalledTimes(0);
    });

    test('click does not make item active', async () => {
      const item = getMenu();
      fireEvent.click(item);
      await waitFor(() => {
        expect(item.className).not.toContain('active');
      });
    });
  });
});

//   describe('Menu item', () => {
//     let item;
//     beforeEach(() => {
//       item = screen.getByRole('link', { name: 'Menu' });
//     });

//     test('it should exist', () => {
//       expect(item).toBeInTheDocument();
//     });

//     test('it should have reference to proper url', () => {
//       expect(item.href).toBe('http://localhost/pricelist');
//     });

//     test('when clicked should make itself acitve', () => {
//       console.log(item.className);
//       expect(item.className).not.toContain('active');
//     });
//   });

//   describe('Gallery item', () => {
//     let item;
//     beforeEach(() => {
//       item = screen.getByRole('link', { name: 'Gallery' });
//     });

//     test('it should exist', () => {
//       expect(item).toBeInTheDocument();
//     });

//     test('it should have reference to proper url', () => {
//       // console.log(item.href)
//       expect(item.href).toBe('http://localhost/pictures');
//     });
//   });

//   describe('LogInOut item', () => {
//     let item;
//     beforeEach(() => {
//       item = screen.getByRole('button', { name: 'LogInOut' });
//     });

//     test('it should exist', () => {
//       expect(item).toBeInTheDocument();
//     });

//     test('it should not have any href', () => {
//       // console.log(item.href)
//       expect(item.href).toBeUndefined();
//     });
//   });

//   describe('Language item', () => {
//     let item;
//     beforeEach(() => {
//       item = screen.getByRole('button', { name: 'EN' });
//     });

//     test('it should exist', () => {
//       expect(item).toBeInTheDocument();
//     });

//     test('it should not have any href', () => {
//       // console.log(item.href)
//       expect(item.href).toBeUndefined();
//     });
//   });
