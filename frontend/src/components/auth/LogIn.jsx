import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, SubmitButton, ResetButton } from 'formik-semantic-ui-react';
import { Container, Segment, Icon, Header, Grid, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { setModalOpened, setModalClosed } from '../../redux/actions';

const formStructure = {
  email: '',
  password: '',
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

export const onSubmit = formData => {
  console.log(JSON.stringify(formData, null, 2));
};

export const LogIn = ({
  initValues,
  logInSchema,
  onSubmit,
  setModalOpened,
  setModalClosed,
}) => {
  const { t } = useTranslation('login');

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
              {t('header')}
            </Segment.Inline>
          </Header>

          <Formik
            initialValues={initValues}
            onSubmit={onSubmit}
            validationSchema={logInSchema(t)}>
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
  onSubmit: onSubmit,
  // onCancel: () => {},
  setModalOpened: () => {
    console.log('Modal open called');
  },
  setModalClosed: () => {
    console.log('Modal close called');
  },
};

LogIn.propTypes = {
  initValues: PropTypes.object.isRequired,
  logInSchema: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // onCancel: PropTypes.func.isRequired,
  setModalOpened: PropTypes.func.isRequired,
  setModalClosed: PropTypes.func.isRequired,
};

// export default LogIn;
export default connect(null, { setModalOpened, setModalClosed })(LogIn);
