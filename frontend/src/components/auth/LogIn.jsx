import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, SubmitButton, ResetButton } from 'formik-semantic-ui-react';
import { Container, Segment, Icon, Header, Grid, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import {
  setModalOpened,
  setModalClosed,
  logInAction,
  setLoggedInFalse,
} from '../../redux/actions';
import Alert from '../layout/Alert';

export const formStructure = {
  email: 'a@agatha-ng.com',
  password: 'qwerty',
};

export const logInSchema = t =>
  Yup.object().shape({
    [Object.keys(formStructure)[0]]: Yup.string()
      .email(t('errors.email.invalidEmail'))
      .required(t('errors.required')),
    [Object.keys(formStructure)[1]]: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .min(6, t('errors.password.min', { min: '${min}' }))
      .required(t('errors.required')),
  });

// export const onSubmit = (formData, logInAction) => {
//   console.log(JSON.stringify(formData, null, 2));
//   logInAction({...formData})
// };

export const LogIn = ({
  initValues,
  logInSchema,
  setModalOpened,
  setModalClosed,
  logInAction,
  isLoggedIn,
  setLoggedInFalse,
}) => {
  useEffect(() => {
    if (isLoggedIn) {
      setModalClosed();
      setLoggedInFalse();
    }
  }, [isLoggedIn, setModalClosed, setLoggedInFalse]);
  const { t } = useTranslation('login');

  const onSubmit = (formData, { setSubmitting }) => {
    const { email, password } = formData;
    // console.log(email, password);
    logInAction(email, password);
    setSubmitting(false);
  };

  // console.log()
  const color = 'teal';
  const resColor = 'olive';
  const canColor = 'orange';

  return (
    <Container fluid textAlign='center'>
      <Alert />
      <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as='h2' textAlign='center' color={color}>
            <Segment.Inline>
              <Icon name='utensils' size='large' />
              {t('header')}
            </Segment.Inline>
          </Header>

          <Formik
            initialValues={initValues}
            validationSchema={logInSchema(t)}
            onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form size='large'>
                <Segment color={color} stacked>
                  <Input
                    id='input-email'
                    name='email'
                    inputLabel={t('labels.email')}
                    // inputLabel={{ color: color, content: 'Email' }}
                    icon='at'
                    // iconPosition='right'
                    placeholder={t('placeHolders.email')}
                    errorPrompt
                  />
                  <Input
                    id='input-password'
                    data-testid='input-password'
                    name='password'
                    type='password'
                    inputLabel={t('labels.password')}
                    // inputLabel={{ color: color, content: 'Password' }}
                    icon='key'
                    placeholder={t('placeHolders.password')}
                    autoComplete='on'
                    errorPrompt
                  />
                  <Button.Group widths='1'>
                    <SubmitButton
                      basic
                      color={color}
                      size='large'
                      content={t('buttons.logIn')}
                      // disabled={isSubmitting}
                    />
                    <Button.Or text={t('buttons.or')} />
                    <ResetButton
                      basic
                      color={resColor}
                      size='large'
                      content={t('buttons.reset')}
                    />
                    <Button.Or text={t('buttons.or')} />
                    <Button
                      basic
                      color={canColor}
                      size='large'
                      content={t('buttons.cancel')}
                      type='button'
                      onClick={setModalClosed}
                    />
                  </Button.Group>
                </Segment>
              </Form>
            )}
          </Formik>
          <Segment color={color}>
            <Grid columns={2}>
              <Grid.Row verticalAlign='middle'>
                <Grid.Column width='9' textAlign='right'>
                  <Header as='h4' content={t('message')} />
                </Grid.Column>
                <Grid.Column width='7' textAlign='left'>
                  <Button
                    // primary
                    basic
                    color={color}
                    floated='left'
                    size='large'
                    content={t('buttons.signUp')}
                    onClick={() => {
                      setModalOpened('signUp');
                    }}
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
  setModalOpened: () => {
    console.log('Modal open called');
  },
  setModalClosed: () => {
    console.log('Modal close called');
  },
  logInAction: () => {
    console.log('Axios action called');
  },
  setLoggedInFalse: () => {
    console.log('setLoggedInFalse action called');
  },
};

LogIn.propTypes = {
  initValues: PropTypes.object.isRequired,
  logInSchema: PropTypes.func.isRequired,
  setModalOpened: PropTypes.func.isRequired,
  setModalClosed: PropTypes.func.isRequired,
  logInAction: PropTypes.func.isRequired,
  setLoggedInFalse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.logIn.isLoggedIn,
});

// export default LogIn;
export default connect(mapStateToProps, {
  setModalOpened,
  setModalClosed,
  logInAction,
  setLoggedInFalse,
})(LogIn);
