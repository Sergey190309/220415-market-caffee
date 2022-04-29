// const mathOps = require('./calculator')
import mathOps from './calculator'

describe('Calculator', () => {
  test('Sum', () => {
    // console.log('mathOps -', mathOps)
    expect(mathOps.sum(1, 3)).toBe(4);
  });
});
