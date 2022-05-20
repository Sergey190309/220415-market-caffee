const mockAxios = jest.createMockFromModule('axios')

// console.log('__mocks__/axios)

mockAxios.create = jest.fn()
// mockAxios.create = jest.fn(() => mockAxios)

export default mockAxios
