import { idsByIdNum, makeRecordIdList } from './utils'

describe('Utils testing', () => {
  describe('idsByIdNum testing', () => {
    test('idsByIdNum testing', () => {
      const id = 'testingId'
      const qnt = 3
      const expResult = [
        id + '_00',
        id + '_01',
        id + '_02'
      ]
      expect(idsByIdNum(id, qnt)).toEqual(expResult)
    })

    test('negative qnt should retun empty array', () => {
      const id = 'testingId'
      const qnt = -3
      const expResult = []
      expect(idsByIdNum(id, qnt)).toEqual(expResult)
    })

    test('qnt above 100 shoult retun array length 100', () => {
      const id = 'testingId'
      const qnt = 150
      expect(idsByIdNum(id, qnt)).toHaveLength(100)
    })
  })

  describe('makeRecordIdList testing', () => {
    test('normal, small qnt', () => {
      const arg = '01_vblock_txt_3'
      const expResult = [
        '01_vblock_txt_000',
        '01_vblock_txt_001',
        '01_vblock_txt_002'
      ]
      expect(makeRecordIdList(arg)).toEqual(expResult)
      expect(makeRecordIdList(arg)).toHaveLength(3)
    })

    test('number can not be converted to int', () => {
      const arg = '01_vblock_txt_z'
      // const expResult = [
      //   '01_vblock_txt_000',
      //   '01_vblock_txt_001',
      //   '01_vblock_txt_002',
      // ]
      expect(makeRecordIdList(arg)).toBe(0)
      // console.log('makeRecordIdList testing, makeRecordIdList(arg) ->', makeRecordIdList(arg))
    })

    test('number has been above 1000', () => {
      const arg = '01_vblock_txt_1300'
      // const expResult = [
      //   '01_vblock_txt_000',
      //   '01_vblock_txt_001',
      //   '01_vblock_txt_002',
      // ]
      expect(makeRecordIdList(arg)).toHaveLength(1000)
      // console.log('makeRecordIdList testing, makeRecordIdList(arg) ->', makeRecordIdList(arg))
    })
  })
})
