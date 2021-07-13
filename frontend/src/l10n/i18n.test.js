import i18next from 'i18next';
import { setI18next, initI18next } from './i18n';

jest.mock('i18next')
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
  jest.resetAllMocks();
  // i18next.mockImplementation(mockI18next);
});

describe('setI18next testing', () => {
  const supportedLngs = ['cimode', 'en'];
  const fmBackEnd = ['en', 'ru', 'cn'];
  test('initI18next testing', () => {
    console.log('initI18next testing, i18next.supportedLngs ->', i18next.options.supportedLngs)
    // mockI18next.mockImplementation(jest.fn());
    const result = initI18next(fmBackEnd);
    console.log('initI18next testing, result ->', result);
  });

  test('setI18next success', () => {
    const expResult = ['cimode', 'en', 'ru', 'cn'];

    setI18next(fmBackEnd, supportedLngs);

    expect(supportedLngs).toEqual(expResult);
  });
});
