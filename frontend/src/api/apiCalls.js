import axios from 'axios';

export const signUp = (user) => {
  // const user = {
  //   user_name: 'Sergey',
  //   email: 'sa6702@gmail.com',
  //   password: 'qwer',
  // };
  // console.log(user)
  return axios.post('/users', user);
};
