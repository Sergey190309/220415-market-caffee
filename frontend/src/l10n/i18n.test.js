// import i18next from 'i18next';
import { setI18next } from './i18n';

jest.mock('i18next');

// jest.mock('i18next', () => ({
//   use: () => {},
// }));

// const
// jest.mock('i18next', () => ({
//   // __esModule: true,
//   use: jest.fn(() => ({})),
//   init: jest.fn(() => ({})),
//   t: k => k,
// }));
// const mockI18next = i18next.use;

beforeEach(() => {
  // jest.resetAllMocks();
  // i18next.mockImplementation(mockI18next);
});

describe('setI18next testing', () => {
  const supportedLngs = ['cimode', 'en'];
  const fmBackEnd = ['en', 'ru', 'cn'];
  test('dummy, initI18next testing', () => {
    /**
     * I was unable to test the function. I guess something wrong wtih object that returned by i18next.use
     */
    // console.log('initI18next testing, i18next ->', i18next.use)
    // mockI18next.mockImplementation(jest.fn());
    // const result = initI18next(fmBackEnd);
    // console.log('initI18next testing, result ->', result);
  });

  test.skip('setI18next success', () => {
    const expResult = ['cimode', 'en', 'ru', 'cn'];

    setI18next(fmBackEnd, supportedLngs);

    expect(supportedLngs).toEqual(expResult);
  });
});
