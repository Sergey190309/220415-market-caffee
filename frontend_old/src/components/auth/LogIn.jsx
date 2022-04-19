import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Segment, Icon, Header, Grid, Button } from 'semantic-ui-react'
import { Formik } from 'formik'
import { Form, Input, SubmitButton, ResetButton } from 'formik-semantic-ui-react'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

import {
  openModal,
  closeModal,
  logInStart,
  logInModalClosed,
  authSelector
} from '../../redux/slices'
import Alert from '../layout/Alert'
import { positiveColor, neutralColor, warningColor } from '../../utils/colors'

export const formStructure = {
  email: 'a@agatha-ng.com',
  password: 'qwerty'
}

export const logInSchema = t =>
  Yup.object().shape({
    [Object.keys(formStructure)[0]]: Yup.string()
      .email(t('login.errors.email.invalidEmail'))
      .required(t('login.errors.required')),
    [Object.keys(formStructure)[1]]: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .min(6, t('login.errors.password.min', { min: '${min}' }))
      .required(t('login.errors.required'))
  })

export const LogIn = ({
  initValues,
  logInSchema,
  openModal,
  closeModal,
  logInStart,
  logInModalClosed
}) => {
  // console.log('components, logIn closeModal ->', closeModal())
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(authSelector)
  const { t } = useTranslation('auth')

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(closeModal())
      logInModalClosed()
    }
  }, [isLoggedIn])

  const onSubmit = (formData, { setSubmitting }) => {
    // onSubmit(formData, logInStart, setSubmitting, dispatch)
    dispatch(logInStart(formData))
    setSubmitting(false)
  }

  return (
    <Container
      fluid
      textAlign='center'>
      <Alert />
      <Grid
        textAlign='center'
        style={{ height: '50vh' }}
        verticalAlign='middle'
      >
        <Grid.Column
          style={{ maxWidth: 500 }}>
          <Header as='h2' textAlign='center' color={positiveColor}>
            <Segment.Inline>
              <Icon name='utensils' size='large' />
              {t('login.header')}
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
                    inputLabel={t('login.labels.email')}
                    // inputLabel={{ color: color, content: 'Email' }}
                    icon='at'
                    // iconPosition='right'
                    placeholder={t('login.placeHolders.email')}
                    errorPrompt
                  />
                  <Input
                    id='input-password'
                    data-testid='input-password'
                    name='password'
                    type='password'
                    inputLabel={t('login.labels.password')}
                    // inputLabel={{ color: color, content: 'Password' }}
                    icon='key'
                    placeholder={t('login.placeHolders.password')}
                    autoComplete='on'
                    errorPrompt
                  />
                  <Button.Group widths='1'>
                    <SubmitButton
                      // data-testid='SubmitButton'
                      basic
                      color={positiveColor}
                      size='large'
                      content={t('login.buttons.logIn')}
                      // disabled={isSubmitting}
                    />
                    <Button.Or text={t('login.buttons.or')} />
                    <ResetButton
                      basic
                      color={neutralColor}
                      size='large'
                      content={t('login.buttons.reset')}
                    />
                    <Button.Or text={t('login.buttons.or')} />
                    <Button
                      basic
                      color={warningColor}
                      size='large'
                      content={t('login.buttons.cancel')}
                      type='button'
                      onClick={() => {
                        // console.log('onClick, closeMocal')
                        dispatch(closeModal())
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
                  <Header as='h4' content={t('login.message')} />
                </Grid.Column>
                <Grid.Column width='7' textAlign='left'>
                  <Button
                    // primary
                    basic
                    color={positiveColor}
                    floated='left'
                    size='large'
                    content={t('login.buttons.signUp')}
                    onClick={() => {
                      dispatch(openModal('signUp'))
                    }}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

LogIn.defaultProps = {
  initValues: formStructure,
  logInSchema: logInSchema,
  openModal: openModal,
  closeModal: closeModal,
  logInStart: logInStart,
  logInModalClosed: logInModalClosed
}

LogIn.propTypes = {
  initValues: PropTypes.object.isRequired,
  logInSchema: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  logInStart: PropTypes.func.isRequired,
  logInModalClosed: PropTypes.func.isRequired
}

export default LogIn
