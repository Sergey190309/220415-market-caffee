import tech from './tech';
import { FINISH_LOADING, START_LOADING, TECH_IN_SUCCESS } from '../actions/types';

describe('tech reducer testing', () => {
  const mockSetToken = jest.fn()
  jest.spyOn(window.localStorage.__proto__, 'setItem')
  jest.spyOn(window.localStorage.__proto__, 'removeItem')
  const generalInitStore = {
    loading: false,
    techLoaded: false,
    lngsLoaded: false,
    i18nLoaded: false,

    techToken: null,
  };
  test('start loading', () => {
    const testAction = {
      type: START_LOADING,
    };
    const expStore = {
      ...generalInitStore,
      loading: true,
    };
    // console.log('tech test reducer, generalInitStore ->', generalInitStore)
    // console.log('tech test reducer, expStore ->', expStore)
    expect(generalInitStore).not.toEqual(expStore);
    expect(tech(generalInitStore, testAction)).toEqual(expStore);
  });

  test('finish loading', () => {
    const testAction = {
      type: FINISH_LOADING,
    };
    const initStore = {
      ...generalInitStore, loading: true
    };
    const expStore = {
      ...generalInitStore,
      loading: false,
    };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction)).toEqual(expStore);
  });

  test('tech in token success', () => {
    const testAction = {
      type: TECH_IN_SUCCESS,
      payload: 'test_tech_token'
    };
    const initStore = {
      ...generalInitStore, loading: true
    };
    const expStore = {
      ...initStore,
      techLoaded: true,
      techToken: testAction.payload
    };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction)).toEqual(expStore);
  });


});
