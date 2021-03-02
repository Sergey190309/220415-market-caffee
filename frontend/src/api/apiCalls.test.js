import axios from 'axios';
import * as apiCalls from './apiCalls';

describe('apiCalls testing', () => {
  describe('Sign up', () => {
    test('Calls to /users', () => {
      const mockSignUp = jest.fn();
      axios.post = mockSignUp;
      apiCalls.signUp();

      const path = mockSignUp.mock.calls[0][0]

      expect(path).toBe('/users');

    });
  });
});
