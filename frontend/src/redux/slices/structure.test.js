import store from '../store'
import { structureStart, structureSuccess, structureFail } from './structure'
describe('structure testing', () => {
  test('state testing', () => {
    let state = store.getState().structure;
    console.log('state testing, state ->', state)

  });
});