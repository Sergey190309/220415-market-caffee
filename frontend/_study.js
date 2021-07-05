const testProps = {
  recordId: '01_vblock_txt_3',
  viewName: 'mockViewName',
  lng: 'mockLng',
};

const mockRecordIdList = [
  '01_vblock_txt_000',
  '01_vblock_txt_001',
  '01_vblock_txt_002'
]

const result = mockRecordIdList.map((item) => {
  return {
    viewName: testProps['viewName'],
    lng: testProps['lng'],
    recordId: item
  }
})

console.log(result)