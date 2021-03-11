import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
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

import { setModalOpened } from '../../redux/actions';

export const onChange = (setFormData, formData, fieldName, fieldData) => {
  // const { name, value } = fieldData;
  return setFormData({ ...formData, [fieldName]: fieldData });
};

export const onSubmit = formData => {
  const { email, password } = formData;
  console.log('Email -', email);
  console.log('Password -', password);
};

export const LogIn = ({
  onChange,
  onSubmit,
  onCancelClick,
  initState,
  setModalOpened,
}) => {
  // console.log('LogIn -', initState)
  const [formData, setFormData] = useState(initState);
  // console.log(formData)
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
            <Segment.Inline>
              <Button.Group fluid>
                <Button color={color} size='large' content='Log In' />
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
        <Segment>
          <Grid columns={3}>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column />
              <Grid.Column>
                <Header as='h4' content='New to us?' />
              </Grid.Column>
              <Grid.Column>
                <Button
                  // primary
                  color={color}
                  floated='left'
                  content='Sign Up'
                  onClick={() => setModalOpened('SignUp')}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

LogIn.defaultProps = {
  onChange: onChange,
  onSubmit: onSubmit,
  onCancelClick: () => {},
  initState: {
    email: '',
    password: '',
  },
  setModalOpened: () => {},
};

LogIn.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  initState: PropTypes.object.isRequired,
  setModalOpened: PropTypes.func.isRequired,
};

// export default LogIn;
export default connect(null, { setModalOpened })(LogIn);
