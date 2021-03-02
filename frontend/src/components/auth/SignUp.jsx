import React, { useState } from 'react';
import { Form, Button, Header, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const SignUp = ({ postSignUp, cancel }) => {
  const [userName, setUserName] = useState('sa');
  const [email, setEmail] = useState('sa6702@gmail.com');
  const [password, setPassword] = useState('qwer');
  const [password2, setPassword2] = useState('qwer');
  const [pendingCall, setPendingCall] = useState(false);
  // const [error, setError] = useState({})

  const userNameChangeHandler = ({ target }) => {
    // console.log(target.value)
    setUserName(target.value);
  };

  const emailChangeHandler = ({ target }) => {
    // console.log(target.value)
    setEmail(target.value);
  };

  const passwordChangeHandler = ({ target }) => {
    // console.log(password)
    setPassword(target.value);
  };

  const password2ChangeHandler = ({ target }) => {
    // console.log(password)
    setPassword2(target.value);
  };

  const submitClickHandler = () => {
    const user = {
      userName: userName,
      email: email,
      password: password,
    };
    setPendingCall(true);
    // console.log(user)
    postSignUp(user)
      // .then(response => {
      //   setPendingCall(false);
      // })
      // .catch(err => {
      //   console.log(err);
      // });
    // console.log(resp)
  };

  const cancelClickHandler = () => {
    cancel();
  };

  return (
    <Container fluid>
      <Form>
        <Header as='h2' textAlign='center' content='Sign Up' dividing />
        <Form.Field>
          <Container>
            <label htmlFor='userName'>Your user name</label>
          </Container>
          <input
            id='userName'
            data-testid='userName'
            placeholder='Your user name'
            value={userName}
            onChange={userNameChangeHandler}
          />
        </Form.Field>
        <Form.Field required>
          <Container>
            <label htmlFor='email'>Your email please</label>
          </Container>
          <input
            id='email'
            data-testid='email'
            placeholder='Your email please'
            value={email}
            onChange={emailChangeHandler}
          />
        </Form.Field>
        <Form.Field required>
          <Container>
            <label htmlFor='password'>Enter password</label>
          </Container>
          <input
            id='password'
            data-testid='password'
            placeholder='Enter password'
            type='password'
            value={password}
            onChange={passwordChangeHandler}
          />
        </Form.Field>
        <Form.Field required>
          <Container>
            <label htmlFor='password2'>Repeat password please</label>
          </Container>
          <input
            id='password2'
            data-testid='password2'
            placeholder='Repeat password please'
            type='password'
            value={password2}
            onChange={password2ChangeHandler}
          />
        </Form.Field>
        <Button
          data-testid='signUp'
          color='blue'
          onClick={submitClickHandler}
          content='Sign Up'
          disabled={pendingCall}
          loading={pendingCall}
        />
        <Button
          data-testid='cancel'
          color='orange'
          onClick={cancelClickHandler}
          content='Cancel'
        />
      </Form>
    </Container>
  );
};

SignUp.propTypes = {
  // postSignUp: PropTypes.func,
  postSignUp: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

SignUp.defaultProps = {
  postSignUp: () =>
      new Promise((resolve, reject) => {
        resolve({});
        reject({});
      }),
    cancel: () => {
      console.log('cancel pressed');
    },
};

export default SignUp;
