// import { mockSagaDispatch } from '../helperCreateIO'
export const mockSagaDispatch = jest.fn()
//   (args) => {
//   console.log('sagaDispatch, args ->', args)
// }

export const useSaga = (saga, initState) => {
  // console.log('createIO, mocks\n useSaga')
  const state = {
    title: 'mockTitle fm mocks',
    content: 'mockContent fm mocks'
  }
  const sagaDispatch = args => {
    mockSagaDispatch(args)
  }
  return [state, sagaDispatch]
}
