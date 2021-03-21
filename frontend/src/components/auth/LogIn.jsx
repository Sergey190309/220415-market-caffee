import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, SubmitButton, ResetButton } from 'formik-semantic-ui-react';
import { Container, Segment, Icon, Header, Grid, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Translate, I18n } from 'react-redux-i18n';

import { setModalOpened } from '../../redux/actions';

const formStructure = {
  email: '',
  password: '',
};

const logInSchema = Yup.object().shape({
  [Object.keys(formStructure)[0]]: Yup.string()
    .email('Invalid email address')
    .required('Required field'),
  [Object.keys(formStructure)[1]]: Yup.string().required('Required field'),
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
  // console.log()
  const color = 'teal';
  const resColor = 'olive';
  const canColor = 'orange';

  return (
    <Container fluid textAlign='center'>
      <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as='h2' textAlign='center' color={color}>
            <Segment.Inline>
              <Icon name='utensils' size='large' />
              <Translate value='logIn.header' />
            </Segment.Inline>
          </Header>

          <Formik
            initialValues={initValues}
            onSubmit={onSubmit}
            validationSchema={logInSchema}>
            <Form size='large'>
              <Segment color={color} stacked>
                <Input
                  id='input-email'
                  name='email'
                  inputLabel={I18n.t('logIn.labels.email')}
                  // inputLabel={{ color: color, content: 'Email' }}
                  icon='at'
                  // iconPosition='right'
                  placeholder={I18n.t('logIn.placeHolders.email')}
                  errorPrompt
                />
                <Input
                  id='input-password'
                  name='password'
                  type='password'
                  inputLabel={I18n.t('logIn.labels.password')}
                  // inputLabel={{ color: color, content: 'Password' }}
                  icon='key'
                  placeholder={I18n.t('logIn.placeHolders.password')}
                  autoComplete='on'
                  errorPrompt
                />
                <Button.Group widths='1'>
                  <SubmitButton basic color={color} size='large' content={I18n.t('logIn.buttons.logIn')} />
                  <Button.Or text={I18n.t('logIn.buttons.or')} />
                  <ResetButton basic color={resColor} size='large' content={I18n.t('logIn.buttons.reset')} />
                  <Button.Or text={I18n.t('logIn.buttons.or')} />
                  <Button
                    basic
                    color={canColor}
                    size='large'
                    content={I18n.t('logIn.buttons.cancel')}
                    type='button'
                    onClick={() => {
                      console.log('Cancel');
                    }}
                  />
                </Button.Group>
              </Segment>
            </Form>
          </Formik>
          <Segment color={color}>
            <Grid columns={2}>
              <Grid.Row verticalAlign='middle'>
                <Grid.Column width='9' textAlign='right'>
                  <Header as='h4' content={I18n.t('logIn.message')} />
                </Grid.Column>
                <Grid.Column width='7' textAlign='left'>
                  <Button
                    // primary
                    basic
                    color={color}
                    floated='left'
                    size='large'
                    content={I18n.t('logIn.buttons.signUp')}
                    onClick={() => console.log('SignUp')}
                    // onClick={() => setModalOpened('SignUp')}
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
  initValues: formStructure,
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

// export default LogIn;
export default connect(null, { setModalOpened })(LogIn);
