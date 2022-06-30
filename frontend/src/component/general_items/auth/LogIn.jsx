import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Button, Container, LinearProgress, DialogTitle, Box,
  // TextField
} from '@mui/material'
// import TextField from '@mui/material/TextField'
import {
  Formik, Form,
  Field
} from 'formik'
import { TextField } from 'formik-mui'
import { useTranslation } from 'react-i18next'

import { deviceSelector, closeModal } from '../../../redux/slices'
import { Dialog } from '@mui/material'

import * as CL from '../../../constants/colors'


const LogIn = () => {
  const [opened, setOpened] = useState(false)
  // const [opened, setOpened] = useState(true)
  const { t } = useTranslation('auth')
  const { kindOfModal } = useSelector(deviceSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    if (kindOfModal === 'LogIn') {
      setOpened(true)
    }
  }, [kindOfModal])

  const onCloseHandle = () => {
    setOpened(false)
    dispatch(closeModal())
  }

  const onSubmitHandle = (formData, { setSubmitting }) => {
    console.log('LogIn>onSubmitHandle, formData ->', formData)
  }

  console.log('LogIn, render')

  return (
    <Dialog
      // open={true}
      open={opened}
      onClose={onCloseHandle}
      sx={{
        // bgcolor: 'red'
      }}
    >
      <Box
        // display='flex'
        justifyContent='center'
        sx={{
          p: '1rem',
          bgcolor: `${CL.navBarBackground}`
        }}
      >
        <Box
          sx={{
            display: 'flex', justifyContent: 'center',
            border: 1, borderColor: 'red',
            m: '.5rem'
          }}
          children={t('login.header')}
        />

        <Box
          sx={{
            border: 1, borderColor: 'blue',
            p: '.5rem'
          }}
          children={
          <Formik

            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={onSubmitHandle}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: '.5rem'
                  }}
                  children={
                    <Field
                      component={TextField}
                      name='email'
                      type='email'
                      label={t('login.labels.email')}
                      autoComplete='username'
                    />
                  }
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: '.5rem'
                  }}
                  children={
                    <Field
                    component={TextField}
                    name='password'
                    type='password'
                    label={t('login.labels.password')}
                    autoComplete='current-password'
                    />
                  }
                />
                {isSubmitting && <LinearProgress />}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  p: '.5rem'
                }}>
                  <Button
                    sx={{
                      mr: '.25rem',
                      bgcolor: `${CL.positive}`
                    }}
                    // variant="contained"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    children=  {t('login.buttons.logIn')}
                    />
                  <Button
                    sx={{
                      ml: '.25rem',
                      bgcolor: `${CL.attention}`
                    }}
                    // variant="contained"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    children=  {t('login.buttons.cancel')}
                  />
                </Box>
              </Form>
            )}
          </Formik>
        } />
        <Box
          sx={{
            m: '.5rem',
            display: 'flex', justifyContent: 'center',
            border: 1, borderColor: 'yellow'
          }}
        >
          <p>
            {t('login.message')}
          </p>
          <Button
            sx={{
              m: '.5rem',
              bgcolor: `${CL.positive}`
            }}
            children={t('login.buttons.signUp')}
          />
        </Box>
      </Box>
    </Dialog>
  )
}

LogIn.defaultProps = {}
LogIn.propTypes = {}

export default LogIn