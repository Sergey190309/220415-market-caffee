import { swapiGetter } from "./study";

describe.only('Studin', () => {
  test('Getting name No 1', () => {
    const result = swapiGetter(1)
    console.log(result)
    expect(result).toBe('Luke Skywalker');
  });
});