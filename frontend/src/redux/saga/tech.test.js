import { mockV4Value } from 'uuid'
import {
  // techInSuccess, startLngs
  startTechIn
} from '../slices'

import { recordSaga } from '../../utils/testUtils'

import { startInitWorker } from './tech'

import { initI18next } from '../../l10n/i18n'

jest.mock('uuid')
jest.mock('../../l10n/i18n', () => ({
  initI18next: jest.fn()
}))
// const mock_v4 = v4()
// jest.mock('uuid', () => {
//   v4: jest.fn()
//   // v4: jest.fn(() => {'mocked identity'})
// })

describe('Tech saga testing', () => {
  describe('startInitSaga', () => {
    beforeEach(() => {
      // jest.resetAllMocks()
    })
    test('startInitWorker', async () => {
      const dispatched = await recordSaga(startInitWorker)

      // console.log('saga>tech.test',
      //   '\n  dispatched  ->',
      //   dispatched[0]
      // )
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0].type).toBe(startTechIn.type)
      expect(dispatched[0].payload).toBe(mockV4Value)
      expect(initI18next).toHaveBeenCalledTimes(1)
    })
  })
})