function* generatorExample() {
  yield 'first';
  yield 'second';
}
// Our function returns a generator object which returns a series of values.
const genObject = generatorExample();



console.log(genObject.next()); // first call returns { value: 'first', done: false }
console.log(genObject.next()); // second call returns { value: 'second', done: false }
console.log(genObject.next()); // third call returns { value: undefined, done: true }