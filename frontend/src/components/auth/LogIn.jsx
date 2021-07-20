import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, SubmitButton, ResetButton } from 'formik-semantic-ui-react';
import { Container, Segment, Icon, Header, Grid, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
// import {LOG_IN_START} from '../../redux/actions/types'

import { positiveColor, neutralColor, warningColor } from '../../utils/colors';
// import {
  // openModal,
  // closeModal,
  // logInAction,
  // setLoggedInFalse,
// } from '../../redux/actions';
import { openModal, closeModal, logInStart, logInModalClosed } from '../../redux/slices';
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

export const LogIn = ({
  initValues,
  logInSchema,
  openModal,
  closeModal,
  logInStart,
  isLoggedIn,
  setLoggedInFalse,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      // console.log('useEffect for logout')
      dispatch(closeModal());
      setLoggedInFalse();
    }
  }, [isLoggedIn, closeModal, setLoggedInFalse, dispatch]);

  const { t } = useTranslation('login');

  const onSubmit = (formData, { setSubmitting }) => {
    // const { email, password } = formData;
    // console.log('components, auth, logIn, fromData ->', formData);
    dispatch(logInStart(formData));
    setSubmitting(false);
  };

  return (
    <Container fluid textAlign='center'>
      <Alert />
      <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as='h2' textAlign='center' color={positiveColor}>
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
                <Segment color={positiveColor} stacked>
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
                      color={positiveColor}
                      size='large'
                      content={t('buttons.logIn')}
                      // disabled={isSubmitting}
                    />
                    <Button.Or text={t('buttons.or')} />
                    <ResetButton
                      basic
                      color={neutralColor}
                      size='large'
                      content={t('buttons.reset')}
                    />
                    <Button.Or text={t('buttons.or')} />
                    <Button
                      basic
                      color={warningColor}
                      size='large'
                      content={t('buttons.cancel')}
                      type='button'
                      onClick={() => {
                        dispatch(closeModal());
                      }}
                    />
                  </Button.Group>
                </Segment>
              </Form>
            )}
          </Formik>
          <Segment color={positiveColor}>
            <Grid columns={2}>
              <Grid.Row verticalAlign='middle'>
                <Grid.Column width='9' textAlign='right'>
                  <Header as='h4' content={t('message')} />
                </Grid.Column>
                <Grid.Column width='7' textAlign='left'>
                  <Button
                    // primary
                    basic
                    color={positiveColor}
                    floated='left'
                    size='large'
                    content={t('buttons.signUp')}
                    onClick={() => {
                      dispatch(openModal('signUp'));
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
  openModal: openModal,
  closeModal: closeModal,
  logInStart: logInStart,
  setLoggedInFalse: logInModalClosed,
};

LogIn.propTypes = {
  initValues: PropTypes.object.isRequired,
  logInSchema: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  logInStart: PropTypes.func.isRequired,
  setLoggedInFalse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  // openModal: kindOfModal => dispatch(openModal(kindOfModal)),
  // closeModal: () => dispatch(closeModal()),
  // logInStart: (email, password) => dispatch(logInStart(email, password)),
  // setLoggedInFalse: () => dispatch(setLoggedInFalse()),
});

// export default LogIn;
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
// export default connect(mapStateToProps, {
//   openModal,
//   closeModal,
//   logInAction,
//   setLoggedInFalse,
// })(LogIn);
