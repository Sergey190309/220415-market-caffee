import tech from './tech';
import {
  I18N_FAIL,
  I18N_INITIATED,
  I18N_SUCCESS,
  INIT_LOADING_SUCCESS,
  LNGS_FAIL,
  LNGS_SUCCESS,
  START_I18N,
  START_INIT_LOADING,
  START_LNGS,
  START_TECH_IN,
  TECH_IN_FAIL,
  TECH_IN_SUCCESS,
} from '../constants/types';

describe('tech reducer testing', () => {
  const mockSetToken = jest.fn();
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  jest.spyOn(window.localStorage.__proto__, 'removeItem');
  const generalInitStore = {
    loading: false,
    techLoaded: false,
    lngsLoaded: false,
    i18nLoaded: false,

    techToken: null,
  };
  test('start init loading', () => {
    const testAction = {
      type: START_INIT_LOADING,
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
  test('init loading success', () => {
    const testAction = {
      type: INIT_LOADING_SUCCESS,
    };
    const initStore = {
      ...generalInitStore,
      loading: true,
    };
    const expStore = {
      ...generalInitStore,
      loading: false,
    };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction)).toEqual(expStore);
  });

  test('start tech in', () => {
    const testAction = {
      type: START_TECH_IN,
    };
    const initStore = {
      ...generalInitStore,
      techLoaded: true,
      loading: true,
    };
    const expStore = {
      ...initStore,
      techLoaded: false
    };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction)).toEqual(expStore);
  });
  test('tech in token success', () => {
    const testAction = {
      type: TECH_IN_SUCCESS,
      payload: 'test_tech_token',
    };
    const initStore = {
      ...generalInitStore,
      loading: true,
    };
    const expStore = {
      ...initStore,
      techLoaded: true,
      techToken: testAction.payload,
    };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction, mockSetToken)).toEqual(expStore);
    expect(mockSetToken).toHaveBeenCalledTimes(1);
    expect(mockSetToken).toHaveBeenCalledWith(testAction.payload);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // expect(localStorage.setItem.mock.calls[0]).toEqual(['techToken', testAction.payload]);
    // console.log('tech test reducer ->', localStorage.setItem.mock.calls[0]);
  });
  test('tech in token fail', () => {
    const testAction = {
      type: TECH_IN_FAIL,
    };
    const initStore = {
      ...generalInitStore,
      loading: true,
      techLoaded: true,
      techToken: 'someting',
    };
    const expStore = {
      ...initStore,
      techLoaded: false,
      techToken: null,
      loading: false,
    };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction, mockSetToken)).toEqual(expStore);
    expect(mockSetToken).toHaveBeenCalledTimes(0);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem.mock.calls[0]).toEqual(['techToken']);
    // console.log('tech test reducer ->', localStorage.setItem.mock.calls[0]);
  });

  test('start lngs loading', () => {
    const testAction = {
      type: START_LNGS,
    };
    const initStore = {
      ...generalInitStore,
      lngsLoaded: true,
      loading: true,
    };
    const expStore = {
      ...initStore,
      lngsLoaded: false
    };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction)).toEqual(expStore);
  });
  test('lngs success', () => {
    const testAction = {
      type: LNGS_SUCCESS,
    };
    const initStore = {
      ...generalInitStore,
      lngsLoaded: false,
      loading: true,
    };
    const expStore = {
      ...initStore,
      lngsLoaded: true
    };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction)).toEqual(expStore);
  });
  test('lngs fail', () => {
    const testAction = {
      type: LNGS_FAIL,
    };
    const initStore = {
      ...generalInitStore,
      lngsLoaded: true,
      loading: true,
    };
    const expStore = {
      ...initStore,
      lngsLoaded: false,
      loading: false,
    };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction)).toEqual(expStore);
  });

  test('start i18n initiation', () => {
    const testAction = {
      type: START_I18N,
    };
    const initStore = {
      ...generalInitStore,
      i18nLoaded: true,
      loading: false,
  };
    const expStore = {
      ...initStore,
      i18nLoaded: false,
      loading: true,
  };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction)).toEqual(expStore);
  });
  test('i18n initiated', () => {
    const testAction = {
      type: I18N_INITIATED,
    };
    const initStore = {
      ...generalInitStore,
      i18nInitiated: false,
  };
    const expStore = {
      ...initStore,
      i18nInitiated: true,
  };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction)).toEqual(expStore);
  });
  test('i18n success', () => {
    const testAction = {
      type: I18N_SUCCESS,
    };
    const initStore = {
      ...generalInitStore,
      i18nLoaded: false,
    };
    const expStore = {
      ...initStore,
      i18nLoaded: true,
    };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction)).toEqual(expStore);
  });
  test('i18n fail', () => {
    const testAction = {
      type: I18N_FAIL,
    };
    const initStore = {
      ...generalInitStore,
      i18nLoaded: true,
      loading: true,
  };
    const expStore = {
      ...initStore,
      i18nLoaded: false,
      loading: false,
  };
    expect(initStore).not.toEqual(expStore);
    expect(tech(initStore, testAction)).toEqual(expStore);
  });
});
