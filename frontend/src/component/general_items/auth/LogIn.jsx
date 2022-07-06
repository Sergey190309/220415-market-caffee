import React, {
  useEffect, useCallback
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { LinearProgress, Box, Dialog } from '@mui/material'

import * as CL from '../../../constants/colors'
import { DialogButton } from '../../styles/buttons.styled'
import { AuthTextField } from '../../styles/text.styled'

import { authSelector, logInStart } from '../../../redux/slices'

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

const LogIn = ({ initValues, logInSchema, visibility, setVisibility }) => {
  // const [opened, setOpened] = useState(visibility)
  const { t } = useTranslation('auth')
  // const { kindOfModal } = useSelector(deviceSelector)
  const { loading } = useSelector(authSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading) {
      setVisibility(false)
      formik.setSubmitting(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, setVisibility])

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

  const onCloseHandle = useCallback(
    (cancel) => {
      // console.log('LogIn>onCloseHandle, formik.values ->', formik.values)
      setVisibility(false)
      if (cancel) {
        formik.values = { ...initValues }
      }
    },
    [formik, initValues, setVisibility],
  )

  // console.log('LogIn, render, values ->', formik.values,
  //   '\n  visibility ->', visibility,
  //   '\n  formik.isSubmiting ->', formik.isSubmitting
  // )

  return (
    <Dialog
      // open={true}
      open={visibility}
      onClose={onCloseHandle}
      sx={{
        // bgcolor: 'red'
      }}
    >
      <Box
        // display='flex'
        justifyContent='center'
        sx={{
          p: '.5rem', border: 1, borderColor: `${CL.dialogBorders}`,
          borderRadius: 1, bgcolor: `${CL.navBarBackground}`,
          fontFamily: 'sans-serif'
        }}
      >
        <Box
          sx={{
            display: 'flex', justifyContent: 'center',
            // border: 1, borderColor: 'red',
            m: '.5rem', p: '1rem', fontWeight: 'bold',
            fontSize: 'h6.fontSize'
          }}
          children={t('login.header')}
        />
        <Box
          sx={{
            // border: 1, borderColor: 'blue',
            p: '.5rem'
          }}
          children={
            <form
              onSubmit={formik.handleSubmit}
              children={
                <Box
                  sx={{ p: '.25rem' }}
                >
                  <Box
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
                        label={t('login.labels.password')}
                        autoComplete='current-password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                      />
                    }
                  />
                  {formik.isSubmitting && loading && <LinearProgress />}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    p: '.5rem'
                  }}>
                    <DialogButton
                      disabled={formik.isSubmitting}
                      onClick={formik.submitForm}
                      children={t('login.buttons.logIn')}
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
            sx={{
              mx: '1rem',
              // border: 1, borderColor: 'red'
            }}
            children={
              <p>
                {t('login.message')}
              </p>
            } />
          <Box sx={{
            // my: '.1rem'
            display: 'flex',
            // border: 1, borderColor: 'red'
          }}
            children={
              <DialogButton
                disabled={formik.isSubmitting}
                children={t('login.buttons.signUp')}
                onClick={() => { console.log('SignUpButton clicked.') }}
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