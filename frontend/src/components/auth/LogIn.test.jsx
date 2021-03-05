import React from 'react';
import {
  render,
  // screen,
  // fireEvent,
  // waitFor
} from '@testing-library/react';
import { LogIn, onChange } from './LogIn';

describe('LogIn component testing', () => {
  describe('Non react elements', () => {
    test('onChange function testing', () => {
      const setFormData = jest.fn();
      const formData = {
        email: 'prev@email',
        password: 'prev password',
      };
      const target = {
        name: 'email',
        value: 'new@email',
      };

      onChange(setFormData, formData, target);
      const name = target.name;
      const value = target.value;
      expect(setFormData).toHaveBeenCalledWith({ ...formData, [name]: value });
    });
  });

  describe('header testing', () => {});

  describe('email input testing', () => {});

  describe('password input testing', () => {});

  describe('buttons testing', () => {});

  describe('message testing', () => {});
});
