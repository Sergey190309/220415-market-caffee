import { actRespErrorMessage, sagaErrorHandler } from './errorHandler';

describe('errorHandler testing', () => {
  describe('actRespErrorMessage testing', () => {
    test('response is available', () => {
      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'not found',
          },
        },
      };
      const expResult = `${mockError.response.data.message} ${mockError.response.status}`;
      expect(actRespErrorMessage(mockError)).toBe(expResult);
      // console.log('response is available, result ->', actRespErrorMessage(mockError))
    });

    test('not response', () => {
      const mockError = {
        message: 'error message',
      };
      const expResult = mockError.message;
      expect(actRespErrorMessage(mockError)).toBe(expResult);
    });
  });

  describe('sagaErrorHandler testing', () => {
    test('dummy, response is available', () => {

    });
    test('no response', () => {
      const mockError = {
        request: 'request',
        message: 'error message',
      };
      sagaErrorHandler(mockError)
    });
  });
});
