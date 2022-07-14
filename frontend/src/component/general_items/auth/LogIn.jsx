import React from 'react'
import { useAppEffect, useAppCallback } from '../../../hooks/react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactRedux'
// import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { LinearProgress, Box, Dialog } from '@mui/material'

import {
  authSelector, logInStart,
  setLogInVisibility, setSignUpVisibility
} from '../../../redux/slices'
import * as CL from '../../../constants/colors'
import { DialogButton } from '../../styles/buttons.styled'
import { AuthTextField } from '../../styles/text.styled'


export const initValues = {
  email: 'a@agatha-ng.com',
  password: 'qwerty'
}

export const logInSchema = t =>
  Yup.object().shape({
    [Object.keys(initValues)[0]]: Yup.string()
      .email(t('login.errors.email.invalidEmail'))
      .required(t('login.errors.required')),
    [Object.keys(initValues)[1]]: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .min(6, t('login.errors.password.min', { min: '${min}' }))
      .required(t('login.errors.required'))

  })

const LogIn = ({ initValues, logInSchema }) => {

  const { loading, isLogInOpened } = useAppSelector(authSelector)
  const { t } = useTranslation('auth')
  const dispatch = useAppDispatch()

  useAppEffect(() => {
    if (!loading) {
      // console.log('LogIn>useEffect[loading]')
      formik.setSubmitting(false)
      dispatch(setLogInVisibility(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const formik = useFormik({
    initialValues: { ...initValues },
    validationSchema: logInSchema(t),
    onSubmit: (formData, { setSubmitting }) => {
      // console.log('LogIn>onSubmitHandle, formData ->', formData,
      //   '\n  setSubmitting ->', setSubmitting
      // )
      dispatch(logInStart(formData))
    }
  })

  const signUpClickHandler = () => {
    dispatch(setSignUpVisibility(true))
    onCloseHandle()
  }

  const onCloseHandle = useAppCallback(
    (cancel) => {
      // console.log('LogIn>onCloseHandle, formik.values ->', formik.values)
      // setVisibility(false)
      dispatch(setLogInVisibility(false))
      if (cancel) {
        formik.values = { ...initValues }
      }
    },
    [formik, initValues,
      // setVisibility,
      dispatch],
  )

  // console.log('LogIn isLogInOpened->', isLogInOpened)

  return (
    <Dialog
      id='login-dialog'
      data-testid='login-dialog'
      // open={true}
      open={isLogInOpened}
      // open={visibility}
      onClose={onCloseHandle}
      sx={{
        // bgcolor: 'red'
      }}
    >
      <Box
        id='login-main-box'
        // display='flex'
        justifyContent='center'
        sx={{
          p: '.5rem', border: 1, borderColor: `${CL.dialogBorders}`,
          borderRadius: 1, bgcolor: `${CL.navBarBackground}`,
          fontFamily: 'sans-serif'
        }}
      >
        <Box
          id='login-header-box'

          sx={{
            display: 'flex', justifyContent: 'center',
            // border: 1, borderColor: 'red',
            m: '.5rem', p: '1rem', fontWeight: 'bold',
            fontSize: 'h6.fontSize'
          }}
          children={t('login.header')}
        />
        <Box
          id='login-form-box'
          sx={{
            // border: 1, borderColor: 'blue',
            p: '.5rem'
          }}
          children={
            <form
              onSubmit={formik.handleSubmit}
              children={
                <Box
                  id='login-input-box'
                  sx={{ p: '.25rem' }}
                >
                  <Box
                    id='login-email-input-box'
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: '.25rem'
                    }}
                    children={
                      <AuthTextField
                        variant='outlined'
                        fullWidth

                        id='email'
                        data-testid='input-email'
                        name='email'
                        type='email'

                        label={t('login.labels.email')}
                        autoComplete='username'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                      // error={formik.errors}
                      />
                    }
                  />
                  <Box
                    id='login-password-input-box'
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: '.25rem'
                    }}
                    children={
                      <AuthTextField
                        variant='outlined'
                        fullWidth

                        id='password'
                        data-testid='input-password'
                        name='password'
                        type='password'
                        label={t('login.labels.password')}
                        autoComplete='current-password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                      />
                    }
                  />
                  {formik.isSubmitting && loading &&
                    <LinearProgress data-testid='login-form-linear-progress' />}
                  <Box
                    id='login-form-buttons-box'
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      p: '.5rem'
                    }}
                  >
                    <DialogButton
                      data-testid='button-login'

                      disabled={formik.isSubmitting}
                      onClick={formik.submitForm}
                      children={t('login.buttons.logIn')}
                      hovered={{
                        bgcolor: CL.positive, color: CL.navBarBackground
                      }}
                    />
                    <DialogButton
                      data-testid='button-cancel'
                      disabled={formik.isSubmitting}
                      onClick={() => {
                        formik.resetForm()
                        onCloseHandle(true)
                      }}
                      children={t('login.buttons.cancel')}
                      hovered={{
                        bgcolor: CL.attention, color: CL.navBarBackground
                      }}
                    />
                  </Box>
                </Box>
              }
            />
          } />
        <Box
          id='login-signup-box'
          sx={{
            mx: '1.5rem',
            display: 'flex', justifyContent: 'center',
            alignItems: 'center',
            border: 1,
            borderColor: `${CL.dialogBorders}`,
            // borderColor: 'text.disabled',
            borderRadius: 1
          }}
        >
          <Box
            id='login-signup-message-box'
            sx={{
              mx: '1rem',
              // border: 1, borderColor: 'red'
            }}
            children={
              <p>
                {t('login.message')}
              </p>
            } />
          <Box
            id='login-signup-button-box'
            sx={{
              // my: '.1rem'
              display: 'flex',
              // border: 1, borderColor: 'red'
            }}
            children={
              <DialogButton
                data-testid='button-signup'
                disabled={formik.isSubmitting}
                children={t('login.buttons.signUp')}
                onClick={signUpClickHandler}
                hovered={{
                  bgcolor: CL.positive, color: CL.navBarBackground
                }}
              />
            }
          />
        </Box>
      </Box>
    </Dialog>
  )
}

LogIn.defaultProps = {
  initValues,
  logInSchema,
  visibility: false,
  setVisibility: () => { }
}
LogIn.propTypes = {
  initValues: PropTypes.object.isRequired,
  logInSchema: PropTypes.func.isRequired,
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired
}

export default LogIn