import { idsByIdNum } from './utils';
describe('Utils testing', () => {
  test('idsByIdNum testing', () => {
    const id = 'testingId';
    const qnt = 3
    const expResult = [
      id+'_00',
      id+'_01',
      id+'_02',
    ]
    // console.log(args)
    // console.log(expResult)
    expect(idsByIdNum(id, qnt)).toEqual(expResult);
  });

  test('negative qnt should retun empty array', () => {
    const id = 'testingId';
    const qnt = -3
    const expResult = []
    // console.log(args)
    // console.log(expResult)
    expect(idsByIdNum(id, qnt)).toEqual(expResult);
  });

  test('qnt above 100 shoult retun array length 100', () => {
    const id = 'testingId';
    const qnt = 150
    // const expResult = []
    // console.log(args)
    // console.log(expResult)
    expect(idsByIdNum(id, qnt).length).toEqual(100);

  });
});
