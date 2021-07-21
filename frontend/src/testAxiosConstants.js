export const logInData ={
  email: 'mock@email.test',
  password: 'mockPassword',
}

export const resolveData = {
  message: 'Hi! You are welcome.',
  payload: {
    user_name: 'admin',
    email: 'a@agatha-ng.com',
    isAdmin: true,
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
  },
}

export const rejectData = {
  response: {
    data: {
      message: 'Error message',
    },
    status: 404,
    headers: { header: 'Some header' },
  },
  config: { config: 'Some config' },

}

export const logInSuccessArgs = {
  user_name: 'mockUserName',
  email: 'mockEmail',
  isAdmin: true,
  access_token: 'mockAccessToken',
  refresh_token: 'mockRefreshToken',
}