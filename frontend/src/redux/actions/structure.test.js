import { structureStart } from './structure';
import { STRUCTURE_START } from './types';

describe('View structure action testing', () => {
  test('structureStart', () => {
    const expAction = {
    type: STRUCTURE_START,
    }
    expect(structureStart()).toEqual(expAction);
  });
});
