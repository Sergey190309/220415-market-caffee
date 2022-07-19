import React from 'react'
import { useAppEffect } from '../../../hooks/react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactRedux'
// import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { LinearProgress, Box, Dialog } from '@mui/material'

import { authSelector, setSignUpVisibility, signUpStart } from '../../../redux/slices'
import * as CL from '../../../constants/colors'
import { DialogButton } from '../../styles/buttons.styled'
import { AuthTextField } from '../../styles/text.styled'

export const initValues = {
  userName: 'sa',
  email: 'sa6702@gmail.com',
  password: 'qwerty',
  password2: 'qwerty'
}

export const signUpSchema = t =>
  Yup.object().shape({
    [Object.keys(initValues)[0]]: Yup.string().max(
      15,
      // eslint-disable-next-line no-template-curly-in-string
      t('signup.errors.userName.max', { max: '${max}' })
    ),
    [Object.keys(initValues)[1]]: Yup.string()
      .email(t('signup.errors.email.invalidEmail'))
      .required(t('signup.errors.required')),
    [Object.keys(initValues)[2]]: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .min(6, t('signup.errors.password.min', { min: '${min}' }))
      .required(t('signup.errors.required')),
    [Object.keys(initValues)[3]]: Yup.string().oneOf(
      [Yup.ref(Object.keys(initValues)[2]), null],
      t('signup.warnings.pwdMustMatch!')
    )
  })


const SignUp = ({ initValues, signUpSchema }) => {

  const { loading, isSignUpOpened } = useAppSelector(authSelector)
  const { t } = useTranslation('auth')
  const dispatch = useAppDispatch()


  useAppEffect(() => {
    console.log('signUp>useEffect[loading], loading ->', loading)
    if (!loading) {
      formik.setSubmitting(false)
      dispatch(setSignUpVisibility(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const onSubmitHandler = formData => {
    const { userName, password2, ...otherProps } = formData
    const signUpData = { user_name: userName, ...otherProps }
    dispatch(signUpStart(signUpData))
  }

  const formik = useFormik({
    initialValues: { ...initValues },
    validationSchema: signUpSchema(t),
    onSubmit: (formData, { setSubmitting }) => {
      onSubmitHandler(formData)
      // console.log('signUp>onSubmitHandle, formData ->', formData,
      //   '\n  setSubmitting ->', setSubmitting
      // )
    }
  })

  const onCloseHandle = () => {
    console.log('SignUp>onCloseHandle')
    dispatch(setSignUpVisibility(false))
  }

  return (
    <Dialog
      id='signup-dialog'
      data-testid='signup-dialog'
      // open={true}
      open={isSignUpOpened}
      onClose={onCloseHandle}
    >
      <Box
        id='signup-main-box'
        justifyContent='center'
        sx={{
          p: '.5rem', border: 1, borderColor: `${CL.dialogBorders}`,
          borderRadius: 1, bgcolor: `${CL.navBarBackground}`,
          fontFamily: 'sans-serif'
        }}
      >
        <Box
          id='signup-header-box'
          sx={{
            display: 'flex', justifyContent: 'center',
            // border: 1, borderColor: 'red',
            m: '.5rem', p: '1rem', fontWeight: 'bold',
            fontSize: 'h6.fontSize'
          }}
          children={t('signup.header')}
        />
        <Box
          id='signup-form-box'
          sx={{
            // border: 1, borderColor: 'blue',
            p: '.5rem'
          }}
          children={
            <form
              onSubmit={formik.handleSubmit}
              children={
                <Box
                  id='signup-input-box'
                  sx={{ p: '.25rem' }}
                >
                  <Box
                    id='signup-usename-box'
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: '.25rem'
                    }}
                    children={
                      <AuthTextField
                        variant='outlined'
                        fullWidth

                        id='userName'
                        name='userName'
                        type='text'

                        label={t('signup.labels.userName')}
                        autoComplete='username'
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        error={formik.touched.userName && Boolean(formik.errors.userName)}
                        helperText={formik.touched.userName && formik.errors.userName}
                      />
                    }

                  />
                  <Box
                    id='signup-email-box'
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
                        name='email'
                        type='email'

                        label={t('signup.labels.email')}
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
                    id='signup-password-box'
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: '.25rem'
                    }}
                    children={
                      <AuthTextField
                        fullWidth
                        id='password'
                        name='password'
                        type='password'
                        label={t('signup.labels.password')}
                        autoComplete='current-password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                      />
                    }
                  />
                  <Box
                    id='signup-password2-box'
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: '.25rem'
                    }}
                    children={
                      <AuthTextField
                        fullWidth
                        id='password2'
                        name='password2'
                        type='password'
                        label={t('signup.labels.password2')}
                        autoComplete='current-password'
                        value={formik.values.password2}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                      />
                    }
                  />
                  {formik.isSubmitting && loading && <LinearProgress />}
                  <Box
                    id='login-form-buttons-box'
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      p: '.5rem'
                    }}
                  >
                    <DialogButton
                      disabled={formik.isSubmitting}
                      onClick={formik.submitForm}
                      children={t('signup.buttons.signup')}
                      hovered={{
                        bgcolor: CL.positive, color: CL.navBarBackground
                      }}
                    />
                    <DialogButton
                      disabled={formik.isSubmitting}
                      onClick={() => {
                        formik.resetForm()
                        onCloseHandle(true)
                      }}
                      children={t('signup.buttons.cancel')}
                      hovered={{
                        bgcolor: CL.attention, color: CL.navBarBackground
                      }}
                    />
                  </Box>
                </Box>
              }
            />
          }
        />
      </Box>
    </Dialog>
  )
}

SignUp.defaultProps = {
  initValues,
  signUpSchema,
  visibility: false,
  setVisibility: () => { }
}
SignUp.propTypes = {
  initValues: PropTypes.object.isRequired,
  signUpSchema: PropTypes.func.isRequired,
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired
}

export default SignUp