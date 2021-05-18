const source = {userName: "sa", email: "sa6702@gmail.com", password: "qwerty", password2: "qwerty"}

const {userName, password2, ...otherProps} = source

const result = {user_name: userName, ...otherProps}

console.log(result)
