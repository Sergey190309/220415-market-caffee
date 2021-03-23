import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  // Form,
  Container,
  Header,
  Grid,
  Icon,
  Segment,
  Button,
} from 'semantic-ui-react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { setModalOpened } from '../../redux/actions';

const logInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required field'),
  password: Yup.string().required('Required field'),
});

export const onSubmit = formData => {
  // const { email, password } = formData;
  console.log(JSON.stringify(formData, null, 2));
};

export const LogIn = ({
  initValues,
  logInSchema,
  onSubmit,
  onCancel,
  setModalOpened,
}) => {

  const color = 'teal';
  const hazColor = 'orange';

  return (
    <Container fluid textAlign='center'>
      <Grid>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center' color={color}>
            <Segment.Inline>
              <Icon name='utensils' size='large' />
              logIn.header
            </Segment.Inline>
          </Header>
          <Formik
            initialValues={initValues}
            validationSchema={logInSchema}
            onSubmit={values => onSubmit(values)}>
            <Form className='ui form'>
              <Segment color={color} stacked>
                <div className="inline fields">
                  <Icon name='envelope' size='large' htmlFor='email' />
                  <Field
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Email address'
                    // autoFocus
                    />
                  <ErrorMessage name='email' />
                </div>
                <div className="inline fields">
                  <Icon name='lock' size='large' />
                  <Field id='password' name='password' type='password' placeholder='Password' />
                  <ErrorMessage name='password' />
                </div>
                  <Segment.Inline>
                    <Button.Group fluid>
                      <Button color={color} type='submit'>Log in</Button>
                      <Button.Or />
                      <Button color={hazColor} type='button' onClick={onCancel}>
                        Cancel
                      </Button>
                    </Button.Group>
                  </Segment.Inline>
              </Segment>
            </Form>
          </Formik>
          <Segment color={color}>
            <Grid columns={2}>
              <Grid.Row verticalAlign='middle'>
                <Grid.Column width='9' textAlign='right'>
                  <Header as='h4' content='logIn.message' />
                </Grid.Column>
                <Grid.Column width='7' textAlign='left'>
                  <Button
                    // primary
                    color={color}
                    floated='left'
                    content='logIn.buttons.signUp'
                    onClick={() => setModalOpened('SignUp')}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

LogIn.defaultProps = {
  initValues: {
    email: '',
    password: '',
  },
  logInSchema: logInSchema,
  onSubmit: onSubmit,
  onCancel: () => {},
  setModalOpened: () => {},
};

LogIn.propTypes = {
  initValues: PropTypes.object.isRequired,
  logInSchema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setModalOpened: PropTypes.func.isRequired,
};

// // export default LogIn;
export default connect(null, { setModalOpened })(LogIn);
