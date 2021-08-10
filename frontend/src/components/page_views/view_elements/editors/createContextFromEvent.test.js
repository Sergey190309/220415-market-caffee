import { createContextFromEvent } from './createContextFromEvent'
describe('createContextFromEvent', () => {
  test('it should return specific object', () => {
    const mockEvent = {
      clientX: 25,
      clientY: 125
    }
    // const getBoundingClientRect = jest.fn()
    const result = createContextFromEvent(mockEvent)
    expect(result.getBoundingClientRect()).toEqual({
      left: mockEvent.clientX,
      top: mockEvent.clientY,
      right: mockEvent.clientX + 1,
      bottom: mockEvent.clientY + 1,

      height: 0,
      width: 0

    });
  });
});