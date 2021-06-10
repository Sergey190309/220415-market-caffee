import {actRespErrorMessage}from './errorHandler'

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
      console.log('response is available, result ->' actRespErrorMessage(mockError))
    });
  });
  describe('sagaErrorHandler testing', () => {
    test('dummy', () => {});
  });
});
