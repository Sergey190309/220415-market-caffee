import {setI18next} from './i18n'
describe('setI18next testing', () => {
  const supportedLngs = ['cimode', 'en']
  const fmBackEnd = ['en', 'ru', 'cn']
    test('setI18next success', () => {
      const expResult = ['cimode', 'en', 'ru', 'cn']

      setI18next(fmBackEnd, supportedLngs)

      expect(supportedLngs).toEqual(expResult);
  });
});