import { delaySomthing } from './sagasUtils';

describe('Normal func testing', () => {
  test('delayAlertHiding func testing', async () => {
    await expect(delaySomthing(5)).toResolve();
    await expect(delaySomthing(5)).not.toReject();
  });
});

// jest.mock('./alert', () => ({ delayAlertHiding: jest.fn() }));

// describe('Whole Saga testing', () => {

//   beforeAll(() => {
//     jest.resetAllMocks();
//   });

//   test('it should wait every start alert', () => {
//     delayAlertHiding.mockImplementation(() => Promise.resolve());
//     const dispatched = recordSaga()
//     // console.log(genObject.next().value)
//     // expect(genObject.next().value).toEqual(takeEvery(START_ALERT, ));
//   });
// });
