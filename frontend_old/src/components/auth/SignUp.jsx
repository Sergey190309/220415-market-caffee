import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
// import PropTypes, { oneOf } from 'prop-types';
import { Form, Input, SubmitButton, ResetButton } from 'formik-semantic-ui-react'
import { Container, Segment, Icon, Header, Grid, Button } from 'semantic-ui-react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
// import { closeModal, signUpStart, signUpModalClosed } from '../../redux/actions';
import {
  signUpStart,
  authSelector,
  closeModal,
  signUpModalClosed
} from '../../redux/slices'

import Alert from '../layout/Alert'
import { positiveColor, neutralColor, warningColor } from '../../utils/colors'

export const formStructure = {
  userName: 'sa',
  email: 'sa6702@gmail.com',
  password: 'qwerty',
  password2: 'qwerty'
}

export const signUpSchema = t =>
  Yup.object().shape({
    [Object.keys(formStructure)[0]]: Yup.string().max(
      15,
      // eslint-disable-next-line no-template-curly-in-string
      t('signup.errors.userName.max', { max: '${max}' })
    ),
    [Object.keys(formStructure)[1]]: Yup.string()
      .email(t('signup.errors.email.invalidEmail'))
      .required(t('signup.errors.required')),
    [Object.keys(formStructure)[2]]: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .min(6, t('signup.errors.password.min', { min: '${min}' }))
      .required(t('signup.errors.required')),
    [Object.keys(formStructure)[3]]: Yup.string().oneOf(
      [Yup.ref(Object.keys(formStructure)[2]), null],
      t('signup.warnings.pwdMustMatch!')
      // t('signup.Passwords must match!')
    )
  })

export const SignUp = ({
  initValues,
  signUpSchema,
  closeModal,
  signUpStart,
  signUpModalClosed
}) => {
  const dispatch = useDispatch()
  const { isSignedUp } = useSelector(authSelector)
  useEffect(() => {
    if (isSignedUp) {
      dispatch(closeModal())
      dispatch(signUpModalClosed())
    }
  }, [isSignedUp])

  const { t } = useTranslation('auth')

  const onSubmit = (formData, { setSubmitting }) => {
    const { userName, password2, ...otherProps } = formData
    const signUpData = { user_name: userName, ...otherProps }
    dispatch(signUpStart(signUpData))
    setSubmitting(false)
  }

  return (
    <Container fluid textAlign='center'>
      <Alert />
      <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as='h2' textAlign='center' color={positiveColor}>
            <Segment.Inline>
              <Icon name='utensils' size='large' />
              {t('signup.header')}
            </Segment.Inline>
          </Header>

          <Formik
            initialValues={initValues}
            validationSchema={signUpSchema(t)}
            onSubmit={onSubmit}>
            <Form size='large'>
              <Segment color={positiveColor} stacked>
                <Input
                  id='input-userName'
                  name='userName'
                  inputLabel={t('signup.labels.userName')}
                  icon='user'
                  placeholder={t('signup.placeHolders.userName')}
                  errorPrompt
                />
                <Input
                  id='input-email'
                  name='email'
                  inputLabel={t('signup.labels.email')}
                  icon='at'
                  placeholder={t('signup.placeHolders.email')}
                  errorPrompt
                />
                <Input
                  id='input-password'
                  data-testid='input-password'
                  name='password'
                  type='password'
                  inputLabel={t('signup.labels.password')}
                  icon='key'
                  placeholder={t('signup.placeHolders.password')}
                  autoComplete='on'
                  errorPrompt
                />
                <Input
                  id='input-password2'
                  data-testid='input-password2'
                  name='password2'
                  type='password'
                  inputLabel={t('signup.labels.password2')}
                  icon='key'
                  placeholder={t('signup.placeHolders.password2')}
                  autoComplete='on'
                  errorPrompt
                />
                <Button.Group widths='1'>
                  <SubmitButton
                    basic
                    color={positiveColor}
                    size='large'
                    content={t('signup.buttons.signUp')}
                  />
                  <Button.Or text={t('signup.buttons.or')} />
                  <ResetButton
                    basic
                    color={neutralColor}
                    size='large'
                    content={t('signup.buttons.reset')}
                  />
                  <Button.Or text={t('signup.buttons.or')} />
                  <Button
                    basic
                    color={warningColor}
                    size='large'
                    content={t('signup.buttons.cancel')}
                    type='button'
                    onClick={() => {
                      dispatch(closeModal())
                    }}
                  />
                </Button.Group>
              </Segment>
            </Form>
          </Formik>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

SignUp.defaultProps = {
  initValues: formStructure,
  signUpSchema: signUpSchema,
  closeModal: closeModal,
  signUpStart: signUpStart,
  signUpModalClosed: signUpModalClosed
}

SignUp.propTypes = {
  initValues: PropTypes.object.isRequired,
  signUpSchema: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  signUpStart: PropTypes.func.isRequired,
  signUpModalClosed: PropTypes.func.isRequired
}

export default SignUp
