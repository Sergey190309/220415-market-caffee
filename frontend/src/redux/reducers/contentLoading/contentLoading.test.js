import { CONTENT_START } from '../../actions/contentLoading/types';
import content, {initialStore } from './contentLoading'

describe('contentLoading reducer testing', () => {

  test('Content start', () => {
    const testAction = {
      type: CONTENT_START,
    };
    const actStore = { ...initialStore };
    const expStore = { ...actStore, loading: true };

    expect(actStore).not.toEqual(expStore);
    expect(content(actStore, testAction)).toEqual(expStore);
  });
});