import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import PropTypes, { oneOf } from 'prop-types';
import { Form, Input, SubmitButton, ResetButton } from 'formik-semantic-ui-react';
import { Container, Segment, Icon, Header, Grid, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { setModalClosed, signUpAction, setSignedUpFalse } from '../../redux/actions';
import Alert from '../layout/Alert';

export const formStructure = {
  userName: 'sa',
  email: 'sa6702@gmail.com',
  password: 'qwerty',
  password2: 'qwerty',
};

export const signUpSchema = t =>
  Yup.object().shape({
    [Object.keys(formStructure)[0]]: Yup.string().max(
      15,
      // eslint-disable-next-line no-template-curly-in-string
      t('errors.userName.max', { max: '${max}' })
    ),
    [Object.keys(formStructure)[1]]: Yup.string()
      .email(t('errors.email.invalidEmail'))
      .required(t('errors.required')),
    [Object.keys(formStructure)[2]]: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .min(6, t('errors.password.min', { min: '${min}' }))
      .required(t('errors.required')),
    [Object.keys(formStructure)[3]]: Yup.string().oneOf(
      [Yup.ref(Object.keys(formStructure)[2]), null],
      'Passwords must match!'
    ),
  });

// export const onSubmit = formData => {
//   // const { email, password } = formData;
//   console.log(JSON.stringify(formData, null, 2));
// };

export const SignUp = ({
  initValues,
  signUpSchema,
  setModalClosed,
  signUpAction,
  isSignedUp,
  setSignedUpFalse,
}) => {
  useEffect(() => {

    if (isSignedUp) {
      setModalClosed();
      setSignedUpFalse();
    }
  }, [isSignedUp, setModalClosed, setSignedUpFalse]);

  const { t } = useTranslation('signup');

  const onSubmit = async (formData, { setSubmitting }) => {
    const { userName, email, password } = formData;
    // console.log(email, password);
    await signUpAction(userName, email, password);
    setSubmitting(false);
  };

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
            validationSchema={signUpSchema(t)}
            onSubmit={onSubmit}>
            <Form size='large'>
              <Segment color={color} stacked>
                <Input
                  id='input-userName'
                  name='userName'
                  inputLabel={t('labels.userName')}
                  icon='user'
                  placeholder={t('placeHolders.userName')}
                  errorPrompt
                />
                <Input
                  id='input-email'
                  name='email'
                  inputLabel={t('labels.email')}
                  icon='at'
                  placeholder={t('placeHolders.email')}
                  errorPrompt
                />
                <Input
                  id='input-password'
                  data-testid='input-password'
                  name='password'
                  type='password'
                  inputLabel={t('labels.password')}
                  icon='key'
                  placeholder={t('placeHolders.password')}
                  autoComplete='on'
                  errorPrompt
                />
                <Input
                  id='input-password2'
                  data-testid='input-password2'
                  name='password2'
                  type='password'
                  inputLabel={t('labels.password2')}
                  icon='key'
                  placeholder={t('placeHolders.password2')}
                  autoComplete='on'
                  errorPrompt
                />
                <Button.Group widths='1'>
                  <SubmitButton
                    basic
                    color={color}
                    size='large'
                    content={t('buttons.signUp')}
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
                    onClick={() => {
                      setModalClosed();
                    }}
                  />
                </Button.Group>
              </Segment>
            </Form>
          </Formik>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
SignUp.defaultProps = {
  initValues: formStructure,
  signUpSchema: signUpSchema,
  setModalClosed: () => {
    console.log('Modal close called');
  },
  signUpAction: () => {
    console.log('Axios action called');
  },
  isSignedUp: false,
  setSignedUpFalse: () => {
    console.log('setSignedUpFalse action called');
  },
};

SignUp.propTypes = {
  initValues: PropTypes.object.isRequired,
  signUpSchema: PropTypes.func.isRequired,
  setModalClosed: PropTypes.func.isRequired,
  signUpAction: PropTypes.func.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  setSignedUpFalse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isSignedUp: state.logIn.isSignedUp,
});

export default connect(mapStateToProps, {
  setModalClosed,
  signUpAction,
  setSignedUpFalse,
})(SignUp);
