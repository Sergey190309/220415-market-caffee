import { structureStart, structureSuccess } from './structure';
import { STRUCTURE_START, STRUCTURE_SUCCESS } from './types';
import { mockResolveData } from '../../api/calls/getViewsStructure.test';

describe('View structure action testing', () => {
  test('structureStart', () => {
    const expAction = {
      type: STRUCTURE_START,
    };
    expect(structureStart()).toEqual(expAction);
  });

  test('stractureSuccess', () => {
    const expAction = {
      type: STRUCTURE_SUCCESS,
      payload: mockResolveData.payload
    }

    console.log('structureSuccess ->', structureSuccess(mockResolveData.payload))
  });

});
