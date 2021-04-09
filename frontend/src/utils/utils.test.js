import { idsByIdNum } from './utils';
describe('Utils testing', () => {
  test('idsByIdNum testing', () => {
    const args = {
      id: 'testingId',
      qnt: 3,
    };
    const expResult = [
      args.id+'_00',
      args.id+'_01',
      args.id+'_02',
    ]
    // console.log(args)
    // console.log(expResult)
    expect(idsByIdNum({...args})).toEqual(expResult);
  });
});
