import React, { useState } from 'react';
// import { connect } from 'react-redux';
import {
  Form,
  Header,
  Grid,
  Icon,
  Segment,
  Button,
  // Message,
  // GridColumn,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

// import { setModalOpened } from '../../redux/actions';

export const onChange = (setFormData, formData, fieldName, fieldData) => {
  // const { name, value } = fieldData;
  // console.log({ ...formData, [fieldName]: fieldData })
  return setFormData({ ...formData, [fieldName]: fieldData });
};

export const onSubmit = formData => {
  const { userName, email, password, password2 } = formData;
  console.log('User name -', userName);
  console.log('Email -', email);
  console.log('Password -', password);
  console.log('Password2 -', password2);
};

export const SignUp = ({ onChange, onSubmit, onCancelClick, initState }) => {
  const [formData, setFormData] = useState(initState);
  // console.log(formData);
  const { userName, email, password, password2 } = formData;

  const _onChange = ({ name, value }) => {
    // console.log(name)
    onChange(setFormData, formData, name, value);
  };

  const _onSubmit = evt => {
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
            <Icon data-testid='icon' name='utensils' size='tiny' />
            Sign up
          </Header>
          <Segment color={color} stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              type='text'
              placeholder='Choose username'
              name='userName'
              value={userName}
              onChange={evt => _onChange(evt.target)}
            />
            <Form.Input
              fluid
              icon='envelope'
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
            <Form.Input
              data-testid='password2'
              fluid
              icon='lock'
              iconPosition='left'
              type='password'
              placeholder='Repeate your passord'
              autoComplete='on'
              name='password2'
              required
              value={password2}
              onChange={evt => _onChange(evt.target)}
            />
            <Segment.Inline>
              <Button.Group fluid>
                <Button color={color} size='large' content='Sign Up' />
                <Button.Or />
                <Button
                  color={hazColor}
                  size='large'
                  onClick={evt => _onCancelClick(evt)}
                  content='Cancel'
                />
              </Button.Group>
            </Segment.Inline>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

SignUp.defaultProps = {
  onChange: onChange,
  onSubmit: onSubmit,
  onCancelClick: () => {},
  initState: {
    userName: '',
    email: '',
    password: '',
    password2: '',
  },
};

SignUp.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  initState: PropTypes.object.isRequired,
};

export default SignUp;
