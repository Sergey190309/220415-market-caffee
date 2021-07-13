import i18next from 'i18next';
import { setI18next, initI18next } from './i18n';

const mockI18next = jest.createMockFromModule('i18next');

jest.mock('i18next', () => ({
  __esModule: true,
  default: {
    use: jest.fn(),
  },
}));
// jest.mock('i18next', () => ({
//   __esModule: true,
//   default: {
//     use: jest.fn(),
//     init: jest.fn().mockImplementation(() => Promise.resolve({ result: 'result' })),
//   },
// }));
describe('setI18next testing', () => {
  const supportedLngs = ['cimode', 'en'];
  const fmBackEnd = ['en', 'ru', 'cn'];
  beforeEach(() => {
    // i18next.mockImplementation(mockI18next);
  });
  test('initI18next testing', () => {
    const result = initI18next(fmBackEnd);
    console.log('initI18next testing, result ->', result);
  });

  test('setI18next success', () => {
    const expResult = ['cimode', 'en', 'ru', 'cn'];

    setI18next(fmBackEnd, supportedLngs);

    expect(supportedLngs).toEqual(expResult);
  });
});
