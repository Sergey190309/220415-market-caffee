import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Form, Header, Grid, Icon, Segment, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const onChange = (setFormData, formData, fieldName, fieldData) => {
  // const { name, value } = fieldData;
  return setFormData({ ...formData, [fieldName]: fieldData });
};

export const onSubmit = formData => {
  const { email, password } = formData;
  console.log('Email -', email);
  console.log('Password -', password);
};

export const LogIn = ({ onChange, onSubmit, onCancelClick, initState }) => {
  // console.log('LogIn -', initState)
  const [formData, setFormData] = useState(initState);

  const { email, password } = formData;

  const _onChange = ({ name, value }) => {
    // console.log(name, ', ', value)
    onChange(setFormData, formData, name, value);
  };

  const _onSubmit = async evt => {
    evt.preventDefault();
    onCancelClick();
    onSubmit(formData);
  };

  const _onCancelClick = evt => {
    evt.preventDefault();
    onCancelClick();
  };

  const color = 'teal';
  const hazColor = 'orange';

  return (
    <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large' onSubmit={evt => _onSubmit(evt)}>
          <Header as='h3' textAlign='center' color={color}>
            <Icon name='utensils' size='tiny' />
            Log-in to your account
          </Header>
          <Segment color={color} stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              type='email'
              placeholder='E-mail address'
              name='email'
              required
              value={email}
              onChange={evt => _onChange(evt.target)}
            />
            <Form.Input
              data-testid='password'
              fluid
              icon='lock'
              iconPosition='left'
              type='password'
              placeholder='Password'
              autoComplete='on'
              name='password'
              required
              value={password}
              onChange={evt => _onChange(evt.target)}
            />
            <Segment.Inline>
              <Button.Group fluid>
                <Button color={color} size='large'>
                  Log In
                </Button>
                <Button.Or />
                <Button
                  color={hazColor}
                  size='large'
                  onClick={evt => _onCancelClick(evt)}>
                  Cancel
                </Button>
              </Button.Group>
            </Segment.Inline>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='/register'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

LogIn.defaultProps = {
  onCancelClick: () => {},
  onChange: onChange,
  onSubmit: onSubmit,
  initState: {
    email: '',
    password: '',
  },
};

LogIn.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initState: PropTypes.object.isRequired,
};

export default LogIn;
