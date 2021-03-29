const changeKey = require('./src/utils/utils')
// import { changeKey } from './src/utils/utils';

const obj = {
  user_name: 'admin',
  email: 'sa@test.com',
};

console.log(obj);
Object.defineProperty(obj, 'userName', Object.getOwnPropertyDescriptor(obj, 'user_name'));
delete obj['user_name'];
console.log(obj);
changeKey(obj, 'userName', 'newName')
console.log(obj);
