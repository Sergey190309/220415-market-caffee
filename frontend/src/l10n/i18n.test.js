import i18next from 'i18next'
// import {useSelector, useDispatch} from 'react-redux'

import { initI18next } from './i18n'
// import store from '../redux/store'

// import { i18nInitiated } from '../redux/slices'
// jest.mock('../redux/slices', () => ({
//   i18nInitiated: jest.fn().mockReturnValue({})
// }))

// const mockDispatch = jest.fn()
// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(),
//   useDispatch: ()=>mockDispatch
// }))

/**
 * Mock i18next
 */
// jest.mock('i18next', () => ({
//   use: () => {

//   }
// }))
//   'i18next', () => ({
//   use: () => {
//     init: () => {
//       t: k => k,
//       // on: () => { }
//     }
//   }
// }))

describe('i18n', () => {
  test('initI18next', () => {
    expect(true).toBe(true)
    initI18next()
    // expect(i18next).toHaveBeenCalledTimes(1)
    // expect(i18nInitiated).toHaveBeenCalledTimes(1)
    // expect(store.dispatch).toHaveBeenCalledTimes(1)
    console.log('src/l10n/i18n.test.js',
      '\n  initI18next'
    )
  })
})