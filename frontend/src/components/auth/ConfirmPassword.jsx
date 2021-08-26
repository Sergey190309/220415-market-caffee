import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Segment, Icon, Header, Grid, Button } from 'semantic-ui-react'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-semantic-ui-react'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

import {
  closeModal,
  confirmPasswordStart,
  confirmPasswordModalClosed,
  setMessage,
  deviceSelector,
  authSelector
} from '../../redux/slices'
import Alert from '../layout/Alert'

import { positiveColor, warningColor } from '../../utils/colors'

export const formStructure = {
  password: 'qwerty'
}

export const confirmPasswordSchema = t =>
  Yup.object().shape({
    [Object.keys(formStructure)[0]]: Yup.string()
      .required(t('confirmpassword.errors.required'))
  })

const ConfirmPassword = ({
  initValues,
  confirmPasswordSchema,
  closeModal,
  confirmPasswordStart,
  confirmPasswordModalClosed,
  setMessage
}) => {
  const dispatch = useDispatch()
  const { isConfirmedPassword } = useSelector(authSelector)
  const { message } = useSelector(deviceSelector)
  const { t } = useTranslation('auth')

  useEffect(() => {
    if (isConfirmedPassword) {
      dispatch(closeModal())
      dispatch(confirmPasswordModalClosed())
    }
  }, [isConfirmedPassword])

  const onSubmit = (formData, { setSubmitting }) => {
    // console.log('component, auth, ConfirmPassword, formData ->', formData)
    dispatch(confirmPasswordStart(formData))
    setSubmitting(false)
  }

  return (
    <Container
      data-testid='whole-component'
      fluid textAlign='center'
    >
      <Alert />
      <Grid
        textAlign='center'
        style={{ height: '50vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as='h2' textAlign='center' color={positiveColor}>
            <Segment.Inline>
              <Icon name='utensils' size='large' />
              {t('confirmpassword.header')}
            </Segment.Inline>
          </Header>

          <Formik
            initialValues={initValues}
            validationSchema={confirmPasswordSchema(t)}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form size='large'>
                <Segment color={positiveColor} stacked>
                  <Header content={message} />
                  <Input
                    id='input-password'
                    data-testid='input-password'
                    name='password'
                    type='password'
                    inputLabel={t('confirmpassword.labels.password')}
                    // inputLabel={{ color: color, content: 'Password' }}
                    icon='key'
                    placeholder={t('confirmpassword.placeHolders.password')}
                    autoComplete='on'
                    errorPrompt
                  />
                  <Button.Group widths='1'>
                    <SubmitButton
                      basic
                      color={positiveColor}
                      size='large'
                      content={t('confirmpassword.buttons.confirm')}
                      // disabled={isSubmitting}
                    />
                    <Button.Or text={t('confirmpassword.buttons.or')} />
                    <Button
                      basic
                      color={warningColor}
                      size='large'
                      content={t('confirmpassword.buttons.cancel')}
                      type='button'
                      onClick={() => {
                        // console.log('onClick, closeMocal')
                        dispatch(setMessage(''))
                        dispatch(closeModal())
                      }}
                    />
                  </Button.Group>
                </Segment>
              </Form>
            )}
          </Formik>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

ConfirmPassword.defaultProps = {
  initValues: formStructure,
  confirmPasswordSchema,
  closeModal,
  confirmPasswordStart,
  confirmPasswordModalClosed,
  setMessage
}

ConfirmPassword.propTypes = {
  initValues: PropTypes.object.isRequired,
  confirmPasswordSchema: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  confirmPasswordStart: PropTypes.func.isRequired,
  confirmPasswordModalClosed: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

export default ConfirmPassword
